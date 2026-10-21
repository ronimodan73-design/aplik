// Offline support for all of Roni's apps (one file for the whole site).
// Network first (so updates arrive), saved copy when there is no internet.
const C='aplik-v1';
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET'||new URL(r.url).origin!==location.origin)return;
 const net=fetch(r).then(res=>{if(res&&res.ok){const cp=res.clone();caches.open(C).then(c=>c.put(r,cp));}return res;});
 const slow=new Promise(ok=>setTimeout(ok,4000));
 e.respondWith(Promise.race([net,slow.then(()=>caches.match(r,{ignoreSearch:true}).then(h=>h||net))]).catch(()=>caches.match(r,{ignoreSearch:true})));});
