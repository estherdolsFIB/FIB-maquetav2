import { defineConfig } from 'vite';
import path from 'node:path';

// Vite config
// - Multi-entrada: app (legacy), app.FIB, app.HUB
// - Filtra por modo: --mode FIB/HUB para compilar solo esa variante (+app)
// - Sourcemap solo en dev para builds más ligeros
export default defineConfig(({ mode, command }) => {
  const isServe = command === 'serve';
  const allInputs = {
    'app.FIB': path.resolve(__dirname, 'src/FIB/js/app.FIB.js'),
    'app.HUB': path.resolve(__dirname, 'src/HUB/js/app.HUB.js'),
  };
  
  // Entradas HTML para el build
  const htmlInputs = {
    FIB: path.resolve(__dirname, 'index.FIB.html'),
    HUB: path.resolve(__dirname, 'index.HUB.html'),
  };
  
  let input = allInputs;
  let outDir = 'dist';
  
  if (mode === 'FIB') {
    input = htmlInputs.FIB;
    outDir = 'dist-FIB';
  }
  if (mode === 'HUB') {
    input = htmlInputs.HUB;
    outDir = 'dist-HUB';
  }

  return {
    root: '.',
    base: './',
    server: {
      port: 5173,
      open: true,
    },
    plugins: [],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@common': path.resolve(__dirname, 'src/common'),
        '@FIB': path.resolve(__dirname, 'src/FIB'),
        '@HUB': path.resolve(__dirname, 'src/HUB'),
        '~node_modules': path.resolve(__dirname, 'node_modules'),
      },
    },
    css: {
      postcss: {
        plugins: [
          {
            postcssPlugin: 'strip-charset',
            AtRule: { charset: (atRule) => atRule.remove() },
          },
        ],
      },
      // Mantiene las url() de CSS tal cual (apuntan a assets ya existentes)
      url: false,
      // Sourcemaps solo en dev
      devSourcemap: isServe,
      preprocessorOptions: {
        scss: {
          additionalData: '',
          includePaths: [
            path.resolve(__dirname, 'src/common/scss'),
            path.resolve(__dirname, 'src/FIB/scss'),
            path.resolve(__dirname, 'src/HUB/scss'),
            path.resolve(__dirname, '../maqueta/src/assets/scss'),
          ],
          // Silencia deprecations de dependencias (p.ej. FontAwesome 5)
          quietDeps: true,
        },
      },
    },
    build: {
      outDir,
      assetsDir: 'assets',
      // Sourcemap solo cuando se hace serve
      sourcemap: isServe,
      // Forzar extracción de CSS en archivo separado
      cssCodeSplit: false,
      rollupOptions: {
        input,
        output: {
          // Formato IIFE (Immediately Invoked Function Expression) - compatible con Webpack
          format: 'iife',
          // Deshabilitar code splitting - todo en un solo archivo
          inlineDynamicImports: true,
          entryFileNames: (chunkInfo) => {
            // Forzar nombre app.js para el JS principal (del HTML)
            if (chunkInfo.name === 'index.FIB' || chunkInfo.name === 'index.HUB' || chunkInfo.name === 'index') {
              return 'assets/js/app.js';
            }
            return 'assets/js/[name].js';
          },
          chunkFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: (info) => {
            const name = info.name || '';
            // Forzar nombre app.css para todos los archivos CSS
            if (/\.css$/.test(name)) {
              return 'assets/css/app[extname]';
            }
            if (/\.(png|jpe?g|gif|svg|webp|ico)$/.test(name)) return 'assets/images/[name][extname]';
            if (/\.(woff2?|ttf|otf|eot)$/.test(name)) return 'assets/fonts/[name][extname]';
            return 'assets/[name][extname]';
          },
        },
      },
      manifest: false,
    },
  };
});
