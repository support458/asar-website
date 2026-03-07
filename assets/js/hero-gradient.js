const canvas = document.getElementById('heroCanvas');
if (!canvas) {
    // Script is loaded on a page without a hero canvas.
    // Keep it no-op to avoid runtime errors.
} else {
const ctx = canvas.getContext('2d');
const config = {
    "colors": {
        "bg": "#08003a",
        "c1": "#1a0a73",
        "c2": "#31209c",
        "c3": "#5b1b67"
    },
    "geometry": {
        "show": true,
        "alpha": 0.16,
        "sizeScale": 2.2,
        "count": 2,
        "shapes": [
            {
                "type": "circle",
                "colorKey": "c2",
                "sizePct": 0.17826601733048157,
                "baseX_Pct": 0.9428557274419774,
                "baseY_Pct": 0.9028626847655563,
                "driftRadiusXPct": 0.05298572952070352,
                "driftRadiusYPct": 0.038027390533704806,
                "driftPhase": 1.1664102298612322,
                "baseRotation": 5.282494471602585,
                "strokeWidthPct": 0.028082875005881724
            },
            {
                "type": "rect",
                "colorKey": "c3",
                "sizePct": 0.11885987797387675,
                "baseX_Pct": 0.04770996568027082,
                "baseY_Pct": 0.1908934947589346,
                "driftRadiusXPct": 0.04604402038813415,
                "driftRadiusYPct": 0.05403189587532749,
                "driftPhase": 2.105751492272867,
                "baseRotation": 5.086303567341937,
                "strokeWidthPct": 0.03163278263718536
            }
        ]
    },
    "edgesMode": true,
    "texts": [],
    "lines": [],
    "guides": {
        "v": [],
        "h": [],
        "show": true
    },
    "arrow": {
        "show": false,
        "x": 512,
        "y": 250,
        "size": 44.6484375,
        "color": "#ffffff",
        "anim": "move",
        "speed": 1,
        "rotation": 0,
        "alpha": 1,
        "useGradient": false,
        "gradShade": 0,
        "glow": false
    }
};

const LOOP_DURATION = 15000;
const meteors = [];

let noiseCanvas = document.createElement('canvas');
let blobCanvas = document.createElement('canvas');
let blobCtx = blobCanvas.getContext('2d');

function updateCanvasSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    updateNoise();
}

function shiftColor(hex, percent) {
    let num = parseInt(hex.replace("#", ""), 16),
        amt = Math.round(2.55 * percent),
        R = (num >> 16) + amt,
        G = (num >> 8 & 0x00FF) + amt,
        B = (num & 0x0000FF) + amt;
    return "#" + (0x1000000 + (R < 255 ? R < 0 ? 0 : R : 255) * 0x10000 + (G < 255 ? G < 0 ? 0 : G : 255) * 0x100 + (B < 255 ? B < 0 ? 0 : B : 255)).toString(16).slice(1);
}

function updateNoise() {
    noiseCanvas.width = canvas.width;
    noiseCanvas.height = canvas.height;
    const nctx = noiseCanvas.getContext('2d');
    const idata = nctx.createImageData(canvas.width, canvas.height);
    const buffer32 = new Uint32Array(idata.data.buffer);
    for (let i = 0; i < buffer32.length; i++) if (Math.random() < 0.6) buffer32[i] = 0x35ffffff;
    nctx.putImageData(idata, 0, 0);

    blobCanvas.width = canvas.width / 4;
    blobCanvas.height = canvas.height / 4;
}

function spawnLoop() {
    const startX = Math.random() * (canvas.width * 0.5) + canvas.width;
    const startY = Math.random() * (canvas.height * 0.5) - (canvas.height * 0.2);
    meteors.push({ x: startX, y: startY, angle: 135, tailLen: Math.random() * 60 + 120 });
    setTimeout(spawnLoop, Math.random() * 2000 + 4000);
}

function render(dt) {
    const t = (dt % LOOP_DURATION) / LOOP_DURATION;
    const angle = t * Math.PI * 2;

    ctx.filter = 'none'; ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = config.colors.bg; ctx.fillRect(0, 0, canvas.width, canvas.height);

    const w = canvas.width, h = canvas.height;
    const scale = Math.max(w, h) / 600;

    blobCtx.clearRect(0, 0, blobCanvas.width, blobCanvas.height);
    blobCtx.save();
    const bScale = (Math.max(blobCanvas.width, blobCanvas.height) / 600);
    blobCtx.filter = `blur(${30 * scale}px)`;
    blobCtx.globalAlpha = 0.75;

    let p1, p2, p3;
    if (config.edgesMode) {
        p1 = { x: Math.cos(angle) * 80 * bScale, y: Math.sin(angle * 2) * 50 * bScale };
        p2 = { x: blobCanvas.width + Math.sin(angle + 2) * 100 * bScale, y: blobCanvas.height + Math.cos(angle + 1) * 100 * bScale };
        p3 = { x: blobCanvas.width + Math.cos(angle * 3) * 60 * bScale, y: Math.sin(angle) * 120 * bScale };
    } else {
        const cx = blobCanvas.width / 2, cy = blobCanvas.height / 2;
        p1 = { x: cx + Math.cos(angle) * 80 * bScale, y: cy + Math.sin(angle * 2) * 50 * bScale };
        p2 = { x: cx + Math.sin(angle + 2) * 100 * bScale, y: cy + Math.cos(angle + 1) * 100 * bScale };
        p3 = { x: cx + Math.cos(angle * 3) * 60 * bScale, y: cy + Math.sin(angle) * 120 * bScale };
    }

    const drawBlob = (bx, by, br, c, ph) => {
        blobCtx.fillStyle = c; blobCtx.beginPath();
        const pts = 12; const st = (Math.PI * 2) / pts; let v = [];
        for (let i = 0; i < pts; i++) {
            const th = i * st;
            const def = Math.sin(th * 2 + angle + ph) * 0.4 + Math.cos(th * 3 - angle * 2 + ph * 2) * 0.3 + Math.sin(th * 5 + angle * 3) * 0.1;
            const rad = br * (1 + def * 0.4);
            v.push({ x: bx + Math.cos(th - angle) * rad, y: by + Math.sin(th - angle) * rad });
        }
        const ms = { x: (v[pts - 1].x + v[0].x) / 2, y: (v[pts - 1].y + v[0].y) / 2 };
        blobCtx.moveTo(ms.x, ms.y);
        for (let i = 0; i < pts; i++) {
            const p1 = v[i], p2 = v[(i + 1) % pts];
            blobCtx.quadraticCurveTo(p1.x, p1.y, (p1.x + p2.x) / 2, (p1.y + p2.y) / 2);
        }
        blobCtx.fill();
    };

    drawBlob(p1.x, p1.y, 500 * bScale, config.colors.c1, 0);
    drawBlob(p2.x, p2.y, 450 * bScale, config.colors.c2, 2);
    drawBlob(p3.x, p3.y, 380 * bScale, config.colors.c3, 4);
    blobCtx.restore();

    const margin = 50 * scale;
    ctx.save();
    ctx.filter = `blur(${10 * scale}px)`;
    ctx.drawImage(blobCanvas, -margin, -margin, canvas.width + margin * 2, canvas.height + margin * 2);
    ctx.restore();

    if (config.geometry.show) {
        ctx.globalAlpha = config.geometry.alpha;
        const minD = Math.min(w, h);
        config.geometry.shapes.forEach(s => {
            const col = s.colorKey === 'white' ? '#fff' : config.colors[s.colorKey];
            ctx.fillStyle = col; ctx.strokeStyle = col; ctx.lineWidth = minD * s.strokeWidthPct;
            ctx.save();
            const cx = w * s.baseX_Pct + Math.cos(angle + s.driftPhase) * minD * s.driftRadiusXPct;
            const cy = h * s.baseY_Pct + Math.sin(angle + s.driftPhase) * minD * s.driftRadiusYPct;
            ctx.translate(cx, cy); ctx.rotate(s.baseRotation + Math.sin(angle) * 0.2);
            const sz = minD * s.sizePct * (config.geometry.sizeScale || 1.0);
            if (s.type === 'ring') { ctx.beginPath(); ctx.arc(0, 0, sz, 0, Math.PI * 2); ctx.stroke(); }
            else if (s.type === 'rect') { ctx.beginPath(); ctx.roundRect(-sz * 0.75, -sz * 0.5, sz * 1.5, sz, sz / 2); ctx.fill(); }
            else if (s.type === 'parallel-rects') {
                const rw = sz * 1.4, rh = sz * 0.35, rr = rh / 2, gap = sz * 0.15, sh = sz * 0.2;
                ctx.beginPath(); ctx.roundRect(-rw / 2 - sh / 2, -rh - gap / 2, rw, rh, rr); ctx.fill();
                ctx.beginPath(); ctx.roundRect(-rw / 2 + sh / 2, gap / 2, rw, rh, rr); ctx.fill();
            }
            else if (s.type === 'triangle') { ctx.beginPath(); ctx.moveTo(0, -sz); ctx.lineTo(sz * 0.86, sz * 0.5); ctx.lineTo(-sz * 0.86, sz * 0.5); ctx.closePath(); ctx.fill(); }
            else if (s.type === 'hexagon') { ctx.beginPath(); for (let i = 0; i < 6; i++) { let th = i * Math.PI / 3; ctx.lineTo(Math.cos(th) * sz, Math.sin(th) * sz); } ctx.closePath(); ctx.fill(); }
            else if (s.type === 'star') { ctx.beginPath(); for (let i = 0; i < 10; i++) { let th = i * Math.PI / 5 - Math.PI / 2; let r = i % 2 === 0 ? sz : sz * 0.4; ctx.lineTo(Math.cos(th) * r, Math.sin(th) * r); } ctx.closePath(); ctx.fill(); }
            else if (s.type === 'circle') { ctx.beginPath(); ctx.arc(0, 0, sz, 0, Math.PI * 2); ctx.fill(); }
            ctx.restore();
        });
        ctx.globalAlpha = 1.0;
    }

    meteors.forEach((m, idx) => {
        const rad = m.angle * Math.PI / 180;
        m.x += Math.cos(rad) * 30; m.y += Math.sin(rad) * 30;
        ctx.save(); ctx.translate(m.x, m.y); ctx.rotate(rad);
        const g = ctx.createLinearGradient(-m.tailLen, 0, 0, 0);
        g.addColorStop(0, 'transparent'); g.addColorStop(1, 'rgba(255,255,255,0.9)');
        ctx.fillStyle = g; ctx.fillRect(-m.tailLen, -0.5, m.tailLen, 1);
        ctx.beginPath(); ctx.arc(0, 0, 1.5, 0, Math.PI * 2); ctx.fillStyle = 'white'; ctx.fill();
        ctx.restore();
        if (m.x < -300 || m.y > h + 300) meteors.splice(idx, 1);
    });

    ctx.globalCompositeOperation = 'overlay'; ctx.globalAlpha = 0.25;
    ctx.drawImage(noiseCanvas, 0, 0); ctx.globalAlpha = 1.0; ctx.globalCompositeOperation = 'source-over';
}

function animate() {
    render(Date.now());
    requestAnimationFrame(animate);
}

window.addEventListener('resize', updateCanvasSize);
updateCanvasSize();
spawnLoop();
animate();
}
