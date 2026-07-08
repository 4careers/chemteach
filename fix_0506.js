const fs = require('fs');
let html = fs.readFileSync('chapters/ch03/week08/session05-06.html', 'utf8');

const btn1 = '\n  <button class="mcq-slide-btn" onclick=\'MCQOverlay.open([{"category":"NCERT Extract (MCQs CORNER)","qNum":8},{"category":"Assertion & Reason Questions","qNum":2}])\'>MCQs 📝</button></div>\n</div>';
html = html.replace(/<div class="slide" data-type="moseley-sim".*?<\/div>\n<\/div>/s, (match) => {
  return match.replace(/<\/div>\n<\/div>/, btn1);
});

const btn2 = '\n  <button class="mcq-slide-btn" onclick=\'MCQOverlay.open([{"category":"NCERT Extract (MCQs CORNER)","qNum":7},{"category":"Assertion & Reason Questions","qNum":3}])\'>MCQs 📝</button></div>\n</div>';
html = html.replace(/<div class="slide" data-type="riddle".*?<\/div>\n<\/div>/s, (match) => {
  return match.replace(/<\/div>\n<\/div>/, btn2);
});

fs.writeFileSync('chapters/ch03/week08/session05-06.html', html);
console.log('Injected buttons for 05-06');
