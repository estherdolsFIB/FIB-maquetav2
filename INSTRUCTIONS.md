# Instrucciones de Desarrollo

Guía práctica para trabajar con el proyecto maquetav2 (FIB y HUB).

---

## 📋 Índice

1. [Flujo de trabajo básico](#flujo-de-trabajo-básico)
2. [Trabajar con CSS/SCSS](#trabajar-con-cssscss)
3. [Trabajar con JavaScript](#trabajar-con-javascript)
4. [Compilar y desplegar](#compilar-y-desplegar)

---

## Flujo de trabajo básico

### Iniciar desarrollo

```bash
# Para FIB
npm run dev:FIB

# Para HUB
npm run dev:HUB
```

Esto abre el navegador en `http://localhost:5173/` con las páginas de prueba.

### Compilar para producción

```bash
# Compilar solo FIB
npm run build:FIB
# Resultado: dist-FIB/assets/js/app.js y css/app.css

# Compilar solo HUB
npm run build:HUB
# Resultado: dist-HUB/assets/js/app.js y css/app.css
```

---

## Trabajar con CSS/SCSS

### 1. Crear componente común (para FIB y HUB)

Componente que se usará en ambas plantillas.

**Paso 1:** Crear el archivo del componente

```bash
src/common/scss/components/_components.mi-componente.scss
```

**Paso 2:** Escribir los estilos

```scss
// src/common/scss/components/_components.mi-componente.scss

.mi-componente {
  padding: 20px;
  background-color: #f5f5f5;
  
  &__titulo {
    font-size: 24px;
    font-weight: bold;
  }
  
  &__contenido {
    margin-top: 10px;
  }
}
```

**Paso 3:** Añadirlo a los índices de componentes

```scss
// src/common/scss/components/_components.FIB.scss
// ...otros imports
@import "components.mi-componente";

// src/common/scss/components/_components.HUB.scss
// ...otros imports
@import "components.mi-componente";
```

**Resultado:** El componente se compilará en `dist-FIB/` y `dist-HUB/`.

---

### 2. Crear componente específico de FIB

Componente que solo usará la plantilla FIB.

**Paso 1:** Crear el archivo en la carpeta de FIB

```bash
src/FIB/scss/components/_patron-exclusivo.scss
```

**Paso 2:** Escribir los estilos

```scss
// src/FIB/scss/components/_patron-exclusivo.scss

.patron-exclusivo {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  
  &__item {
    border: 1px solid #ddd;
    padding: 15px;
  }
}
```

**Paso 3:** Importarlo en el bundle de FIB

```scss
// src/FIB/scss/app.FIB.scss
// ...otros imports

/* -----------------------------------------------------------------------------
 * CONTENT (FIB specific)
 */
@import "../../common/scss/components/components.FIB";

// Componentes exclusivos de FIB
@import "components/patron-exclusivo";

/* -----------------------------------------------------------------------------
 * OVERRIDES
 */
```

**Resultado:** Solo se compilará en `dist-FIB/`, HUB no lo incluirá.

---

### 3. Sobrescribir estilos de componente común

Hacer ajustes específicos a un componente común sin modificar el original.

**Paso 1:** Crear archivo de overrides

```bash
src/FIB/scss/overrides/_ajustes-header.scss
```

**Paso 2:** Escribir las sobrescrituras

```scss
// src/FIB/scss/overrides/_ajustes-header.scss

// Ajustar el header solo para FIB
.header {
  background-color: #003366; // Color específico de FIB
  
  &__logo {
    width: 200px; // Tamaño diferente en FIB
  }
}
```

**Paso 3:** Importarlo después de los componentes comunes

```scss
// src/FIB/scss/app.FIB.scss

/* -----------------------------------------------------------------------------
 * CONTENT (FIB specific)
 */
@import "../../common/scss/components/components.FIB";
@import "components/patron-exclusivo";

/* -----------------------------------------------------------------------------
 * OVERRIDES
 */
@import "../../common/scss/utilities/utilities";
@import "overrides/ajustes-header"; // ← Aquí
```

**Resultado:** El header común se modifica solo en FIB.

---

### 4. Usar variables y mixins del CORE

Los componentes pueden usar todo lo definido en `src/common/scss/`:

```scss
// src/FIB/scss/components/_mi-card.scss

.mi-card {
  // Usar variables de foundations
  background-color: var(--color-primary);
  padding: var(--space-m);
  
  // Usar mixins de tools
  @include respond-to('tablet') {
    padding: var(--space-l);
  }
}
```

---

## Trabajar con JavaScript

### 1. Crear módulo común (para FIB y HUB)

Funcionalidad que se usará en ambas plantillas.

**Paso 1:** Crear el módulo

```bash
src/common/js/modules/contador.js
```

**Paso 2:** Escribir el código

```javascript
// src/common/js/modules/contador.js

export function contador() {
  const contadores = document.querySelectorAll('[data-contador]');
  
  contadores.forEach(contador => {
    const valor = parseInt(contador.dataset.contador);
    let actual = 0;
    
    const intervalo = setInterval(() => {
      if (actual >= valor) {
        clearInterval(intervalo);
      }
      contador.textContent = actual;
      actual += Math.ceil(valor / 100);
    }, 20);
  });
}
```

**Paso 3:** Importarlo en app.common.js

```javascript
// src/common/js/app.common.js

import {contador} from './modules/contador';

document.addEventListener('DOMContentLoaded', async () => {
  // ...otros módulos
  contador(); // ← Añadir aquí
});
```

**Resultado:** Se ejecutará en ambas variantes (FIB y HUB).

---

### 2. Crear módulo específico de FIB

Funcionalidad que solo usará FIB.

**Paso 1:** Crear el módulo en la carpeta de FIB

```bash
src/FIB/js/modules/patronato.js
```

**Paso 2:** Escribir el código

```javascript
// src/FIB/js/modules/patronato.js

export function initPatronato() {
  const patronato = document.getElementById('patronato-grid');
  
  if (!patronato) return;
  
  // Lógica exclusiva del patronato en FIB
  console.log('Patronato inicializado');
  
  patronato.addEventListener('click', (e) => {
    if (e.target.classList.contains('patron-item')) {
      mostrarDetalles(e.target);
    }
  });
}

function mostrarDetalles(item) {
  // Implementación...
}
```

**Paso 3:** Importarlo en app.FIB.js

```javascript
// src/FIB/js/app.FIB.js

import '../scss/app.FIB.scss';
import '../../common/js/app.common.js';
import {initPatronato} from './modules/patronato';

document.addEventListener('DOMContentLoaded', () => {
  initPatronato(); // Solo se ejecuta en FIB
});
```

**Resultado:** Solo se incluirá en `dist-FIB/assets/js/app.js`.

---

### 3. Lógica inline específica

Para código pequeño, puedes escribirlo directamente en app.FIB.js o app.HUB.js:

```javascript
// src/FIB/js/app.FIB.js

import '../scss/app.FIB.scss';
import '../../common/js/app.common.js';

// Lógica exclusiva de FIB
document.addEventListener('DOMContentLoaded', () => {
  // Añadir clase específica al body
  document.body.classList.add('theme-fib');
  
  // Configuración específica
  const configFIB = {
    apiEndpoint: '/api/fib',
    theme: 'blue'
  };
  
  console.log('FIB inicializado', configFIB);
});
```

---

### 4. Cargas condicionales

Cargar librerías solo cuando se necesiten:

```javascript
// src/common/js/app.common.js

document.addEventListener('DOMContentLoaded', async () => {
  // ...otros módulos
  
  // Cargar AOS solo si hay elementos animados
  if (document.querySelectorAll('[data-aos]').length > 0) {
    const AOS = await import('aos');
    AOS.init({
      duration: 800,
      once: true
    });
  }
  
  // Cargar carousel solo si existe el elemento
  if (document.querySelector('.carousel')) {
    const {carousel} = await import('./modules/carousel');
    carousel();
  }
});
```

---

### 5. Usar jQuery en módulos

jQuery está disponible globalmente gracias a `app.common.js`:

```javascript
// src/common/js/modules/mi-modulo.js

export function miModulo() {
  // jQuery está disponible como $ o jQuery
  $('.mi-clase').on('click', function() {
    $(this).toggleClass('activo');
  });
}
```

---

## Compilar y desplegar

### 1. Desarrollo local

```bash
# FIB
npm run dev:FIB
# Prueba en: http://localhost:5173/pages_FIB/index.html

# HUB
npm run dev:HUB
# Prueba en: http://localhost:5173/pages_HUB/index.html
```

### 2. Compilar para producción

```bash
# Solo FIB
npm run build:FIB

# Solo HUB
npm run build:HUB

# Ambos
npm run build
```

### 3. Copiar al theme de OctoberCMS

**Para FIB:**
```bash
# Copiar TODA la carpeta assets completa
dist-FIB/assets/ → themes/impulsabalears-fib/assets/
```

**Para HUB:**
```bash
# Copiar TODA la carpeta assets completa
dist-HUB/assets/ → themes/impulsabalears-hub/assets/
```

**⚠️ Importante:** Debes copiar **todos** los archivos de la carpeta `assets/`, no solo `app.js` y `app.css`.

### 4. ¿Por qué hay múltiples archivos JS?

Al compilar verás algo como esto en `dist-FIB/assets/js/`:

```
app.js                    ← Archivo principal (siempre se carga)
accordion-8938f477.js     ← Se carga solo si hay accordions
carousel-bf473d9d.js      ← Se carga solo si hay carousels
slide-c77d3d03.js         ← Se carga solo si hay sliders
aos.esm-b6a23f2b.js       ← Se carga solo si hay animaciones AOS
slick-8234a96a.js         ← Se carga solo si hay Slick
index-*.js                ← Chunks de FullCalendar, etc.
```

**Esto es code splitting** (división de código). Vite lo hace automáticamente porque en `app.common.js` usamos imports dinámicos:

```javascript
// Esto genera un archivo separado
if (document.querySelector('.carousel')) {
  const {carousel} = await import('./modules/carousel');
}
```

**Ventajas:**
- ✅ Páginas sin carousel no descargan `carousel-bf473d9d.js` → más rápido
- ✅ El navegador solo descarga lo que necesita
- ✅ Mejor rendimiento en producción

**¿Cómo funciona?**
1. El navegador carga `app.js`
2. `app.js` detecta: "hay un carousel"
3. `app.js` descarga automáticamente `carousel-bf473d9d.js`
4. Ejecuta el carousel

**En tu HTML de OctoberCMS solo importas `app.js`:**

```html
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="{{ 'assets/css/app.css'|theme }}">
</head>
<body>
    <!-- Tu contenido -->
    
    <!-- Solo necesitas este script -->
    <script src="{{ 'assets/js/app.js'|theme }}"></script>
</body>
</html>
```

Los demás archivos JS deben estar en el servidor pero **NO los importas manualmente**. `app.js` los carga automáticamente cuando se necesitan.

---

## 📝 Resumen rápido

| Acción | Ubicación | Siguiente paso |
|--------|-----------|----------------|
| Componente común CSS | `src/common/scss/components/` | Añadir a `_components.FIB.scss` y `_components.HUB.scss` |
| Componente FIB CSS | `src/FIB/scss/components/` | Importar en `app.FIB.scss` |
| Override FIB CSS | `src/FIB/scss/overrides/` | Importar en `app.FIB.scss` |
| Módulo común JS | `src/common/js/modules/` | Importar en `app.common.js` |
| Módulo FIB JS | `src/FIB/js/modules/` | Importar en `app.FIB.js` |
| Lógica inline FIB | `src/FIB/js/app.FIB.js` | Escribir directamente |

---

## ⚠️ Reglas importantes

1. **No modificar archivos compilados**: Nunca edites archivos en `dist-FIB/` o `dist-HUB/`
2. **CORE es común**: No duplicar código de `src/common/` en variantes específicas
3. **Orden de imports**: Overrides siempre después de componentes comunes
4. **Compilar después de cambios**: Los cambios en dev son automáticos, en producción ejecutar `npm run build:X`
5. **Una responsabilidad**: Si un componente crece mucho, considera dividirlo en archivos más pequeños

---

## 🔍 Debugging

### Ver qué se está compilando

```bash
npm run build:FIB -- --debug
```

### Verificar tamaños de bundles

Después de compilar, revisa:
```
dist-FIB/assets/js/app.js        # Tamaño del JS
dist-FIB/assets/css/app.css      # Tamaño del CSS
```

### Comprobar si un módulo está incluido

```bash
# En Windows PowerShell
Select-String -Path "dist-FIB/assets/js/app.js" -Pattern "miModulo"
```

---

¿Dudas? Revisa el [README.md](README.md) para la estructura completa del proyecto.
