import { defineConfig } from 'vite';
import path from 'node:path';

// Vite config oriented to building SCSS + JS with predictable filenames
// Output mirrors a classic /dist/assets/{css,js,images,fonts} layout.
export default defineConfig({
  root: '.',
  base: './',
  server: {
    port: 5173,
    open: true
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
          AtRule: { charset: (atRule) => atRule.remove() }
        }
      ]
    },
    // Evita que Vite reescriba/importe urls() de CSS. Mantiene rutas tal cual
    // para poder apuntar a imágenes / fuentes existentes del proyecto original.
    url: false,
    devSourcemap: true,
    preprocessorOptions: {
      scss: {
        // Permite importar directamente desde la maqueta original si lo deseas
        // @use "_variables";
        additionalData: '',
        includePaths: [
          path.resolve(__dirname, 'src/scss'),
          path.resolve(__dirname, '../maqueta/src/assets/scss')
        ]
      }
    }
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
    rollupOptions: {
      input: {
        app: path.resolve(__dirname, 'src/js/app.js'),
      },
      output: {
        // Bundle único y nombres fijos sin hash
        entryFileNames: 'assets/js/app.js',
        chunkFileNames: 'assets/js/app.js',
        assetFileNames: (info) => {
          const name = info.name || '';
          if (/\.css$/.test(name)) return 'assets/css/app.css';
          if (/\.(png|jpe?g|gif|svg|webp|ico)$/.test(name)) return 'assets/images/[name][extname]';
          if (/\.(woff2?|ttf|otf|eot)$/.test(name)) return 'assets/fonts/[name][extname]';
          return 'assets/[name][extname]';
        },
        inlineDynamicImports: true,
      },
    },
    // Manifest no necesario en modo bundle único
    manifest: false,
  },
});
