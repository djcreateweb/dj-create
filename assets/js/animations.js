const TILT_MAX = 10;

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function navOffset() {
  const header = document.getElementById("site-header");
  return header ? header.offsetHeight : 72;
}

export function initScrollReveal() {
  if (prefersReducedMotion()) {
    document.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const els = document.querySelectorAll(".reveal");
  if (!els.length) {
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    },
    { root: null, threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
  );

  els.forEach((el) => io.observe(el));
}

export function initTilt() {
  if (prefersReducedMotion()) {
    return;
  }

  document.querySelectorAll("[data-tilt]").forEach((card) => {
    const inner = card;

    const onMove = (e) => {
      const r = inner.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      const rx = (-py * TILT_MAX).toFixed(2);
      const ry = (px * TILT_MAX).toFixed(2);
      inner.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0)`;
    };

    const reset = () => {
      inner.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0)";
    };

    inner.addEventListener("pointermove", onMove);
    inner.addEventListener("pointerleave", reset);
    inner.addEventListener("blur", reset, true);
  });
}

export function initGlitch() {
  const el = document.querySelector("[data-glitch-text]");
  if (!el || prefersReducedMotion()) {
    return;
  }

  const schedule = () => {
    const delay = 4000 + Math.random() * 2000;
    window.setTimeout(() => {
      el.classList.add("is-glitching");
      window.setTimeout(() => {
        el.classList.remove("is-glitching");
        schedule();
      }, 480);
    }, delay);
  };

  schedule();
}

export function initHeroParallax() {
  const target = document.getElementById("hero-parallax-root");
  const hero = document.getElementById("inicio");
  if (!target || !hero || prefersReducedMotion()) {
    return;
  }

  const maxPx = () => window.innerHeight * 0.2;
  let ticking = false;

  const update = () => {
    ticking = false;
    const rect = hero.getBoundingClientRect();
    if (rect.bottom < 0 || rect.top > window.innerHeight) {
      return;
    }
    const progress = Math.min(1, Math.max(0, window.scrollY / (rect.height || 1)));
    const y = progress * maxPx();
    target.style.transform = `translate3d(0, ${y}px, 0)`;
  };

  const onScroll = () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  update();
}

export function initSmoothLinks() {
  const reduce = prefersReducedMotion();

  document.querySelectorAll("[data-smooth-link]").forEach((link) => {
    link.addEventListener("click", (e) => {
      const url = new URL(link.href, window.location.origin);
      if (url.origin !== window.location.origin) {
        return;
      }
      const hash = url.hash ? url.hash.slice(1) : "";
      if (!hash) {
        return;
      }
      if (url.pathname !== window.location.pathname) {
        return;
      }
      e.preventDefault();
      const target = document.getElementById(hash);
      if (!target) {
        return;
      }
      const top = target.getBoundingClientRect().top + window.scrollY - navOffset();
      if (typeof window !== "undefined") {
        window.__djIgnoreNextHeroGateScroll = true;
        window.setTimeout(() => {
          window.__djIgnoreNextHeroGateScroll = false;
        }, 1200);
      }
      window.scrollTo({ top: Math.max(0, top), behavior: reduce ? "auto" : "smooth" });
      const header = document.getElementById("site-header");
      if (header?.classList.contains("is-open")) {
        header.classList.remove("is-open");
        const toggle = document.getElementById("nav-toggle");
        if (toggle) {
          toggle.setAttribute("aria-expanded", "false");
        }
      }
    });
  });
}

export function initStats() {
  const root = document.getElementById("estadisticas");
  if (!root) {
    return;
  }

  const animateValue = (el, end, suffix, durationMs) => {
    const start = 0;
    const startTime = performance.now();

    const step = (now) => {
      const t = Math.min(1, (now - startTime) / durationMs);
      const eased = 1 - (1 - t) ** 3;
      const val = Math.round(start + (end - start) * eased);
      el.textContent = `${val}${suffix}`;
      if (t < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  };

  const run = () => {
    root.querySelectorAll(".stats__value").forEach((el) => {
      if (el.dataset.countTarget === "inf") {
        return;
      }
      const end = Number(el.dataset.count);
      const suffix = el.dataset.suffix ?? "";
      if (Number.isFinite(end)) {
        animateValue(el, end, suffix, 900);
      }
    });
  };

  if (prefersReducedMotion()) {
    run();
    return;
  }

  const io = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          run();
          obs.disconnect();
        }
      });
    },
    { threshold: 0.35 }
  );

  io.observe(root);
}

export function initHeaderScroll() {
  const header = document.getElementById("site-header");
  if (!header) {
    return;
  }

  const onScroll = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 16);
  };

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

export function initGsapScroll() {
  if (prefersReducedMotion() || typeof window.gsap === "undefined" || typeof window.ScrollTrigger === "undefined") {
    return;
  }

  const gsap = window.gsap;
  gsap.registerPlugin(window.ScrollTrigger);

  const glow = document.querySelector(".hero__visual-glow");
  if (glow) {
    gsap.fromTo(
      glow,
      { y: 0 },
      {
        y: () => window.innerHeight * 0.11,
        ease: "none",
        scrollTrigger: {
          trigger: "#inicio",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      }
    );
  }

  const decoSvg = document.querySelector(".hero__visual-svg");
  if (decoSvg) {
    gsap.to(decoSvg, {
      rotation: 5,
      ease: "none",
      scrollTrigger: {
        trigger: "#inicio",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  }
}
