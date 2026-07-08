const fs = require('fs');
const files = [
  'chapters/ch03/week08/session03-04.html',
  'chapters/ch03/week08/session05-06.html',
  'chapters/ch03/week09/session01-02.html',
  'chapters/ch03/week09/session03-04.html',
  'chapters/ch03/week09/session05-06.html'
];
files.forEach(f => {
  console.log('\n--- ' + f + ' ---');
  let content = fs.readFileSync(f, 'utf8');
  const matches = content.match(/<button class="mcq-slide-btn".*?<\/button>/g);
  if (matches) {
    matches.forEach(m => console.log(m));
  } else {
    console.log('No buttons found.');
  }
});
