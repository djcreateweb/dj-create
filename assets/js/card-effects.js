/**
 * Brillo que sigue al puntero en tarjetas/paneles y destello al navegar por anclas internas.
 */

const FX_SPOT_SELECTOR =
  ".services-grid .service-card, .profiles .profile-card, .contact-panel--intro, .contact-panel--form";

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function setSpot(el, clientX, clientY) {
  const r = el.getBoundingClientRect();
  const x = ((clientX - r.left) / Math.max(1, r.width)) * 100;
  const y = ((clientY - r.top) / Math.max(1, r.height)) * 100;
  el.style.setProperty("--fx-spot-x", `${x}%`);
  el.style.setProperty("--fx-spot-y", `${y}%`);
}

function bindSpotlightCard(el) {
  el.classList.add("fx-card");

  el.addEventListener(
    "pointerenter",
    (e) => {
      el.classList.add("is-fx-hover");
      setSpot(el, e.clientX, e.clientY);
    },
    { passive: true }
  );

  el.addEventListener(
    "pointermove",
    (e) => {
      if (!el.classList.contains("is-fx-hover")) {
        return;
      }
      setSpot(el, e.clientX, e.clientY);
    },
    { passive: true }
  );

  el.addEventListener(
    "pointerleave",
    () => {
      el.classList.remove("is-fx-hover");
      el.style.removeProperty("--fx-spot-x");
      el.style.removeProperty("--fx-spot-y");
    },
    { passive: true }
  );
}

/**
 * Stats: sin capa ::after (choca con el fondo interno); solo resalte y escala de icono.
 */
function bindStatsCards() {
  document.querySelectorAll(".stats-grid .stats-card").forEach((el) => {
    el.addEventListener("pointerenter", () => el.classList.add("is-fx-hover"), { passive: true });
    el.addEventListener("pointerleave", () => el.classList.remove("is-fx-hover"), { passive: true });
  });
}

/**
 * Radial spotlight + ligera escala del icono (CSS) en servicios, perfiles y contacto.
 */
export function initCardFx() {
  if (prefersReducedMotion()) {
    return;
  }

  document.querySelectorAll(FX_SPOT_SELECTOR).forEach(bindSpotlightCard);
  bindStatsCards();
}

let navFlashTimer = 0;

/**
 * Destello breve al saltar entre secciones (misma página, enlaces con hash).
 */
export function initInternalNavFx() {
  if (prefersReducedMotion()) {
    return;
  }

  document.addEventListener(
    "click",
    (e) => {
      const a = e.target.closest?.("a[data-smooth-link]");
      if (!a?.getAttribute("href")) {
        return;
      }
      let url;
      try {
        url = new URL(a.href, window.location.origin);
      } catch {
        return;
      }
      if (url.origin !== window.location.origin || url.pathname !== window.location.pathname) {
        return;
      }
      if (!url.hash || url.hash === "#") {
        return;
      }

      document.body.classList.add("ui-nav-flash");
      window.clearTimeout(navFlashTimer);
      navFlashTimer = window.setTimeout(() => {
        document.body.classList.remove("ui-nav-flash");
      }, 420);
    },
    true
  );

  window.addEventListener("pageshow", () => {
    document.body.classList.remove("ui-nav-flash");
  });
}
