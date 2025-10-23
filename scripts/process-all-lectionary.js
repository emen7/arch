const mammoth = require('mammoth');
const fs = require('fs');
const path = require('path');

// Output directories
const OUTPUT_DIR = path.join(__dirname, '../public/lectionary');
const IMAGES_DIR = path.join(OUTPUT_DIR, 'images');
const DATA_DIR = path.join(OUTPUT_DIR, 'data');

// Ensure directories exist
fs.mkdirSync(OUTPUT_DIR, { recursive: true });
fs.mkdirSync(IMAGES_DIR, { recursive: true });
fs.mkdirSync(DATA_DIR, { recursive: true });

async function processLectionaryDoc(filePath, slug) {
  console.log(`\nProcessing: ${path.basename(filePath)}`);

  let imageCounter = 0;
  const images = [];

  try {
    // Convert to HTML with image extraction
    const result = await mammoth.convertToHtml(
      { path: filePath },
      {
        convertImage: mammoth.images.imgElement(function(image) {
          return image.read("base64").then(function(imageBuffer) {
            imageCounter++;
            const imageName = `${slug}-${imageCounter}.jpg`;
            const imagePath = path.join(IMAGES_DIR, imageName);

            // Save image
            fs.writeFileSync(imagePath, Buffer.from(imageBuffer, 'base64'));
            images.push(`/lectionary/images/${imageName}`);

            return { src: `/lectionary/images/${imageName}` };
          });
        })
      }
    );

    // Parse the HTML to extract structure
    const html = result.value;

    // Extract title (first bold text)
    const titleMatch = html.match(/<strong>([^<]+)<\/strong>/);
    const title = titleMatch ? titleMatch[1] : '';

    // Parse title to get components
    const titleParts = title.split('–').map(s => s.trim());
    const readingTitle = titleParts[0] || '';
    const dateString = titleParts[1] || '';

    // Extract all paragraphs
    const paragraphs = html.match(/<p>.*?<\/p>/gs) || [];

    // Structure the data
    const lectionary = {
      slug,
      title: readingTitle.replace(/^C\s*-\s*/, ''), // Remove "C -" prefix
      date: dateString,
      heroImage: images[0] || null,
      sections: []
    };

    let currentSection = null;
    let sectionCounter = 0;

    paragraphs.forEach(p => {
      // Clean paragraph
      const text = p.replace(/<\/?p>/g, '').trim();

      if (!text || text.includes('<img')) return; // Skip image paragraphs

      // Check if it's a section header (starts with bold text like "Reading 1" or "Introductory")
      const headerMatch = text.match(/^<strong>([^<]+)<\/strong>/);

      if (headerMatch) {
        const header = headerMatch[1];

        // Start new section
        if (currentSection) {
          lectionary.sections.push(currentSection);
        }

        sectionCounter++;
        currentSection = {
          id: sectionCounter,
          title: header.replace(/[–-].*$/, '').trim(), // Remove everything after dash
          content: []
        };
      } else if (currentSection) {
        // Add to current section
        currentSection.content.push(text);
      }
    });

    // Add last section
    if (currentSection) {
      lectionary.sections.push(currentSection);
    }

    // Save JSON
    const jsonPath = path.join(DATA_DIR, `${slug}.json`);
    fs.writeFileSync(jsonPath, JSON.stringify(lectionary, null, 2));

    console.log(`  ✓ Created: ${slug}.json`);
    console.log(`  ✓ Extracted ${images.length} image(s)`);
    console.log(`  ✓ Found ${lectionary.sections.length} section(s)`);

    return lectionary;

  } catch (error) {
    console.error(`  ✗ Error processing ${slug}:`, error.message);
    return null;
  }
}

function createSlug(filename) {
  // Remove extension and create URL-friendly slug
  return filename
    .replace(/\.docx?$/i, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

async function processAllFiles() {
  const lectDir = path.join(__dirname, '../public/docs/lect');
  const files = fs.readdirSync(lectDir).filter(f => f.match(/\.docx?$/i));

  console.log(`Found ${files.length} lectionary file(s)\n`);

  const allLectionaries = [];

  for (const file of files) {
    const filePath = path.join(lectDir, file);
    const slug = createSlug(file);

    const lectionary = await processLectionaryDoc(filePath, slug);
    if (lectionary) {
      allLectionaries.push({
        slug: lectionary.slug,
        title: lectionary.title,
        date: lectionary.date,
        heroImage: lectionary.heroImage
      });
    }
  }

  // Create index file
  const indexPath = path.join(DATA_DIR, 'index.json');
  fs.writeFileSync(indexPath, JSON.stringify(allLectionaries, null, 2));

  console.log(`\n✓ Created index.json with ${allLectionaries.length} reading(s)`);
  console.log(`\nDone! Lectionary data saved to: ${DATA_DIR}`);
}

// Run the processor
processAllFiles().catch(console.error);
