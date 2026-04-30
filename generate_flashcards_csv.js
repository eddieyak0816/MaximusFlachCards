// Run with: node generate_flashcards_csv.js
const fs = require('fs');
const path = require('path');

const text = fs.readFileSync(path.join(__dirname, 'Gemini Prompt.md'), 'utf8');
const lines = text.split('\n');

const cards = [];
let i = 0;

while (i < lines.length) {
    const line = lines[i].trim();
    const match = line.match(/^Flashcard\s+\d+$/);
    if (match) {
        // Collect front: one non-empty line after "Flashcard N"
        let j = i + 1;
        while (j < lines.length && lines[j].trim() === '') j++;
        const front = (j < lines.length) ? lines[j].trim() : '';
        j++;

        // Skip blank lines between front and back
        while (j < lines.length && lines[j].trim() === '') j++;

        // Collect back: lines until we hit a blank line OR another Flashcard heading
        const backLines = [];
        while (j < lines.length) {
            const l = lines[j].trim();
            if (l === '') break; // stop at first blank line after content starts
            if (/^Flashcard\s+\d+$/.test(l)) break;
            backLines.push(l);
            j++;
        }
        const back = backLines.join(' ').replace(/\s+/g, ' ').trim();

        // Only include cards with a real question (front ends with ?)
        if (front && back && front.includes('?')) {
            cards.push({ front, back });
        }
        i = j;
    } else {
        i++;
    }
}

// Deduplicate by front text (keep last occurrence, which is the final version)
const seen = new Map();
for (const c of cards) {
    seen.set(c.front.toLowerCase(), c);
}
const deduped = Array.from(seen.values());

const esc = v => '"' + String(v || '').replace(/"/g, '""') + '"';
const csv = ['front,back,category']
    .concat(deduped.map(c => `${esc(c.front)},${esc(c.back)},GED Study`))
    .join('\n');

fs.writeFileSync(path.join(__dirname, 'flashcards.csv'), csv, 'utf8');
console.log(`Done. Exported ${deduped.length} flashcards to flashcards.csv`);
