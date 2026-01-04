(function () {
    const GAP_PX = 48;
    const APPROACH_FACTOR = 0.5;

    const sheets = Array.from(document.querySelectorAll('.sheet'));
    const spacer = document.getElementById('spacer');

    const blueMorph = document.getElementById('blueMorph');
    const blueOverlay = document.getElementById('blueOverlay');
    const overlayCopy = document.getElementById('overlayCopy');

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

    // Mouse follow effect for header gradient - Fixed to Top Edge
    window.addEventListener('mousemove', (e) => {
        const x = e.clientX;
        // const y = e.clientY; // Unused for Y gradient

        // Update gradient position on blueMorph
        const rect = blueMorph.getBoundingClientRect();
        const relX = ((x - rect.left) / rect.width) * 100;

        // "Attached to top edge" -> Y is 0%
        blueMorph.style.setProperty('--m-x', `${relX}%`);
        blueMorph.style.setProperty('--m-y', `0%`);
    });

    // Language menu toggle
    const langToggle = document.getElementById('langToggle');
    const langDropdown = document.getElementById('langDropdown');

    if (langToggle && langDropdown) {
        const closeLang = () => langDropdown.classList.remove('open');

        langToggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            langDropdown.classList.toggle('open');
        });

        langDropdown.addEventListener('click', (e) => {
            e.stopPropagation();
        });

        langDropdown.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', () => {
                closeLang();
            });
        });

        document.addEventListener('click', (e) => {
            if (!langDropdown.contains(e.target) && !langToggle.contains(e.target)) {
                closeLang();
            }
        });

        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeLang();
            }
        });
    }

    // Mobile Menu Logic
    const brand = document.getElementById('brandLogo');
    const nav = document.getElementById('mainNav');

    if (brand && nav) {
        brand.addEventListener('click', (e) => {
            if (window.innerWidth <= 900) {
                e.preventDefault();
                const isExpanded = blueMorph.classList.contains('expanded');

                if (isExpanded) {
                    blueMorph.classList.remove('expanded');
                    blueOverlay.classList.remove('expanded');
                    nav.classList.remove('open');
                } else {
                    blueMorph.classList.add('expanded');
                    blueOverlay.classList.add('expanded');
                    nav.classList.add('open');
                }
            }
        });
    }

    // Dynamic Texture Animation (Canvas)
    function initCanvasAnimation() {
        const canvas = document.getElementById('bgCanvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        let w = 0;
        let h = 0;

        // Polygon Config - Faster, fewer shapes
        const polys = [];
        const count = 4; // Fewer shapes including huge circle
        for (let i = 0; i < count; i++) {
            const isHugeCircle = i === 0; // First one is huge circle
            polys.push({
                x: isHugeCircle ? 50 : Math.random() * 100, // Percent
                y: isHugeCircle ? 50 : Math.random() * 100,
                radius: isHugeCircle ? 220 : (45 + Math.random() * 80), // Huge circle or triangles
                angle: Math.random() * Math.PI * 2,
                v: (Math.random() - 0.5) * 0.02, // Faster rotation velocity
                hue: Math.random() > 0.5 ? 220 : 340, // Blue or Red/Magenta
                alpha: isHugeCircle ? 0.18 : (0.08 + Math.random() * 0.22),
                isCircle: isHugeCircle
            });
        }

        function render() {
            if (!w || !h) return;
            ctx.clearRect(0, 0, w, h);
            // Global Composite?
            ctx.globalCompositeOperation = 'lighter'; // Additive blending for "glow"

            polys.forEach(p => {
                p.angle += p.v; // Faster rotation

                // Oscillate positions slightly
                const cx = (p.x / 100) * w;
                const cy = (p.y / 100) * h;
                const r = (p.radius / 100) * Math.min(w, h) * 2; // Large

                ctx.fillStyle = `hsla(${p.hue}, 80%, 50%, ${p.alpha})`;

                ctx.beginPath();
                if (p.isCircle) {
                    // Draw huge circle
                    ctx.arc(cx, cy, r, 0, Math.PI * 2);
                } else {
                    // Triangle
                    for (let k = 0; k < 3; k++) {
                        const theta = p.angle + k * (Math.PI * 2 / 3);
                        const px = cx + Math.cos(theta) * r;
                        const py = cy + Math.sin(theta) * r;
                        if (k === 0) ctx.moveTo(px, py);
                        else ctx.lineTo(px, py);
                    }
                }
                ctx.closePath();
                ctx.fill();
            });
        }

        const resize = () => {
            const nextW = Math.max(1, blueMorph.clientWidth);
            const nextH = Math.max(1, blueMorph.clientHeight);
            if (nextW === w && nextH === h) return;
            w = canvas.width = nextW;
            h = canvas.height = nextH;
            render();
        };

        window.addEventListener('resize', resize);
        // Also resize when blueMorph changes size (e.g. scroll) - utilizing ResizeObserver
        new ResizeObserver(resize).observe(blueMorph);
        resize();

        function draw() {
            render();
            requestAnimationFrame(draw);
        }
        draw();
    }

    initCanvasAnimation();

    layout();
})();
