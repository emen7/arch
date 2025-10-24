const mammoth = require('mammoth');
const fs = require('fs');
const path = require('path');

// Track image counter for unique filenames
let imageCounter = 0;

async function processLectionaryDoc(filePath, slug) {
  console.log(`\nProcessing: ${path.basename(filePath)}`);

  const buffer = fs.readFileSync(filePath);

  // Extract with images
  const result = await mammoth.convertToHtml({
    buffer,
    convertImage: mammoth.images.imgElement(function(image) {
      return image.read("base64").then(function(imageBuffer) {
        imageCounter++;
        const extension = image.contentType.split('/')[1];
        const filename = `${slug}-${imageCounter}.${extension}`;
        const imagePath = path.join(process.cwd(), 'public/lectionary/images', filename);

        fs.writeFileSync(imagePath, imageBuffer, 'base64');

        return {
          src: `/lectionary/images/${filename}`
        };
      });
    })
  });

  const html = result.value;
  const paragraphs = html.split(/<\/p>/).map(p => p.trim()).filter(p => p);

  // Initialize lectionary object
  const lectionary = {
    slug,
    title: '',
    date: '',
    theme: '',
    year: 'C', // Extract from filename if needed
    heroImage: null,
    sections: []
  };

  let currentSection = null;
  let currentSubsection = 'content'; // 'content' or 'reflection'

  for (let i = 0; i < paragraphs.length; i++) {
    let p = paragraphs[i];
    const text = p.replace(/<[^>]+>/g, '').trim();

    // Skip empty
    if (!text) continue;

    // Extract title (first line, has date)
    if (i === 0 && /202\d/.test(text)) {
      const match = text.match(/^([^,]+),\s*(.+\d{4})$/);
      if (match) {
        lectionary.title = match[1].replace(/^C\s*-?\s*/i, '').trim();
        lectionary.date = match[2].trim();
      } else {
        lectionary.title = text;
      }
      continue;
    }

    // Extract theme (second line, before image)
    if (i === 1 && !p.includes('<img') && text.length < 100) {
      lectionary.theme = text;
      continue;
    }

    // Extract hero image
    if (p.includes('<img') && !lectionary.heroImage) {
      const srcMatch = p.match(/src="([^"]+)"/);
      if (srcMatch) {
        lectionary.heroImage = {
          src: srcMatch[1],
          caption: ''
        };

        // Next paragraph might be caption
        if (i + 1 < paragraphs.length) {
          const nextText = paragraphs[i + 1].replace(/<[^>]+>/g, '').trim();
          if (nextText && !nextText.startsWith('Reading') && !nextText.startsWith('Introductory')) {
            lectionary.heroImage.caption = nextText;
            i++; // Skip next paragraph
          }
        }
      }
      continue;
    }

    // Detect section headers
    const isIntroReflection = /^(Introductory|Initial)\s+Reflection/i.test(text);
    const isReading1 = /^Reading\s+1\s*[-–]/i.test(text);
    const isPsalm = /^Responsorial\s+Psalm/i.test(text);
    const isReading2 = /^Reading\s+2\s*[-–]/i.test(text);
    const isAlleluia = /^Alleluia\s*[-–]/i.test(text);
    const isGospel = /^Gospel\s*[-–]/i.test(text);
    const isReflection = /^Reflection\s*[-–]/i.test(text) && !isIntroReflection;
    const isReplaced = /^Replaced/i.test(text);

    if (isIntroReflection) {
      currentSection = {
        type: 'intro-reflection',
        heading: text,
        content: []
      };
      lectionary.sections.push(currentSection);
      currentSubsection = 'content';
      continue;
    }

    if (isReading1) {
      currentSection = {
        type: 'first-reading',
        heading: 'First Reading',
        citation: text.replace(/^Reading\s+1\s*[-–]\s*/i, '').trim(),
        content: [],
        reflection: null
      };
      lectionary.sections.push(currentSection);
      currentSubsection = 'content';
      continue;
    }

    if (isPsalm) {
      currentSection = {
        type: 'psalm',
        heading: 'Responsorial Psalm',
        citation: text.replace(/^Responsorial\s+Psalm\s*[-–]?\s*/i, '').trim(),
        response: '',
        verses: [],
        reflection: null
      };
      lectionary.sections.push(currentSection);
      currentSubsection = 'content';
      continue;
    }

    if (isReading2) {
      currentSection = {
        type: 'second-reading',
        heading: 'Second Reading',
        citation: text.replace(/^Reading\s+2\s*[-–]\s*/i, '').trim(),
        content: [],
        reflection: null
      };
      lectionary.sections.push(currentSection);
      currentSubsection = 'content';
      continue;
    }

    if (isAlleluia) {
      currentSection = {
        type: 'alleluia',
        heading: 'Alleluia',
        citation: text.replace(/^Alleluia\s*[-–]?\s*/i, '').trim(),
        content: []
      };
      lectionary.sections.push(currentSection);
      currentSubsection = 'content';
      continue;
    }

    if (isGospel) {
      currentSection = {
        type: 'gospel',
        heading: 'Gospel',
        citation: text.replace(/^Gospel\s*[-–]\s*/i, '').trim(),
        content: [],
        reflection: null
      };
      lectionary.sections.push(currentSection);
      currentSubsection = 'content';
      continue;
    }

    if (isReflection) {
      if (currentSection) {
        currentSubsection = 'reflection';
      }
      continue;
    }

    // Skip "Replaced" sections
    if (isReplaced) {
      currentSection = null;
      continue;
    }

    // Add content to current section
    if (currentSection) {
      // Clean up paragraph tags
      const cleanP = '<p>' + p.replace(/^<p[^>]*>/, '');

      if (currentSection.type === 'psalm') {
        // Detect response line
        if (text.startsWith('R.')) {
          if (!currentSection.response) {
            currentSection.response = text.replace(/^R\.\s*/, '').trim();
          }
          currentSection.verses.push(cleanP);
        } else if (currentSubsection === 'reflection') {
          if (!currentSection.reflection) currentSection.reflection = '';
          currentSection.reflection += cleanP;
        } else {
          currentSection.verses.push(cleanP);
        }
      } else {
        if (currentSubsection === 'reflection') {
          if (!currentSection.reflection) currentSection.reflection = '';
          currentSection.reflection += cleanP;
        } else {
          currentSection.content.push(cleanP);
        }
      }
    }
  }

  return lectionary;
}

async function processAllLectionaries() {
  const dataDir = path.join(process.cwd(), 'public/lectionary/data');
  const imagesDir = path.join(process.cwd(), 'public/lectionary/images');

  // Ensure images directory exists
  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
  }

  const files = fs.readdirSync(dataDir)
    .filter(f => f.endsWith('.docx'))
    .sort(); // Process in order

  const index = [];

  for (const file of files) {
    imageCounter = 0; // Reset for each file

    const filePath = path.join(dataDir, file);

    // Generate slug from filename
    const slug = file
      .replace(/\.docx$/i, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');

    try {
      const lectionary = await processLectionaryDoc(filePath, slug);

      // Save JSON
      const jsonPath = path.join(dataDir, `${slug}.json`);
      fs.writeFileSync(jsonPath, JSON.stringify(lectionary, null, 2));
      console.log(`  ✓ Created: ${slug}.json`);

      // Add to index
      index.push({
        slug: lectionary.slug,
        title: lectionary.title,
        date: lectionary.date,
        theme: lectionary.theme,
        year: lectionary.year,
        heroImage: lectionary.heroImage ? lectionary.heroImage.src : null
      });

    } catch (error) {
      console.error(`  ✗ Error processing ${file}:`, error.message);
    }
  }

  // Save index
  const indexPath = path.join(dataDir, 'index.json');
  fs.writeFileSync(indexPath, JSON.stringify(index, null, 2));
  console.log(`\n✓ Created index.json with ${index.length} entries`);
}

processAllLectionaries().catch(console.error);
