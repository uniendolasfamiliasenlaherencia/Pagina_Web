import { useEffect } from 'react';

/**
 * Hook para precargar imágenes críticas de forma eficiente
 * Mejora el rendimiento percibido precargando las imágenes más importantes
 */
export function useImagePreload(imageSources) {
  useEffect(() => {
    imageSources.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [imageSources]);
}

/**
 * Hook para reportar Web Vitals a un servidor de análisis
 * Útil para monitoreo del rendimiento
 */
export function useWebVitals() {
  useEffect(() => {
    // Largest Contentful Paint
    if ('PerformanceObserver' in window) {
      try {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          console.log('LCP:', lastEntry.renderTime || lastEntry.loadTime);
        });
        observer.observe({ entryTypes: ['largest-contentful-paint'] });
      } catch (e) {
        console.error('PerformanceObserver error:', e);
      }
    }

    // Cumulative Layout Shift
    let clsValue = 0;
    if ('PerformanceObserver' in window) {
      try {
        const observer = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry) => {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
              console.log('CLS:', clsValue);
            }
          });
        });
        observer.observe({ entryTypes: ['layout-shift'] });
      } catch (e) {
        console.error('PerformanceObserver error:', e);
      }
    }

    // First Input Delay
    if ('PerformanceObserver' in window) {
      try {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry) => {
            console.log('FID:', entry.processingDuration);
          });
        });
        observer.observe({ entryTypes: ['first-input'] });
      } catch (e) {
        console.error('PerformanceObserver error:', e);
      }
    }
  }, []);
}
