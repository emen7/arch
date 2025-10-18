// Generate audio files for presentation using Google Cloud TTS
// Usage: node scripts/generate-audio.js [quotes-file]

const textToSpeech = require('@google-cloud/text-to-speech');
const fs = require('fs').promises;
const path = require('path');
const config = require('./tts-config');

async function getAudioDuration(audioBuffer) {
  // Estimate duration from MP3 file size (rough approximation)
  // More accurate: would need to parse MP3 headers
  // At 24kHz, ~24KB per second for speech
  return audioBuffer.length / 24000;
}

async function generateAudio(client, quote, index, total) {
  if (!quote.text) {
    console.log(`[${index + 1}/${total}] Skipping ${quote.id} (no text)`);
    return { id: quote.id, duration: quote.duration || 0, hasAudio: false };
  }

  const voiceConfig = config.voices[quote.voiceType] || config.voices.narrative;

  const request = {
    input: { text: quote.text },
    voice: {
      languageCode: voiceConfig.languageCode,
      name: voiceConfig.name,
      ssmlGender: voiceConfig.ssmlGender,
    },
    audioConfig: config.audioConfig,
  };

  try {
    console.log(`[${index + 1}/${total}] Generating ${quote.id}...`);
    console.log(`  Voice: ${voiceConfig.name} (${quote.voiceType})`);
    console.log(`  Text: ${quote.text.substring(0, 60)}...`);

    const [response] = await client.synthesizeSpeech(request);

    // Save audio file
    const outputPath = path.join(__dirname, `../${config.paths.audio}/${quote.id}.mp3`);
    await fs.mkdir(path.dirname(outputPath), { recursive: true });
    await fs.writeFile(outputPath, response.audioContent, 'binary');

    // Estimate duration
    const duration = await getAudioDuration(response.audioContent);

    console.log(`  ✓ Saved: ${quote.id}.mp3 (${duration.toFixed(1)}s)\n`);

    return {
      id: quote.id,
      duration: Math.ceil(duration),
      hasAudio: true,
      audioPath: `/presentations/symposium-2025/audio/${quote.id}.mp3`,
    };
  } catch (error) {
    console.error(`  ✗ Failed: ${error.message}\n`);
    return { id: quote.id, duration: 0, hasAudio: false, error: error.message };
  }
}

async function main() {
  const quotesFile = process.argv[2] || 'scripts/sample-quotes.json';

  // Check for credentials
  const credentialPath = path.join(__dirname, '../symposium-tts-key.json');
  try {
    await fs.access(credentialPath);
  } catch {
    console.error('\n⚠️  Google Cloud credentials not found!');
    console.error('Please place your service account key file at:');
    console.error('  revelationary-site/symposium-tts-key.json\n');
    process.exit(1);
  }

  // Load quotes
  let quotes;
  try {
    const quotesData = await fs.readFile(quotesFile, 'utf8');
    quotes = JSON.parse(quotesData);
  } catch (error) {
    console.error(`\n⚠️  Could not load quotes file: ${quotesFile}`);
    console.error(error.message);
    process.exit(1);
  }

  // Initialize client
  const client = new textToSpeech.TextToSpeechClient({
    keyFilename: credentialPath,
  });

  console.log('\n🎙️  Generating Audio for Symposium Presentation\n');
  console.log(`Quotes file: ${quotesFile}`);
  console.log(`Total slides: ${quotes.length}`);
  console.log(`Output: ${config.paths.audio}\n`);

  // Generate audio for each quote
  const results = [];
  for (let i = 0; i < quotes.length; i++) {
    const result = await generateAudio(client, quotes[i], i, quotes.length);
    results.push(result);
  }

  // Generate timing configuration
  const timingConfig = {
    generatedAt: new Date().toISOString(),
    totalSlides: quotes.length,
    totalDuration: results.reduce((sum, r) => sum + r.duration, 0),
    slides: results,
  };

  const timingPath = path.join(__dirname, `../${config.paths.timing}`);
  await fs.mkdir(path.dirname(timingPath), { recursive: true });
  await fs.writeFile(timingPath, JSON.stringify(timingConfig, null, 2));

  // Summary
  const successful = results.filter(r => r.hasAudio).length;
  const failed = results.filter(r => r.error).length;
  const skipped = results.filter(r => !r.hasAudio && !r.error).length;

  console.log('✅ Generation complete!\n');
  console.log(`📊 Summary:`);
  console.log(`  ✓ Generated: ${successful}`);
  console.log(`  ✗ Failed: ${failed}`);
  console.log(`  ⊘ Skipped: ${skipped}`);
  console.log(`  ⏱️  Total duration: ${Math.floor(timingConfig.totalDuration / 60)}m ${timingConfig.totalDuration % 60}s\n`);
  console.log(`📁 Audio files: ${config.paths.audio}/`);
  console.log(`📄 Timing config: ${config.paths.timing}\n`);
}

main().catch(console.error);
