const CACHE_NAME =
  "vida-rotasi-v1";

const FILES_TO_CACHE = [
  "./",
  "index.html",
  "style.css",
  "config.js",
  "ads.js",
  "game.js",
  "manifest.webmanifest",
  "icon.svg",
  "privacy.html"
];

self.addEventListener(
  "install",
  (event) => {
    event.waitUntil(
      caches
        .open(CACHE_NAME)
        .then((cache) => {
          return cache.addAll(
            FILES_TO_CACHE
          );
        })
    );

    self.skipWaiting();
  }
);

self.addEventListener(
  "activate",
  (event) => {
    event.waitUntil(
      caches
        .keys()
        .then((keys) => {
          const oldCaches =
            keys.filter(
              (key) =>
                key !== CACHE_NAME
            );

          return Promise.all(
            oldCaches.map(
              (key) =>
                caches.delete(key)
            )
          );
        })
    );

    self.clients.claim();
  }
);

self.addEventListener(
  "fetch",
  (event) => {
    if (
      event.request.method !==
      "GET"
    ) {
      return;
    }

    event.respondWith(
      caches
        .match(event.request)
        .then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }

          return fetch(
            event.request
          )
            .then((response) => {
              const copy =
                response.clone();

              caches
                .open(CACHE_NAME)
                .then((cache) => {
                  cache.put(
                    event.request,
                    copy
                  );
                });

              return response;
            })
            .catch(() => {
              return caches.match(
                "index.html"
              );
            });
        })
    );
  }
);
