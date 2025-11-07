// Syncs built assets from maquetav2/dist to the OctoberCMS theme.
// Copies predictable entry files for app, app.FIB, and app.HUB variants.

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

async function maybeCopyPair(name) {
  const jsSrc = path.join(distDir, 'assets', 'js', `${name}.js`);
  const cssSrc = path.join(distDir, 'assets', 'css', `${name}.css`);
  try { await fs.access(jsSrc); } catch { return false; }
  try { await fs.access(cssSrc); } catch { return false; }
  const jsDst = path.join(themeAssets, 'js', `${name}.js`);
  const cssDst = path.join(themeAssets, 'css', `${name}.css`);
  await ensureDir(path.dirname(jsDst));
  await ensureDir(path.dirname(cssDst));
  await fs.copyFile(jsSrc, jsDst);
  await fs.copyFile(cssSrc, cssDst);
  console.log(`Synced ${name} to theme:`);
  console.log(' - js:', path.relative(projectRoot, jsDst));
  console.log(' - css:', path.relative(projectRoot, cssDst));
  return true;
}

async function main() {
  const variants = ['app', 'app.FIB', 'app.HUB'];
  let any = false;
  for (const v of variants) {
    const ok = await maybeCopyPair(v);
    any = any || ok;
  }
  if (!any) {
    throw new Error('No expected bundles found. Run npm run build first.');
  }
  // Copy static assets (images, fonts) if present
  const imgSrc = path.join(distDir, 'assets', 'images');
  const imgDst = path.join(themeAssets, 'images');
  const fontsSrc = path.join(distDir, 'assets', 'fonts');
  const fontsDst = path.join(themeAssets, 'fonts');
  try { await fs.access(imgSrc); await copyRecursive(imgSrc, imgDst); console.log('Synced images/'); } catch {}
  try { await fs.access(fontsSrc); await copyRecursive(fontsSrc, fontsDst); console.log('Synced fonts/'); } catch {}
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
