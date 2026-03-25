// Version: 2.10.2
/**
 * Primer scroll hacia abajo en el hero: el cubo se rompe en caras (CSS), luego scroll suave a #servicios.
 * Una sola vez por visita. Al volver a subir y ver el hero, el cubo se muestra otra vez (el efecto no se repite).
 * wheel passive: false donde aplica.
 */

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function navOffset() {
  const header = document.getElementById("site-header");
  return header ? header.offsetHeight : 72;
}

function scrollToServicios(smooth) {
  const target = document.getElementById("servicios");
  if (!target) {
    return;
  }
  const top = target.getBoundingClientRect().top + window.scrollY - navOffset();
  if (typeof window !== "undefined") {
    window.__djIgnoreNextHeroGateScroll = true;
    window.setTimeout(() => {
      window.__djIgnoreNextHeroGateScroll = false;
    }, 1400);
  }
  window.scrollTo({ top: Math.max(0, top), behavior: smooth ? "smooth" : "auto" });
}

export function initScrollLock() {
  document.body.dataset.heroImmersiveScroll = "0";

  let scrollEffectDone = false;
  let isShattering = false;

  const coreEl = () => document.querySelector(".hero-neutron-core");
  const cubeEl = () => document.getElementById("hero-cube");

  function setScrollLocked(locked) {
    const v = locked ? "hidden" : "";
    document.documentElement.style.overflow = v;
    document.body.style.overflow = v;
  }

  function finishAndScrollToServices() {
    const cube = cubeEl();
    if (cube) {
      cube.classList.add("hero-holo__cube--gone");
    }
    setScrollLocked(false);
    scrollEffectDone = true;
    isShattering = false;
    scrollToServicios(!prefersReducedMotion());
  }

  function triggerShatter() {
    if (isShattering) {
      return;
    }
    const core = coreEl();
    const cube = cubeEl();
    if (!core || !cube) {
      scrollEffectDone = true;
      return;
    }
    if (prefersReducedMotion()) {
      isShattering = true;
      setScrollLocked(true);
      window.scrollTo(0, 0);
      window.setTimeout(() => {
        finishAndScrollToServices();
      }, 50);
      return;
    }

    isShattering = true;
    setScrollLocked(true);
    window.scrollTo(0, 0);
    core.classList.add("hero-shatter-active");
    cube.classList.add("hero-holo__cube--shatter");

    window.setTimeout(() => {
      finishAndScrollToServices();
    }, 920);
  }

  function setupHeroCubeRestoreObserver() {
    const target =
      document.querySelector(".hero-visual-cluster") ?? document.getElementById("inicio");
    if (!target) {
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting || entry.intersectionRatio < 0.1) {
            continue;
          }
          if (!scrollEffectDone || isShattering) {
            continue;
          }
          const cube = cubeEl();
          const core = coreEl();
          if (!cube || !cube.classList.contains("hero-holo__cube--gone")) {
            continue;
          }
          cube.classList.remove("hero-holo__cube--gone", "hero-holo__cube--shatter");
          if (core) {
            core.classList.remove("hero-shatter-active");
          }
          void cube.offsetWidth;
        }
      },
      { threshold: [0, 0.06, 0.1, 0.15, 0.22] }
    );
    io.observe(target);
  }

  function atHeroTop() {
    if (window.scrollY > 12) {
      return false;
    }
    const hero = document.getElementById("inicio");
    if (!hero) {
      return false;
    }
    const rect = hero.getBoundingClientRect();
    return rect.top >= -40 && rect.bottom > 80;
  }

  function onWheel(e) {
    if (typeof window !== "undefined" && window.__djIgnoreNextHeroGateScroll) {
      return;
    }
    if (scrollEffectDone) {
      return;
    }
    if (isShattering) {
      e.preventDefault();
      window.scrollTo(0, 0);
      return;
    }
    if (e.deltaY <= 0) {
      return;
    }
    if (!atHeroTop()) {
      return;
    }
    e.preventDefault();
    triggerShatter();
  }

  let touchLastY = 0;

  function onTouchStart(e) {
    if (e.touches.length !== 1) {
      return;
    }
    touchLastY = e.touches[0].clientY;
  }

  function onTouchMove(e) {
    if (typeof window !== "undefined" && window.__djIgnoreNextHeroGateScroll) {
      return;
    }
    if (scrollEffectDone) {
      return;
    }
    if (e.touches.length !== 1) {
      return;
    }
    const y = e.touches[0].clientY;
    const dy = touchLastY - y;
    touchLastY = y;

    if (isShattering) {
      e.preventDefault();
      window.scrollTo(0, 0);
      return;
    }
    if (dy <= 0) {
      return;
    }
    if (!atHeroTop()) {
      return;
    }
    e.preventDefault();
    triggerShatter();
  }

  if (prefersReducedMotion()) {
    if (!coreEl()) {
      return;
    }
    setupHeroCubeRestoreObserver();
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: false });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    return;
  }

  if (!coreEl()) {
    return;
  }

  setupHeroCubeRestoreObserver();

  window.addEventListener("scroll", () => {
    if (isShattering) {
      window.scrollTo(0, 0);
    }
  }, { passive: true });

  window.addEventListener("wheel", onWheel, { passive: false });
  window.addEventListener("touchstart", onTouchStart, { passive: false });
  window.addEventListener("touchmove", onTouchMove, { passive: false });
}
