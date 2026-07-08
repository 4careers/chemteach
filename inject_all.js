const fs = require('fs');

const injectMCQs = (filePath, mcqMapping, mcqText) => {
  if (!fs.existsSync(filePath)) return;
  let html = fs.readFileSync(filePath, 'utf8');

  // 1. Remove the global TAKE QUIZ button from header if present
  html = html.replace(/<button id="btn-quiz".*?<\/button>\s*/, '');

  // 2. Add CSS
  if (!html.includes('mcq-overlay.css')) {
    html = html.replace('</head>', '<link rel="stylesheet" href="../../../assets/mcq-overlay.css?v=13">\n</head>');
  }

  // 3. Add JS scripts just before the closing body tag
  if (!html.includes('mcq-overlay.js')) {
    const scripts = `
<script src="../mcq-data.js?v=13"></script>
<script src="../../../assets/mcq-fx.js?v=13"></script>
<script src="../../../assets/mcq-overlay.js?v=13"></script>
<script>`;
    html = html.replace(/<script>\s*const SESSION_ID/, scripts + '\nconst SESSION_ID');
  }

  // 4. Add keydown block
  if (!html.includes('window.mcqOverlayActive')) {
    html = html.replace("document.addEventListener('keydown', e => {", "document.addEventListener('keydown', e => {\n  if (window.mcqOverlayActive) return;");
  }

  // 5. Inject specific buttons into slides
  for (const mapping of mcqMapping) {
    const { dataType, buttons } = mapping;
    const btnHtml = `\n  <button class="mcq-slide-btn" onclick='MCQOverlay.open(${JSON.stringify(buttons)})'>MCQs 📝</button>`;
    
    // Find <div class="slide" data-type="dataType" ...>
    const slideRegex = new RegExp(`(<div class="slide" data-type="${dataType}".*?>\\s*<div class="component-container">)`);
    if (slideRegex.test(html)) {
      html = html.replace(slideRegex, `$1${btnHtml}`);
    } else {
      // For some cases where component-container doesn't immediately follow
      const altRegex = new RegExp(`(<div class="slide[^>]*data-type="${dataType}"[^>]*>[\\s\\S]*?<div class="component-container">)`);
      if (altRegex.test(html)) {
        html = html.replace(altRegex, `$1${btnHtml}`);
      }
    }
  }

  // 6. Add mcq-block to the last summary static slide
  if (mcqText && !html.includes('mcq-block')) {
    const insertionText = `\n    <div class="mcq-block">\n      <strong>NCERT MCQs:</strong><br>\n      ${mcqText}\n    </div>`;
    // The summary card usually ends with </ul> or </h2>. Let's just insert it before </div>\n</div>\n\n<div class="slide-nav">
    // Actually, safer to insert right after the </ul> inside the summary-card or title-card
    let injected = false;
    // Find the last </ul>
    const ulMatch = [...html.matchAll(/<\/ul>/g)];
    if (ulMatch.length > 0) {
       const lastUl = ulMatch[ulMatch.length - 1];
       html = html.substring(0, lastUl.index + 5) + insertionText + html.substring(lastUl.index + 5);
       injected = true;
    }
    
    if (!injected) {
       // fallback: insert before slide-nav
       const navPos = html.indexOf('<div class="slide-nav">');
       if (navPos !== -1) {
           const insertPos = html.lastIndexOf('</div>', navPos - 10);
           if (insertPos !== -1) {
               html = html.substring(0, insertPos) + insertionText + '\n' + html.substring(insertPos);
           }
       }
    }
  }

  fs.writeFileSync(filePath, html);
  console.log('Processed ' + filePath);
};

// ch03_w08_s03-04 mapping
injectMCQs('chapters/ch03/week08/session03-04.html', [
  {
    dataType: 'visual-explain',
    buttons: [
      { category: 'NCERT Extract (MCQs CORNER)', qNum: 1 },
      { category: 'NCERT Extract (MCQs CORNER)', qNum: 2 },
      { category: 'NCERT Extract (MCQs CORNER)', qNum: 3 }
    ]
  },
  {
    dataType: 'lothar-sim',
    buttons: [
      { category: 'NCERT Extract (MCQs CORNER)', qNum: 5 }
    ]
  },
  {
    dataType: 'mendeleev-1905-table',
    buttons: [
      { category: 'NCERT Extract (MCQs CORNER)', qNum: 6 },
      { category: 'Assertion & Reason Questions', qNum: 1 }
    ]
  }
], "Classwork: Embedded within slides");

// ch03_w08_s05-06 mapping
injectMCQs('chapters/ch03/week08/session05-06.html', [
  {
    dataType: 'moseley-sim',
    buttons: [
      { category: 'NCERT Extract (MCQs CORNER)', qNum: 8 },
      { category: 'Assertion & Reason Questions', qNum: 2 }
    ]
  },
  {
    dataType: 'riddle',
    buttons: [
      { category: 'NCERT Extract (MCQs CORNER)', qNum: 7 },
      { category: 'Assertion & Reason Questions', qNum: 3 }
    ]
  }
], "Classwork: Embedded within slides");

// ch03_w09_s01-02 mapping
injectMCQs('chapters/ch03/week09/session01-02.html', [
  {
    dataType: 'iupac-namer',
    buttons: [
      { category: 'NCERT Extract (MCQs CORNER)', qNum: 9 },
      { category: 'NCERT Extract (MCQs CORNER)', qNum: 10 },
      { category: 'Exam Archive', qNum: 9 }
    ]
  },
  {
    dataType: 'infographic',
    buttons: [
      { category: 'NCERT Extract (MCQs CORNER)', qNum: 11 },
      { category: 'NCERT Extract (MCQs CORNER)', qNum: 14 }
    ]
  }
], "Classwork: Embedded within slides");

// ch03_w09_s03-04 mapping
injectMCQs('chapters/ch03/week09/session03-04.html', [
  {
    dataType: 'visual-explain',
    buttons: [
      { category: 'NCERT Extract (MCQs CORNER)', qNum: 20 },
      { category: 'NCERT Extract (MCQs CORNER)', qNum: 22 }
    ]
  },
  {
    dataType: 'analogy',
    buttons: [
      { category: 'NCERT Extract (MCQs CORNER)', qNum: 39 },
      { category: 'NCERT Extract (MCQs CORNER)', qNum: 43 }
    ]
  }
], "Classwork: Embedded within slides");

// ch03_w09_s05-06 mapping
injectMCQs('chapters/ch03/week09/session05-06.html', [], "");
