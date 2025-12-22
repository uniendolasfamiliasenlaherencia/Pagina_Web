import { useInView } from 'react-intersection-observer';
import LazyImage from './LazyImage';
import imgHero from '../img/img_hero.png';

export default function Hero() {
  const { ref: refContent, inView: inViewContent } = useInView({ threshold: 0.5, triggerOnce: false });
  
  return (
    <section
      id="inicio"
      ref={refContent}
      className="relative w-full h-[80vh] flex items-center justify-center text-center text-white"
    >
      <LazyImage
        src={imgHero}
        alt="Familia escribiendo documento"
        className="absolute inset-0 w-full h-full object-cover brightness-50"
      />

      <div className={`relative z-10 px-4 max-w-4xl ${inViewContent ? 'animate-fade-in' : 'opacity-0'}`}>
        <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
          Protege lo que más importa:
        </h1>
        <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
          la unión de tu familia
        </h1>        
        <p className="text-base md:text-lg mb-12">
          Asesoro tu familia en la distribución justa y pacífica de tu patrimonio. Mi compromiso es preservar los lazos familiares y prevenir conflictos.
        </p>
        <a
          href="#contacto"
          className="text-white font-semibold px-4 py-2 md:px-6 md:py-3 rounded-md shadow-lg transition text-sm md:text-base"
          style={{ backgroundColor: '#C47A59' }}
          onMouseEnter={(e) => e.target.style.opacity = '0.9'}
          onMouseLeave={(e) => e.target.style.opacity = '1'}
        >
          Contáctate Conmigo
        </a>
      </div>
    </section>
  );
}
