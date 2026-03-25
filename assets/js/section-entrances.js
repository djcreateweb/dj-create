// Version: 2.7.0
/**
 * Animaciones de entrada por sección vía IntersectionObserver (sin scroll listener).
 */

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function observeOnce(el, callback, options = {}) {
  if (!el) {
    return;
  }
  const io = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          callback(entry.target);
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: options.threshold ?? 0.18, rootMargin: options.rootMargin ?? "0px 0px -6% 0px" }
  );
  io.observe(el);
}

export function initSectionDividerDraw() {
  if (prefersReducedMotion()) {
    document.querySelectorAll(".section-divider").forEach((d) => d.classList.add("section-divider--drawn"));
    return;
  }

  document.querySelectorAll(".section-divider").forEach((divider) => {
    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("section-divider--drawn");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.25, rootMargin: "0px" }
    );
    io.observe(divider);
  });
}

/** Cabecera de #servicios: mismo fade que el resto (antes solo el subtítulo se veía por la cortina en h2). */
export function initServiciosSectionHead() {
  const head = document.querySelector("#servicios .section-head");
  if (prefersReducedMotion()) {
    head?.classList.add("about-head--inview");
    return;
  }
  if (head) {
    head.classList.add("about-head--prep");
    observeOnce(head, (node) => {
      node.classList.add("about-head--inview");
    });
  }
}

export function initServicesCardEntrances() {
  const grid = document.querySelector(".services-grid");
  if (!grid) {
    return;
  }

  if (prefersReducedMotion()) {
    grid.querySelectorAll(".service-card").forEach((c) => c.classList.add("service-card--inview"));
    return;
  }

  grid.querySelectorAll(".service-card").forEach((card) => {
    const idx = Number(card.getAttribute("data-service-index") || "1");
    card.classList.add(`service-card--fx-${idx}`);
  });

  const io = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }
        obs.unobserve(grid);
        grid.querySelectorAll(".service-card").forEach((card) => {
          const idx = Number(card.getAttribute("data-service-index") || "1");
          const delay = Math.max(0, idx - 1) * 120;
          window.setTimeout(() => {
            card.classList.add("service-card--inview");
          }, delay);
        });
      });
    },
    { threshold: 0.14, rootMargin: "0px 0px -5% 0px" }
  );
  io.observe(grid);
}

export function initAboutSectionEntrances() {
  const head = document.querySelector("#nosotros .section-head");
  const cards = document.querySelectorAll("#nosotros .profile-card");

  if (prefersReducedMotion()) {
    head?.classList.add("about-head--inview");
    cards.forEach((c) => {
      c.classList.add("profile-card--inview");
      c.querySelector(".profile-card__img")?.classList.add("profile-card__img--inview");
    });
    return;
  }

  if (head) {
    head.classList.add("about-head--prep");
    observeOnce(head, (node) => {
      node.classList.add("about-head--inview");
    });
  }

  cards.forEach((card, i) => {
    const img = card.querySelector(".profile-card__img");
    card.classList.add(i === 0 ? "profile-card--david" : "profile-card--jon");
    observeOnce(
      card,
      (node) => {
        node.classList.add("profile-card--inview");
        window.setTimeout(() => {
          img?.classList.add("profile-card__img--inview");
        }, 180);
      },
      { threshold: 0.2 }
    );
  });
}

function animateCount(el, end, suffix, durationMs) {
  const start = performance.now();
  const step = (now) => {
    const t = Math.min(1, (now - start) / durationMs);
    const eased = 1 - (1 - t) ** 3;
    const val = Math.round(end * eased);
    el.textContent = `${val}${suffix}`;
    if (t < 1) {
      requestAnimationFrame(step);
    } else {
      el.textContent = `${end}${suffix}`;
    }
  };
  requestAnimationFrame(step);
}

export function initStatsCardEntrances() {
  const grid = document.querySelector(".stats-grid");
  if (!grid) {
    return;
  }

  const statsHead = document.querySelector("#estadisticas .section-head");
  const cards = grid.querySelectorAll(".stats-card");

  if (prefersReducedMotion()) {
    statsHead?.classList.add("about-head--inview");
    cards.forEach((card) => {
      card.classList.add("stats-card--inview");
      runStatValueAnimation(card, true);
    });
    return;
  }

  if (statsHead) {
    statsHead.classList.add("about-head--prep");
    observeOnce(statsHead, (node) => {
      node.classList.add("about-head--inview");
    });
  }

  const io = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }
        obs.unobserve(grid);
        cards.forEach((card, index) => {
          window.setTimeout(() => {
            card.classList.add("stats-card--inview");
            runStatValueAnimation(card);
          }, index * 150);
        });
      });
    },
    { threshold: 0.22, rootMargin: "0px 0px -8% 0px" }
  );
  io.observe(grid);
}

function runStatValueAnimation(card, instant = false) {
  const valEl = card.querySelector(".stats__value");
  if (!valEl) {
    return;
  }

  if (valEl.classList.contains("stats__value--word")) {
    valEl.classList.add("stats-value-word--inview");
    return;
  }

  if (valEl.classList.contains("stats__value--infinity")) {
    valEl.classList.add("stats-value-infinity--inview");
    return;
  }

  const end = Number(valEl.getAttribute("data-count"));
  const suffix = valEl.getAttribute("data-suffix") ?? "";
  if (!Number.isFinite(end)) {
    return;
  }

  if (instant) {
    valEl.textContent = `${end}${suffix}`;
    return;
  }

  valEl.textContent = suffix ? `0${suffix}` : "0";
  animateCount(valEl, end, suffix, 820);
}

export function initContactSectionEntrances() {
  const contactHead = document.querySelector("#contacto > .section-head");
  const intro = document.querySelector(".contact-panel--intro");
  const formPanel = document.querySelector(".contact-panel--form");
  const form = document.getElementById("contact-form");

  if (prefersReducedMotion()) {
    contactHead?.classList.add("about-head--inview");
    intro?.classList.add("contact-intro--inview");
    formPanel?.classList.add("contact-form-panel--inview");
    form?.querySelectorAll(".contact-form__reveal").forEach((n) => n.classList.add("contact-field--inview"));
    return;
  }

  if (contactHead) {
    contactHead.classList.add("about-head--prep");
    observeOnce(contactHead, (node) => {
      node.classList.add("about-head--inview");
    });
  }

  if (intro) {
    intro.classList.add("contact-intro--prep");
    observeOnce(intro, (n) => n.classList.add("contact-intro--inview"));
  }

  if (formPanel && form) {
    formPanel.classList.add("contact-form-panel--prep");

    const title = form.querySelector(".contact-form__title");
    const sub = form.querySelector(".contact-form__subtitle");
    const fieldEls = [title, sub, ...form.querySelectorAll(".row > div"), form.querySelector("#contact-submit")].filter(
      Boolean
    );
    fieldEls.forEach((el) => {
      el.classList.add("contact-form__reveal", "contact-field--prep");
    });

    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }
          obs.unobserve(formPanel);
          window.setTimeout(() => {
            formPanel.classList.add("contact-form-panel--inview");
          }, 150);
          fieldEls.forEach((el, i) => {
            window.setTimeout(() => {
              el.classList.add("contact-field--inview");
            }, 150 + 80 + i * 80);
          });
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    io.observe(formPanel);
  }
}

export function initFooterEntrances() {
  const footer = document.querySelector(".site-footer");
  if (!footer) {
    return;
  }

  const brand = footer.querySelector(".site-footer__brand-block");
  const nav = footer.querySelector(".site-footer__nav");
  const legal = footer.querySelector(".site-footer__legal");
  const copy = footer.querySelector(".site-footer__copy");

  if (prefersReducedMotion()) {
    brand?.classList.add("footer-piece--inview");
    nav?.classList.add("footer-piece--inview");
    legal?.classList.add("footer-piece--inview");
    copy?.classList.add("footer-piece--inview");
    return;
  }

  [brand, nav, legal, copy].forEach((el, i) => {
    if (!el) {
      return;
    }
    el.classList.add("footer-piece--prep");
  });

  observeOnce(
    footer,
    () => {
      brand?.classList.add("footer-piece--inview");
      window.setTimeout(() => {
        nav?.classList.add("footer-piece--inview");
        legal?.classList.add("footer-piece--inview");
      }, 100);
      window.setTimeout(() => copy?.classList.add("footer-piece--inview"), 200);
    },
    { threshold: 0.2 }
  );
}

export function initAllSectionEntrances() {
  initSectionDividerDraw();
  initServiciosSectionHead();
  initServicesCardEntrances();
  initAboutSectionEntrances();
  initStatsCardEntrances();
  initContactSectionEntrances();
  initFooterEntrances();
}
