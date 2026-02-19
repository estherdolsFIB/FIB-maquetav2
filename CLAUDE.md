# CLAUDE.md — FIB-maquetav2 (Hybrid Architecture)

## Project Overview
Frontend maquetation project for **Fundació Impulsa Balears** (FIB) and **HUB** sites. Generates compiled CSS/JS bundles for OctoberCMS themes.
- **FIB Site**: Legacy-compatible environment, based on **jQuery**.
- **HUB Site (Circular Economy)**: Modern environment, based on **Vue 3** (No jQuery).

## Tech Stack
- **Bundler**: Vite 4.5+ (configured for dual-environment build).
- **Core (HUB)**: Vue 3 (SFC), Vanilla JS (ES6+).
- **Core (FIB)**: jQuery 3.7, Legacy JS Modules.
- **CSS**: SCSS (ITCSS architecture), Autoprefixer.
- **Node**: 18+ required.

## Commands
- `pnpm run dev:FIB`     # Opens index.FIB.html (jQuery dev environment)
- `pnpm run dev:HUB`     # Opens index.HUB.html (Vue 3 dev environment)
- `pnpm run build:FIB`   # Production build → dist-FIB/ (Legacy assets)
- `pnpm run build:HUB`   # Production build → dist-HUB/ (Modern Vue assets)
- `pnpm run build`       # Build all variants

## Package Manager
- **pnpm** is the required package manager (no npm/yarn).
- `.npmrc` hoists jQuery-related packages for FIB legacy compatibility.

## Architecture & Framework Split

### Global Shared (`src/common/`)
Contiene infraestructura técnica compartida.
* **scss/**: Breakpoints, mixins, reset, layout objects (grid/wrapper).
* **js/modules/**: Vanilla JS helper functions.

### FIB (Legacy Environment)
* **EntryPoint**: `src/FIB/js/app.FIB.js`.
* **Logic**: jQuery-heavy, compatible con plugins legacy.

### HUB (Modern Environment - Balear Circular Hub)
* **EntryPoint**: `src/HUB/js/app.HUB.js`.
* **Logic**: Vue 3 para interactividad compleja (filtros, mapas).
* **Hybrid Strategy**: Se prioriza la creación de componentes SCSS globales en `src/HUB/scss/components/` para que el CSS resultante (`app.css`) pueda usarse en OctoberCMS mediante partials HTML/Twig estándar.

---

## SCSS Layer Order (ITCSS)
Ambos proyectos siguen este orden en su `app.scss`:

1. **Settings**: Config, Functions, Breakpoints.
2. **Tools**: Mixins & Helpers.
3. **Foundations**: Design Tokens (Variables de color, tipografía).
4. **Vendor**: CSS de terceros.
5. **Generic**: Reset + Webfonts (Montserrat & Lato para HUB).
6. **Objects**: Estructuras de layout (wrappers, grids).
7. **Components**: UI Components (Header, Hero, Buttons).
8. **Utilities**: Clases de ayuda.

---

## Key Conventions (HUB Specific)

### 1. Typography & Colors (Balear Circular Hub)
* **Montserrat**: Usar para titulares y navegación (`.text-display`).
* **Lato**: Usar para cuerpo de texto y metadatos (`.text-body`).
* **Primary**: `#041E42` (Azul).
* **Accent**: `#C4D600` (Verde Lima).
* **Support**: `#00A94F` (Verde Hoja).

### 2. Header & Navigation (Estilo Imagen Referencia)
* **Clase**: `.hub-header`.
* **Diseño**: Fondo blanco, logo a la izquierda, menú central con tipografía Montserrat negrita.
* **Activo**: Los enlaces activos llevan un borde inferior de 3px color Accent (`#C4D600`).
* **Multiidioma**: El selector de idiomas usa Lato y se posiciona a la derecha.

### 3. Integración con OctoberCMS
* El build genera un `app.css` y un `app.js`.
* Los partials en OctoberCMS usarán clases CSS del HUB. 
* Los componentes Vue se montarán mediante IDs específicos (ej: `#hub-menu-root`) si requieren lógica JS.

### 4. Naming
* **SCSS**: Metodología BEM obligatoria (ej: `.hub-header__nav-item--active`).
* **Vue**: PascalCase para archivos `.vue`.