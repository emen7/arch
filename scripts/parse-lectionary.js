const mammoth = require('mammoth');
const fs = require('fs');
const path = require('path');

async function parseLectionaryDoc(filePath) {
  try {
    // Extract as markdown for cleaner view
    const mdResult = await mammoth.convertToMarkdown(
      { path: filePath }
    );

    console.log('\n=== MARKDOWN STRUCTURE ===\n');
    console.log(mdResult.value.substring(0, 2000)); // First 2000 chars
    console.log('\n... (truncated)\n');

    // Also get the full HTML to see structure
    const htmlResult = await mammoth.convertToHtml(
      { path: filePath },
      {
        convertImage: mammoth.images.imgElement(function(image) {
          return image.read("base64").then(function(imageBuffer) {
            // Save image instead of embedding
            const imagePath = path.join(__dirname, '../public/lectionary/images/temp-image.jpg');
            fs.mkdirSync(path.dirname(imagePath), { recursive: true });
            fs.writeFileSync(imagePath, imageBuffer, 'base64');
            return { src: "/lectionary/images/temp-image.jpg" };
          });
        })
      }
    );

    // Extract just the text structure without base64
    const cleanHtml = htmlResult.value.replace(/data:image[^"]+/g, '[IMAGE]');
    console.log('\n=== HTML STRUCTURE (first 1500 chars) ===\n');
    console.log(cleanHtml.substring(0, 1500));

  } catch (error) {
    console.error('Error parsing document:', error);
  }
}

// Parse the first lectionary file
const lectionaryPath = path.join(__dirname, '../public/docs/lect/C30 - The Solemnity of the Most HolyTrinity, June 15, 2025.docx');
console.log('Parsing:', lectionaryPath);
parseLectionaryDoc(lectionaryPath);
