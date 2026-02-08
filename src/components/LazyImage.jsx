import { useState, useEffect, useRef } from 'react';

/**
 * Componente LazyImage para cargar imágenes de forma perezosa (lazy loading)
 * Mejora el rendimiento de la página cargando imágenes solo cuando son visibles
 */
export default function LazyImage({ src, alt, className = '', style = {}, isLarge = false }) {
  const [imageSrc, setImageSrc] = useState(null);
  const imageRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let observer;

    if (imageRef.current && typeof window !== 'undefined') {
      // Crear el observador para detectar cuando la imagen es visible
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setImageSrc(src);
              observer.unobserve(entry.target);
            }
          });
        },
        {
          rootMargin: '50px', // Cargar 50px antes de que sea visible
        }
      );

      observer.observe(imageRef.current);
    }

    return () => {
      if (observer && imageRef.current) {
        observer.unobserve(imageRef.current);
      }
    };
  }, [src]);

  return (
    <img
      ref={imageRef}
      src={imageSrc}
      alt={alt}
      className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
      style={style}
      onLoad={() => setIsLoaded(true)}
      loading="lazy"
    />
  );
}
