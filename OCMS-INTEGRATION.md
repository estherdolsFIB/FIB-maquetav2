# Integración con OctoberCMS

## ✅ Build completado exitosamente

El bundle está optimizado con formato **IIFE** (como Webpack):
- **app.js**: 473KB (144KB gzipped) - JavaScript en formato IIFE
- **app.css**: 772KB (83KB gzipped) - Estilos extraídos a archivo separado
- **jQuery global**: Disponible inmediatamente como `$` y `jQuery` en `window`
- **Compatible con concatenación**: Puede usar `|theme` filter con arrays

## 📁 Archivos a copiar a tu tema de OctoberCMS

Después del build, copia estos archivos:

```
dist-FIB/assets/js/app.js         → themes/tu-tema/assets/js/app.js
dist-FIB/assets/css/app.css       → themes/tu-tema/assets/css/app.css
```

## 📋 Instrucciones para el Layout de OctoberCMS

### ✅ Configuración recomendada (tu layout actual):

```twig
<!DOCTYPE html>
<html lang="{{ this.site.code }}">
<head>
    <title>{{ this.page.title }}</title>
    
    {# CSS - Vite genera app.css #}
    <link href="{{ 'assets/css/app.css'|theme }}" rel="stylesheet">
    <link href="{{ 'assets/css/custom.css'|theme }}" rel="stylesheet">
</head>
<body>
    {% page %}
    
    {# JavaScript - AL FINAL DEL BODY #}
    
    {# 1. Bundle principal con jQuery - SIN type="module" #}
    <script src="{{ 'assets/js/app.js'|theme }}"></script>
    
    {# 2. Scripts adicionales - Pueden concatenarse #}
    <script src="{{ [
        'assets/js/custom.js',
        'assets/js/gdpr-rw-cookie-notice.min.js'
    ]|theme }}"></script>
    
    {# 3. Scripts inline - jQuery ya está disponible #}
    <script>
        // jQuery está disponible inmediatamente, puedes usarlo directamente
        $(window).on('load', function () {
            $('.c-modal').css('display', 'flex');
        });
        
        // O con document ready
        $(document).ready(function() {
            console.log('jQuery version:', $.fn.jquery);
            // Tu código...
        });
    </script>
</body>
</html>
```

## 🔑 Puntos importantes

1. **NO uses `type="module"`** en app.js
   - El bundle es IIFE tradicional (como Webpack)
   - Se ejecuta inmediatamente de forma síncrona

2. **jQuery está disponible inmediatamente**
   - No necesitas `checkJQuery()` ni esperar
   - Puedes usar `$()` directamente en scripts inline

3. **Concatenación permitida**
   - Puedes usar `|theme` filter con arrays
   - app.js debe cargarse primero (antes de otros scripts que usan jQuery)

4. **Todo incluido en app.js**
   - jQuery, carruseles, calendarios, AOS, etc.
   - No hay code splitting, todo se carga de una vez

## 🧪 Verificar que funciona

Abre la consola del navegador y verifica:

```javascript
// jQuery debe estar disponible globalmente
console.log(window.$);        // Debe mostrar: function()...
console.log(window.jQuery);   // Debe mostrar: function()...
console.log($.fn.jquery);     // Debe mostrar: 3.7.1 (o la versión instalada)
```

## 📦 Archivos generados

```
dist-FIB/
├── assets/
│   ├── css/
│   │   └── app.css (bundle principal CSS)
│   └── js/
│       ├── app.js (bundle principal con jQuery - 99KB)
│       ├── carousel-*.js (carga bajo demanda)
│       ├── slick-*.js (carga bajo demanda)
│       ├── accordion-*.js (carga bajo demanda)
│       ├── aos.esm-*.js (carga bajo demanda)
│       └── index-*.js (FullCalendar - carga bajo demanda)
└── index.FIB.html
```

## 🚀 Deploy a producción

1. Ejecutar build: `npm run build:FIB`
2. Copiar contenido de `dist-FIB/assets/` a `themes/tu-tema/assets/`
3. Actualizar layout según las instrucciones arriba
4. Limpiar caché de OctoberCMS si es necesario

## ⚠️ Errores comunes

### "$ is not defined"
- **Causa**: Script inline ejecutándose antes de que jQuery esté disponible
- **Solución**: Usar `checkJQuery()` o `DOMContentLoaded`

### "Cannot use 'import.meta' outside a module"
- **Causa**: Falta `type="module"` en la etiqueta script de app.js
- **Solución**: Agregar `type="module"` a app.js

### Scripts concatenados no funcionan
- **Causa**: Usando `|theme` con array mezclando ES modules y scripts tradicionales
- **Solución**: Cargar cada script por separado
