// Find correct citations for our quotes in the UB database
// Usage: node scripts/find-correct-citations.js

const fs = require('fs').promises;

async function main() {
  // Load UB database
  const ubData = JSON.parse(await fs.readFile('public/data/ub-database.json', 'utf8'));

  // Load our quotes
  const quotes = JSON.parse(await fs.readFile('scripts/sample-quotes.json', 'utf8'));

  console.log('\n🔍 Finding Correct Citations in UB Database\n');

  // Create text index for searching
  const textIndex = [];
  for (const paper of ubData.papers) {
    for (const para of paper.paragraphs) {
      textIndex.push({
        citation: para.citation,
        text: para.text.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim(),
        paper: paper.title,
        section: paper.sections.find(s => s.number === para.section)?.title || 'Unknown'
      });
    }
  }

  // Find each quote
  for (const quote of quotes) {
    if (!quote.text || !quote.citation) continue;

    console.log(`\n📌 Quote: ${quote.id}`);
    console.log(`   Current citation: ${quote.citation}`);
    console.log(`   Text: "${quote.text.substring(0, 60)}..."`);

    const quoteText = quote.text.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();

    // Search for exact or partial match
    let found = null;
    let bestMatch = null;
    let bestScore = 0;

    for (const para of textIndex) {
      // Exact match
      if (para.text === quoteText) {
        found = para;
        break;
      }

      // Partial match (quote is excerpt from paragraph)
      if (para.text.includes(quoteText)) {
        const score = quoteText.length / para.text.length;
        if (score > bestScore) {
          bestScore = score;
          bestMatch = para;
        }
      }

      // Check if quote starts with paragraph start
      if (para.text.startsWith(quoteText.substring(0, Math.min(50, quoteText.length)))) {
        const score = 0.8;
        if (score > bestScore) {
          bestScore = score;
          bestMatch = para;
        }
      }
    }

    if (found) {
      console.log(`   ✓ EXACT MATCH found: ${found.citation}`);
      console.log(`   Paper: ${found.paper}`);
      console.log(`   Section: ${found.section}`);
    } else if (bestMatch) {
      console.log(`   ~ PARTIAL MATCH found: ${bestMatch.citation}`);
      console.log(`   Paper: ${bestMatch.paper}`);
      console.log(`   Section: ${bestMatch.section}`);
      console.log(`   Match quality: ${(bestScore * 100).toFixed(0)}%`);
      console.log(`   UB text: "${bestMatch.text.substring(0, 80)}..."`);
    } else {
      console.log(`   ✗ NO MATCH FOUND - Quote may be composite or paraphrased`);
    }
  }

  console.log('\n');
}

main().catch(console.error);
