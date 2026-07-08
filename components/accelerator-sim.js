/**
 * AcceleratorSim — Canvas simulation of Superheavy Element Synthesis.
 * window.AcceleratorSim.init(container, config)
 */
window.AcceleratorSim = (() => {
  const REACTIONS = [
    { 
      target: { name: 'Americium-243', z: 95, color: '#B347FF' },
      projectile: { name: 'Calcium-48', z: 20, color: '#00D4FF' },
      result: { name: 'Element 115', z: 115, color: '#00E676', IUPAC: 'ununpentium', symbol: 'Uup' }
    },
    { 
      target: { name: 'Californium-249', z: 98, color: '#FFD60A' },
      projectile: { name: 'Calcium-48', z: 20, color: '#00D4FF' },
      result: { name: 'Element 118', z: 118, color: '#FF3D6E', IUPAC: 'ununoctium', symbol: 'Uuo' }
    }
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
    canvas.height = 300;
    canvas.style.background = 'var(--color-bg)';
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

    REACTIONS.forEach((rxn, i) => {
      const opt = document.createElement('option');
      opt.value = i;
      opt.textContent = `Fire ${rxn.projectile.name} at ${rxn.target.name}`;
      select.appendChild(opt);
    });

    const fireBtn = document.createElement('button');
    fireBtn.textContent = 'COLLIDE';
    fireBtn.className = 'btn';
    fireBtn.style.background = 'var(--color-error)';

    controls.appendChild(select);
    controls.appendChild(fireBtn);

    const resultBox = document.createElement('div');
    resultBox.style.marginTop = '16px';
    resultBox.style.padding = '16px';
    resultBox.style.background = 'var(--color-card)';
    resultBox.style.border = '1px solid var(--color-success)';
    resultBox.style.borderRadius = 'var(--radius-sm)';
    resultBox.style.display = 'none';
    resultBox.style.flexDirection = 'column';
    resultBox.style.alignItems = 'center';
    resultBox.style.gap = '12px';

    const resultText = document.createElement('div');
    resultText.style.color = 'var(--color-text)';
    resultText.style.fontSize = '18px';
    resultText.style.fontWeight = 'bold';

    const iupacQuestion = document.createElement('div');
    iupacQuestion.textContent = 'What is the systematic IUPAC name for this element?';
    iupacQuestion.style.color = 'var(--color-text-muted)';
    
    const inputRow = document.createElement('div');
    inputRow.style.display = 'flex';
    inputRow.style.gap = '8px';

    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'e.g. unnilquadium';
    input.style.padding = '8px';
    input.style.borderRadius = 'var(--radius-sm)';
    input.style.border = '1px solid var(--color-border)';
    input.style.background = 'var(--color-bg)';
    input.style.color = 'var(--color-text)';

    const checkBtn = document.createElement('button');
    checkBtn.textContent = 'CHECK';
    checkBtn.className = 'btn';
    checkBtn.style.background = 'var(--color-accent)';

    const feedback = document.createElement('div');
    feedback.style.fontWeight = 'bold';
    feedback.style.marginTop = '8px';

    inputRow.appendChild(input);
    inputRow.appendChild(checkBtn);
    resultBox.appendChild(resultText);
    resultBox.appendChild(iupacQuestion);
    resultBox.appendChild(inputRow);
    resultBox.appendChild(feedback);

    wrap.appendChild(canvas);
    wrap.appendChild(controls);
    wrap.appendChild(resultBox);
    container.appendChild(wrap);

    const ctx = canvas.getContext('2d');
    let raf;
    let state = 'idle'; // idle, firing, fused
    let currentRxn = REACTIONS[0];
    let time = 0;
    
    // Animation state
    let targetX = 600;
    let targetY = 150;
    let projX = 50;
    let projY = 150;
    let flashRadius = 0;

    function drawAtom(x, y, radius, color, label, z) {
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
      
      // glow
      ctx.beginPath();
      ctx.arc(x, y, radius + 10, 0, Math.PI * 2);
      ctx.fillStyle = color + '40'; // 25% opacity
      ctx.fill();

      ctx.fillStyle = '#fff';
      ctx.font = '14px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(label, x, y - radius - 15);
      ctx.fillText(`Z=${z}`, x, y + radius + 25);
    }

    function step() {
      if (state === 'firing') {
        time++;
        // Projectile moves fast, target is stationary
        projX += 15;
        if (projX >= targetX - 20) {
          state = 'fused';
          time = 0;
          projX = targetX;
        }
      } else if (state === 'fused') {
        time++;
        if (time < 30) {
          flashRadius += 20;
        }
        if (time === 30) {
          resultBox.style.display = 'flex';
          resultText.textContent = `Success! Nuclei fused to create Element ${currentRxn.result.z}!`;
          feedback.textContent = '';
          input.value = '';
        }
      }
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (state === 'idle' || state === 'firing') {
        drawAtom(targetX, targetY, 40, currentRxn.target.color, currentRxn.target.name, currentRxn.target.z);
        drawAtom(projX, projY, 20, currentRxn.projectile.color, currentRxn.projectile.name, currentRxn.projectile.z);
      } else if (state === 'fused') {
        // Draw new element
        drawAtom(targetX, targetY, 50, currentRxn.result.color, currentRxn.result.name, currentRxn.result.z);
        
        // Draw flash
        if (time < 30) {
          ctx.beginPath();
          ctx.arc(targetX, targetY, flashRadius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${1 - time / 30})`;
          ctx.fill();
        }
      }
    }

    function loop() {
      step();
      draw();
      raf = requestAnimationFrame(loop);
    }

    fireBtn.onclick = () => {
      if (state === 'idle' || state === 'fused') {
        state = 'firing';
        time = 0;
        projX = 50;
        flashRadius = 0;
        resultBox.style.display = 'none';
      }
    };

    select.onchange = (e) => {
      currentRxn = REACTIONS[e.target.value];
      state = 'idle';
      projX = 50;
      resultBox.style.display = 'none';
    };

    checkBtn.onclick = () => {
      const val = input.value.trim().toLowerCase();
      if (val === currentRxn.result.IUPAC) {
        feedback.textContent = `Correct! Symbol: ${currentRxn.result.symbol}`;
        feedback.style.color = 'var(--color-success)';
      } else {
        feedback.textContent = 'Incorrect. Check IUPAC rules (nil=0, un=1, bi=2, tri=3, quad=4, pent=5, hex=6, sept=7, oct=8, enn=9).';
        feedback.style.color = 'var(--color-error)';
      }
    };

    loop();
    return { destroy: () => cancelAnimationFrame(raf) };
  }

  return { init: build };
})();
