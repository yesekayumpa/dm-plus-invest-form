const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'App.jsx');
let text = fs.readFileSync(filePath, 'utf8');

// Fix mojibake: Windows-1252 bytes mis-decoded as Latin-1 then re-encoded as UTF-8
// The pattern: UTF-8 multi-byte sequences that were read as Latin-1 and re-encoded
// This happens when Ã (0xC3) followed by a character forms a UTF-8 sequence

const replacements = [
  // Most common: Ã© = é (e acute)
  [/Ã©/g, '\u00e9'],
  [/Ã¨/g, '\u00e8'],
  [/Ãª/g, '\u00ea'],
  [/Ã«/g, '\u00eb'],
  [/Ã /g, '\u00e0'],
  [/Ã¢/g, '\u00e2'],
  [/Ã®/g, '\u00ee'],
  [/Ã¯/g, '\u00ef'],
  [/Ã´/g, '\u00f4'],
  [/Ã¹/g, '\u00f9'],
  [/Ã»/g, '\u00fb'],
  [/Ã¼/g, '\u00fc'],
  [/Ã§/g, '\u00e7'],
  [/Ã‰/g, '\u00c9'],
  [/Ãˆ/g, '\u00c8'],
  [/Ã€/g, '\u00c0'],
  [/Ã‚/g, '\u00c2'],
  [/Ã/g,  '\u00c0'], // catch remaining lone Ã
  [/â€™/g, '\u2019'],
  [/â€œ/g, '\u201c'],
  [/â€/g,  '\u201d'],
  [/â€"/g, '\u2013'],
];

for (const [pattern, replacement] of replacements) {
  text = text.replace(pattern, replacement);
}

fs.writeFileSync(filePath, text, 'utf8');
console.log('Encoding fixed. File saved.');
