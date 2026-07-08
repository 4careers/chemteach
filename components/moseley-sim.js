/**
 * MoseleySim — Canvas simulation of Moseley's X-Ray Experiment.
 * window.MoseleySim.init(container, config)
 */
window.MoseleySim = (() => {
  const ELEMENTS = [
    { name: 'Aluminum (Al)', z: 13, color: '#A0A0A0' },
    { name: 'Titanium (Ti)', z: 22, color: '#C0C0C0' },
    { name: 'Copper (Cu)', z: 29, color: '#B87333' },
    { name: 'Silver (Ag)', z: 47, color: '#E0E0E0' }
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

    const controls = document.createElement('div');
    controls.style.display = 'flex';
    controls.style.gap = '16px';
    controls.style.alignItems = 'center';
    controls.style.flexWrap = 'wrap';
    controls.style.justifyContent = 'center';

    const select = document.createElement('select');
    select.style.padding = '8px 16px';
    select.style.borderRadius = 'var(--radius-sm)';
    select.style.background = 'var(--color-bg)';
    select.style.color = 'var(--color-text)';
    select.style.border = '1px solid var(--color-border)';
    select.style.fontSize = '16px';

    ELEMENTS.forEach((el, i) => {
      const opt = document.createElement('option');
      opt.value = i;
      opt.textContent = `Target: ${el.name} (Z = ${el.z})`;
      select.appendChild(opt);
    });

    const fireBtn = document.createElement('button');
    fireBtn.textContent = 'FIRE ELECTRONS';
    fireBtn.className = 'btn';
    fireBtn.style.background = 'var(--color-accent)';

    controls.appendChild(select);
    controls.appendChild(fireBtn);

    const captionEl = document.createElement('div');
    captionEl.style.color = 'var(--color-text-muted)';
    captionEl.style.fontSize = 'clamp(14px, 1.4vw, 30px)';
    captionEl.style.textAlign = 'center';
    captionEl.textContent = config.caption || "Moseley's X-Ray Experiment";

    wrap.appendChild(canvas);
    wrap.appendChild(controls);
    wrap.appendChild(captionEl);
    container.appendChild(wrap);

    const ctx = canvas.getContext('2d');
    let raf;
    let state = 'idle'; // idle, firing
    let currentElement = ELEMENTS[0];
    let time = 0;
    let particles = [];
    let waves = [];
    let plottedPoints = [];

    function drawTube() {
      ctx.save();
      // Glass tube
      ctx.strokeStyle = 'rgba(0, 212, 255, 0.3)';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(50, 100);
      ctx.lineTo(350, 100);
      ctx.arcTo(400, 100, 400, 150, 50);
      ctx.lineTo(400, 300);
      ctx.arcTo(400, 350, 350, 350, 50);
      ctx.lineTo(50, 350);
      ctx.arcTo(10, 350, 10, 300, 40);
      ctx.lineTo(10, 150);
      ctx.arcTo(10, 100, 50, 100, 40);
      ctx.stroke();

      // Cathode (left)
      ctx.fillStyle = '#FF3D6E';
      ctx.fillRect(20, 180, 20, 90);
      ctx.fillStyle = '#fff';
      ctx.font = '14px sans-serif';
      ctx.fillText('Cathode', 15, 290);
      ctx.fillText('(-)', 25, 310);

      // Anode target (angled)
      ctx.translate(320, 225);
      ctx.rotate(-Math.PI / 6);
      ctx.fillStyle = currentElement.color;
      ctx.fillRect(-10, -40, 20, 80);
      ctx.fillStyle = '#fff';
      ctx.fillText(currentElement.name, -20, 60);
      ctx.restore();
    }

    function drawGraph() {
      ctx.save();
      ctx.translate(450, 50);
      
      // Axes
      ctx.strokeStyle = 'var(--color-text-muted)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(30, 10);
      ctx.lineTo(30, 280);
      ctx.lineTo(320, 280);
      ctx.stroke();

      ctx.fillStyle = 'var(--color-text)';
      ctx.font = '14px sans-serif';
      ctx.fillText('Atomic Number (Z)', 120, 310);
      
      ctx.save();
      ctx.translate(10, 180);
      ctx.rotate(-Math.PI / 2);
      ctx.fillText('√ν (Frequency)', 0, 0);
      ctx.restore();

      // Ticks
      ctx.fillStyle = 'var(--color-text-muted)';
      for (let z = 10; z <= 50; z += 10) {
        const x = 30 + ((z - 10) / 40) * 270;
        ctx.fillRect(x, 280, 2, 5);
        ctx.fillText(z, x - 10, 295);
      }

      // Plotted points
      ctx.fillStyle = 'var(--color-secondary)';
      plottedPoints.forEach(p => {
        const x = 30 + ((p.z - 10) / 40) * 270;
        // z-1 approx sqrt(v)
        const y = 280 - ((p.z - 1) / 50) * 250;
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillText(p.name.split(' ')[0], x + 10, y - 5);
      });
      
      // Draw trend line if > 1 point
      if (plottedPoints.length > 1) {
        ctx.strokeStyle = 'rgba(0, 212, 255, 0.5)';
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        const first = plottedPoints[0];
        const last = plottedPoints[plottedPoints.length - 1];
        const x1 = 30 + ((first.z - 10) / 40) * 270;
        const y1 = 280 - ((first.z - 1) / 50) * 250;
        const x2 = 30 + ((last.z - 10) / 40) * 270;
        const y2 = 280 - ((last.z - 1) / 50) * 250;
        
        const slope = (y2 - y1) / (x2 - x1);
        const startX = 30 + ((1 - 10) / 40) * 270;
        const startY = y1 - slope * (x1 - startX);
        
        ctx.moveTo(startX, startY);
        ctx.lineTo(x2 + 50, y2 + slope * 50);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      ctx.restore();
    }

    function step() {
      time++;
      if (state === 'firing') {
        if (time % 2 === 0) {
          particles.push({
            x: 45, y: 200 + Math.random() * 50,
            vx: 15 + Math.random() * 5
          });
        }
        
        if (time > 60 && time % 10 === 0) {
          waves.push({
            r: 0,
            maxR: 150,
            x: 310,
            y: 225,
            z: currentElement.z
          });
        }

        if (time > 120) {
          state = 'idle';
          if (!plottedPoints.find(p => p.z === currentElement.z)) {
            plottedPoints.push(currentElement);
            plottedPoints.sort((a, b) => a.z - b.z);
          }
        }
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        if (p.x > 300) {
          particles.splice(i, 1); // Hit anode
        }
      }

      for (let i = waves.length - 1; i >= 0; i--) {
        const w = waves[i];
        w.r += 4;
        if (w.r > w.maxR) {
          waves.splice(i, 1);
        }
      }
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawTube();
      drawGraph();

      // Draw particles
      ctx.fillStyle = 'var(--color-error)';
      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fill();
        // trail
        ctx.fillStyle = 'rgba(255, 61, 110, 0.4)';
        ctx.fillRect(p.x - 10, p.y - 1, 10, 2);
        ctx.fillStyle = 'var(--color-error)';
      });

      // Draw waves
      ctx.lineWidth = 2;
      waves.forEach(w => {
        ctx.strokeStyle = `rgba(179, 71, 255, ${1 - w.r / w.maxR})`;
        ctx.beginPath();
        const freq = Math.floor(w.z / 10); 
        for (let j = 0; j <= freq; j++) {
            ctx.arc(w.x, w.y, w.r + j * (150 / w.z), 0.7 * Math.PI, 1.3 * Math.PI, true);
            ctx.stroke();
            ctx.beginPath();
        }
      });
    }

    function loop() {
      step();
      draw();
      raf = requestAnimationFrame(loop);
    }

    fireBtn.onclick = () => {
      if (state === 'idle') {
        state = 'firing';
        time = 0;
      }
    };

    select.onchange = (e) => {
      currentElement = ELEMENTS[e.target.value];
    };

    loop();
    return { destroy: () => cancelAnimationFrame(raf) };
  }

  return { init: build };
})();
