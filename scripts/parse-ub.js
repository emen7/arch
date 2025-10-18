// Parse Urantia Book HTML files and create JSON database
// Usage: node scripts/parse-ub.js

const fs = require('fs').promises;
const path = require('path');

const UB_DIR = 'public/data/urantia-book';
const OUTPUT_FILE = 'public/data/ub-database.json';

async function parseUBHTML(filePath) {
  const html = await fs.readFile(filePath, 'utf8');

  // Extract paper number from filename (e.g., "06-Paper029.html" -> 29)
  const match = filePath.match(/Paper(\d+)\.html/);
  if (!match) return null;

  const paperNum = parseInt(match[1], 10);

  // Extract paper title
  const titleMatch = html.match(/<h1[^>]*>(.*?)<\/h1>/);
  const title = titleMatch ? titleMatch[1].replace(/<[^>]*>/g, '').trim() : '';

  // Extract all paragraphs with IDs like U29_4_13
  const paragraphRegex = /<p id="U(\d+)_(\d+)_(\d+)"[^>]*>.*?<small>(\d+:\d+\.\d+) \([\d.]+\)<\/small> (.*?)<\/p>/gs;

  const paragraphs = [];
  let match2;

  while ((match2 = paragraphRegex.exec(html)) !== null) {
    const [, paper, section, para, citation, content] = match2;

    // Clean content - preserve <em> tags for italics, remove everything else
    let cleanContent = content
      .replace(/<em>/g, '<i>')
      .replace(/<\/em>/g, '</i>')
      .replace(/<[^>]*>/g, '') // Remove all other HTML tags
      .replace(/&nbsp;/g, ' ')
      .replace(/&#160;/g, ' ')
      .replace(/&#60;/g, '<')
      .replace(/&#62;/g, '>')
      .trim();

    paragraphs.push({
      citation,
      paper: parseInt(paper),
      section: parseInt(section),
      paragraph: parseInt(para),
      text: cleanContent
    });
  }

  // Extract section titles
  const sectionRegex = /<h2[^>]*>(.*?)<\/h2>/g;
  const sections = [];
  let sectionMatch;

  while ((sectionMatch = sectionRegex.exec(html)) !== null) {
    const sectionTitle = sectionMatch[1].replace(/<[^>]*>/g, '').trim();
    // Extract section number from title like "4. The Master Physical Controllers"
    const numMatch = sectionTitle.match(/^(\d+)\.\s*(.+)/);
    if (numMatch) {
      sections.push({
        number: parseInt(numMatch[1]),
        title: numMatch[2]
      });
    }
  }

  return {
    paper: paperNum,
    title,
    sections,
    paragraphs
  };
}

async function main() {
  console.log('\n📖 Parsing Urantia Book HTML files...\n');

  // Get all paper files
  const files = await fs.readdir(path.join(__dirname, '..', UB_DIR));
  const paperFiles = files.filter(f => f.match(/^\d+-Paper\d+\.html$/)).sort();

  console.log(`Found ${paperFiles.length} paper files\n`);

  const database = {
    generatedAt: new Date().toISOString(),
    totalPapers: 0,
    totalParagraphs: 0,
    papers: []
  };

  for (const file of paperFiles) {
    const filePath = path.join(__dirname, '..', UB_DIR, file);
    const paper = await parseUBHTML(filePath);

    if (paper) {
      database.papers.push(paper);
      database.totalPapers++;
      database.totalParagraphs += paper.paragraphs.length;
      console.log(`✓ Paper ${paper.paper}: ${paper.title} (${paper.paragraphs.length} paragraphs)`);
    }
  }

  // Sort by paper number
  database.papers.sort((a, b) => a.paper - b.paper);

  // Write to file
  const outputPath = path.join(__dirname, '..', OUTPUT_FILE);
  await fs.writeFile(outputPath, JSON.stringify(database, null, 2));

  console.log(`\n✅ Database created!`);
  console.log(`📁 Output: ${OUTPUT_FILE}`);
  console.log(`📊 Total: ${database.totalPapers} papers, ${database.totalParagraphs} paragraphs\n`);
}

main().catch(console.error);
