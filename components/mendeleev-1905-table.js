/**
 * MendeleevTable — Interactive recreation of Mendeleev's 1905 Periodic Table (Fig 3.1).
 * Grand Overhaul Version with Crosshairs and Particles.
 */
window.MendeleevTable = (() => {
  const tableData = [
    // Series 1
    { series: 1, group: '0', symbol: 'He', mass: '4.0' },
    { series: 1, group: 'I', symbol: 'H', mass: '1.008' },
    // Series 2
    { series: 2, group: '0', symbol: 'Ne', mass: '19.9' },
    { series: 2, group: 'I', symbol: 'Li', mass: '7.03' },
    { series: 2, group: 'II', symbol: 'Be', mass: '9.1' },
    { series: 2, group: 'III', symbol: 'B', mass: '11.0' },
    { series: 2, group: 'IV', symbol: 'C', mass: '12.0' },
    { series: 2, group: 'V', symbol: 'N', mass: '14.04' },
    { series: 2, group: 'VI', symbol: 'O', mass: '16.00' },
    { series: 2, group: 'VII', symbol: 'F', mass: '19.0' },
    // Series 3
    { series: 3, group: '0', symbol: 'Ar', mass: '38' },
    { series: 3, group: 'I', symbol: 'Na', mass: '23.5' },
    { series: 3, group: 'II', symbol: 'Mg', mass: '24.3' },
    { series: 3, group: 'III', symbol: 'Al', mass: '27.0' },
    { series: 3, group: 'IV', symbol: 'Si', mass: '28.4' },
    { series: 3, group: 'V', symbol: 'P', mass: '31.0' },
    { series: 3, group: 'VI', symbol: 'S', mass: '32.06' },
    { series: 3, group: 'VII', symbol: 'Cl', mass: '35.45' },
    // Series 4
    { series: 4, group: '0', symbol: 'Kr', mass: '81.8' },
    { series: 4, group: 'I', symbol: 'K', mass: '39.1' },
    { series: 4, group: 'II', symbol: 'Ca', mass: '40.1' },
    { series: 4, group: 'III', symbol: 'Sc', mass: '44.1' },
    { series: 4, group: 'IV', symbol: 'Ti', mass: '48.1' },
    { series: 4, group: 'V', symbol: 'V', mass: '51.4' },
    { series: 4, group: 'VI', symbol: 'Cr', mass: '52.1' },
    { series: 4, group: 'VII', symbol: 'Mn', mass: '55.0' },
    { series: 4, group: 'VIII', symbol: 'Fe Co Ni', mass: '55.9 59 59', span: true },
    // Series 5
    { series: 5, group: 'I', symbol: 'Cu', mass: '63.6' },
    { series: 5, group: 'II', symbol: 'Zn', mass: '65.4' },
    { series: 5, group: 'III', symbol: 'Ga', mass: '70.0', highlight: 'gap' },
    { series: 5, group: 'IV', symbol: 'Ge', mass: '72.3', highlight: 'gap' },
    { series: 5, group: 'V', symbol: 'As', mass: '75' },
    { series: 5, group: 'VI', symbol: 'Se', mass: '79' },
    { series: 5, group: 'VII', symbol: 'Br', mass: '79.95' },
    // Series 6
    { series: 6, group: '0', symbol: 'Xe', mass: '128' },
    { series: 6, group: 'I', symbol: 'Rb', mass: '85.4' },
    { series: 6, group: 'II', symbol: 'Sr', mass: '87.6' },
    { series: 6, group: 'III', symbol: 'Y', mass: '89.0' },
    { series: 6, group: 'IV', symbol: 'Zr', mass: '90.6' },
    { series: 6, group: 'V', symbol: 'Nb', mass: '94.0' },
    { series: 6, group: 'VI', symbol: 'Mo', mass: '96.0' },
    { series: 6, group: 'VIII', symbol: 'Ru Rh Pd', mass: '101.7 103 106.5', span: true },
    // Series 7
    { series: 7, group: 'I', symbol: 'Ag', mass: '107.9' },
    { series: 7, group: 'II', symbol: 'Cd', mass: '112.4' },
    { series: 7, group: 'III', symbol: 'In', mass: '114.0' },
    { series: 7, group: 'IV', symbol: 'Sn', mass: '119.0' },
    { series: 7, group: 'V', symbol: 'Sb', mass: '120.0' },
    { series: 7, group: 'VI', symbol: 'Te', mass: '127.6', highlight: 'inversion' },
    { series: 7, group: 'VII', symbol: 'I', mass: '126.9', highlight: 'inversion' }
  ];

  const groups = ['0', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII'];

  function build(container, config) {
    container.innerHTML = '';
    
    // Inject Custom Styles
    const style = document.createElement('style');
    style.innerHTML = `
      .mendeleev-container {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 20px;
        width: 100%;
        max-width: 1200px;
        margin: 0 auto;
        padding: 30px;
        background: radial-gradient(circle at center, #1a1a2a, #0a0a10);
        border-radius: var(--radius-lg);
        border: 1px solid rgba(0, 212, 255, 0.3);
        box-shadow: 0 0 40px rgba(0, 212, 255, 0.1) inset, 0 10px 30px rgba(0,0,0,0.8);
        overflow: hidden;
      }
      .particle-bg {
        position: absolute;
        inset: 0;
        pointer-events: none;
        background-image: 
          radial-gradient(circle at 20% 30%, rgba(0, 212, 255, 0.05) 0%, transparent 50%),
          radial-gradient(circle at 80% 70%, rgba(255, 51, 102, 0.05) 0%, transparent 50%);
        z-index: 0;
      }
      .mendeleev-table-wrap {
        position: relative;
        z-index: 1;
        width: 100%;
        overflow-x: auto;
      }
      .mendeleev-table {
        width: 100%;
        border-collapse: collapse;
        text-align: center;
        font-size: 14px;
        background: rgba(0, 0, 0, 0.4);
        backdrop-filter: blur(10px);
      }
      .mendeleev-table th, .mendeleev-table td {
        border: 1px solid rgba(255, 255, 255, 0.1);
        padding: 10px;
        transition: all 0.3s ease;
      }
      .mendeleev-table th {
        background: rgba(0, 212, 255, 0.1);
        color: #00d4ff;
        font-weight: bold;
        text-shadow: 0 0 10px rgba(0, 212, 255, 0.5);
      }
      .mendeleev-table td {
        height: 65px;
        vertical-align: top;
        position: relative;
        color: #ddd;
        opacity: 0;
        transform: scale(0.9);
        animation: tdFadeIn 0.5s forwards ease-out;
      }
      @keyframes tdFadeIn {
        to { opacity: 1; transform: scale(1); }
      }
      .mendeleev-table td:hover {
        background: rgba(0, 212, 255, 0.2) !important;
        transform: scale(1.05);
        z-index: 10;
        box-shadow: 0 0 20px rgba(0, 212, 255, 0.5);
        border-color: #00d4ff;
      }
      /* Crosshair effect */
      .crosshair-active {
        background: rgba(255, 255, 255, 0.05);
      }
      .hl-inversion-active {
        background: rgba(255, 51, 102, 0.3) !important;
        box-shadow: 0 0 15px rgba(255, 51, 102, 0.8) inset;
        border: 2px solid #ff3366 !important;
        animation: pulseRed 1.5s infinite;
      }
      .hl-gap-active {
        background: rgba(0, 255, 170, 0.3) !important;
        box-shadow: 0 0 15px rgba(0, 255, 170, 0.8) inset;
        border: 2px solid #00ffaa !important;
        animation: pulseGreen 1.5s infinite;
      }
      @keyframes pulseRed {
        0% { box-shadow: 0 0 15px rgba(255,51,102,0.8) inset; }
        50% { box-shadow: 0 0 25px rgba(255,51,102,1) inset; }
        100% { box-shadow: 0 0 15px rgba(255,51,102,0.8) inset; }
      }
      @keyframes pulseGreen {
        0% { box-shadow: 0 0 15px rgba(0,255,170,0.8) inset; }
        50% { box-shadow: 0 0 25px rgba(0,255,170,1) inset; }
        100% { box-shadow: 0 0 15px rgba(0,255,170,0.8) inset; }
      }
    `;
    container.appendChild(style);

    const wrap = document.createElement('div');
    wrap.className = 'mendeleev-container';

    const bg = document.createElement('div');
    bg.className = 'particle-bg';
    wrap.appendChild(bg);

    const title = document.createElement('h2');
    title.innerHTML = "Mendeleev's Periodic Table (1905 Version)";
    title.style.margin = '0';
    title.style.color = '#fff';
    title.style.textShadow = '0 0 10px rgba(255,255,255,0.5)';
    title.style.textAlign = 'center';
    title.style.position = 'relative';
    title.style.zIndex = '1';

    // Controls
    const controls = document.createElement('div');
    controls.style.display = 'flex';
    controls.style.gap = '15px';
    controls.style.position = 'relative';
    controls.style.zIndex = '1';
    
    const btnInversion = document.createElement('button');
    btnInversion.className = 'btn';
    btnInversion.textContent = '🔍 Highlight Tellurium/Iodine Inversion';
    btnInversion.style.background = 'rgba(0,0,0,0.5)';
    btnInversion.style.border = '1px solid #ff3366';
    btnInversion.style.color = '#ff3366';
    btnInversion.style.padding = '10px 20px';
    btnInversion.style.borderRadius = '8px';
    btnInversion.style.cursor = 'pointer';
    btnInversion.style.transition = 'all 0.3s ease';

    const btnGaps = document.createElement('button');
    btnGaps.className = 'btn';
    btnGaps.textContent = '🔍 Highlight Eka-Al & Eka-Si (Gaps)';
    btnGaps.style.background = 'rgba(0,0,0,0.5)';
    btnGaps.style.border = '1px solid #00ffaa';
    btnGaps.style.color = '#00ffaa';
    btnGaps.style.padding = '10px 20px';
    btnGaps.style.borderRadius = '8px';
    btnGaps.style.cursor = 'pointer';
    btnGaps.style.transition = 'all 0.3s ease';

    controls.appendChild(btnInversion);
    controls.appendChild(btnGaps);

    const tableWrap = document.createElement('div');
    tableWrap.className = 'mendeleev-table-wrap';

    const table = document.createElement('table');
    table.className = 'mendeleev-table';

    const thead = document.createElement('thead');
    let trHead = document.createElement('tr');
    trHead.innerHTML = '<th>SERIES</th>';
    groups.forEach(g => {
      trHead.innerHTML += `<th>Group ${g}</th>`;
    });
    thead.appendChild(trHead);
    table.appendChild(thead);

    const tbody = document.createElement('tbody');
    
    let delayCounter = 0;
    for (let s = 1; s <= 7; s++) {
      let tr = document.createElement('tr');
      tr.innerHTML = `<th>${s}</th>`;
      
      groups.forEach((g, colIndex) => {
        const item = tableData.find(d => d.series === s && d.group === g);
        let td = document.createElement('td');
        td.dataset.row = s;
        td.dataset.col = colIndex;
        td.style.animationDelay = `${delayCounter * 0.02}s`;
        delayCounter++;
        
        if (item) {
          if (item.highlight) {
            td.dataset.hl = item.highlight;
          }
          td.innerHTML = `
            <div style="font-size:18px; font-weight:bold; color:#fff;">${item.symbol}</div>
            <div style="font-size:12px; color:#888;">${item.mass}</div>
          `;
        } else {
          td.innerHTML = `<span style="color:#333;">-</span>`;
        }
        tr.appendChild(td);
      });
      tbody.appendChild(tr);
    }
    
    table.appendChild(tbody);
    tableWrap.appendChild(table);

    // Crosshair logic
    table.addEventListener('mouseover', (e) => {
      const td = e.target.closest('td');
      if (!td) return;
      const row = td.dataset.row;
      const col = td.dataset.col;
      
      table.querySelectorAll('td').forEach(cell => {
        if (cell.dataset.row === row || cell.dataset.col === col) {
          cell.classList.add('crosshair-active');
        } else {
          cell.classList.remove('crosshair-active');
        }
      });
    });

    table.addEventListener('mouseleave', () => {
      table.querySelectorAll('td').forEach(cell => {
        cell.classList.remove('crosshair-active');
      });
    });

    // Explainer box
    const explainer = document.createElement('div');
    explainer.style.minHeight = '60px';
    explainer.style.padding = '15px 30px';
    explainer.style.background = 'rgba(0,0,0,0.6)';
    explainer.style.borderRadius = '8px';
    explainer.style.textAlign = 'center';
    explainer.style.color = '#ccc';
    explainer.style.fontStyle = 'italic';
    explainer.style.border = '1px solid rgba(255,255,255,0.1)';
    explainer.style.width = '100%';
    explainer.style.position = 'relative';
    explainer.style.zIndex = '1';
    explainer.innerHTML = 'Hover over the grid to explore, or use the buttons above to highlight key historical insights.';

    // Interaction Logic
    btnInversion.onclick = () => {
      resetHighlights();
      btnInversion.style.background = 'rgba(255,51,102,0.2)';
      btnInversion.style.color = '#fff';
      btnInversion.style.boxShadow = '0 0 15px rgba(255,51,102,0.5)';
      
      const targets = table.querySelectorAll('td[data-hl="inversion"]');
      targets.forEach(t => t.classList.add('hl-inversion-active'));
      
      explainer.innerHTML = '<strong style="color:#ff3366; font-size:18px;">The Te/I Inversion:</strong> Mendeleev placed Tellurium (127.6) before Iodine (126.9). He ignored strict atomic weight order because Iodine clearly belonged with the Halogens (F, Cl, Br) based on chemical properties!';
    };

    btnGaps.onclick = () => {
      resetHighlights();
      btnGaps.style.background = 'rgba(0,255,170,0.2)';
      btnGaps.style.color = '#fff';
      btnGaps.style.boxShadow = '0 0 15px rgba(0,255,170,0.5)';
      
      const targets = table.querySelectorAll('td[data-hl="gap"]');
      targets.forEach(t => t.classList.add('hl-gap-active'));
      
      explainer.innerHTML = '<strong style="color:#00ffaa; font-size:18px;">The Predictive Gaps:</strong> Here are Gallium and Germanium. In 1869, these spots were completely empty! Mendeleev called them Eka-Aluminium and Eka-Silicon, predicting they would eventually be discovered.';
    };

    function resetHighlights() {
      btnInversion.style.background = 'rgba(0,0,0,0.5)';
      btnInversion.style.color = '#ff3366';
      btnInversion.style.boxShadow = 'none';
      btnGaps.style.background = 'rgba(0,0,0,0.5)';
      btnGaps.style.color = '#00ffaa';
      btnGaps.style.boxShadow = 'none';
      
      table.querySelectorAll('td').forEach(td => {
        td.classList.remove('hl-inversion-active', 'hl-gap-active');
      });
      explainer.innerHTML = 'Hover over the grid to explore, or use the buttons above to highlight key historical insights.';
    }

    wrap.appendChild(title);
    wrap.appendChild(controls);
    wrap.appendChild(tableWrap);
    wrap.appendChild(explainer);
    container.appendChild(wrap);
  }

  return { init: build };
})();
