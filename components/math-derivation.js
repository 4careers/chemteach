/**
 * MathDerivation - Step-by-step reveal of mathematical proofs
 * window.MathDerivation.init(container, config)
 * config: { title: "string", steps: [{ text: "html", math: "html" }] }
 */
window.MathDerivation = (() => {
  function build(container, config) {
    container.innerHTML = '';
    
    // Inject some quick CSS for fractions if not exists
    if (!document.getElementById('math-derivation-css')) {
      const style = document.createElement('style');
      style.id = 'math-derivation-css';
      style.textContent = `
        .qd-frac {
          display: inline-flex;
          flex-direction: column;
          align-items: center;
          vertical-align: middle;
          margin: 0 4px;
        }
        .qd-frac > span:first-child {
          border-bottom: 1px solid var(--color-text);
          padding: 0 2px;
        }
        .qd-frac > span:last-child {
          padding: 0 2px;
        }
        .qd-math-row {
          font-family: 'Times New Roman', Times, serif;
          font-size: 1.4rem;
          color: var(--color-text);
          margin: 10px 0;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }
        .qd-math-row sup, .math-step-text sup {
          vertical-align: super;
          font-size: 0.6em;
        }
        .qd-math-row sub, .math-step-text sub {
          vertical-align: sub;
          font-size: 0.6em;
        }
      `;
      document.head.appendChild(style);
    }

    const wrapper = document.createElement('div');
    wrapper.style.display = 'flex';
    wrapper.style.flexDirection = 'column';
    wrapper.style.width = '100%';
    wrapper.style.minHeight = '500px';
    wrapper.style.background = 'var(--color-bg)';
    wrapper.style.border = '2px dashed var(--color-border)';
    wrapper.style.borderRadius = 'var(--radius-lg)';
    wrapper.style.padding = '30px';
    wrapper.style.position = 'relative';

    const header = document.createElement('h3');
    header.textContent = config.title || 'MATHEMATICAL DERIVATION';
    header.style.margin = '0 0 20px 0';
    header.style.color = 'var(--color-accent)';
    header.style.textAlign = 'center';
    header.style.letterSpacing = '2px';
    wrapper.appendChild(header);

    const stepsContainer = document.createElement('div');
    stepsContainer.style.display = 'grid';
    stepsContainer.style.gridTemplateColumns = 'repeat(auto-fit, minmax(350px, 1fr))';
    stepsContainer.style.gap = '30px';
    stepsContainer.style.flexGrow = '1';
    wrapper.appendChild(stepsContainer);

    const steps = config.steps || [];
    const stepEls = [];

    steps.forEach((step, idx) => {
      const stepBox = document.createElement('div');
      stepBox.style.display = 'flex';
      stepBox.style.flexDirection = 'column';
      stepBox.style.alignItems = 'center';
      stepBox.style.justifyContent = 'center';
      stepBox.style.padding = '20px';
      stepBox.style.background = 'var(--color-card)';
      stepBox.style.border = '1px solid rgba(0, 229, 255, 0.2)';
      stepBox.style.borderRadius = 'var(--radius-lg)';
      stepBox.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5)';
      stepBox.style.opacity = '0';
      stepBox.style.transform = 'scale(0.9)';
      stepBox.style.transition = 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
      // Keep space reserved even when invisible
      stepBox.style.visibility = 'hidden';
      stepBox.style.cursor = 'pointer';
      stepBox.onclick = () => revealNext();

      if (step.text) {
        const textEl = document.createElement('div');
        textEl.className = 'math-step-text';
        textEl.innerHTML = step.text;
        textEl.style.color = 'var(--color-text-muted)';
        textEl.style.fontSize = '1rem';
        textEl.style.marginBottom = '8px';
        textEl.style.textAlign = 'center';
        stepBox.appendChild(textEl);
      }

      if (step.math) {
        const mathEl = document.createElement('div');
        mathEl.className = 'qd-math-row';
        mathEl.innerHTML = step.math;
        stepBox.appendChild(mathEl);
      }

      if (step.finalBox) {
         stepBox.style.border = '2px solid var(--color-accent)';
         stepBox.style.background = 'rgba(0, 229, 255, 0.1)';
         stepBox.style.boxShadow = '0 0 25px rgba(0, 229, 255, 0.3)';
         stepBox.style.transform = 'scale(0.9)'; // will scale to 1.05 when revealed
      }

      stepsContainer.appendChild(stepBox);
      stepEls.push(stepBox);
    });

    const controls = document.createElement('div');
    controls.style.display = 'flex';
    controls.style.justifyContent = 'center';
    controls.style.marginTop = '10px';
    
    const btn = document.createElement('button');
    btn.className = 'btn';
    btn.textContent = 'NEXT STEP';
    
    controls.appendChild(btn);
    wrapper.appendChild(controls);
    container.appendChild(wrapper);

    let currentStep = 0;
    
    function revealNext() {
      if (currentStep < stepEls.length) {
        stepEls[currentStep].style.visibility = 'visible';
        stepEls[currentStep].style.opacity = '1';
        stepEls[currentStep].style.transform = steps[currentStep].finalBox ? 'scale(1.05)' : 'scale(1)';
        currentStep++;
        if (currentStep >= stepEls.length) {
          btn.textContent = 'DERIVATION COMPLETE';
          btn.disabled = true;
        }
      }
    }

    btn.onclick = revealNext;
    
    // Reveal first step automatically
    setTimeout(revealNext, 200);
  }

  return { init: build };
})();
