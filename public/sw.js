const CACHE_NAME = 'crisscross-v1';
const STATIC_CACHE_URLS = [
  '/',
  '/products',
  '/about',
  '/contact',
  '/deliveries',
  '/cc-logos/CC-Logo.png',
  '/cc-logos/manifest.json'
];

// Cache strategy for different resources
const CACHE_STRATEGIES = {
  // Static assets - cache first
  STATIC: 'cache-first',
  // Product images - stale while revalidate
  IMAGES: 'stale-while-revalidate',
  // API calls - network first
  API: 'network-first',
  // Pages - network first with fallback
  PAGES: 'network-first'
};

// Install event - cache static resources
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(STATIC_CACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames
            .filter(cacheName => cacheName !== CACHE_NAME)
            .map(cacheName => caches.delete(cacheName))
        );
      })
      .then(() => self.clients.claim())
  );
});

// Fetch event - implement caching strategies
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip external requests
  if (url.origin !== location.origin) {
    return;
  }

  // Determine cache strategy based on request type
  let strategy = CACHE_STRATEGIES.PAGES;
  
  if (url.pathname.includes('/images/')) {
    strategy = CACHE_STRATEGIES.IMAGES;
  } else if (url.pathname.includes('/api/')) {
    strategy = CACHE_STRATEGIES.API;
  } else if (url.pathname.includes('/cc-logos/') || url.pathname.endsWith('.css') || url.pathname.endsWith('.js')) {
    strategy = CACHE_STRATEGIES.STATIC;
  }

  event.respondWith(
    handleRequest(request, strategy)
  );
});

// Handle different caching strategies
async function handleRequest(request, strategy) {
  const cache = await caches.open(CACHE_NAME);

  switch (strategy) {
    case CACHE_STRATEGIES.STATIC:
      return cacheFirst(request, cache);
    
    case CACHE_STRATEGIES.IMAGES:
      return staleWhileRevalidate(request, cache);
    
    case CACHE_STRATEGIES.API:
    case CACHE_STRATEGIES.PAGES:
      return networkFirst(request, cache);
    
    default:
      return fetch(request);
  }
}

// Cache first strategy
async function cacheFirst(request, cache) {
  try {
    const cachedResponse = await cache.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }

    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch {
    return new Response('Offline', { status: 503 });
  }
}

// Network first strategy
async function networkFirst(request, cache) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch {
    const cachedResponse = await cache.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }

    // Return offline page for navigation requests
    if (request.mode === 'navigate') {
      return cache.match('/') || new Response('Offline', {
        status: 503,
        headers: { 'Content-Type': 'text/html' }
      });
    }

    return new Response('Offline', { status: 503 });
  }
}

// Stale while revalidate strategy
async function staleWhileRevalidate(request, cache) {
  const cachedResponse = await cache.match(request);

  const fetchPromise = fetch(request).then(networkResponse => {
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  }).catch(() => {
    // Return cached response if available, otherwise return offline response
    return cachedResponse || new Response('Offline', { status: 503 });
  });

  return cachedResponse || fetchPromise;
}

// Background sync for failed requests (if supported)
if ('sync' in self.registration) {
  self.addEventListener('sync', event => {
    if (event.tag === 'background-sync') {
      // Handle background sync logic here
    }
  });
}

// Push notification handling (if needed in future)
self.addEventListener('push', event => {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: '/cc-logos/android-icon-192x192.png',
      badge: '/cc-logos/android-icon-96x96.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: data.primaryKey
      }
    };
    
    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  }
});