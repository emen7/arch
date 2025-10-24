const mammoth = require('mammoth');
const fs = require('fs');
const path = require('path');

async function analyzeLectionaryStructure(filePath) {
  console.log(`\nAnalyzing: ${filePath}\n`);

  const buffer = fs.readFileSync(filePath);
  const result = await mammoth.convertToHtml({ buffer });

  const html = result.value;

  // Split into paragraphs
  const paragraphs = html.split(/<\/p>/).filter(p => p.trim());

  console.log('=== SECTION STRUCTURE ===\n');

  paragraphs.forEach((p, idx) => {
    // Clean up the paragraph
    const text = p.replace(/<[^>]+>/g, '').trim();

    // Look for potential section headers (shorter text, contains key words)
    const isBold = p.includes('<strong>');
    const hasKeyword = /Reading|Psalm|Gospel|Alleluia|Reflection|Introductory/i.test(text);

    if (isBold && hasKeyword && text.length < 150) {
      console.log(`[${idx}] SECTION HEADER: ${text}`);
    } else if (text.startsWith('R.')) {
      console.log(`[${idx}] RESPONSE: ${text.substring(0, 80)}...`);
    } else if (/^\d+:\d+\.\d+/.test(text)) {
      console.log(`[${idx}] VERSE (UB citation): ${text.substring(0, 80)}...`);
    } else if (text.length > 0 && text.length < 200) {
      console.log(`[${idx}] ${text.substring(0, 100)}`);
    }
  });

  // Count images
  const imageCount = (html.match(/<img/g) || []).length;
  console.log(`\n=== IMAGE COUNT: ${imageCount} ===`);
}

// Process the most recent files
const files = [
  'C48 - 29th Sunday of Ordinary Time, October 19, 2025.docx',
  'C47 - 28th Sunday in Ordinary Time, October 12, 2025.docx',
  'C46 - 27th Sunday of Ordinary Time, October 5, 2025.docx'
];

(async () => {
  for (const file of files) {
    const filePath = path.join(process.cwd(), 'public/lectionary/data', file);
    if (fs.existsSync(filePath)) {
      await analyzeLectionaryStructure(filePath);
      console.log('\n' + '='.repeat(80) + '\n');
    }
  }
})();
