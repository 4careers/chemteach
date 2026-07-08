const fs = require('fs');

const injectMCQs = (filePath, mcqMapping) => {
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
  const slides = html.split('<div class="slide"');
  // First element is up to the first slide (which is <div class="slide active").
  // Actually, wait, the first slide is usually `<div class="slide active" data-type="static">`.
  // Let's use a regex to find component-containers and inject there.
  
  // It's safer to just do a global replace for each mapping based on slide data-type or config.
  for (const mapping of mcqMapping) {
    const { matchString, buttons } = mapping;
    // create the button html
    const btnHtml = `\n  <button class="mcq-slide-btn" onclick='MCQOverlay.open(${JSON.stringify(buttons)})'>MCQs 📝</button>`;
    
    // insert it before the closing </div> of the component-container or title-card
    if (html.includes(matchString)) {
      // Find the position of the match
      const matchPos = html.indexOf(matchString);
      // Find the next component-container or summary-card after this match
      const containerPos = html.indexOf('class="component-container">', matchPos);
      if (containerPos !== -1 && containerPos - matchPos < 300) {
        // inject after <div class="component-container">
        html = html.substring(0, containerPos + 28) + btnHtml + html.substring(containerPos + 28);
      } else {
        const titleCardPos = html.indexOf('class="title-card"', matchPos);
        if (titleCardPos !== -1 && titleCardPos - matchPos < 300) {
            // inject after the </h1> inside the title card
            const h1Pos = html.indexOf('</h1>', titleCardPos);
            if (h1Pos !== -1) {
                html = html.substring(0, h1Pos + 5) + btnHtml + html.substring(h1Pos + 5);
            }
        }
      }
    }
  }

  // 6. Add mcq-block to the last summary static slide
  if (!html.includes('mcq-block')) {
    const summaryCardEnd = html.lastIndexOf('</div>\n</div>\n\n<div class="slide-nav">');
    if (summaryCardEnd !== -1) {
      // Actually find the summary-card closing tag
      const insertionText = `\n    <div class="mcq-block">\n      <strong>NCERT MCQs:</strong><br>\n      Classwork: Embedded within slides\n    </div>`;
      // Find where to insert (before the last closing div of summary-card)
      // Since structure is <div class="summary-card"> ... </div></div>
      const lastSummaryCardPos = html.lastIndexOf('class="summary-card"');
      if (lastSummaryCardPos !== -1) {
        const endOfSummaryCard = html.indexOf('</div>', lastSummaryCardPos + 20); // wait, this might match an inner div.
        // Let's just find "KEY CONCEPTS" and inject at the end of the ul
        const ulEnd = html.indexOf('</ul>', lastSummaryCardPos);
        if (ulEnd !== -1) {
            html = html.substring(0, ulEnd + 5) + insertionText + html.substring(ulEnd + 5);
        } else {
             // For session 3-4 which has custom summary card without ul class="summary-card"
             const customUlEnd = html.lastIndexOf('</ul>');
             if (customUlEnd !== -1) {
                html = html.substring(0, customUlEnd + 5) + insertionText + html.substring(customUlEnd + 5);
             }
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
    matchString: 'visual-explain',
    buttons: [
      { category: 'NCERT Extract (MCQs CORNER)', qNum: 1 },
      { category: 'NCERT Extract (MCQs CORNER)', qNum: 2 },
      { category: 'NCERT Extract (MCQs CORNER)', qNum: 3 }
    ]
  },
  {
    matchString: 'lothar-sim',
    buttons: [
      { category: 'NCERT Extract (MCQs CORNER)', qNum: 5 }
    ]
  },
  {
    matchString: 'mendeleev-1905-table',
    buttons: [
      { category: 'NCERT Extract (MCQs CORNER)', qNum: 6 },
      { category: 'Assertion & Reason Questions', qNum: 1 }
    ]
  }
]);

// ch03_w08_s05-06 mapping
injectMCQs('chapters/ch03/week08/session05-06.html', [
  {
    matchString: 'MODERN PERIODIC LAW',
    buttons: [
      { category: 'NCERT Extract (MCQs CORNER)', qNum: 7 },
      { category: 'Assertion & Reason Questions', qNum: 2 }
    ]
  },
  {
    matchString: 'PRESENT PERIODIC TABLE',
    buttons: [
      { category: 'NCERT Extract (MCQs CORNER)', qNum: 8 },
      { category: 'Assertion & Reason Questions', qNum: 3 }
    ]
  }
]);

// ch03_w09_s01-02 mapping
injectMCQs('chapters/ch03/week09/session01-02.html', [
  {
    matchString: 'NOMENCLATURE',
    buttons: [
      { category: 'NCERT Extract (MCQs CORNER)', qNum: 9 },
      { category: 'NCERT Extract (MCQs CORNER)', qNum: 10 },
      { category: 'Exam Archive', qNum: 9 }
    ]
  },
  {
    matchString: 'ELECTRONIC CONFIGURATION',
    buttons: [
      { category: 'NCERT Extract (MCQs CORNER)', qNum: 11 },
      { category: 'NCERT Extract (MCQs CORNER)', qNum: 14 }
    ]
  }
]);

// ch03_w09_s03-04 mapping
injectMCQs('chapters/ch03/week09/session03-04.html', [
  {
    matchString: 's, p, d, f BLOCKS',
    buttons: [
      { category: 'NCERT Extract (MCQs CORNER)', qNum: 20 },
      { category: 'NCERT Extract (MCQs CORNER)', qNum: 22 }
    ]
  },
  {
    matchString: 'ATOMIC RADIUS',
    buttons: [
      { category: 'NCERT Extract (MCQs CORNER)', qNum: 39 },
      { category: 'NCERT Extract (MCQs CORNER)', qNum: 43 }
    ]
  }
]);

// ch03_w09_s05-06 mapping
injectMCQs('chapters/ch03/week09/session05-06.html', []);
