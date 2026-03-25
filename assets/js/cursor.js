// Version: 2.10.3
const HALO_LERP = 0.09;

export function initCursor() {
  const body = document.body;
  const el = document.getElementById("custom-cursor");
  if (!el) {
    return;
  }

  const coarse = window.matchMedia("(pointer: coarse)").matches;
  const noHover = window.matchMedia("(hover: none)").matches;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (coarse || noHover || reduce) {
    el.setAttribute("hidden", "");
    body.classList.remove("is-cursor-enabled");
    return;
  }

  el.removeAttribute("hidden");
  body.classList.add("is-cursor-enabled");

  const dot = el.querySelector(".custom-cursor__dot");
  const halo = el.querySelector(".custom-cursor__halo");
  if (!dot || !halo) {
    return;
  }

  let mx = window.innerWidth / 2;
  let my = window.innerHeight / 2;
  let hx = mx;
  let hy = my;
  let raf = 0;

  const interactiveSelector =
    'a, button, input, textarea, select, [role="button"], .site-nav__lang-btn, .service-card, .profile-card, .stats-card, .contact-panel, label';

  const paint = () => {
    hx += (mx - hx) * HALO_LERP;
    hy += (my - hy) * HALO_LERP;

    dot.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;
    halo.style.transform = `translate3d(${hx}px, ${hy}px, 0) translate(-50%, -50%)`;
    raf = requestAnimationFrame(paint);
  };

  const onMove = (e) => {
    mx = e.clientX;
    my = e.clientY;
    const t = e.target;
    if (t && t.closest(interactiveSelector)) {
      el.classList.add("is-hover");
    } else {
      el.classList.remove("is-hover");
    }
  };

  const onLeave = () => {
    el.classList.remove("is-hover");
  };

  window.addEventListener("pointermove", onMove, { passive: true });
  document.addEventListener("pointerleave", onLeave);
  raf = requestAnimationFrame(paint);

  window.addEventListener(
    "beforeunload",
    () => {
      cancelAnimationFrame(raf);
    },
    { once: true }
  );
}
