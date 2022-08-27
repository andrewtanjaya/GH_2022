let cacheData = 'appV1';

this.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(cacheData).then((cache) => {
      cache.addAll(['/static/js/bundle.js', '/index.html', '/']);
    }),
  );
});

this.addEventListener('fetch', function (event) {
  if (!navigator.onLine) {
    event.respondWith(
      caches.match(event.request).then((resp) => {
        if (resp) return resp;
        let requestUrl = event.request.clone();
        return fetch(requestUrl);
      }),
    );
  }
});
