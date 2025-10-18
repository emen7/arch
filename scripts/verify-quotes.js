// Verify quotes against UB database
// Usage: node scripts/verify-quotes.js

const fs = require('fs').promises;
const path = require('path');

async function main() {
  // Load UB database
  const ubData = JSON.parse(await fs.readFile('public/data/ub-database.json', 'utf8'));

  // Load quotes
  const quotes = JSON.parse(await fs.readFile('scripts/sample-quotes.json', 'utf8'));

  console.log('\n📖 Verifying Quotes Against UB Database\n');

  // Create lookup index
  const index = {};
  for (const paper of ubData.papers) {
    for (const para of paper.paragraphs) {
      index[para.citation] = {
        text: para.text,
        paper: paper.title,
        section: paper.sections.find(s => s.number === para.section)?.title || 'Unknown Section'
      };
    }
  }

  // Verify each quote
  for (const quote of quotes) {
    if (!quote.citation) {
      console.log(`⊘ ${quote.id}: No citation (narrative text)`);
      continue;
    }

    const ubPara = index[quote.citation];
    if (!ubPara) {
      console.log(`✗ ${quote.id}: Citation ${quote.citation} NOT FOUND in UB`);
      continue;
    }

    // Compare texts (remove HTML tags and normalize whitespace)
    const quoteText = quote.text.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
    const ubText = ubPara.text.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();

    if (quoteText === ubText) {
      console.log(`✓ ${quote.id}: ${quote.citation} - EXACT MATCH`);
    } else if (ubText.includes(quoteText)) {
      console.log(`~ ${quote.id}: ${quote.citation} - PARTIAL (excerpt from paragraph)`);
    } else if (quoteText.includes(ubText)) {
      console.log(`? ${quote.id}: ${quote.citation} - Quote is LONGER than UB paragraph`);
    } else {
      console.log(`✗ ${quote.id}: ${quote.citation} - MISMATCH`);
      console.log(`  Quote: "${quoteText.substring(0, 80)}..."`);
      console.log(`  UB:    "${ubText.substring(0, 80)}..."`);
    }
  }

  console.log('\n');
}

main().catch(console.error);
