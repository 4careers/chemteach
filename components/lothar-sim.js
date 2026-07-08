/**
 * LotharSim — Canvas simulation of Lothar Meyer's Atomic Volume Graph.
 * window.LotharSim.init(container, config)
 */
window.LotharSim = (() => {
  const ELEMENTS = [
    { symbol: 'Li', mass: 7.0, vol: 13.1, type: 'alkali' },
    { symbol: 'Be', mass: 9.0, vol: 5.0, type: 'other' },
    { symbol: 'B', mass: 10.8, vol: 4.6, type: 'other' },
    { symbol: 'C', mass: 12.0, vol: 3.4, type: 'other' },
    { symbol: 'N', mass: 14.0, vol: 17.3, type: 'other' },
    { symbol: 'O', mass: 16.0, vol: 14.0, type: 'other' },
    { symbol: 'F', mass: 19.0, vol: 17.1, type: 'halogen' },
    { symbol: 'Na', mass: 23.0, vol: 23.7, type: 'alkali' },
    { symbol: 'Mg', mass: 24.3, vol: 14.0, type: 'alkali-earth' },
    { symbol: 'Al', mass: 27.0, vol: 10.0, type: 'other' },
    { symbol: 'Si', mass: 28.1, vol: 12.1, type: 'other' },
    { symbol: 'P', mass: 31.0, vol: 17.0, type: 'other' },
    { symbol: 'S', mass: 32.1, vol: 15.5, type: 'other' },
    { symbol: 'Cl', mass: 35.5, vol: 22.7, type: 'halogen' },
    { symbol: 'K', mass: 39.1, vol: 45.3, type: 'alkali' },
    { symbol: 'Ca', mass: 40.1, vol: 29.9, type: 'alkali-earth' },
    { symbol: 'Sc', mass: 45.0, vol: 15.0, type: 'transition' },
    { symbol: 'Ti', mass: 47.9, vol: 10.6, type: 'transition' },
    { symbol: 'V', mass: 50.9, vol: 8.4, type: 'transition' },
    { symbol: 'Cr', mass: 52.0, vol: 7.2, type: 'transition' },
    { symbol: 'Mn', mass: 54.9, vol: 7.4, type: 'transition' },
    { symbol: 'Fe', mass: 55.8, vol: 7.1, type: 'transition' },
    { symbol: 'Co', mass: 58.9, vol: 6.7, type: 'transition' },
    { symbol: 'Ni', mass: 58.7, vol: 6.6, type: 'transition' },
    { symbol: 'Cu', mass: 63.5, vol: 7.1, type: 'transition' },
    { symbol: 'Zn', mass: 65.4, vol: 9.1, type: 'transition' },
    { symbol: 'Ga', mass: 69.7, vol: 11.8, type: 'other' },
    { symbol: 'Ge', mass: 72.6, vol: 13.6, type: 'other' },
    { symbol: 'As', mass: 74.9, vol: 13.1, type: 'other' },
    { symbol: 'Se', mass: 79.0, vol: 16.4, type: 'other' },
    { symbol: 'Br', mass: 79.9, vol: 23.5, type: 'halogen' },
    { symbol: 'Rb', mass: 85.5, vol: 55.8, type: 'alkali' },
    { symbol: 'Sr', mass: 87.6, vol: 33.7, type: 'alkali-earth' },
  ];

  function build(container, config) {
    container.innerHTML = '';
    const wrap = document.createElement('div');
    wrap.style.display = 'flex';
    wrap.style.flexDirection = 'column';
    wrap.style.alignItems = 'center';
    wrap.style.gap = '16px';
    wrap.style.width = '100%';

    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 400;
    canvas.style.background = 'var(--color-card)';
    canvas.style.border = '1px solid var(--color-border)';
    canvas.style.borderRadius = 'var(--radius)';
    canvas.style.maxWidth = '100%';
    canvas.style.cursor = 'crosshair';

    const controls = document.createElement('div');
    controls.style.display = 'flex';
    controls.style.gap = '16px';
    controls.style.alignItems = 'center';
    controls.style.flexWrap = 'wrap';
    controls.style.justifyContent = 'center';

    const filters = [
      { id: 'all', label: 'All Elements', color: 'var(--color-accent)' },
      { id: 'alkali', label: 'Highlight Peaks (Alkali Metals)', color: 'var(--color-error)' },
      { id: 'halogen', label: 'Highlight Ascending (Halogens)', color: 'var(--color-success)' },
      { id: 'alkali-earth', label: 'Highlight Descending (Alk. Earth)', color: 'var(--color-warning)' },
      { id: 'transition', label: 'Highlight Valleys (Transition)', color: 'var(--color-secondary)' }
    ];

    let activeFilter = 'all';

    filters.forEach(f => {
      const btn = document.createElement('button');
      btn.textContent = f.label;
      btn.className = 'btn';
      btn.style.background = f.id === 'all' ? f.color : 'transparent';
      btn.style.color = f.id === 'all' ? '#fff' : f.color;
      btn.style.border = `1px solid ${f.color}`;
      btn.style.transition = 'all 0.3s ease';
      
      btn.onclick = () => {
        activeFilter = f.id;
        Array.from(controls.children).forEach((child, i) => {
          if (filters[i]) {
            child.style.background = filters[i].id === activeFilter ? filters[i].color : 'transparent';
            child.style.color = filters[i].id === activeFilter ? '#fff' : filters[i].color;
          }
        });
      };
      controls.appendChild(btn);
    });

    const captionEl = document.createElement('div');
    captionEl.style.color = 'var(--color-text-muted)';
    captionEl.style.fontSize = 'clamp(14px, 1.4vw, 30px)';
    captionEl.style.textAlign = 'center';
    captionEl.textContent = config.caption || "Lothar Meyer's Atomic Volume Curve (1869)";

    wrap.appendChild(canvas);
    wrap.appendChild(controls);
    wrap.appendChild(captionEl);
    container.appendChild(wrap);

    const ctx = canvas.getContext('2d');
    let raf;
    let hoverIndex = -1;
    let time = 0;
    
    // Animation state
    let pointsVisible = 0;

    // Mapping functions
    const padX = 50;
    const padY = 50;
    const graphW = canvas.width - padX * 2;
    const graphH = canvas.height - padY * 2;
    const maxMass = 90;
    const maxVol = 60;

    function getX(mass) { return padX + (mass / maxMass) * graphW; }
    function getY(vol) { return canvas.height - padY - (vol / maxVol) * graphH; }

    canvas.onmousemove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const mx = (e.clientX - rect.left) * (canvas.width / rect.width);
      const my = (e.clientY - rect.top) * (canvas.height / rect.height);
      
      let found = -1;
      for (let i = 0; i < pointsVisible; i++) {
        const el = ELEMENTS[i];
        const ex = getX(el.mass);
        const ey = getY(el.vol);
        const dist = Math.hypot(mx - ex, my - ey);
        if (dist < 15) {
          found = i;
          break;
        }
      }
      hoverIndex = found;
    };
    
    canvas.onmouseleave = () => { hoverIndex = -1; };

    function drawAxes() {
      ctx.strokeStyle = 'var(--color-text-muted)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(padX, padY / 2);
      ctx.lineTo(padX, canvas.height - padY);
      ctx.lineTo(canvas.width - padX / 2, canvas.height - padY);
      ctx.stroke();

      ctx.fillStyle = 'var(--color-text)';
      ctx.font = '14px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Atomic Mass', canvas.width / 2, canvas.height - 15);
      
      ctx.save();
      ctx.translate(15, canvas.height / 2);
      ctx.rotate(-Math.PI / 2);
      ctx.fillText('Atomic Volume', 0, 0);
      ctx.restore();
      
      // Ticks
      ctx.fillStyle = 'var(--color-text-muted)';
      for (let m = 20; m <= 80; m += 20) {
        const x = getX(m);
        ctx.fillRect(x, canvas.height - padY, 2, 5);
        ctx.fillText(m, x, canvas.height - padY + 18);
      }
      for (let v = 20; v <= 60; v += 20) {
        const y = getY(v);
        ctx.fillRect(padX - 5, y, 5, 2);
        ctx.textAlign = 'right';
        ctx.fillText(v, padX - 10, y + 5);
      }
    }

    function drawGraph() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawAxes();

      // Draw lines
      if (pointsVisible > 1) {
        ctx.beginPath();
        ctx.moveTo(getX(ELEMENTS[0].mass), getY(ELEMENTS[0].vol));
        for (let i = 1; i < pointsVisible; i++) {
          ctx.lineTo(getX(ELEMENTS[i].mass), getY(ELEMENTS[i].vol));
        }
        ctx.strokeStyle = 'rgba(37, 99, 255, 0.4)';
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      // Draw points
      for (let i = 0; i < pointsVisible; i++) {
        const el = ELEMENTS[i];
        const x = getX(el.mass);
        const y = getY(el.vol);
        
        const isHover = i === hoverIndex;
        const isHighlighted = activeFilter === el.type;
        const isFaded = activeFilter !== 'all' && !isHighlighted;
        
        ctx.beginPath();
        ctx.arc(x, y, isHover ? 8 : 5, 0, Math.PI * 2);
        
        if (isFaded) {
          ctx.fillStyle = 'rgba(148, 163, 184, 0.2)';
        } else if (isHighlighted) {
          const colorMap = {
            'alkali': 'var(--color-error)',
            'halogen': 'var(--color-success)',
            'alkali-earth': 'var(--color-warning)',
            'transition': 'var(--color-secondary)'
          };
          ctx.fillStyle = colorMap[el.type] || 'var(--color-accent)';
          // Glow
          ctx.shadowColor = ctx.fillStyle;
          ctx.shadowBlur = 10;
        } else {
          ctx.fillStyle = 'var(--color-accent)';
        }
        
        ctx.fill();
        ctx.shadowBlur = 0;

        // Label points that are highlighted or hovered
        if ((isHighlighted || isHover) && !isFaded) {
          ctx.fillStyle = '#fff';
          ctx.font = isHover ? 'bold 14px sans-serif' : '12px sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText(el.symbol, x, y - 10);
        }
      }

      // Draw tooltip
      if (hoverIndex > -1) {
        const el = ELEMENTS[hoverIndex];
        const x = getX(el.mass);
        const y = getY(el.vol);
        
        ctx.fillStyle = 'var(--color-card)';
        ctx.strokeStyle = 'var(--color-border-active)';
        ctx.lineWidth = 1;
        
        const text = `${el.symbol} (Mass: ${el.mass}, Vol: ${el.vol})`;
        const tw = ctx.measureText(text).width;
        
        let tx = x + 15;
        let ty = y - 25;
        if (tx + tw + 20 > canvas.width) tx = x - tw - 25;
        
        ctx.beginPath();
        ctx.roundRect(tx, ty, tw + 20, 24, 4);
        ctx.fill();
        ctx.stroke();
        
        ctx.fillStyle = '#fff';
        ctx.textAlign = 'left';
        ctx.font = '12px sans-serif';
        ctx.fillText(text, tx + 10, ty + 16);
      }
    }

    function step() {
      time++;
      if (time % 2 === 0 && pointsVisible < ELEMENTS.length) {
        pointsVisible++;
      }
    }

    function loop() {
      step();
      drawGraph();
      raf = requestAnimationFrame(loop);
    }

    loop();
    return { destroy: () => cancelAnimationFrame(raf) };
  }

  return { init: build };
})();
