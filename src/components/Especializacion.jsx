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
      summary: "En máximo 2 meses adelanto el trámite notarial, luego de lograr acuerdo entre los interesados en la distribución de la herencia, ante el fallecimiento de un integrante de la familia.",
      fullText: "La Asignación de la herencia entre los herederos en forma justa y equitativa. Sin conflictos, de forma ordenada y ajustada la ley. Mi objetivo es darte tranquilidad, explicarte cada paso con claridad y evitarte trámites innecesarios o problemas familiares",
      youtubeId: "Wxn6udR_6GE"
    },
    {
      image: testamentosImg,
      title: "Testamento y Planificación Familiar Herencial",
      summary: "Guío a las personas para organizar sus bienes en vida y decidir cómo se distribuirán en el futuro.",
      fullText: "Un testamento y/o una buena planificación familiar herencial te permiten decidir con anticipación cómo proteger a tu familia? y qué pasará con tus bienes?. Te asesoro para que puedas organizar tu patrimonio de manera segura, clara y legal, evitando futuros inconvenientes, disputas o gastos inesperados. Este proceso es sencillo, confidencial y pensado para que tú y tu familia tengan total tranquilidad.",
      youtubeId: "yebNIHKAC4A"
    },
    {
      image: particionBienesImg,
      title: "Herencia Anticipada o Partición de Patrimonio en Vida",
      summary: "Represento a las familias que desean adelantar la distribución de bienes antes del fallecimiento, para evitar conflictos posteriores.",
      fullText: "Si deseas adelantar parte o toda la herencia estando en vida, si quieres conservando la administración o el usufructo, te represento en el proceso judicial y el trámite notarial evitando problemas futuros y asegurando que tu voluntad se respete siempre.\nAcompaño cada trámite y proceso con claridad y rigor legal, protegiéndote a ti y a tu familia en cada paso.\nEste es un acto de responsabilidad y cariño hacia los tuyos.",
      youtubeId: "C3GouGa0noM"
    }
  ];

return (
  <div id="especializacion" className="w-full py-16" style={{ backgroundColor: '#F7F4EF' }}>
    <div className="container mx-auto px-4">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-10" style={{ color: '#304B52' }}>Asuntos de Desempeño Legal</h1>
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
