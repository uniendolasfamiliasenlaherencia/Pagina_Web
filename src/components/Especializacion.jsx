import React from "react";
import { useInView } from 'react-intersection-observer';
import Content_Card from "./Content_Card";
import sucecionesImg from '../img/img_sucecionesher.png';
import testamentosImg from '../img/img_testamentos.png';
import particionBienesImg from '../img/img_particionbienes.png';
import asesoriaImg from '../img/img_asesoria.png';

const Especializacion = () => {
  const { ref: refCards, inView: inViewCards } = useInView({ threshold: 0.1, triggerOnce: false });
  
  const especialidades = [
    {
      image:  asesoriaImg,
      title: "Asesoría Jurídica Familiar y Acompañamiento Preventivo",
      summary: "Brindo orientación para prevenir disputas, aclarar dudas y tomar decisiones conscientes en torno al patrimonio familiar.",
      fullText: "Te brindo orientación legal en situaciones familiares como acuerdos, conflictos, procesos legales o decisiones importantes que puedan afectar tu bienestar o el de tu familia.\nAdemás, te ofrezco acompañamiento preventivo para anticipar riesgos, evitar problemas y tomar decisiones informadas previniendo dificultades legales.\nMi enfoque es cercano, humano y pensado para proteger tu tranquilidad y la de tu hogar.",
      youtubeId: "5FrhtahQiRc"
    },
    {
      image: sucecionesImg,
      title: "Sucesiones Herenciales",
      summary: "Acompaño el proceso legal cuando una persona fallece y su patrimonio debe ser distribuido entre los herederos.",
      fullText: "Cuando una persona fallece, sus bienes, propiedades y recursos deben repartirse de manera justa entre sus herederos. Te acompaño en todo el proceso para que esta distribución se haga sin conflictos, de forma ordenada y siguiendo la ley.\nMi objetivo es darte tranquilidad, explicarte cada paso con claridad y evitarte trámites innecesarios o problemas familiares.",
      youtubeId: "Wxn6udR_6GE"
    },
    {
      image: testamentosImg,
      title: "Testamento y Planificación Familiar Patrimonial",
      summary: "Guío a las personas para organizar sus bienes en vida y decidir cómo se distribuirán en el futuro.",
      fullText: "Un testamento o una buena planificación patrimonial te permite decidir con anticipación cómo proteger a tu familia y qué pasará con tus bienes.\nTe asesoro para que puedas organizar tu patrimonio de manera segura, clara y legal, evitando futuros inconvenientes, disputas o gastos inesperados.\nEste proceso es sencillo, confidencial y pensado para que tú y tu familia tengan total tranquilidad.",
      youtubeId: "yebNIHKAC4A"
    },
    {
      image: particionBienesImg,
      title: "Herencia Anticipada o Partición de Patrimonio en Vida",
      summary: "Acompaño a las familias que desean adelantar la distribución de bienes antes del fallecimiento, para evitar conflictos posteriores.",
      fullText: "Si deseas adelantar parte o toda la herencia estando en vida, si quieres conservando la administración o el usufructo, te represento en el proceso judicial y el trámite notarial evitando problemas futuros y asegurando que tu voluntad se respete siempre.\nAcompaño cada trámite y proceso con claridad y rigor legal, protegiéndote a ti y a tu familia en cada paso.\nEste es un acto de responsabilidad y cariño hacia los tuyos.",
      youtubeId: "C3GouGa0noM"
    }
  ];

return (
  <div id="especializacion" className="w-full py-16" style={{ backgroundColor: '#F7F4EF' }}>
    <div className="container mx-auto px-4">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-10" style={{ color: '#304B52' }}>Áreas de Especialización Legal</h1>
      <p className="text-lg md:text-2xl text-center mb-8">Soluciones legales integrales para tu patrimonio familiar</p>
      <div ref={refCards} className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 ${inViewCards ? 'animate-zoom-in' : 'opacity-0'}`}>
        {especialidades.map((especialidad) => (
          <Content_Card
            key={especialidad.title}
            image={especialidad.image}
            title={especialidad.title}
            summary={especialidad.summary}
            fullText={especialidad.fullText}
            youtubeId={especialidad.youtubeId}
          />
        ))}
      </div>
    </div>
  </div>
);
}
export default Especializacion;
