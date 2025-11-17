'use client';

import { useEffect } from 'react';

export function ServiceWorkerRegistration() {
  useEffect(() => {
    // Only register in production and if service workers are supported
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      let updateInterval: NodeJS.Timeout | null = null;
      let updateFoundHandler: (() => void) | null = null;
      let messageHandler: ((event: MessageEvent) => void) | null = null;
      let controllerChangeHandler: (() => void) | null = null;
      let loadHandler: (() => void) | null = null;

      const registerServiceWorker = async () => {
        try {
          const registration = await navigator.serviceWorker.register('/sw.js', {
            scope: '/'
          });

          // Handle updates
          updateFoundHandler = () => {
            const newWorker = registration.installing;
            if (newWorker) {
              const stateChangeHandler = () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  // New service worker is available - optionally show a notification to user about update
                }
              };
              newWorker.addEventListener('statechange', stateChangeHandler);
            }
          };
          registration.addEventListener('updatefound', updateFoundHandler);

          // Check for updates periodically
          updateInterval = setInterval(() => {
            registration.update();
          }, 60000); // Check every minute

        } catch {
          // Service worker registration failed silently in production
        }
      };

      // Handle service worker messages
      messageHandler = () => {
        // Handle service worker messages here
      };
      navigator.serviceWorker.addEventListener('message', messageHandler);

      // Handle controller change (new service worker activated)
      controllerChangeHandler = () => {
        // Optionally reload the page to use new service worker
        // window.location.reload();
      };
      navigator.serviceWorker.addEventListener('controllerchange', controllerChangeHandler);

      // Register after page load to avoid impacting initial load performance
      if (document.readyState === 'complete') {
        registerServiceWorker();
      } else {
        loadHandler = registerServiceWorker;
        window.addEventListener('load', loadHandler);
      }

      // Cleanup function to prevent memory leaks
      return () => {
        // Clear the update interval
        if (updateInterval) {
          clearInterval(updateInterval);
        }

        // Remove event listeners
        if (messageHandler) {
          navigator.serviceWorker.removeEventListener('message', messageHandler);
        }
        if (controllerChangeHandler) {
          navigator.serviceWorker.removeEventListener('controllerchange', controllerChangeHandler);
        }
        if (loadHandler) {
          window.removeEventListener('load', loadHandler);
        }
      };
    }
  }, []);

  return null; // This component doesn't render anything
}