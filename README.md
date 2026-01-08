# maquetav2 (Vite)

Actualización moderna del proyecto de maquetación usando Vite para compilar SCSS + JS con una salida limpia en `dist/assets`.

## Requisitos

- Node.js 18+ recomendado

## Resumen

- **CORE compartido** en `src/common/` (foundations, settings, tools, generic, objects, utilities, vendor)
- **Dos variantes de sitio**: FIB y HUB, cada una con su propia estructura de archivos
- **Código común**: `src/common/js/app.common.js` y módulos compartidos
- **Código específico**: Cada variante puede tener componentes y estilos exclusivos

## Estructura

```
maquetav2/
  src/
    common/                    # Código compartido entre FIB y HUB
      js/
        app.common.js          # Lógica JS compartida (AOS/slider/carousel on-demand, etc.)
        modules/               # Módulos JS compartidos (nav, tabs, accordion, etc.)
      scss/
        settings/              # Variables y configuración SCSS
        tools/                 # Mixins y funciones
        foundations/           # Tokens de diseño (colores, tipografía, etc.)
        generic/               # Estilos base y reset
        objects/               # Patrones de layout
        utilities/             # Clases de utilidad
        vendor/                # Estilos de librerías externas
        components/            # Componentes compartidos
          _components.FIB.scss # Índice de componentes para FIB
          _components.HUB.scss # Índice de componentes para HUB
    FIB/                       # Código específico de FIB
      js/
        app.FIB.js             # Entrada FIB (importa SCSS + lógica común)
      scss/
        app.FIB.scss           # Bundle SCSS de FIB
        components/            # Componentes exclusivos de FIB
        overrides/             # Sobreescrituras específicas de FIB
    HUB/                       # Código específico de HUB
      js/
        app.HUB.js             # Entrada HUB (importa SCSS + lógica común)
      scss/
        app.HUB.scss           # Bundle SCSS de HUB
        components/            # Componentes exclusivos de HUB
        overrides/             # Sobreescrituras específicas de HUB
    js/
      app.js                   # Bundle legacy (todo en uno, opcional)
    scss/
      app.scss                 # SCSS legacy (todo en uno, opcional)
  pages_FIB/                   # HTML de FIB para desarrollo
  pages_HUB/                   # HTML de HUB para desarrollo
  index.html                   # Entrada base de dev
  index.FIB.html               # Entrada dev FIB
  index.HUB.html               # Entrada dev HUB
  vite.config.js               # Multi-entrada con salidas separadas
  dist-FIB/                    # Build de FIB (generado)
  dist-HUB/                    # Build de HUB (generado)
```

## Scripts

- `npm run dev`          → servidor de desarrollo base
- `npm run dev:FIB`      → servidor de desarrollo y abre `index.FIB.html`
- `npm run dev:HUB`      → servidor de desarrollo y abre `index.HUB.html`
- `npm run build`        → build completo (app legacy + todas las variantes)
- `npm run build:FIB`    → build solo FIB (genera `dist-FIB/`)
- `npm run build:HUB`    → build solo HUB (genera `dist-HUB/`)
- `npm run preview`      → sirve el build localmente

## Desarrollo

- FIB: `npm run dev:FIB` y abre `http://localhost:5173/pages_FIB/*.html`.
- HUB: `npm run dev:HUB` y abre `http://localhost:5173/pages_HUB/*.html`.
- Las páginas sueltas deben incluir el script de su variante:
  - FIB: `<script type="module" src="/src/FIB/js/app.FIB.js"></script>`
  - HUB: `<script type="module" src="/src/HUB/js/app.HUB.js"></script>`

## Build

- `npm run build` genera el bundle legacy completo en `dist/`
- `npm run build:FIB` genera solo FIB:
  - Salida: `dist-FIB/assets/js/app.js` y `css/app.css`
  - Incluye solo componentes y estilos de FIB
- `npm run build:HUB` genera solo HUB:
  - Salida: `dist-HUB/assets/js/app.js` y `css/app.css`
  - Incluye solo componentes y estilos de HUB
- Sourcemaps solo en dev para builds más ligeros

## Organización de Código

### Componentes compartidos (SCSS)

- Edita `src/common/scss/components/_components.FIB.scss` o `_components.HUB.scss` para añadir/quitar componentes compartidos.
- Las capas CORE (settings, tools, foundations, vendor, generic, objects, utilities) están en `src/common/scss/`.

### Código específico por variante

**FIB:**
- Componentes exclusivos: `src/FIB/scss/components/`
- Estilos específicos: `src/FIB/scss/overrides/`
- Lógica JS exclusiva: `src/FIB/js/`
- Importar en `src/FIB/scss/app.FIB.scss`

**HUB:**
- Componentes exclusivos: `src/HUB/scss/components/`
- Estilos específicos: `src/HUB/scss/overrides/`
- Lógica JS exclusiva: `src/HUB/js/`
- Importar en `src/HUB/scss/app.HUB.scss`

### Módulos JavaScript

- Módulos compartidos: `src/common/js/modules/`
- Lógica común: `src/common/js/app.common.js` (importado automáticamente por ambas variantes)

## Salida del Build

- `npm run build` genera todos los bundles en `dist/`
- `npm run build:FIB` genera solo FIB en `dist-FIB/assets/`:
  - `dist-FIB/assets/js/app.js`
  - `dist-FIB/assets/css/app.css`
  - `dist-FIB/assets/images/` y `fonts/`
- `npm run build:HUB` genera solo HUB en `dist-HUB/assets/`:
  - `dist-HUB/assets/js/app.js`
  - `dist-HUB/assets/css/app.css`
  - `dist-HUB/assets/images/` y `fonts/`
- Los archivos de cada carpeta deben copiarse manualmente al theme de OctoberCMS correspondiente.

## Notas

- Autoprefixer se configura vía `postcss.config.js` y `.browserslistrc`.
- Alias disponibles en Vite:
  - `@` → `src/`
  - `@common` → `src/common/`
  - `@FIB` → `src/FIB/`
  - `@HUB` → `src/HUB/`
- Ajusta `resolve.alias` en `vite.config.js` si necesitas alias adicionales.
