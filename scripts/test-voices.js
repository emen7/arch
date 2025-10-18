// Test different Google Cloud TTS voices
// Usage: node scripts/test-voices.js

const textToSpeech = require('@google-cloud/text-to-speech');
const fs = require('fs').promises;
const path = require('path');
const config = require('./tts-config');

// Sample text for testing (from UB)
const sampleTexts = {
  quotation: `The Master Physical Controllers are the direct offspring of the Supreme Power Centers, and their numbers include the following: Mechanical Controllers, Energy Controllers, Energy Transformers, Energy Transmitters, Primary Associators, Secondary Dissociators, and the Frandalanks.`,
  narrative: `Today we present a case study examining how Master Physical Controllers use thought to control matter. This investigation draws from the Urantia Book as a revelation database.`,
};

async function testVoice(client, voice, text, outputName) {
  const request = {
    input: { text },
    voice: {
      languageCode: voice.languageCode || 'en-US',
      name: voice.name,
      ssmlGender: voice.gender,
    },
    audioConfig: config.audioConfig,
  };

  try {
    console.log(`Testing ${voice.label} (${voice.name})...`);
    const [response] = await client.synthesizeSpeech(request);

    const outputPath = path.join(__dirname, `../public/test-voices/${outputName}.mp3`);
    await fs.mkdir(path.dirname(outputPath), { recursive: true });
    await fs.writeFile(outputPath, response.audioContent, 'binary');

    console.log(`✓ Generated: ${outputName}.mp3`);
    return true;
  } catch (error) {
    console.error(`✗ Failed ${voice.name}: ${error.message}`);
    return false;
  }
}

async function main() {
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

  // Initialize client
  const client = new textToSpeech.TextToSpeechClient({
    keyFilename: credentialPath,
  });

  console.log('\n🎙️  Testing TTS Voices for Symposium\n');
  console.log('Sample Quotation Text:', sampleTexts.quotation.substring(0, 60) + '...\n');
  console.log('Sample Narrative Text:', sampleTexts.narrative.substring(0, 60) + '...\n');

  // Test all voices with quotation text
  console.log('--- Testing Voices with Quotation ---');
  for (const voice of config.testVoices) {
    await testVoice(
      client,
      voice,
      sampleTexts.quotation,
      `quotation-${voice.id}`
    );
  }

  // Test male voices with narrative text
  console.log('\n--- Testing Voices with Narrative ---');
  const maleVoices = config.testVoices.filter(v => v.gender === 'MALE');
  for (const voice of maleVoices) {
    await testVoice(
      client,
      voice,
      sampleTexts.narrative,
      `narrative-${voice.id}`
    );
  }

  console.log('\n✅ Voice testing complete!');
  console.log('📁 Audio files saved to: public/test-voices/');
  console.log('\nListen to the samples and update scripts/tts-config.js with your preferred voices.\n');
}

main().catch(console.error);
