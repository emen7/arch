const mammoth = require('mammoth');
const fs = require('fs');
const path = require('path');

async function parseLectionaryDoc(filePath) {
  try {
    // Extract raw HTML
    const result = await mammoth.convertToHtml(
      { path: filePath },
      {
        includeDefaultStyleMap: true,
        convertImage: mammoth.images.imgElement(function(image) {
          return image.read("base64").then(function(imageBuffer) {
            return {
              src: "data:" + image.contentType + ";base64," + imageBuffer
            };
          });
        })
      }
    );

    console.log('\n=== HTML OUTPUT ===\n');
    console.log(result.value);

    if (result.messages.length > 0) {
      console.log('\n=== MESSAGES ===\n');
      console.log(result.messages);
    }

    // Also extract as markdown for easier reading
    const mdResult = await mammoth.convertToMarkdown(
      { path: filePath }
    );

    console.log('\n\n=== MARKDOWN OUTPUT ===\n');
    console.log(mdResult.value);

  } catch (error) {
    console.error('Error parsing document:', error);
  }
}

// Parse the first lectionary file
const lectionaryPath = path.join(__dirname, '../public/docs/lect/C30 - The Solemnity of the Most HolyTrinity, June 15, 2025.docx');
parseLectionaryDoc(lectionaryPath);
