// TTS Configuration for Symposium Presentation

module.exports = {
  // Google Cloud TTS Settings
  provider: 'google-cloud',

  // Voice Options (Studio tier for male, Neural2 for female)
  voices: {
    // Female voice for UB quotations (revelation voice)
    quotations: {
      languageCode: 'en-US',
      name: 'en-US-Neural2-F', // Best available female voice
      ssmlGender: 'FEMALE',
      tier: 'Neural2',
      speakingRate: 0.88, // Slower for gravitas and clarity
    },

    // Male voice for theory/intros (researcher voice)
    narrative: {
      languageCode: 'en-US',
      name: 'en-US-Studio-M', // Warm, authoritative male
      ssmlGender: 'MALE',
      tier: 'Studio',
      speakingRate: 0.95, // Slightly slower than default
    },
  },

  // Voice testing options
  testVoices: [
    { id: 'studio-m', name: 'en-US-Studio-M', gender: 'MALE', tier: 'Studio', label: 'Male Warm' },
    { id: 'studio-o', name: 'en-US-Studio-O', gender: 'NEUTRAL', tier: 'Studio', label: 'Professional' },
    { id: 'studio-q', name: 'en-US-Studio-Q', gender: 'MALE', tier: 'Studio', label: 'Documentary' },
    { id: 'neural-f', name: 'en-US-Neural2-F', gender: 'FEMALE', tier: 'Neural2', label: 'Female Professional' },
    { id: 'neural-h', name: 'en-US-Neural2-H', gender: 'FEMALE', tier: 'Neural2', label: 'Female Clear' },
  ],

  // Audio parameters
  audioConfig: {
    audioEncoding: 'MP3',
    speakingRate: 0.95, // Slightly slower for scientific content
    pitch: 0.0, // Neutral
    volumeGainDb: 0.0,
    sampleRateHertz: 24000,
  },

  // Output paths
  paths: {
    audio: 'public/presentations/symposium-2025/audio',
    quotes: 'scripts/quotes.json',
    timing: 'public/presentations/symposium-2025/timing.json',
  },
}
