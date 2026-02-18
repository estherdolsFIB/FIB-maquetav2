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

pnpm run dev:FIB    # Opens index.FIB.html (jQuery dev environment)
pnpm run dev:HUB    # Opens index.HUB.html (Vue 3 dev environment)
pnpm run build:FIB  # Production build → dist-FIB/ (Legacy assets)
pnpm run build:HUB  # Production build → dist-HUB/ (Modern Vue assets)
pnpm run build      # Build all variants

## Package Manager
- **pnpm** is the required package manager (no npm/yarn).
- `.npmrc` hoists jQuery-related packages for FIB legacy compatibility.
- Build scripts approved via `pnpm.onlyBuiltDependencies` in `package.json`.

## Architecture & Framework Split

### Global Shared (`src/common/`)
Contains **Technical Infrastructure** only. No design tokens or business logic.
* **scss/**: Breakpoints, mixins, reset, layout objects (grid/wrapper), and utility generators.
* **js/modules/**: Vanilla JS helper functions (independent of jQuery/Vue).

### FIB (Legacy Environment)
* **EntryPoint**: `src/FIB/js/app.FIB.js`.
* **Dependencies**: jQuery (Global `window.$`), Slick, AOS, FullCalendar.
* **Logic**: Uses `app.common.js` for legacy module initialization.

### HUB (Modern Environment)
* **EntryPoint**: `src/HUB/js/app.HUB.js`.
* **Dependencies**: **Vue 3**, Vanilla JS. **Strictly NO jQuery allowed**.
* **Logic**: Initializes a Vue instance mounted on `#app-hub`.
* **Components**: Located in `src/HUB/js/components/` as `.vue` files (SFC).

---

## SCSS Layer Order (ITCSS)
Both projects **MUST** follow this import order in their respective `app.scss`:

1.  **Settings (common)**: Config, Functions, Breakpoints.
2.  **Tools (common)**: Mixins & Helpers.
3.  **Foundations (per variant)**: Design Tokens (CSS Variables & Sass Maps).
4.  **Vendor (per variant)**: Third-party CSS (AOS, Slick, etc.).
5.  **Generic (common reset + per variant fonts)**.
6.  **Objects (common)**: Layout abstractions (depends on Foundations).
7.  **Components (per variant)**: UI Components.
8.  **Utilities (common)**: Helper classes (depends on Foundations).

---

## Key Conventions

### 1. Developing for HUB (Vue 3)
* **SFC**: Use Single File Components (`.vue`).
* **Styles**: Component styles should be inside `<style scoped>` or in `src/HUB/scss/components/`.
* **Naming**: PascalCase for Vue components (e.g., `ResourceCard.vue`) and BEM for SCSS.
* **No jQuery**: Avoid any `$` or `jQuery` calls in the HUB directory.

### 2. Design Tokens
Each variant defines its own identity in its `foundations/` folder:
* **_foundations.colors.scss**: Defines `--color-primary` and `$f-colors` map.
* **_foundations.spaces.