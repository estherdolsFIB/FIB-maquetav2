import { defineConfig } from 'vite';
import path from 'node:path';

// Vite config
// - Multi-entrada: app (legacy), app.FIB, app.HUB
// - Filtra por modo: --mode FIB/HUB para compilar solo esa variante (+app)
// - Sourcemap solo en dev para builds más ligeros
export default defineConfig(({ mode, command }) => {
  const isServe = command === 'serve';
  const allInputs = {
    app: path.resolve(__dirname, 'src/js/app.js'),
    'app.FIB': path.resolve(__dirname, 'src/js/app.FIB.js'),
    'app.HUB': path.resolve(__dirname, 'src/js/app.HUB.js'),
  };
  let input = allInputs;
  if (mode === 'FIB') input = { app: allInputs.app, 'app.FIB': allInputs['app.FIB'] };
  if (mode === 'HUB') input = { app: allInputs.app, 'app.HUB': allInputs['app.HUB'] };

  return {
    root: '.',
    base: './',
    server: {
      port: 5173,
      open: true,
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
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
            path.resolve(__dirname, 'src/scss'),
            path.resolve(__dirname, '../maqueta/src/assets/scss'),
          ],
          // Silencia deprecations de dependencias (p.ej. FontAwesome 5)
          quietDeps: true,
        },
      },
    },
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      // Sourcemap solo cuando se hace serve
      sourcemap: isServe,
      rollupOptions: {
        input,
        output: {
          entryFileNames: 'assets/js/[name].js',
          chunkFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: (info) => {
            const name = info.name || '';
            if (/\.css$/.test(name)) return 'assets/css/[name][extname]';
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
