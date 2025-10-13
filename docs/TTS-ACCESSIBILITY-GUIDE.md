# Text-to-Speech Accessibility System

## Overview

This system provides comprehensive text-to-speech (TTS) support for Revelationary Research reports, ensuring vision-impaired readers experience correct pronunciation of Urantia Book terminology and proper reading flow.

## Components

### 1. ReadAloud Component (`components/ReadAloud.js`)

A browser-based TTS player using the Web Speech API.

**Features:**
- Play/Pause/Stop controls
- Speed adjustment (0.5x to 2x)
- Voice selection (English voices)
- Respects aria-labels for pronunciation
- Designed to support future ElevenLabs audio files

**Usage:**
```jsx
import ReadAloud from '@/components/ReadAloud'

<ReadAloud contentId="report-content" />
```

### 2. Term Component (`components/Term.js`)

Wraps Urantia Book terminology with proper pronunciation guidance.

**Usage:**
```jsx
import Term from '@/components/Term'

<Term>Urantia</Term>           // Uses dictionary lookup
<Term aria="custom">Word</Term> // Custom pronunciation override
```

### 3. Citation Component (`components/Citation.js`)

Handles superscript citation numbers to prevent TTS from reading "squared", "cubed", etc.

**Problem:** TTS reads `"text"¹` as "text squared"
**Solution:** `"text"<Citation num={1} />` reads as "text citation 1"

**Usage:**
```jsx
import Citation from '@/components/Citation'

<p>The text here<Citation num={1} /> continues.</p>
// TTS reads: "The text here citation 1 continues"
```

### 4. PaperRef Component (`components/PaperRef.js`)

Formats Urantia Book paper citations for natural TTS reading.

**Problem:** TTS reads `187:1.4` as "one hundred eighty-seven colon one point four"
**Solution:** Provides natural reading

**Usage:**
```jsx
import PaperRef from '@/components/PaperRef'

<PaperRef>187:1.4</PaperRef>
// TTS reads: "Paper 187, section 1, paragraph 4"

<PaperRef short>187:1.4</PaperRef>
// TTS reads: "one eighty-seven, one, four"
```

### 5. Word Component (`components/Word.js`)

Handles homographs and context-specific pronunciation.

**Usage:**
```jsx
import Word from '@/components/Word'

<Word homograph="wound" meaning="injury">wound</Word>
// TTS reads: "woond" (rhymes with "tuned")

<Word homograph="wound" meaning="past-wind">wound</Word>
// TTS reads: "wownd" (rhymes with "sound")

<Word aria="custom pronunciation">text</Word>
// Direct override
```

## Pronunciation Dictionary

Located at `data/pronunciation-guide.json`

Contains:
- **Terms**: Urantia Book terminology with canonical pronunciations
- **Homographs**: Context-specific pronunciations for ambiguous words

**Structure:**
```json
{
  "terms": {
    "Urantia": {
      "pronunciation": "yur-ANN-sha",
      "ipa": "[ju'rænʃə]",
      "ariaLabel": "yur-ANN-sha"
    }
  },
  "homographs": {
    "wound": {
      "injury": { "ariaLabel": "woond", "ipa": "[wund]" },
      "past-wind": { "ariaLabel": "wownd", "ipa": "[waʊnd]" }
    }
  }
}
```

## Implementation Pattern

### Basic Report Structure

```jsx
import ReadAloud from '@/components/ReadAloud'
import Citation from '@/components/Citation'
import PaperRef from '@/components/PaperRef'
import Term from '@/components/Term'
import Word from '@/components/Word'

export default function ReportContent() {
  return (
    <>
      {/* Read Aloud Controls */}
      <div className="mb-8">
        <ReadAloud contentId="report-content" />
      </div>

      {/* Wrap content in container with ID */}
      <div id="report-content">
        <section className="mb-12">
          <h2>Section Title</h2>
          <p>
            The <Term>Urantia</Term> Book describes <Term>Jerusem</Term>
            as the capital of <Term>Satania</Term><Citation num={1} />.
          </p>
          <p>
            See <PaperRef>46:0.1</PaperRef> for details.
          </p>
          <p>
            The <Word homograph="wound" meaning="injury">wound</Word> healed.
          </p>
        </section>

        {/* Citation block at end */}
        <div className="mt-8">
          <strong>CITATIONS:</strong>
          <Citation num={1} /><PaperRef short>46:0.1</PaperRef>
        </div>
      </div>
    </>
  )
}
```

## Browser Compatibility

**Supported:**
- Chrome/Edge (excellent)
- Safari (good)
- Firefox (good)

**Not Supported:**
- Internet Explorer
- Older mobile browsers

## Future ElevenLabs Integration

The ReadAloud component is designed to easily swap audio sources:

```jsx
// Future enhancement
const [audioSource, setAudioSource] = useState('browser'); // or 'elevenlabs'

if (audioSource === 'elevenlabs' && elevenlabsUrl) {
  return <audio src={elevenlabsUrl} controls />
} else {
  // Current browser TTS implementation
}
```

## Testing TTS Quality

1. Start dev server: `npm run dev`
2. Navigate to report with ReadAloud component
3. Click "Play" button
4. Listen for:
   - Proper term pronunciation (Urantia, Jerusem, etc.)
   - Natural citation reading (not "squared", "cubed")
   - Paper reference clarity
   - Homograph accuracy

## Adding New Terms

Edit `data/pronunciation-guide.json`:

```json
{
  "terms": {
    "NewTerm": {
      "pronunciation": "phonetic spelling",
      "ipa": "[IPA notation]",
      "ariaLabel": "what TTS should say"
    }
  }
}
```

Reference: `docs/Term-and-Pronunciation-List-for-The-Urantia-Book-2023-en.pdf`

## Common Issues

### TTS Not Working
- Check browser support (Web Speech API)
- Verify `speechSynthesis` is available in console
- Try different browsers

### Wrong Pronunciation
- Add/update term in pronunciation dictionary
- Use `aria` prop to override: `<Term aria="custom">Word</Term>`

### Citations Reading Wrong
- Ensure using `<Citation num={X} />` component
- Not plain superscript HTML

### Paper References Awkward
- Use `<PaperRef>` component instead of plain text
- Try `short` prop for citation blocks

## Maintenance

**Regular tasks:**
1. Add new terminology as reports are written
2. Update pronunciation dictionary from community feedback
3. Test TTS quality with each new report
4. Monitor browser API changes

## Performance

- TTS processing is client-side (no server load)
- Dictionary JSON is ~5KB
- Components add negligible bundle size
- No external API calls (for browser TTS)

## Accessibility Standards

Complies with:
- WCAG 2.1 Level AA
- ARIA 1.2 specifications
- Screen reader compatibility
- Keyboard navigation support
