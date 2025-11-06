# maquetav2 (Vite)

Actualización moderna del proyecto de maquetación usando Vite para compilar SCSS + JS con una salida limpia en `dist/assets`.

## Requisitos

- Node.js 18+ recomendado

## Scripts

- `npm run dev` – servidor de desarrollo con HMR
- `npm run build` – build de producción a `dist/`
- `npm run preview` – sirve el build localmente

## Estructura

```
maquetav2/
  src/
    js/app.js      # punto de entrada JS, importa SCSS
    scss/app.scss  # SCSS principal
  index.html       # entrada para Vite (dev) y rollup (build)
  vite.config.js   # salida en dist/assets/{css,js,images,fonts}
```

## Migración desde `maqueta`

- Copia tus fuentes desde `maqueta/src/assets/` a `maquetav2/src/` o importa archivos concretos desde el path relativo.
- Si quieres mantener los nombres de salida (`app.css`, `app.js`), mantén `src/js/app.js` importando `src/scss/app.scss`.

## Integración con OctoberCMS

- Puedes copiar los artefactos de `dist/assets` a `themes/impulsabalears/assets/` según necesites, o configurar un paso de despliegue que sincronice estas carpetas.

## Notas

- Autoprefixer se configura vía `postcss.config.js` y `.browserslistrc`.
- Si necesitas alias adicionales, ajusta `resolve.alias` en `vite.config.js`.

### Producción y manifest

- El build genera nombres con hash para JS/CSS/imagenes y un `dist/manifest.json`.
- En plantillas (CMS, server-side) resuelve las rutas leyendo el `manifest.json` para obtener el nombre final.
- Alternativa rápida: copia los archivos a tu theme y referencia con el nombre del manifest, o añade un paso de despliegue que reescriba las referencias.

### Copiar al tema (OctoberCMS)

- Flujo recomendado si el theme NO debe leer el manifest:
  1. Ejecuta `npm run build:theme` en `maquetav2`.
  2. El script copia `dist/assets` a `themes/impulsabalears/assets` y además escribe nombres estables:
     - `themes/impulsabalears/assets/js/app.js`
     - `themes/impulsabalears/assets/css/app.css`
  3. En el theme referencia solo esos dos ficheros. Los chunks con hash se cargan automáticamente desde el mismo directorio.

- Comando individual: `npm run sync:theme` (requiere haber ejecutado `npm run build` antes).
