// Version: 2.2.2
const MAX_TOTAL_MS = 3000;
const CURTAIN_MS = 520;
const FLASH_MS = 280;
/** Progreso 0→100% antes del destello final */
const PROGRESS_END_MS = MAX_TOTAL_MS - CURTAIN_MS - FLASH_MS;

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Loader: círculo DJ/Create, puntos animados, barra con brillo, % visible, destello y cortinas ≤3s.
 */
export function initLoader() {
  return new Promise((resolve) => {
    let progressRaf = 0;
    let dotsInterval = 0;
    const loader = document.getElementById("page-loader");
    const curtainTop = document.getElementById("page-loader-curtain-top");
    const curtainBottom = document.getElementById("page-loader-curtain-bottom");
    const circleEl = document.getElementById("page-loader-circle");
    const progressBar = document.getElementById("loader-progress-fill");
    const progressText = document.getElementById("loader-progress-text");
    const pctDisplay = document.getElementById("loader-pct-display");
    const progressRoot = document.getElementById("loader-progress-root");
    const stageEl = document.querySelector(".page-loader__stage");
    const dotsEl = document.getElementById("loader-dots");

    const scrollToTop = () => {
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      window.scrollTo(0, 0);
    };

    const finish = () => {
      window.clearInterval(dotsInterval);
      document.body.classList.remove("is-loading");
      document.body.classList.add("is-revealed", "loaded");
      loader?.removeAttribute("aria-busy");
      loader?.remove();
      scrollToTop();
      window.requestAnimationFrame(() => {
        scrollToTop();
        window.requestAnimationFrame(scrollToTop);
      });
      resolve();
    };

    if (!loader) {
      document.body.classList.remove("is-loading");
      document.body.classList.add("is-revealed", "loaded");
      scrollToTop();
      resolve();
      return;
    }

    document.body.classList.add("is-loading");

    const setProgressUi = (pct) => {
      const n = Math.max(0, Math.min(100, pct));
      const label = `${Math.round(n)}%`;
      if (progressBar) {
        progressBar.style.width = `${n}%`;
      }
      if (progressText) {
        progressText.textContent = label;
      }
      if (pctDisplay) {
        pctDisplay.textContent = label;
      }
      if (progressRoot) {
        progressRoot.setAttribute("aria-valuenow", String(Math.round(n)));
      }
    };

    const openCurtains = () => {
      stageEl?.classList.add("page-loader__stage--fade-out");
      curtainTop?.classList.add("page-loader__curtain--open-top");
      curtainBottom?.classList.add("page-loader__curtain--open-bottom");
      window.setTimeout(finish, CURTAIN_MS);
    };

    const startDots = () => {
      if (!dotsEl) {
        return;
      }
      let step = 0;
      dotsInterval = window.setInterval(() => {
        step = (step + 1) % 4;
        dotsEl.textContent = ".".repeat(step);
      }, 360);
    };

    if (prefersReducedMotion()) {
      if (dotsEl) {
        dotsEl.textContent = "...";
      }
      setProgressUi(100);
      window.setTimeout(openCurtains, 120);
      return;
    }

    startDots();

    const t0 = performance.now();

    const tickProgress = (now) => {
      const elapsed = now - t0;
      const p = Math.min(100, (elapsed / PROGRESS_END_MS) * 100);
      setProgressUi(p);
      if (elapsed < PROGRESS_END_MS) {
        progressRaf = requestAnimationFrame(tickProgress);
      }
    };
    progressRaf = requestAnimationFrame(tickProgress);

    window.setTimeout(() => {
      cancelAnimationFrame(progressRaf);
      setProgressUi(100);
      circleEl?.classList.add("page-loader__circle--flash");
      window.setTimeout(() => {
        circleEl?.classList.remove("page-loader__circle--flash");
        openCurtains();
      }, FLASH_MS);
    }, PROGRESS_END_MS);
  });
}
