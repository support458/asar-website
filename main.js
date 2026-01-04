(function () {
    const GAP_PX = 48;
    const APPROACH_FACTOR = 0.5;

    const sheets = Array.from(document.querySelectorAll('.sheet'));
    const spacer = document.getElementById('spacer');

    const blueMorph = document.getElementById('blueMorph');
    const blueOverlay = document.getElementById('blueOverlay');
    const overlayCopy = document.getElementById('overlayCopy');
    const heroInSheet = document.getElementById('heroInSheet');

    let vh = 1;
    let ticking = false;

    const clamp01 = (x) => Math.max(0, Math.min(1, x));
    const lerp = (a, b, t) => a + (b - a) * t;

    function transitionParams() {
        const startOffset = APPROACH_FACTOR * vh;
        const holdFrac = clamp01(GAP_PX / Math.max(1, startOffset));
        const tOff = 1 - holdFrac;
        return { startOffset, holdFrac, tOff };
    }

    function layout() {
        vh = Math.max(1, window.innerHeight);

        // +1 screen to allow last sheet to partial reveal footer
        spacer.style.height = ((sheets.length + 1) * vh) + 'px';

        const initH = Math.round(vh * 0.52);
        document.documentElement.style.setProperty('--heroH', initH + 'px');

        update();
    }

    function update() {
        ticking = false;
        const y = window.scrollY || 0;

        const { startOffset, tOff } = transitionParams();

        // 1. Blue Header Morph
        const t = clamp01(y / vh);
        const p = (tOff > 0) ? Math.min(1, t / tOff) : 1;

        const initH = Math.round(vh * 0.52);
        const topH = 64; // Matching --topbarH in CSS

        const h = Math.round(lerp(initH, topH, p));
        blueMorph.style.height = h + 'px';
        blueOverlay.style.height = h + 'px';

        // Morph to Pill Shape
        const rStart = 20; // Default radius for the block
        const rEnd = h / 2; // Full pill shape - capsule

        if (p > 0.01) {
            const r = lerp(rStart, rEnd, p);
            blueMorph.style.borderRadius = `${r}px`;

            // Horizontal padding/margins to make it floating pill
            const marginH = lerp(0, 40, p);
            blueMorph.style.left = `calc(var(--pad) + ${marginH}px)`;
            blueMorph.style.right = `calc(var(--pad) + ${marginH}px)`;
            blueOverlay.style.left = `calc(var(--pad) + ${marginH}px)`;
            blueOverlay.style.right = `calc(var(--pad) + ${marginH}px)`;

            // Top position adjustment
            const topPos = lerp(20, 15, p);
            blueMorph.style.top = `${topPos}px`;
            blueOverlay.style.top = `${topPos}px`;

            // Add shadow depth in bar mode
            blueMorph.style.boxShadow = `0 10px 30px rgba(0,0,0,${0.25 + p * 0.15})`;
        } else {
            blueMorph.style.borderRadius = `${rStart}px ${rStart}px 0 0`;
            blueMorph.style.left = `var(--pad)`;
            blueMorph.style.right = `var(--pad)`;
            blueOverlay.style.left = `var(--pad)`;
            blueOverlay.style.right = `var(--pad)`;
            blueMorph.style.top = `20px`;
            blueOverlay.style.top = `20px`;
            blueMorph.style.boxShadow = `0 20px 80px rgba(0, 0, 0, 0.25)`;
        }

        overlayCopy.style.opacity = clamp01(1 - p * 3).toFixed(3);
        overlayCopy.style.transform = `translateY(${-p * 30}px)`;

        // Show hero content, it is now aligned to bottom
        heroInSheet.style.opacity = '1';

        // 2. Sheets Logic
        const stackOffset = 8; // Pixels to shift each card down

        sheets.forEach((sheet, i) => {
            const currentK = Math.floor(y / vh);
            const p = clamp01((y - currentK * vh) / vh);

            let translateY = 0;
            let scale = 1;
            let opacity = 1;

            if (i < currentK) {
                // Scrolled past: slide up
                translateY = -vh;
                opacity = 0;
            } else if (i === currentK) {
                // Active top card: slides up based on scroll
                translateY = -p * vh;
                scale = 1;
                opacity = 1;
                sheet.style.zIndex = 50;
            } else {
                // Future cards in the visual stack
                const stackPos = i - currentK - p;

                // Show up to 5 cards in the stack for visual depth
                if (stackPos > 5) {
                    opacity = 0;
                } else {
                    opacity = 1;
                    translateY = stackPos * stackOffset;
                    scale = 1 - (stackPos * 0.015);
                }
                sheet.style.zIndex = 50 - i;
            }

            sheet.style.transform = `translate3d(0, ${translateY}px, 0) scale(${scale})`;
            sheet.style.opacity = opacity;

            // Shadows: top card is most prominent
            if (i === currentK) {
                sheet.style.boxShadow = `0 ${20 - p * 10}px ${60 - p * 20}px rgba(0,0,0,0.12)`;
            } else if (i > currentK) {
                sheet.style.boxShadow = `0 4px 15px rgba(0,0,0,0.05)`;
            }
        });
    }

    function onScroll() {
        if (!ticking) {
            ticking = true;
            requestAnimationFrame(update);
        }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', layout, { passive: true });

    // Mouse follow effect for header gradient
    window.addEventListener('mousemove', (e) => {
        const x = e.clientX;
        const y = e.clientY;

        // Update variables for both the morphing bar and the hero background
        const targets = [blueMorph, heroInSheet];

        targets.forEach(el => {
            const rect = el.getBoundingClientRect();
            // Check if mouse is somewhat near or if header is active
            const relX = ((x - rect.left) / rect.width) * 100;
            const relY = ((y - rect.top) / rect.height) * 100;

            el.style.setProperty('--m-x', `${relX}%`);
            el.style.setProperty('--m-y', `${relY}%`);
        });
    });

    // Abstract Antigravity-style Animation
    function initAbstractAnimation() {
        const containers = document.querySelectorAll('.abstract-container');

        containers.forEach(container => {
            const blobCount = 4;
            for (let i = 0; i < blobCount; i++) {
                const blob = document.createElement('div');
                blob.className = 'blob';

                const size = 150 + Math.random() * 250;
                blob.style.width = size + 'px';
                blob.style.height = size + 'px';

                blob.style.left = (Math.random() * 100) + '%';
                blob.style.top = (Math.random() * 100) + '%';

                container.appendChild(blob);

                // Animate floating with weightless organic motion
                const dur = 15000 + Math.random() * 20000;
                const delay = Math.random() * -30000;

                blob.animate([
                    { transform: 'translate(0, 0) scale(1)' },
                    { transform: `translate(${Math.random() * 150 - 75}px, ${Math.random() * 150 - 75}px) scale(${1.1 + Math.random() * 0.3})` },
                    { transform: `translate(${Math.random() * 150 - 75}px, ${Math.random() * 150 - 75}px) scale(${0.8 + Math.random() * 0.2})` },
                    { transform: 'translate(0, 0) scale(1)' }
                ], {
                    duration: dur,
                    iterations: Infinity,
                    delay: delay,
                    easing: 'ease-in-out'
                });
            }
        });
    }

    initAbstractAnimation();

    layout();
})();
