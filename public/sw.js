const CACHE_NAME = "t9os-cache-v1";

self.addEventListener("install", e => {
  e.waitUntil(self.skipWaiting());
});

self.addEventListener("activate", e => {
  e.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(cached => {
      if(cached) return cached;
      return fetch(e.request).then(resp => {
        if(!resp || resp.status !== 200 || resp.type !== "basic") return resp;
        const rClone = resp.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(e.request, rClone));
        return resp;
      }).catch(()=>new Response("Offline or blocked request"));
    })
  );
});
