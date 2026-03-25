# DJ Create — sitio estático (GitHub Pages)

Proyecto en HTML, CSS y JavaScript puro, listo para publicar en GitHub Pages.

**Sitio publicado:** https://djcreateweb.com

## Estructura en la raíz

- `index.html` — única página HTML
- `CNAME`, `robots.txt`, `sitemap.xml`, `manifest.webmanifest`, `.gitignore`

## `assets/`

- `assets/css/` — `main.css`, `variables.css`
- `assets/js/` — módulos ES (`main.js`, `lang.js`, `loader.js`, `particles.js`, `cursor.js`, `hero-plasma.js`, `section-entrances.js`, `scroll-lock.js`, `animations.js`, `card-effects.js`, `zoom-lock.js`)
- `assets/images/` — favicon, OG, placeholders

## Formspree

1. Crea el formulario en [Formspree](https://formspree.io) asociado a `djcreateweb@gmail.com`.
2. Copia el endpoint `https://formspree.io/f/TU_ID`.
3. Sustituye el atributo `action` del `<form id="contact-form">` en `index.html`.

## Deploy en GitHub Pages

1. Sube el repositorio a GitHub.
2. **Settings → Pages**: rama `main` (o `gh-pages`) y carpeta **/** (raíz).
3. Dominio personalizado: archivo `CNAME` y DNS según tu proveedor; activa **Enforce HTTPS**.

## DNS (ejemplo GitHub Pages)

- Registros **A** hacia las IPs de GitHub Pages (documentación oficial).
- **CNAME** de `www` hacia `usuario.github.io` si aplica.
