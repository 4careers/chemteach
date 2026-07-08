/**
 * PredictionTable — Interactive table for Mendeleev's predictions (Table 3.3).
 * Grand Overhaul Version with burst animation and UI enhancements.
 */
window.PredictionTable = (() => {
  function build(container, config) {
    container.innerHTML = '';
    
    // Inject Custom Styles
    const style = document.createElement('style');
    style.innerHTML = `
      .prediction-container {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 20px;
        width: 100%;
        max-width: 1100px;
        margin: 0 auto;
        padding: 40px;
        background: linear-gradient(135deg, #111, #0a0a0c);
        border-radius: var(--radius-lg);
        border: 1px solid rgba(0, 255, 170, 0.2);
        box-shadow: 0 0 50px rgba(0, 0, 0, 0.8), 0 0 20px rgba(0, 255, 170, 0.1) inset;
        overflow: hidden;
      }
      .dashboard-grid {
        position: absolute;
        inset: 0;
        background-image: 
          linear-gradient(rgba(0, 255, 170, 0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0, 255, 170, 0.03) 1px, transparent 1px);
        background-size: 30px 30px;
        pointer-events: none;
        z-index: 0;
      }
      .prediction-table-wrap {
        position: relative;
        z-index: 1;
        width: 100%;
        overflow-x: auto;
      }
      .prediction-table {
        width: 100%;
        border-collapse: separate;
        border-spacing: 0 8px;
        text-align: center;
        font-size: clamp(14px, 1.4vw, 24px);
      }
      .prediction-table th {
        padding: 20px;
        font-weight: 800;
        letter-spacing: 1px;
        text-transform: uppercase;
      }
      .th-prop { background: rgba(0,0,0,0.5); color: #888; border-bottom: 2px solid #333; }
      .th-pred { background: rgba(255,170,0,0.1); color: #ffaa00; border-bottom: 2px solid #ffaa00; }
      .th-found { background: rgba(0,255,170,0.1); color: #00ffaa; border-bottom: 2px solid #00ffaa; text-shadow: 0 0 10px rgba(0,255,170,0.5); }
      
      .prediction-table td {
        padding: 20px;
        background: rgba(255,255,255,0.03);
      }
      .td-prop { color: #ccc; font-weight: bold; text-align: left; padding-left: 30px !important; }
      .td-pred { color: #ffdd99; font-family: monospace; font-size: 1.1em; }
      .td-found { color: #99ffdd; font-weight: bold; font-family: monospace; font-size: 1.2em; text-shadow: 0 0 10px rgba(0,255,170,0.4); }
      
      .reveal-col {
        opacity: 0;
        transform: translateY(20px) scale(0.95);
        transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      }
      .revealed {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
      
      .reveal-btn {
        position: relative;
        z-index: 1;
        padding: 15px 40px;
        font-size: 20px;
        font-weight: 800;
        letter-spacing: 2px;
        background: linear-gradient(90deg, #00ffaa, #00b377);
        color: #000;
        border: none;
        border-radius: 30px;
        cursor: pointer;
        box-shadow: 0 10px 20px rgba(0,255,170,0.3), 0 0 0 4px rgba(0,255,170,0.1);
        transition: all 0.3s ease;
        overflow: hidden;
      }
      .reveal-btn::after {
        content: '';
        position: absolute;
        top: 0; left: -100%;
        width: 50%; height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent);
        transform: skewX(-20deg);
        animation: shine 3s infinite;
      }
      @keyframes shine {
        100% { left: 200%; }
      }
      .reveal-btn:hover {
        transform: translateY(-3px) scale(1.05);
        box-shadow: 0 15px 25px rgba(0,255,170,0.4), 0 0 0 4px rgba(0,255,170,0.2);
      }
      
      .burst-overlay {
        position: absolute;
        inset: 0;
        background: #00ffaa;
        z-index: 100;
        opacity: 0;
        pointer-events: none;
        mix-blend-mode: overlay;
      }
      .burst-active {
        animation: flashBurst 0.8s ease-out;
      }
      @keyframes flashBurst {
        0% { opacity: 0; transform: scale(0.9); }
        10% { opacity: 0.8; transform: scale(1.05); }
        100% { opacity: 0; transform: scale(1); }
      }

      .match-stamp {
        position: absolute;
        top: 20px;
        right: 20px;
        font-size: 24px;
        font-weight: 900;
        color: #00ffaa;
        border: 4px solid #00ffaa;
        padding: 10px 20px;
        border-radius: 10px;
        transform: rotate(15deg) scale(3);
        opacity: 0;
        pointer-events: none;
        z-index: 10;
        text-shadow: 0 0 20px rgba(0,255,170,0.8);
        box-shadow: 0 0 20px rgba(0,255,170,0.5) inset;
      }
      .stamp-active {
        animation: stampIn 0.6s 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
      }
      @keyframes stampIn {
        100% { opacity: 1; transform: rotate(15deg) scale(1); }
      }
    `;
    container.appendChild(style);

    const wrap = document.createElement('div');
    wrap.className = 'prediction-container';

    const grid = document.createElement('div');
    grid.className = 'dashboard-grid';
    wrap.appendChild(grid);

    const burst = document.createElement('div');
    burst.className = 'burst-overlay';
    wrap.appendChild(burst);

    const stamp = document.createElement('div');
    stamp.className = 'match-stamp';
    stamp.textContent = '100% MATCH';
    wrap.appendChild(stamp);

    const title = document.createElement('h2');
    title.innerHTML = 'Table 3.3: Mendeleev\'s Predictions vs. Reality';
    title.style.margin = '0';
    title.style.color = '#fff';
    title.style.position = 'relative';
    title.style.zIndex = '1';
    title.style.fontSize = 'clamp(20px, 2vw, 36px)';
    title.style.textAlign = 'center';
    
    const subtitle = document.createElement('p');
    subtitle.innerHTML = 'Mendeleev left gaps for undiscovered elements, predicting their properties with stunning accuracy.';
    subtitle.style.margin = '0 0 10px 0';
    subtitle.style.color = '#888';
    subtitle.style.textAlign = 'center';
    subtitle.style.position = 'relative';
    subtitle.style.zIndex = '1';

    const tableWrap = document.createElement('div');
    tableWrap.className = 'prediction-table-wrap';

    const table = document.createElement('table');
    table.className = 'prediction-table';

    const thead = document.createElement('thead');
    thead.innerHTML = `
      <tr>
        <th class="th-prop" style="width: 25%;">Property</th>
        <th class="th-pred" style="width: 18.75%;">Eka-aluminium<br>(predicted)</th>
        <th class="th-found reveal-col" style="width: 18.75%;">Gallium<br>(found)</th>
        <th class="th-pred" style="width: 18.75%;">Eka-silicon<br>(predicted)</th>
        <th class="th-found reveal-col" style="width: 18.75%;">Germanium<br>(found)</th>
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
      tr.innerHTML = `
        <td class="td-prop">${r[0]}</td>
        <td class="td-pred">${r[1]}</td>
        <td class="td-found reveal-col" style="transition-delay: ${i * 0.1}s;">${r[2]}</td>
        <td class="td-pred">${r[3]}</td>
        <td class="td-found reveal-col" style="transition-delay: ${i * 0.1}s;">${r[4]}</td>
      `;
      tbody.appendChild(tr);
    });

    table.appendChild(thead);
    table.appendChild(tbody);
    tableWrap.appendChild(table);

    const btnWrap = document.createElement('div');
    btnWrap.style.position = 'relative';
    btnWrap.style.zIndex = '1';
    btnWrap.style.marginTop = '10px';
    
    const revealBtn = document.createElement('button');
    revealBtn.textContent = 'REVEAL DISCOVERIES';
    revealBtn.className = 'reveal-btn';
    
    let revealed = false;
    revealBtn.onclick = () => {
      if(revealed) return;
      revealed = true;
      
      // Trigger burst
      burst.classList.add('burst-active');
      
      // Trigger stamp
      stamp.classList.add('stamp-active');
      
      // Hide button
      revealBtn.style.opacity = '0';
      revealBtn.style.pointerEvents = 'none';
      setTimeout(() => revealBtn.style.display = 'none', 300);
      
      // Reveal columns
      const cols = table.querySelectorAll('.reveal-col');
      cols.forEach(col => {
        col.classList.add('revealed');
      });
    };
    
    btnWrap.appendChild(revealBtn);

    wrap.appendChild(title);
    wrap.appendChild(subtitle);
    wrap.appendChild(tableWrap);
    wrap.appendChild(btnWrap);
    container.appendChild(wrap);
  }

  return { init: build };
})();
