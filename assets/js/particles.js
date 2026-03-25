// Version: 2.2.0
const CELL = 88;
const LINK_DIST = 92;
const LINKS_PER_DOT = 3;
const REPULSE_R = 200;
const REPULSE_FORCE = 3.35;

function rand(min, max) {
  return min + Math.random() * (max - min);
}

function readCssVar(name) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

function cssColorToRgba(color, alpha) {
  if (!color) {
    return `rgba(27, 111, 255, ${alpha})`;
  }
  const c = color.trim();
  if (c.startsWith("#")) {
    let h = c.slice(1);
    if (h.length === 3) {
      h = h
        .split("")
        .map((ch) => ch + ch)
        .join("");
    }
    const n = Number.parseInt(h, 16);
    if (!Number.isFinite(n)) {
      return `rgba(27, 111, 255, ${alpha})`;
    }
    const r = (n >> 16) & 255;
    const g = (n >> 8) & 255;
    const b = n & 255;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
  const m = c.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i);
  if (m) {
    return `rgba(${m[1]}, ${m[2]}, ${m[3]}, ${alpha})`;
  }
  return `rgba(27, 111, 255, ${alpha})`;
}

function buildGrid(particles, cellSize) {
  /** @type {Map<string, number[]>} */
  const grid = new Map();
  for (let i = 0; i < particles.length; i += 1) {
    const p = particles[i];
    const cx = Math.floor(p.x / cellSize);
    const cy = Math.floor(p.y / cellSize);
    const key = `${cx},${cy}`;
    if (!grid.has(key)) {
      grid.set(key, []);
    }
    grid.get(key).push(i);
  }
  return grid;
}

function neighborIndices(grid, x, y, cellSize) {
  const cx = Math.floor(x / cellSize);
  const cy = Math.floor(y / cellSize);
  const out = [];
  for (let ox = -1; ox <= 1; ox += 1) {
    for (let oy = -1; oy <= 1; oy += 1) {
      const key = `${cx + ox},${cy + oy}`;
      const bucket = grid.get(key);
      if (bucket) {
        out.push(...bucket);
      }
    }
  }
  return out;
}

export function initParticles() {
  const canvas = document.getElementById("hero-particles");
  if (!canvas) {
    return;
  }

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    return;
  }

  let width = 0;
  let height = 0;
  let particles = [];
  let mx = null;
  let my = null;
  let raf = 0;

  let colorElectric = readCssVar("--color-electric");
  let colorGlow = readCssVar("--color-electric-glow");

  const refreshColors = () => {
    colorElectric = readCssVar("--color-electric");
    colorGlow = readCssVar("--color-electric-glow");
  };

  const repulsePointer = (x, y) => {
    if (mx === null || my === null) {
      return { x, y };
    }
    const dx = x - mx;
    const dy = y - my;
    const d = Math.hypot(dx, dy);
    if (d < REPULSE_R && d > 0.001) {
      const f = ((REPULSE_R - d) / REPULSE_R) * REPULSE_FORCE;
      return {
        x: x + (dx / d) * f,
        y: y + (dy / d) * f,
      };
    }
    return { x, y };
  };

  const resize = () => {
    const parent = canvas.parentElement;
    if (!parent) {
      return;
    }
    width = parent.clientWidth;
    height = parent.clientHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    refreshColors();

    const area = width * height;
    const count = Math.min(240, Math.max(90, Math.floor(area / 4200)));
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: rand(-0.22, 0.22),
      vy: rand(-0.22, 0.22),
      r: rand(0.55, 1.35),
      op: rand(0.3, 0.5),
    }));
  };

  const onMove = (e) => {
    const rect = canvas.getBoundingClientRect();
    mx = e.clientX - rect.left;
    my = e.clientY - rect.top;
  };

  const onLeave = () => {
    mx = null;
    my = null;
  };

  const tick = () => {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = colorElectric;

    for (let i = 0; i < particles.length; i += 1) {
      const p = particles[i];
      let { x, y, vx, vy } = p;

      const pushed = repulsePointer(x, y);
      x = pushed.x;
      y = pushed.y;

      x += vx;
      y += vy;

      if (x < 0 || x > width) {
        vx *= -1;
      }
      if (y < 0 || y > height) {
        vy *= -1;
      }

      p.x = x;
      p.y = y;
      p.vx = vx;
      p.vy = vy;

      ctx.globalAlpha = p.op;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    }

    const grid = buildGrid(particles, CELL);
    ctx.lineWidth = 1;
    for (let i = 0; i < particles.length; i += 1) {
      const a = particles[i];
      const cand = neighborIndices(grid, a.x, a.y, CELL);
      const dists = [];
      for (let k = 0; k < cand.length; k += 1) {
        const j = cand[k];
        if (j <= i) {
          continue;
        }
        const b = particles[j];
        const d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < LINK_DIST) {
          dists.push({ j, d });
        }
      }
      dists.sort((u, v) => u.d - v.d);
      const maxL = Math.min(LINKS_PER_DOT, dists.length);
      for (let t = 0; t < maxL; t += 1) {
        const b = particles[dists[t].j];
        const d = dists[t].d;
        const alpha = (1 - d / LINK_DIST) * 0.22;
        ctx.globalAlpha = alpha;
        ctx.strokeStyle = colorGlow;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    }

    ctx.globalAlpha = 1;

    raf = requestAnimationFrame(tick);
  };

  resize();
  window.addEventListener("resize", resize, { passive: true });

  const heroEl = canvas.closest(".hero");
  if (heroEl) {
    heroEl.addEventListener("pointermove", onMove, { passive: true });
    heroEl.addEventListener("pointerleave", onLeave);
  } else {
    canvas.addEventListener("pointermove", onMove, { passive: true });
    canvas.addEventListener("pointerleave", onLeave);
  }

  if (!reduce) {
    raf = requestAnimationFrame(tick);
  } else {
    ctx.fillStyle = colorElectric;
    particles.forEach((p) => {
      ctx.globalAlpha = 0.35;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.globalAlpha = 1;
  }

  window.addEventListener(
    "beforeunload",
    () => {
      cancelAnimationFrame(raf);
    },
    { once: true }
  );
}
