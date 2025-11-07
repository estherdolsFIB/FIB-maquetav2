# maquetav2 (Vite)

Actualización moderna del proyecto de maquetación usando Vite para compilar SCSS + JS con una salida limpia en `dist/assets`.

## Requisitos

- Node.js 18+ recomendado

## Resumen

- CORE compartido (foundations, settings, tools, generic, objects, utilities, vendor).
- Dos variantes de sitio: FIB y HUB, cada una decide qué componentes SCSS incluir.
- JS común en `src/js/app.common.js`, importado por cada entrada.

## Estructura

```
maquetav2/
  src/
    js/app.js       # bundle original (todo en uno)
    scss/app.scss   # SCSS original (todo en uno)
    js/
      app.FIB.js     # entrada FIB (importa app.FIB.scss + lógica común)
      app.HUB.js     # entrada HUB (importa app.HUB.scss + lógica común)
      app.common.js  # lógica JS compartida (AOS/slider/carousel on‑demand, etc.)
    scss/
      bundles/app.FIB.scss  # CORE + components.FIB
      bundles/app.HUB.scss  # CORE + components.HUB
      components/_components.FIB.scss  # Índice de componentes para FIB
      components/_components.HUB.scss  # Índice de componentes para HUB
  pages_FIB/  # HTML de FIB (dev)
  pages_HUB/  # HTML de HUB (dev)
  index.html       # entrada base de dev
  index.FIB.html   # entrada dev FIB (carga app.FIB.js)
  index.HUB.html   # entrada dev HUB (carga app.HUB.js)
  vite.config.js   # multi-entrada y salida en dist/assets/{css,js,images,fonts}
```

## Scripts

- `npm run dev`          → servidor de desarrollo base
- `npm run dev:FIB`      → servidor de desarrollo y abre `index.FIB.html`
- `npm run dev:HUB`      → servidor de desarrollo y abre `index.HUB.html`
- `npm run build`        → build completo (app, app.FIB, app.HUB)
- `npm run build:FIB`    → build solo FIB (app + app.FIB)
- `npm run build:HUB`    → build solo HUB (app + app.HUB)
- `npm run preview`      → sirve el build localmente
- `npm run sync:theme`   → copia bundles a `themes/impulsabalears/assets`
- `npm run build:theme`  → build + sync al theme

## Desarrollo

- FIB: `npm run dev:FIB` y abre `http://localhost:5173/pages_FIB/*.html`.
- HUB: `npm run dev:HUB` y abre `http://localhost:5173/pages_HUB/*.html`.
- Las páginas sueltas deben incluir el script de su variante:
  - FIB: `<script type="module" src="/src/js/app.FIB.js"></script>`
  - HUB: `<script type="module" src="/src/js/app.HUB.js"></script>`

## Build

- Sin `--mode`: genera todas las entradas (`app.*`, `app.FIB.*`, `app.HUB.*`).
- `--mode FIB`: genera `app.*` + `app.FIB.*`.
- `--mode HUB`: genera `app.*` + `app.HUB.*`.
- Sourcemaps solo en dev para builds más ligeros.

## Componentes por sitio (SCSS)

- Edita `src/scss/components/_components.FIB.scss` o `_components.HUB.scss` para añadir/quitar componentes.
- Las capas CORE (settings, tools, foundations, vendor, generic, objects, utilities) se importan desde los bundles `bundles/app.FIB.scss` y `bundles/app.HUB.scss`.

## Integración con OctoberCMS

- Copia artefactos desde `dist/assets` a `themes/impulsabalears/assets` o usa `npm run sync:theme`.
- Rutas estables generadas:
  - `themes/impulsabalears/assets/js/app.js` y `css/app.css`
  - `themes/impulsabalears/assets/js/app.FIB.js` y `css/app.FIB.css`
  - `themes/impulsabalears/assets/js/app.HUB.js` y `css/app.HUB.css`

## Notas

- Autoprefixer se configura vía `postcss.config.js` y `.browserslistrc`.
- Si necesitas alias adicionales, ajusta `resolve.alias` en `vite.config.js`.
