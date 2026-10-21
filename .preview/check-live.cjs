const { chromium } = require('/Users/0104389S/.claude/browser/node_modules/playwright');
const { readFileSync } = require('node:fs');
const { createHash } = require('node:crypto');
const hash = value => createHash('sha256').update(value).digest('hex');
(async () => {
  const browser = await chromium.connectOverCDP('http://localhost:9777');
  const page = await browser.contexts()[0].newPage();
  await page.setViewportSize({ width: 1200, height: 820 });
  const results = [];
  for (const locale of ['en', 'fr']) {
    const url = 'https://connected-mate.github.io/specdrive-site/' + (locale === 'fr' ? 'fr/' : '');
    await page.goto(url, { waitUntil: 'networkidle' });
    const meta = await page.evaluate(() => Object.fromEntries([...document.querySelectorAll('meta[property^="og:"], meta[name^="twitter:"]')].map(el => [el.getAttribute('property') || el.getAttribute('name'), el.content])));
    const expected = `https://connected-mate.github.io/specdrive-site/assets/specdrive-share-${locale}-20260907.png`;
    if (meta['og:image'] !== expected || meta['twitter:image'] !== expected) throw new Error('Wrong live preview: ' + url);
    const image = await page.request.get(expected);
    if (image.status() !== 200 || !image.headers()['content-type'].includes('image/png')) throw new Error('Image not publicly served');
    const buffer = await image.body();
    if (hash(buffer) !== hash(readFileSync(`/Users/0104389S/Projects/specdrive-site/assets/specdrive-share-${locale}-20260907.png`))) throw new Error('Published bytes differ');
    const broken = await page.locator('img').evaluateAll(imgs => imgs.filter(img => img.complete && img.naturalWidth === 0).map(img => img.src));
    if (broken.length) throw new Error('Broken site images: ' + broken.join(', '));
    await page.screenshot({ path: `/Users/0104389S/Projects/specdrive-site/.preview/live-site-${locale}.png` });
    await page.goto(expected, { waitUntil: 'load' });
    await page.locator('img').evaluate(img => img.decode());
    const size = await page.locator('img').evaluate(img => ({ width: img.naturalWidth, height: img.naturalHeight }));
    if (+meta['og:image:width'] !== size.width || +meta['og:image:height'] !== size.height) throw new Error('Wrong dimensions');
    await page.screenshot({ path: `/Users/0104389S/Projects/specdrive-site/.preview/live-share-${locale}.png` });
    results.push({ locale, page: url, image: expected, status: image.status(), bytes: buffer.length, ...size, sha256: hash(buffer), brokenImages: broken });
  }
  await page.close();
  console.log(JSON.stringify(results, null, 2));
  process.exit(0);
})().catch(error => { console.error(error.message); process.exit(1); });
