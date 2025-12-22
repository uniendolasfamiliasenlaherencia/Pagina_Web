import React from "react";
import { useInView } from 'react-intersection-observer';
import ContentCardAlt from "./ContentCardAlt";
import confianzaImg from '../img/img_confianza.png';
import experienciaImg from '../img/img_experiencia.png';
import prevencionImg from '../img/img_prevencion.png';

const Nosotros = () => {
  const { ref: refContent, inView: inViewContent } = useInView({ threshold: 0.1, triggerOnce: false });
  
  const valores = [
    {
      orangeTitle: "Confianza",
      image: confianzaImg,
      title: "Acompañamiento Cercano",
      description: "Ofrezco una guía personalizada en cada etapa del proceso.",
      fullText: "Te ofrezco una guía personalizada en cada etapa del proceso legal para que siempre sepas qué está pasando y qué debes hacer. Mi acompañamiento es constante y humano, pensado para resolver tus dudas, tus incertidumbres, darte tranquilidad y evitarte estrés innecesario.\nNo te dejo sol@ en ningún momento: te explico con claridad cada paso, te ayudo con los trámites y me aseguro que tus decisiones sean informadas y conscientes que protejan tus intereses y los de tu familia.",
      youtubeId: "Wxn6udR_6GE"
    },
    {
      orangeTitle: "Experiencia",
      image: experienciaImg,
      title: "Especialista en Derecho Procesal dedicada al tema herencial",
      description: "Más de 30 años de experiencia resolviendo casos complejos",
      fullText: "Soy especialista en Derecho Procesal dedicada al tema herencial. Cuento con más de 30 años de experiencia atendiendo casos complejos de sucesiones herenciales. Permitiéndome identificar rápidamente los mejores caminos legales, anticipar riesgos y ayudarte a resolver situaciones que, sin una guía experta, pueden volverse largas o conflictivas.\nMi trayectoria me ha permitido acompañar a muchas familias en procesos difíciles, brindando soluciones efectivas, claras y ajustadas a la ley. Mi compromiso radica en hacer que el trámite o proceso sea lo más sencillo, ágil y efectivo para todos los involucrados.",
      youtubeId: "yebNIHKAC4A"
    },
    {
      orangeTitle: "Prevención",
      image: prevencionImg,
      title: "Enfoque para Evitar Conflictos Familiares",
      description: "Trabajo para mantener la armonía y el respeto entre herederos.",
      fullText: "Mi prioridad es proteger la armonía familiar. Por eso trabajo con un enfoque preventivo que busca evitar discusiones, desacuerdos y problemas entre herederos.\nTe acompaño para que cada decisión se tome con respeto, claridad y transparencia, ayudando a mediar cuando es necesario y asegurando que el proceso avance sin tensiones.\nMi Objetivo es la Unidad familiar con trámites legales justos, efectivos y pacíficos.",
      youtubeId: "C3GouGa0noM"
    }
  ];

  return (
    <div id="nosotros" className="bg-white w-full py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-10" style={{ color: '#304B52' }}>¿Por qué confiar en mi?</h1>
        <p className="text-base md:text-xl text-center mb-12 text-gray-700">Acompaño cada proceso con dedicación y profesionalismo.</p>
        
        {/* Las 3 tarjetas en una sola fila */}
        <div ref={refContent} className={`flex justify-center ${inViewContent ? 'animate-slide-up' : 'opacity-0'}`}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5 max-w-6xl">
            {/* Primeras 2 tarjetas - ocupan 1 columna cada una */}
            {valores.slice(0, 2).map((valor, index) => (
              <ContentCardAlt
                key={index}
                orangeTitle={valor.orangeTitle}
                image={valor.image}
                title={valor.title}
                description={valor.description}
                fullText={valor.fullText}
                youtubeId={valor.youtubeId}
              />
            ))}
            
            {/* Tercera tarjeta - ocupa 2 columnas en desktop */}
            <div className="col-span-1 sm:col-span-2 lg:col-span-2">
              <ContentCardAlt
                key={2}
                orangeTitle={valores[2].orangeTitle}
                image={valores[2].image}
                title={valores[2].title}
                description={valores[2].description}
                fullText={valores[2].fullText}
                youtubeId={valores[2].youtubeId}
                isLarge={true}
                imageRight={false}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nosotros;
