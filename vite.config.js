import { defineConfig } from 'vite';
import path from 'node:path';
import vue from '@vitejs/plugin-vue';

// Vite config
// - Multi-entrada: app.FIB (jQuery/IIFE), app.HUB (Vue 3/ESM)
// - Filtra por modo: --mode FIB/HUB para compilar solo esa variante
// - Sourcemap solo en dev para builds más ligeros
export default defineConfig(({ mode, command }) => {
  const isServe = command === 'serve';
  const isHUB = mode === 'HUB';
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
  if (isHUB) {
    input = htmlInputs.HUB;
    outDir = 'dist-HUB';
  }

  // Rollup output config — FIB usa IIFE (legacy), HUB usa ES modules (Vue 3)
  const rollupOutput = isHUB
    ? {
        entryFileNames: 'assets/js/app.js',
        chunkFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: (info) => {
          const name = info.name || '';
          if (/\.css$/.test(name)) return 'assets/css/app[extname]';
          if (/\.(png|jpe?g|gif|svg|webp|ico)$/.test(name)) return 'assets/images/[name][extname]';
          if (/\.(woff2?|ttf|otf|eot)$/.test(name)) return 'assets/fonts/[name][extname]';
          return 'assets/[name][extname]';
        },
      }
    : {
        // FIB: IIFE legacy, todo en un solo archivo
        format: 'iife',
        inlineDynamicImports: true,
        entryFileNames: (chunkInfo) => {
          if (chunkInfo.name === 'index.FIB' || chunkInfo.name === 'index.HUB' || chunkInfo.name === 'index') {
            return 'assets/js/app.js';
          }
          return 'assets/js/[name].js';
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: (info) => {
          const name = info.name || '';
          if (/\.css$/.test(name)) return 'assets/css/app[extname]';
          if (/\.(png|jpe?g|gif|svg|webp|ico)$/.test(name)) return 'assets/images/[name][extname]';
          if (/\.(woff2?|ttf|otf|eot)$/.test(name)) return 'assets/fonts/[name][extname]';
          return 'assets/[name][extname]';
        },
      };

  return {
    root: '.',
    base: './',
    server: {
      port: 5173,
      open: true,
    },
    plugins: [
      // Vue plugin solo se activa para HUB (serve siempre lo carga para HMR)
      vue(),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@common': path.resolve(__dirname, 'src/common'),
        '@FIB': path.resolve(__dirname, 'src/FIB'),
        '@HUB': path.resolve(__dirname, 'src/HUB'),
        '~node_modules': path.resolve(__dirname, 'node_modules'),
        'vue': 'vue/dist/vue.esm-bundler.js',
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
        output: rollupOutput,
      },
      manifest: false,
    },
  };
});
