/**
 * MendeleevTable — Interactive recreation of Mendeleev's 1905 Periodic Table (Fig 3.1).
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
    
    const wrap = document.createElement('div');
    wrap.style.display = 'flex';
    wrap.style.flexDirection = 'column';
    wrap.style.alignItems = 'center';
    wrap.style.gap = '20px';
    wrap.style.width = '100%';
    wrap.style.maxWidth = '1200px';
    wrap.style.margin = '0 auto';
    wrap.style.padding = '30px';
    wrap.style.background = 'var(--color-card)';
    wrap.style.borderRadius = 'var(--radius-lg)';
    wrap.style.border = '1px solid var(--color-border)';
    wrap.style.boxShadow = 'var(--shadow-glow)';

    const title = document.createElement('h2');
    title.innerHTML = "Mendeleev's Periodic Table (1905 Version)";
    title.style.margin = '0';
    title.style.color = 'var(--color-accent)';
    title.style.textAlign = 'center';

    // Controls
    const controls = document.createElement('div');
    controls.style.display = 'flex';
    controls.style.gap = '15px';
    
    const btnInversion = document.createElement('button');
    btnInversion.className = 'btn';
    btnInversion.textContent = '🔍 Highlight Tellurium/Iodine Inversion';
    btnInversion.style.background = 'transparent';
    btnInversion.style.border = '1px solid #ff3366';
    btnInversion.style.color = '#ff3366';
    btnInversion.style.padding = '8px 16px';
    btnInversion.style.borderRadius = '6px';
    btnInversion.style.cursor = 'pointer';

    const btnGaps = document.createElement('button');
    btnGaps.className = 'btn';
    btnGaps.textContent = '🔍 Highlight Eka-Al & Eka-Si (Gaps)';
    btnGaps.style.background = 'transparent';
    btnGaps.style.border = '1px solid #00ffaa';
    btnGaps.style.color = '#00ffaa';
    btnGaps.style.padding = '8px 16px';
    btnGaps.style.borderRadius = '6px';
    btnGaps.style.cursor = 'pointer';

    controls.appendChild(btnInversion);
    controls.appendChild(btnGaps);

    const tableWrap = document.createElement('div');
    tableWrap.style.width = '100%';
    tableWrap.style.overflowX = 'auto';

    const table = document.createElement('table');
    table.style.width = '100%';
    table.style.borderCollapse = 'collapse';
    table.style.textAlign = 'center';
    table.style.fontSize = '12px';
    table.style.background = 'rgba(0,0,0,0.2)';

    const thead = document.createElement('thead');
    let trHead = document.createElement('tr');
    trHead.innerHTML = '<th style="border:1px solid #555; padding:8px; background:#222;">SERIES</th>';
    groups.forEach(g => {
      trHead.innerHTML += `<th style="border:1px solid #555; padding:8px; background:#222;">Group ${g}</th>`;
    });
    thead.appendChild(trHead);
    table.appendChild(thead);

    const tbody = document.createElement('tbody');
    
    for (let s = 1; s <= 7; s++) {
      let tr = document.createElement('tr');
      tr.innerHTML = `<th style="border:1px solid #555; padding:8px; background:#222;">${s}</th>`;
      
      groups.forEach(g => {
        const item = tableData.find(d => d.series === s && d.group === g);
        let td = document.createElement('td');
        td.style.border = '1px solid #555';
        td.style.padding = '8px';
        td.style.height = '60px';
        td.style.verticalAlign = 'top';
        td.style.position = 'relative';
        
        if (item) {
          if (item.highlight) {
            td.classList.add(`hl-${item.highlight}`);
          }
          td.innerHTML = `
            <div style="font-size:16px; font-weight:bold;">${item.symbol}</div>
            <div style="font-size:11px; color:#aaa;">${item.mass}</div>
          `;
        } else {
          td.innerHTML = `<span style="color:#444;">-</span>`;
        }
        tr.appendChild(td);
      });
      tbody.appendChild(tr);
    }
    
    table.appendChild(tbody);
    tableWrap.appendChild(table);

    // Explainer box
    const explainer = document.createElement('div');
    explainer.style.minHeight = '60px';
    explainer.style.padding = '15px';
    explainer.style.background = 'rgba(255,255,255,0.05)';
    explainer.style.borderRadius = '8px';
    explainer.style.textAlign = 'center';
    explainer.style.color = '#ccc';
    explainer.style.fontStyle = 'italic';
    explainer.style.width = '100%';
    explainer.innerHTML = 'Interact with the table or use the buttons above to highlight key historical insights.';

    // Interaction Logic
    btnInversion.onclick = () => {
      resetHighlights();
      btnInversion.style.background = '#ff3366';
      btnInversion.style.color = '#fff';
      const targets = table.querySelectorAll('.hl-inversion');
      targets.forEach(t => {
        t.style.background = 'rgba(255,51,102,0.3)';
        t.style.boxShadow = '0 0 15px rgba(255,51,102,0.8) inset';
        t.style.border = '2px solid #ff3366';
      });
      explainer.innerHTML = '<strong style="color:#ff3366">The Te/I Inversion:</strong> Mendeleev placed Tellurium (127.6) before Iodine (126.9). He ignored strict atomic weight order because Iodine clearly belonged with the Halogens (F, Cl, Br) based on chemical properties!';
    };

    btnGaps.onclick = () => {
      resetHighlights();
      btnGaps.style.background = '#00ffaa';
      btnGaps.style.color = '#000';
      const targets = table.querySelectorAll('.hl-gap');
      targets.forEach(t => {
        t.style.background = 'rgba(0,255,170,0.3)';
        t.style.boxShadow = '0 0 15px rgba(0,255,170,0.8) inset';
        t.style.border = '2px solid #00ffaa';
      });
      explainer.innerHTML = '<strong style="color:#00ffaa">The Predictive Gaps:</strong> Here are Gallium and Germanium. In 1869, these spots were completely empty! Mendeleev called them Eka-Aluminium and Eka-Silicon, predicting they would eventually be discovered.';
    };

    function resetHighlights() {
      btnInversion.style.background = 'transparent';
      btnInversion.style.color = '#ff3366';
      btnGaps.style.background = 'transparent';
      btnGaps.style.color = '#00ffaa';
      const tds = table.querySelectorAll('td');
      tds.forEach(td => {
        td.style.background = 'transparent';
        td.style.boxShadow = 'none';
        td.style.border = '1px solid #555';
      });
      explainer.innerHTML = 'Interact with the table or use the buttons above to highlight key historical insights.';
    }

    wrap.appendChild(title);
    wrap.appendChild(controls);
    wrap.appendChild(tableWrap);
    wrap.appendChild(explainer);
    container.appendChild(wrap);
  }

  return { init: build };
})();
