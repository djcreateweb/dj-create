// Version: 2.10.2
import { initLang, t } from "./lang.js";
import { initLoader } from "./loader.js";
import { initZoomLock } from "./zoom-lock.js";
import { initCursor } from "./cursor.js";
import { initParticles } from "./particles.js";
import { initHeroPlasma } from "./hero-plasma.js";
import { initScrollLock } from "./scroll-lock.js";
import { initCardFx, initInternalNavFx } from "./card-effects.js";
import { initSmoothLinks, initHeaderScroll, initGsapScroll } from "./animations.js";
import { initAllSectionEntrances } from "./section-entrances.js";

function setFieldError(id, message) {
  const box = document.getElementById(id);
  if (!box) {
    return;
  }
  if (message) {
    box.textContent = message;
    box.hidden = false;
  } else {
    box.textContent = "";
    box.hidden = true;
  }
}

function validateContactForm(form) {
  const name = form.querySelector("#contact-name");
  const email = form.querySelector("#contact-email");
  const message = form.querySelector("#contact-message");
  let ok = true;

  setFieldError("error-name", "");
  setFieldError("error-email", "");
  setFieldError("error-message", "");

  if (!name?.value.trim()) {
    setFieldError("error-name", t("form.error.name"));
    ok = false;
  }

  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email?.value.trim() || !emailRe.test(email.value.trim())) {
    setFieldError("error-email", t("form.error.email"));
    ok = false;
  }

  if (!message?.value.trim() || message.value.trim().length < 20) {
    setFieldError("error-message", t("form.error.message"));
    ok = false;
  }

  return ok;
}

function initContactForm() {
  const form = document.getElementById("contact-form");
  const submitBtn = document.getElementById("contact-submit");
  const status = document.getElementById("form-status");
  const spinner = submitBtn?.querySelector(".contact-form__spinner");

  if (!form || !submitBtn || !status) {
    return;
  }

  const route = form.getAttribute("action") ?? "/contacto";

  ["input", "blur"].forEach((evt) => {
    form.addEventListener(
      evt,
      () => {
        validateContactForm(form);
      },
      true
    );
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    status.textContent = "";
    status.classList.remove("is-success", "is-error");

    if (!validateContactForm(form)) {
      status.textContent = t("form.error.generic");
      status.classList.add("is-error");
      return;
    }

    submitBtn.disabled = true;
    submitBtn.classList.add("is-loading");
    if (spinner) {
      spinner.hidden = false;
    }

    const emailInput = form.querySelector("#contact-email");
    const replyHidden = form.querySelector('input[name="_replyto"]');
    if (replyHidden && emailInput) {
      replyHidden.value = emailInput.value.trim();
    }

    const formData = new FormData(form);

    try {
      const res = await fetch(route, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      let data = {};
      const ct = res.headers.get("content-type");
      if (ct?.includes("application/json")) {
        try {
          data = await res.json();
        } catch {
          data = {};
        }
      }

      const pickErr = (v) => (Array.isArray(v) ? v[0] : v);

      if (res.status === 429) {
        status.textContent = t("form.error.rate");
        status.classList.add("is-error");
        return;
      }

      if (res.ok) {
        const msg =
          typeof data.message === "string" && data.message.trim()
            ? data.message
            : t("form.success");
        status.textContent = msg;
        status.classList.add("is-success");
        form.reset();
        setFieldError("error-name", "");
        setFieldError("error-email", "");
        setFieldError("error-message", "");
      } else if (data.errors && typeof data.errors === "object") {
        status.textContent = t("form.error.generic");
        status.classList.add("is-error");
        const errs = data.errors;
        if (errs.name) {
          setFieldError("error-name", String(pickErr(errs.name)));
        }
        if (errs.email) {
          setFieldError("error-email", String(pickErr(errs.email)));
        }
        if (errs.message) {
          setFieldError("error-message", String(pickErr(errs.message)));
        }
      } else {
        status.textContent =
          typeof data.error === "string" && data.error.trim()
            ? data.error
            : t("form.error.generic");
        status.classList.add("is-error");
      }
    } catch {
      status.textContent = t("form.error.generic");
      status.classList.add("is-error");
    } finally {
      submitBtn.disabled = false;
      submitBtn.classList.remove("is-loading");
      if (spinner) {
        spinner.hidden = true;
      }
    }
  });
}

function syncNavToggleAria() {
  const toggle = document.getElementById("nav-toggle");
  const header = document.getElementById("site-header");
  if (!toggle || !header) {
    return;
  }
  const open = header.classList.contains("is-open");
  toggle.setAttribute("aria-label", open ? t("nav.menuClose") : t("nav.menuOpen"));
}

function initPrivacyModal() {
  const modal = document.getElementById("privacy-modal");
  const openBtn = document.getElementById("open-privacy-modal");
  const closeBtn = document.getElementById("privacy-modal-close");
  if (!modal || !openBtn || !closeBtn) {
    return;
  }

  const open = () => {
    modal.removeAttribute("hidden");
    document.body.style.overflow = "hidden";
  };

  const close = () => {
    if (modal.hasAttribute("hidden")) {
      return;
    }
    modal.setAttribute("hidden", "");
    document.body.style.overflow = "";
  };

  openBtn.addEventListener("click", open);
  closeBtn.addEventListener("click", close);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      close();
    }
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.hasAttribute("hidden")) {
      close();
    }
  });
}

function initMobileNav() {
  const header = document.getElementById("site-header");
  const toggle = document.getElementById("nav-toggle");
  const nav = document.getElementById("site-nav");
  if (!header || !toggle || !nav) {
    return;
  }

  syncNavToggleAria();
  document.addEventListener("djdigital:langchange", syncNavToggleAria);

  toggle.addEventListener("click", () => {
    const open = !header.classList.contains("is-open");
    header.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    syncNavToggleAria();
  });

  nav.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      header.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      syncNavToggleAria();
    });
  });
}

async function boot() {
  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }
  window.scrollTo(0, 0);

  initZoomLock();
  await initLoader();

  const scrollToTop = () => {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    window.scrollTo(0, 0);
  };
  scrollToTop();
  window.requestAnimationFrame(() => {
    scrollToTop();
    window.requestAnimationFrame(scrollToTop);
  });

  initLang();
  initCursor();
  initParticles();
  initHeroPlasma();
  initScrollLock();

  initAllSectionEntrances();
  initSmoothLinks();
  initHeaderScroll();
  initContactForm();
  initPrivacyModal();
  initLegalModal();
  initMobileNav();
  initCardFx();
  initInternalNavFx();

  window.requestAnimationFrame(() => {
    initGsapScroll();
    scrollToTop();
    window.requestAnimationFrame(scrollToTop);
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    void boot();
  }, { once: true });
} else {
  void boot();
}
