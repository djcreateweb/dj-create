/**
 * Capa JS del bloqueo de zoom (Ctrl+rueda, Ctrl +/- / 0, pinch multitáctil).
 * El viewport y touch-action en CSS completan la política. El hero inmersivo usa su
 * propia rueda con preventDefault; aquí solo se anula zoom con Ctrl+rueda.
 */
export function initZoomLock() {
  window.addEventListener(
    "wheel",
    (e) => {
      if (e.ctrlKey) {
        e.preventDefault();
      }
    },
    { passive: false }
  );

  window.addEventListener("keydown", (e) => {
    if (e.ctrlKey && (e.key === "+" || e.key === "-" || e.key === "=" || e.key === "0")) {
      e.preventDefault();
    }
  });

  window.addEventListener(
    "touchstart",
    (e) => {
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    },
    { passive: false }
  );

  window.addEventListener(
    "touchmove",
    (e) => {
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    },
    { passive: false }
  );
}
