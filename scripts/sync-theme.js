// Syncs built assets from maquetav2/dist to the OctoberCMS theme,
// keeping hashed files for caching, and additionally writing stable
// entry filenames app.js and app.css for simple inclusion in templates.

const fs = require('fs').promises;
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');
const distDir = path.join(projectRoot, 'dist');
// Adjust this path if your theme folder changes
const themeAssets = path.resolve(projectRoot, '..', 'themes', 'impulsabalears', 'assets');

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true }).catch(() => {});
}

async function copyRecursive(src, dst) {
  const stat = await fs.stat(src);
  if (stat.isDirectory()) {
    await ensureDir(dst);
    const entries = await fs.readdir(src);
    for (const e of entries) {
      await copyRecursive(path.join(src, e), path.join(dst, e));
    }
  } else {
    await ensureDir(path.dirname(dst));
    await fs.copyFile(src, dst);
  }
}

async function main() {
  const appJsSrc = path.join(distDir, 'assets', 'js', 'app.js');
  const appCssSrc = path.join(distDir, 'assets', 'css', 'app.css');

  // Verify build outputs exist
  try { await fs.access(appJsSrc); } catch { throw new Error('Missing dist/assets/js/app.js. Run npm run build first.'); }
  try { await fs.access(appCssSrc); } catch { throw new Error('Missing dist/assets/css/app.css. Ensure CSS is imported in app.js.'); }

  // Copy only the two stable files to theme
  const appJsDst = path.join(themeAssets, 'js', 'app.js');
  const appCssDst = path.join(themeAssets, 'css', 'app.css');
  await ensureDir(path.dirname(appJsDst));
  await ensureDir(path.dirname(appCssDst));
  await fs.copyFile(appJsSrc, appJsDst);
  await fs.copyFile(appCssSrc, appCssDst);

  console.log('Synced bundle to theme:');
  console.log(' - js:', path.relative(projectRoot, appJsDst));
  console.log(' - css:', path.relative(projectRoot, appCssDst));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
