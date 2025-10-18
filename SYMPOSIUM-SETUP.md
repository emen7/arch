# Symposium Presentation Setup Guide

## Google Cloud TTS Setup

### 1. Enable Text-to-Speech API

You're currently on Cloud Console - follow these steps:

1. **Search for API**: Use the search bar at top, type "Text-to-Speech API"
2. **Enable**: Click "Enable" button if not already enabled
3. **Wait**: Takes ~30 seconds to enable

### 2. Create Service Account

1. **Navigate**: Menu (☰) → "IAM & Admin" → "Service Accounts"
2. **Create**: Click "Create Service Account" button
3. **Name**: Enter `symposium-tts` (or any name you prefer)
4. **Click**: "Create and Continue"
5. **Role**: Click "Select a role" dropdown
   - Type "Text-to-Speech" in the filter
   - Select "Cloud Text-to-Speech User"
6. **Click**: "Done"

### 3. Generate Key File

1. **Find your service account**: Click on `symposium-tts@your-project.iam.gserviceaccount.com`
2. **Keys tab**: Click "Keys" at the top
3. **Add Key**: Click "Add Key" → "Create new key"
4. **Format**: Select **JSON** (not P12)
5. **Create**: Click "Create" button
6. **Download**: File downloads automatically (e.g., `your-project-abc123.json`)

### 4. Install Key File

1. **Rename** the downloaded file to: `symposium-tts-key.json`
2. **Move** it to your project root: `revelationary-site/symposium-tts-key.json`
3. **Verify**: File should be at same level as `package.json`

✅ The file is already in `.gitignore` so it won't be committed to GitHub

---

## Testing Voices

Once your key file is in place:

```bash
npm run test-voices
```

This will:
- Generate sample audio with different voices
- Save to `public/test-voices/`
- Create both quotation and narrative samples

Listen to the samples and choose your preferred voices:
- **Female voice** for UB quotations (revelation authority)
- **Male voice** for theory/narrative (researcher voice)

### Available Voices to Test:

**Studio Tier (Highest Quality):**
- `studio-m` - Male, warm and authoritative
- `studio-o` - Professional (may be male or neutral)
- `studio-q` - Male, documentary/educational

**Neural2 Tier (High Quality, Backup):**
- `neural-f` - Female, professional
- `neural-h` - Female, clear

### Update Voice Configuration:

Edit `scripts/tts-config.js` after testing:

```javascript
voices: {
  quotations: {
    languageCode: 'en-US',
    name: 'en-US-Neural2-F', // Change to your preferred female voice
    ssmlGender: 'FEMALE',
  },
  narrative: {
    languageCode: 'en-US',
    name: 'en-US-Studio-M', // Change to your preferred male voice
    ssmlGender: 'MALE',
  },
},
```

---

## Generating Presentation Audio

### 1. Prepare Your Quotes

Edit `scripts/sample-quotes.json` (or create your own quotes file):

```json
[
  {
    "id": "intro-1",
    "type": "narrative",
    "voiceType": "narrative",
    "text": "Your narrative text here...",
    "citation": null
  },
  {
    "id": "mpc-overview",
    "type": "quotation",
    "voiceType": "quotations",
    "text": "Quote from Urantia Book...",
    "citation": "29:4.13"
  }
]
```

**Fields:**
- `id`: Unique identifier (becomes filename)
- `type`: "narrative" or "quotation" (for your reference)
- `voiceType`: "narrative" or "quotations" (determines which voice to use)
- `text`: The actual text to speak (null for silent slides like title)
- `citation`: UB paper reference (optional, for documentation)

### 2. Generate All Audio

```bash
npm run generate-audio
```

Or specify a different quotes file:

```bash
npm run generate-audio scripts/my-quotes.json
```

This will:
- Generate MP3 files for each quote
- Save to `public/presentations/symposium-2025/audio/`
- Calculate durations automatically
- Create `timing.json` configuration file

### 3. Review Generated Files

Check `public/presentations/symposium-2025/audio/` for your MP3 files.

The `timing.json` file contains:
- Duration of each audio clip
- Total presentation length
- Audio file paths

---

## Next Steps

After audio is generated, I'll build:

1. **Presentation framework** - Slide deck with auto-play mode
2. **Audio integration** - Synchronizes audio with slides
3. **Interactive infographics** - MPC, Midwayers, Archangels, etc.
4. **Shroud sequence** - Visual progression with overlays

---

## Troubleshooting

### "Credentials not found" error
- Verify `symposium-tts-key.json` is in project root
- Check filename spelling (exact match)

### "API not enabled" error
- Go to Cloud Console → APIs & Services → Library
- Search "Text-to-Speech API"
- Click "Enable"

### "Permission denied" error
- Check service account role is "Cloud Text-to-Speech User"
- May need "Text-to-Speech Admin" if user role doesn't work

### Voice not available error
- Some Studio voices may not be available in all regions
- Fall back to Neural2 voices (still excellent quality)

---

## Cost Tracking

Studio tier: $160 per 1 million characters

45-minute presentation estimate:
- ~6,750 words
- ~33,750 characters
- Cost: ~$5.40

You can monitor usage in Cloud Console:
- Menu (☰) → "Billing" → "Reports"
- Filter by "Text-to-Speech API"
