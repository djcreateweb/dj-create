const STORAGE_KEY = "dj-create-lang";

const translations = {
  es: {
    "nav.menuOpen": "Abrir menú de navegación",
    "nav.menuClose": "Cerrar menú de navegación",
    "nav.inicio": "Inicio",
    "nav.servicios": "Servicios",
    "nav.nosotros": "Nosotros",
    "nav.contacto": "Contacto",
    "hero.eyebrow": "Agencia de Desarrollo Web",
    "hero.subtitle":
      "Creamos páginas web profesionales para tu negocio. Modernas, rápidas y listas para vender.",
    "hero.cta1": "Ver nuestros servicios",
    "hero.cta2": "Contáctanos",
    "hero.scroll": "Desplazar",
    "services.title": "Qué ofrecemos",
    "services.subtitle": "Páginas web a medida para cualquier tipo de negocio",
    "services.restaurant.title": "Restaurantes y Hostelería",
    "services.restaurant.desc":
      "Web con carta digital interactiva, galería de platos, sistema de reservas y mapa de ubicación. Diseño cálido y apetecible que convierte visitas en clientes.",
    "services.clinic.title": "Clínicas y Salud",
    "services.clinic.desc":
      "Página profesional y de confianza con información de servicios, equipo médico, cita online y cumplimiento RGPD. Transmite seriedad desde el primer clic.",
    "services.tobacco.title": "Estancos y Comercios",
    "services.tobacco.desc":
      "Presencia online profesional con catálogo de productos, horarios, ubicación y ficha de Google Maps integrada. Tus clientes te encontrarán antes que a la competencia.",
    "services.salon.title": "Peluquerías y Estética",
    "services.salon.desc":
      "Web con galería de trabajos, sistema de citas online, precios y redes sociales integradas. Diseño moderno que refleja tu estilo y atrae nuevos clientes.",
    "services.tech.title": "Informáticas y Tecnología",
    "services.tech.desc":
      "Web técnica y moderna que muestra tus servicios, precios, garantías y testimonios. Genera confianza en el sector más exigente.",
    "services.local.title": "Cualquier negocio local",
    "services.local.desc":
      "Si tienes un negocio que no está en esta lista, también podemos ayudarte. Analizamos tu sector y creamos la web perfecta para ti.",
    "about.title": "Quiénes somos",
    "about.subtitle":
      "Dos amigos con pasión por la tecnología y ganas de demostrar lo que sabemos hacer",
    "about.david.role": "Desarrollador Web y Co-fundador",
    "about.david.tag1": "JavaScript",
    "about.david.tag2": "Laravel",
    "about.david.tag3": "UI / UX",
    "about.david.tag4": "Accesibilidad",
    "about.david.bio":
      "Estudiante de 2º de DAW con una pasión real por el desarrollo web. Soy una persona educada, puntual y muy responsable. Me tomo cada proyecto como si fuera el mío propio y no descanso hasta que el resultado es exactamente lo que el cliente necesita. Años de amistad con Jon me han enseñado que juntos trabajamos mejor que por separado.",
    "about.jon.role": "Desarrollador Web y Co-fundador",
    "about.jon.tag1": "PHP",
    "about.jon.tag2": "APIs",
    "about.jon.tag3": "Bases de datos",
    "about.jon.tag4": "DevOps",
    "about.jon.bio":
      "2º de DAW y muchas horas invertidas aprendiendo lo que las empresas realmente necesitan. Soy productivo, directo y siempre entrego lo que prometo. Creo que la tecnología bien aplicada puede cambiar un negocio por completo, y eso es exactamente lo que queremos hacer por nuestros clientes.",
    "stats.sectionTitle": "Nuestros números",
    "stats.years": "Años de formación",
    "stats.devs": "Desarrolladores especializados",
    "stats.growValue": "Ilimitadas",
    "stats.grow": "Ganas de crecer",
    "stats.commitment": "Compromiso con cada proyecto",
    "contact.title": "Contacto",
    "contact.subtitle": "Hablemos. Cuéntanos qué necesitas y te respondemos en menos de 24 horas",
    "contact.badge": "Contacto directo",
    "contact.follow": "Síguenos",
    "contact.social.instagram": "Instagram",
    "contact.social.linkedin": "LinkedIn",
    "contact.social.github": "GitHub",
    "contact.formTitle": "Cuéntanos tu proyecto",
    "contact.formSubtitle": "Rellena el formulario y te escribimos pronto.",
    "contact.response": "Respondemos en menos de 24 horas",
    "form.name": "Nombre completo",
    "form.email": "Email",
    "form.business": "Nombre del negocio",
    "form.optional": "(opcional)",
    "form.type": "Tipo de negocio",
    "form.type.placeholder": "Selecciona una opción",
    "form.type.restaurant": "Restaurante",
    "form.type.clinic": "Clínica",
    "form.type.tobacco": "Estanco",
    "form.type.salon": "Peluquería",
    "form.type.tech": "Informática",
    "form.type.other": "Otro",
    "form.message": "Mensaje",
    "form.phone": "Teléfono",
    "form.phonePlaceholder": "Por ejemplo 600 000 000",
    "form.phoneHint": "Por si prefieres que te llamemos nosotros",
    "form.hint.name": "Así sabremos cómo dirigirnos a ti.",
    "form.hint.email": "Usaremos este correo solo para responderte.",
    "form.hint.message": "Cuantos más detalles, mejor podremos ayudarte (mín. 20 caracteres).",
    "form.submit": "Enviar mensaje",
    "form.error.name": "Indica tu nombre.",
    "form.error.email": "Introduce un email válido.",
    "form.error.message": "El mensaje debe tener al menos 20 caracteres.",
    "form.error.generic": "Revisa los campos marcados.",
    "form.error.rate": "Demasiados intentos. Espera un minuto e inténtalo de nuevo.",
    "form.success": "¡Mensaje enviado! Te responderemos pronto.",
    "privacy.title": "Política de privacidad (RGPD)",
    "privacy.p1":
      "Responsable: DJ Create (David Alcaraz y Jon Franklin). Finalidad: atender tu solicitud de contacto y, en su caso, enviarte información relacionada con nuestros servicios. Legitimación: tu consentimiento al enviar el formulario e interés legítimo en responder consultas.",
    "privacy.p2":
      "Los datos que nos facilites (nombre, email, teléfono si lo indicas, mensaje y datos del negocio) se conservarán el tiempo necesario para gestionar tu petición y los plazos legales aplicables.",
    "privacy.p3":
      "No cederemos tus datos a terceros salvo obligación legal. Puedes ejercer los derechos de acceso, rectificación, supresión, oposición, limitación y portabilidad escribiéndonos a djcreateweb@gmail.com.",
    "privacy.p4":
      "Tienes derecho a presentar una reclamación ante la Agencia Española de Protección de Datos (www.aepd.es) si consideras que el tratamiento no se ajusta a la normativa.",
    "privacy.p5":
      "Al usar este formulario confirmas que has leído esta información. Puedes retirar tu consentimiento en cualquier momento sin afectar a la licitud del tratamiento previo.",
    "modal.close": "Cerrar",
    "legal.title": "Aviso legal",
    "legal.p1":
      "Titular del sitio: DJ Create (David Alcaraz y Jon Franklin). Este sitio web tiene fines informativos y de contacto comercial. El acceso y uso del sitio implica la aceptación de las condiciones vigentes en cada momento.",
    "legal.p2":
      "Las marcas, logotipos y contenidos publicados son propiedad de sus respectivos titulares. Queda prohibida la reproducción sin autorización expresa salvo los usos permitidos por la ley.",
    "legal.p3":
      "DJ Create no se hace responsable de los enlaces a sitios de terceros ni del uso que se haga de la información facilitada a través de este sitio. Para cualquier consulta jurídica puede contactarnos en djcreateweb@gmail.com o por los medios indicados en la web.",
    "footer.copy": "© 2025 DJ Create — David Alcaraz y Jon Franklin. Todos los derechos reservados.",
    "footer.tagline": "Hecho con código, café y muchas ganas.",
    "footer.privacy": "Política de privacidad",
    "footer.legal": "Aviso legal",
  },
  en: {
    "nav.menuOpen": "Open navigation menu",
    "nav.menuClose": "Close navigation menu",
    "nav.inicio": "Home",
    "nav.servicios": "Services",
    "nav.nosotros": "About",
    "nav.contacto": "Contact",
    "hero.eyebrow": "Web Development Agency",
    "hero.subtitle":
      "We build professional websites for your business. Modern, fast and ready to sell.",
    "hero.cta1": "See our services",
    "hero.cta2": "Contact us",
    "hero.scroll": "Scroll",
    "services.title": "What we offer",
    "services.subtitle": "Tailored websites for any kind of business",
    "services.restaurant.title": "Restaurants & Hospitality",
    "services.restaurant.desc":
      "Site with interactive digital menu, dish gallery, booking system and location map. Warm, appetising design that turns visits into customers.",
    "services.clinic.title": "Clinics & Healthcare",
    "services.clinic.desc":
      "Professional, trustworthy page with services, medical team, online appointments and GDPR-aware flows. Serious from the first click.",
    "services.tobacco.title": "Tobacco shops & Retail",
    "services.tobacco.desc":
      "Professional online presence with product catalogue, opening hours, location and Google Maps. Customers find you before the competition.",
    "services.salon.title": "Hair & Beauty",
    "services.salon.desc":
      "Website with portfolio, online booking, pricing and social links. Modern design that reflects your style and attracts new clients.",
    "services.tech.title": "IT & Technology",
    "services.tech.desc":
      "Technical, modern site showcasing services, pricing, warranties and testimonials. Builds trust in the most demanding sector.",
    "services.local.title": "Any local business",
    "services.local.desc":
      "Not on the list? We can still help. We analyse your sector and craft the right website for you.",
    "about.title": "Who we are",
    "about.subtitle": "Two friends passionate about tech, ready to prove what we can build",
    "about.david.role": "Web Developer & Co-founder",
    "about.david.tag1": "JavaScript",
    "about.david.tag2": "Laravel",
    "about.david.tag3": "UI / UX",
    "about.david.tag4": "Accessibility",
    "about.david.bio":
      "Second-year DAW student with a real passion for web development. Polite, punctual and highly responsible. I treat every project as if it were my own and do not stop until the result matches what the client needs. Years of friendship with Jon taught me we work better together than apart.",
    "about.jon.role": "Web Developer & Co-founder",
    "about.jon.tag1": "PHP",
    "about.jon.tag2": "APIs",
    "about.jon.tag3": "Databases",
    "about.jon.tag4": "DevOps",
    "about.jon.bio":
      "Second-year DAW and many hours learning what companies actually need. Productive, straightforward and I deliver what I promise. Technology applied well can transform a business—that is what we want for our clients.",
    "stats.sectionTitle": "Our numbers",
    "stats.years": "Years of training",
    "stats.devs": "Specialised developers",
    "stats.growValue": "Unlimited",
    "stats.grow": "Drive to grow",
    "stats.commitment": "Commitment to every project",
    "contact.title": "Contact",
    "contact.subtitle": "Let's talk. Tell us what you need and we'll reply in under 24 hours",
    "contact.badge": "Direct contact",
    "contact.follow": "Follow us",
    "contact.social.instagram": "Instagram",
    "contact.social.linkedin": "LinkedIn",
    "contact.social.github": "GitHub",
    "contact.formTitle": "Tell us about your project",
    "contact.formSubtitle": "Fill in the form and we will get back to you soon.",
    "contact.response": "We reply in under 24 hours",
    "form.name": "Full name",
    "form.email": "Email",
    "form.business": "Business name",
    "form.optional": "(optional)",
    "form.type": "Business type",
    "form.type.placeholder": "Choose an option",
    "form.type.restaurant": "Restaurant",
    "form.type.clinic": "Clinic",
    "form.type.tobacco": "Tobacco shop",
    "form.type.salon": "Hair salon",
    "form.type.tech": "IT services",
    "form.type.other": "Other",
    "form.message": "Message",
    "form.phone": "Phone",
    "form.phonePlaceholder": "e.g. +34 600 000 000",
    "form.phoneHint": "In case you prefer us to call you",
    "form.hint.name": "How we should address you.",
    "form.hint.email": "We will only use this email to reply.",
    "form.hint.message": "The more detail, the better we can help (min. 20 characters).",
    "form.submit": "Send message",
    "form.error.name": "Please enter your name.",
    "form.error.email": "Enter a valid email address.",
    "form.error.message": "Message must be at least 20 characters.",
    "form.error.generic": "Please check the highlighted fields.",
    "form.error.rate": "Too many attempts. Wait a minute and try again.",
    "form.success": "Message sent! We'll get back to you soon.",
    "privacy.title": "Privacy policy (GDPR)",
    "privacy.p1":
      "Controller: DJ Create (David Alcaraz and Jon Franklin). Purpose: handle your contact request and, where appropriate, send information related to our services. Lawful basis: your consent when submitting the form and legitimate interest in responding to enquiries.",
    "privacy.p2":
      "The data you provide (name, email, phone if given, message and business details) will be kept for as long as needed to handle your request and any applicable legal retention periods.",
    "privacy.p3":
      "We will not share your data with third parties unless required by law. You may exercise rights of access, rectification, erasure, objection, restriction and portability by writing to djcreateweb@gmail.com.",
    "privacy.p4":
      "You have the right to lodge a complaint with your local data protection authority if you believe processing does not comply with applicable law.",
    "privacy.p5":
      "By using this form you confirm you have read this information. You may withdraw consent at any time without affecting the lawfulness of processing carried out before withdrawal.",
    "modal.close": "Close",
    "legal.title": "Legal notice",
    "legal.p1":
      "Site owner: DJ Create (David Alcaraz and Jon Franklin). This website is for information and business contact purposes. Access and use imply acceptance of the terms in force at any time.",
    "legal.p2":
      "Trademarks, logos and published content belong to their respective owners. Reproduction without express permission is prohibited except as permitted by law.",
    "legal.p3":
      "DJ Create is not responsible for third-party links or how information provided through this site is used. For legal enquiries you can contact us at djcreateweb@gmail.com or via the channels indicated on the site.",
    "footer.copy": "© 2025 DJ Create — David Alcaraz and Jon Franklin. All rights reserved.",
    "footer.tagline": "Built with code, coffee and plenty of drive.",
    "footer.privacy": "Privacy policy",
    "footer.legal": "Legal notice",
  },
};

function getStoredLang() {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    if (v === "en" || v === "es") {
      return v;
    }
  } catch {
    /* storage no disponible */
  }
  return "es";
}

function setStoredLang(lang) {
  try {
    localStorage.setItem(STORAGE_KEY, lang);
  } catch {
    /* ignorar */
  }
}

function applyTranslations(lang) {
  const dict = translations[lang] ?? translations.es;
  document.documentElement.lang = lang;

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (!key || !dict[key]) {
      return;
    }
    el.textContent = dict[key];
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.getAttribute("data-i18n-placeholder");
    if (!key || !dict[key] || !("placeholder" in el)) {
      return;
    }
    el.placeholder = dict[key];
  });

  document.querySelectorAll("option[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (!key || !dict[key]) {
      return;
    }
    el.textContent = dict[key];
  });
}

function updateLangButtons(lang) {
  document.querySelectorAll(".site-nav__lang-btn").forEach((btn) => {
    const isActive = btn.getAttribute("data-lang") === lang;
    btn.classList.toggle("is-active", isActive);
    btn.setAttribute("aria-pressed", String(isActive));
  });
}

export function setLang(lang) {
  const next = lang === "en" ? "en" : "es";
  setStoredLang(next);
  applyTranslations(next);
  updateLangButtons(next);
  document.dispatchEvent(new CustomEvent("djdigital:langchange", { detail: { lang: next } }));
}

export function initLang() {
  const initial = getStoredLang();
  applyTranslations(initial);
  updateLangButtons(initial);

  document.querySelectorAll(".site-nav__lang-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const lang = btn.getAttribute("data-lang");
      if (lang) {
        setLang(lang);
      }
    });
  });
}

export function t(key, lang) {
  const l = lang ?? getStoredLang();
  return translations[l]?.[key] ?? translations.es[key] ?? key;
}
