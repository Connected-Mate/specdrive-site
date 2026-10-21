const preview = await ctx.newPage();
await preview.setViewportSize({ width: 1100, height: 840 });
await preview.goto('http://127.0.0.1:8743/');
const results = [];
for (const route of ['/', '/fr/']) {
  await preview.goto('http://127.0.0.1:8743' + route);
  const meta = await preview.evaluate(() => Object.fromEntries([...document.querySelectorAll('meta[property^="og:"], meta[name^="twitter:"]')].map(el => [el.getAttribute('property') || el.getAttribute('name'), el.content])));
  const imagePath = new URL(meta['og:image']).pathname.replace('/specdrive-site', '');
  const dimensions = await preview.evaluate(async src => {
    const img = new Image(); img.src = src; await img.decode();
    return { width: img.naturalWidth, height: img.naturalHeight };
  }, imagePath);
  if (meta['og:image'] !== meta['twitter:image'] || Number(meta['og:image:width']) !== dimensions.width || Number(meta['og:image:height']) !== dimensions.height) throw new Error('Metadata mismatch: ' + route);
  results.push({ route, image: meta['og:image'], ...dimensions, alt: meta['og:image:alt'] });
}
await preview.setContent(`<!doctype html><html lang="fr"><head><meta charset="utf-8"><title>SpecDrive — aperçu du partage</title><style>body{margin:0;padding:40px;background:#f7f7f7;color:#000;font:16px system-ui}h1{font:36px Georgia;margin:0 0 32px}main{display:flex;gap:32px}article{width:480px;background:white;border:1px solid #ddd;border-radius:12px;overflow:hidden}img{width:100%;height:auto;display:block}section{padding:20px}p{margin:8px 0 0;line-height:1.5}small{color:#636363}h2{font-size:19px;margin:8px 0}.note{margin-top:28px;color:#3e3e3e}</style></head><body><h1>SpecDrive · aperçu des liens partagés</h1><main><article><img src="http://127.0.0.1:8743/assets/specdrive-share-fr-20260907.png" alt="Visuel français"><section><small>connected-mate.github.io</small><h2>SpecDrive — votre idée, construite pour de vrai</h2><p>Guidez votre IA. Donnez vie à votre projet. Une app Mac gratuite et open source.</p></section></article><article><img src="http://127.0.0.1:8743/assets/specdrive-share-en-20260907.png" alt="English preview"><section><small>connected-mate.github.io</small><h2>SpecDrive — your idea, built for real</h2><p>Give your AI a plan. Watch your idea become a real product. Free and open source for Mac.</p></section></article></main><p class="note">Simulation locale d’un aperçu de partage, à 480 px de large.</p></body></html>`);
await preview.locator('img').evaluateAll(async imgs => { await Promise.all(imgs.map(img => img.decode())); });
await preview.screenshot({ path: '/Users/0104389S/Projects/specdrive-site/.preview/share-check.png' });
await preview.close();
return results;
