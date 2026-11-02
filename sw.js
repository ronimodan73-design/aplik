// Offline support for all of Roni's apps (one file for the whole site).
// Pages (HTML): always the newest version from the site; the saved copy only when there is NO internet.
// Other files (images, fonts): network first, saved copy if the network is slow (4s) or offline.
const C='aplik-v2';
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET'||new URL(r.url).origin!==location.origin)return;
 const save=res=>{if(res&&res.ok){const cp=res.clone();caches.open(C).then(c=>c.put(r,cp));}return res;};
 const page=r.mode==='navigate'||(r.headers.get('accept')||'').includes('text/html');
 if(page){e.respondWith(fetch(r,{cache:'no-store'}).then(save).catch(()=>caches.match(r,{ignoreSearch:true})));return;}
 const net=fetch(r).then(save);
 const slow=new Promise(ok=>setTimeout(ok,4000));
 e.respondWith(Promise.race([net,slow.then(()=>caches.match(r,{ignoreSearch:true}).then(h=>h||net))]).catch(()=>caches.match(r,{ignoreSearch:true})));});
