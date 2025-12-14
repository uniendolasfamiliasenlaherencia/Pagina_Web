import React from "react";
import { useInView } from 'react-intersection-observer';

export default function AgendarConsulta() {
  const { ref: refContent, inView: inViewContent } = useInView({ threshold: 0.5, triggerOnce: false });
  
  const handleWhatsAppClick = (e) => {
    e.preventDefault();
    const phoneNumber = "573142999366"; // Número oculto en JS
    const message = "Hola, me gustaría agendar una consulta";
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    setTimeout(() => {
      window.open(whatsappUrl, "_blank");
    }, 100);
  };

  return (
    <section ref={refContent} className={`w-full py-16 ${inViewContent ? 'animate-fade-in' : 'opacity-0'}`} style={{ backgroundColor: '#304B52' }}>
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: '#D0B68A' }}>
          Dar tranquilidad a tu familia
        </h1>
        <p className="text-base md:text-lg text-white mb-8 max-w-2xl mx-auto">
          Cada decisión legal es un acto de amor y responsabilidad hacia tus seres queridos
        </p>
        <button
          onClick={handleWhatsAppClick}
          className="text-white font-semibold px-6 py-3 md:px-8 md:py-4 rounded-md shadow-lg transition text-sm md:text-base inline-block cursor-pointer"
          style={{ backgroundColor: '#C47A59' }}
          onMouseEnter={(e) => e.target.style.opacity = '0.9'}
          onMouseLeave={(e) => e.target.style.opacity = '1'}
        >
          Agendar Consulta
        </button>
      </div>
    </section>
  );
}
