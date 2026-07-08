/**
 * PredictionTable — Interactive table for Mendeleev's predictions (Table 3.3).
 * window.PredictionTable.init(container, config)
 */
window.PredictionTable = (() => {
  function build(container, config) {
    container.innerHTML = '';
    
    const wrap = document.createElement('div');
    wrap.style.display = 'flex';
    wrap.style.flexDirection = 'column';
    wrap.style.alignItems = 'center';
    wrap.style.gap = '20px';
    wrap.style.width = '100%';
    wrap.style.maxWidth = '1100px';
    wrap.style.margin = '0 auto';
    wrap.style.padding = '30px';
    wrap.style.background = 'var(--color-card)';
    wrap.style.borderRadius = 'var(--radius-lg)';
    wrap.style.border = '1px solid var(--color-border)';
    wrap.style.boxShadow = 'var(--shadow-glow)';

    const title = document.createElement('h2');
    title.innerHTML = 'Table 3.3: Mendeleev\'s Predictions vs. Reality';
    title.style.margin = '0';
    title.style.color = 'var(--color-accent)';
    title.style.fontSize = 'clamp(20px, 2vw, 36px)';
    title.style.textAlign = 'center';
    
    const subtitle = document.createElement('p');
    subtitle.innerHTML = 'Mendeleev left gaps for undiscovered elements, predicting their properties with stunning accuracy.';
    subtitle.style.margin = '0';
    subtitle.style.color = 'var(--color-text-body)';
    subtitle.style.textAlign = 'center';

    const tableWrap = document.createElement('div');
    tableWrap.style.width = '100%';
    tableWrap.style.overflowX = 'auto';

    const table = document.createElement('table');
    table.style.width = '100%';
    table.style.borderCollapse = 'collapse';
    table.style.textAlign = 'center';
    table.style.fontSize = 'clamp(14px, 1.4vw, 24px)';

    const thead = document.createElement('thead');
    thead.innerHTML = `
      <tr>
        <th style="padding: 16px; border: 1px solid var(--color-border); background: rgba(0,0,0,0.3); color: #fff; width: 20%;">Property</th>
        <th style="padding: 16px; border: 1px solid var(--color-border); background: rgba(255,170,0,0.15); color: #ffaa00; width: 20%;">Eka-aluminium<br>(predicted)</th>
        <th class="reveal-col" style="padding: 16px; border: 1px solid var(--color-border); background: rgba(0,255,170,0.15); color: #00ffaa; width: 20%; opacity: 0; transform: translateY(10px); transition: all 0.5s ease;">Gallium<br>(found)</th>
        <th style="padding: 16px; border: 1px solid var(--color-border); background: rgba(255,170,0,0.15); color: #ffaa00; width: 20%;">Eka-silicon<br>(predicted)</th>
        <th class="reveal-col" style="padding: 16px; border: 1px solid var(--color-border); background: rgba(0,255,170,0.15); color: #00ffaa; width: 20%; opacity: 0; transform: translateY(10px); transition: all 0.5s ease;">Germanium<br>(found)</th>
      </tr>
    `;

    const tbody = document.createElement('tbody');
    
    const rows = [
      ['Atomic weight', '68', '70', '72', '72.6'],
      ['Density / (g/cm³)', '5.9', '5.94', '5.5', '5.36'],
      ['Melting point / K', 'Low', '302.93', 'High', '1231'],
      ['Formula of oxide', 'E₂O₃', 'Ga₂O₃', 'EO₂', 'GeO₂'],
      ['Formula of chloride', 'ECl₃', 'GaCl₃', 'ECl₄', 'GeCl₄']
    ];

    rows.forEach((r, i) => {
      const tr = document.createElement('tr');
      tr.style.background = i % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent';
      
      tr.innerHTML = `
        <td style="padding: 16px; border: 1px solid var(--color-border); font-weight: bold; color: #ccc; text-align: left;">${r[0]}</td>
        <td style="padding: 16px; border: 1px solid var(--color-border); color: #ffdd99;">${r[1]}</td>
        <td class="reveal-col" style="padding: 16px; border: 1px solid var(--color-border); color: #99ffdd; font-weight: bold; text-shadow: 0 0 10px rgba(0,255,170,0.5); opacity: 0; transform: translateY(10px); transition: all 0.5s ease ${i * 0.1}s;">${r[2]}</td>
        <td style="padding: 16px; border: 1px solid var(--color-border); color: #ffdd99;">${r[3]}</td>
        <td class="reveal-col" style="padding: 16px; border: 1px solid var(--color-border); color: #99ffdd; font-weight: bold; text-shadow: 0 0 10px rgba(0,255,170,0.5); opacity: 0; transform: translateY(10px); transition: all 0.5s ease ${i * 0.1}s;">${r[4]}</td>
      `;
      tbody.appendChild(tr);
    });

    table.appendChild(thead);
    table.appendChild(tbody);
    tableWrap.appendChild(table);

    const btnWrap = document.createElement('div');
    const revealBtn = document.createElement('button');
    revealBtn.textContent = 'REVEAL DISCOVERIES';
    revealBtn.className = 'action-btn';
    revealBtn.style.padding = '12px 24px';
    revealBtn.style.fontSize = '18px';
    revealBtn.style.fontWeight = 'bold';
    revealBtn.style.background = '#00ffaa';
    revealBtn.style.color = '#000';
    revealBtn.style.border = 'none';
    revealBtn.style.borderRadius = '8px';
    revealBtn.style.cursor = 'pointer';
    revealBtn.style.boxShadow = '0 0 15px rgba(0,255,170,0.4)';
    revealBtn.style.transition = 'all 0.3s ease';
    
    let revealed = false;
    revealBtn.onclick = () => {
      if(revealed) return;
      revealed = true;
      revealBtn.style.opacity = '0';
      revealBtn.style.pointerEvents = 'none';
      const cols = table.querySelectorAll('.reveal-col');
      cols.forEach(col => {
        col.style.opacity = '1';
        col.style.transform = 'translateY(0)';
      });
    };
    
    revealBtn.onmouseover = () => revealBtn.style.transform = 'scale(1.05)';
    revealBtn.onmouseout = () => revealBtn.style.transform = 'scale(1)';

    btnWrap.appendChild(revealBtn);

    wrap.appendChild(title);
    wrap.appendChild(subtitle);
    wrap.appendChild(tableWrap);
    wrap.appendChild(btnWrap);
    container.appendChild(wrap);
  }

  return { init: build };
})();
