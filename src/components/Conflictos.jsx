import React from "react";
import { useInView } from 'react-intersection-observer';
import ConflictCard from "./ConflictCard";
import testamentosImg from '../img/img_testamentos.png';
import patrimonioImg from '../img/img_patrimonio.png';
import herenciaImg from '../img/img_herencia.png';

const Noticias = () => {
  const { ref: refCards, inView: inViewCards } = useInView({ threshold: 0.1, triggerOnce: false });
  
  const temas = [
    {
      orangeTitle: "Herencia",
      image: herenciaImg,
      title: "Como proteger el patrimonio familiar",
      description: "Estrategias legales para una distribución justa",
      fullText: "Proteger el patrimonio familiar es fundamental para evitar conflictos, asegurar el futuro de tus herederos y garantizar que tus bienes se administren como tú lo deseas. Estas son las principales estrategias legales que puedes utilizar en Colombia:\n\n1. Elaborar un testamento claro y actualizado\nUn testamento permite dejar por escrito cómo deseas que se repartan tus bienes.\nIncluye:\n• Herederos designados\n• Distribución específica de bienes\n• Manifestación de tu voluntad\nActualizarlo evita que quede desactualizado frente a cambios familiares o patrimoniales.\n\n2. Herencia Anticipada o Partición de Patrimonio en Vida\nPuedes adelantar parte o toda la herencia estando en vida, si quieres conservando la administración o el usufructo.\nEsto ayuda a:\n• Evitar discusiones futuras\n• Asegurar que cada persona reciba lo que deseas\n• Reducir tiempos y costos en la sucesión\nEs importante formalizarlas por escrito para que sean válidas.\n\n3. Crear acuerdos familiares\nSon documentos donde la familia define cómo se manejarán ciertos bienes o decisiones.\nSirven para:\n• Prevenir conflictos\n• Dejar reglas claras\n• Evitar interpretaciones erróneas\nEstos acuerdos deben hacerse con asesoría legal para que tengan efectos reales.\n\n4. Realizar una planificación patrimonial\nConsiste en revisar todos tus bienes (propiedades, cuentas, vehículos, inversiones) y organizar cómo se administrarán y repartirán.\nIncluye:\n• Titularidad\n• Derechos de uso\n• Reglas de administración\n• Recomendaciones para los herederos\nEsta planificación evita confusiones y acelera el trámite sucesoral.\n\n5. Dejar instrucciones sobre bienes sensibles\nComo fincas, terrenos heredados, negocios familiares o propiedades donde vive algún heredero.\nAclara:\n• ¿Quién podrá administrarlos?.\n• ¿Qué reglas de uso deben seguir?.\n• ¿Qué hacer en caso de venta?.\nEsto evita problemas en la administración de bienes con valor sentimental.\n\n6. Contar con asesoría jurídica especializada\nUn abogado experto en sucesiones puede:\n• Explicar qué decisiones te convienen según tu caso\n• Prevenir errores que luego generen conflictos\n• Redactar documentos válidos y ajustados a la ley\n• Ayudarte a que todo quede bien establecido desde el inicio\n\n7. Mantener actualizados tus documentos personales y de propiedad\nTener escrituras, registros, certificados y documentos al día facilita todo el proceso sucesoral.\nEsto evita:\n• Retrasos\n• Problemas entre herederos\n• Costos adicionales por trámites atrasados",
      youtubeId: "Wxn6udR_6GE"
    },
    {
      orangeTitle: "Testamentos",
      image: testamentosImg,
      title: "Aspectos legales de los testamentos en Colombia",
      description: "Guía completa para redactar un testamento válido",
      fullText: "Redactar un testamento válido en Colombia requiere cumplir ciertos requisitos legales que garantizan que tu voluntad se respete. Aquí tienes una guía clara de lo que debes saber:\n\n1. Tipos de testamento permitidos en Colombia\nLos más utilizados son:\n• Testamento abierto: se lleva ante el notario quien lo lee de viva voz en presencia del Testador y los 3 testigos.\n• Testamento cerrado: se lleva ante el Notario en sobre cerrado, sobre en el cual de puño y letra del notario deja las constancias que la ley le ordena respecto del Testador y los 5 testigos.\nEl más seguro y reconocido es el testamento abierto, por su respaldo jurídico.\n\n2. Quién puede hacer un testamento\nLos mayores de 14 años, siempre y cuando gocen de sus facultades mentales.\nLa persona debe:\n• Actuar libremente.\n• Entender lo que está firmando.\n• No estar bajo presión o manipulación.\n\n3. Qué debe contener un testamento válido\nPara que funcione sin problemas, debe incluir:\n• Identificación completa del testador\n• Relación clara de bienes y propiedades\n• Nombre de los herederos\n• Porcentaje o parte exacta que recibirá cada una\n• Declaraciones especiales (hijos menores, bienes sensibles, negocios, etc.)\n• Firma del testador y del notario\n• Firma de los testigos (según el tipo de testamento)\n\n4. La legítima y la parte de libre disposición\nLa ley colombiana protege ciertos herederos obligatorios.\n• Legítima: parte mínima que debe recibir (hijos y en su defecto el cónyuge y/o padres).\n• Libre disposición: parte que puedes asignar a quien tú quieras.\nUn testamento bien redactado respeta estas reglas para evitar demanda de nulidad.\n\n5. ¿Cómo evitar que el testamento sea impugnado?\nPara mayor seguridad:\n• Evita escribirlo de forma ambigua.\n• No modifiques el testamento sin asesoría.\n• Excluye herederos obligatorios solo si tienes argumentos válidos.\nRecuerda que se debe llevar para protocolizarlo ante Notario, quien lo guardará en la Notaría.\n\n6. Cuándo conviene actualizar un testamento\nEs recomendable revisarlo cuando ocurre:\n• Matrimonio o separación\n• Nacimiento de un hijo\n• Compra de una propiedad\n• Venta de un bien importante\n• Fallecimiento de un heredero\n• Cambio en tu situación económica\nUn testamento desactualizado puede causar disputas o quedar sin efecto parcial.\n\n7. Ventajas de tener un testamento\n• Evita conflictos entre herederos\n• Acelera el proceso de sucesión\n• Permite dejar instrucciones claras\n• Protege a personas vulnerables\n• Reduce costos y tiempos legales\n• Garantiza que tu voluntad se cumpla",
      youtubeId: "yebNIHKAC4A"
    },
    {
      orangeTitle: "Patrimonio",
      image: patrimonioImg,
      title: "Distribución equitativa de bienes",
      description: "Consejos para prevenir conflictos entre herederos",
      fullText: "Una distribución justa y bien organizada es clave para evitar desacuerdos entre herederos. Estas son las recomendaciones más importantes para lograrlo en Colombia:\n\n1. Hacer un inventario completo de los bienes\nAntes de repartir, es fundamental saber exactamente qué existe.\nIncluye:\n• Propiedades\n• Vehículos\n• Cuentas bancarias\n• Ganancias ocasionales\n• Terrenos rurales o fincas\n• Bienes heredados previamente\nUn inventario evita que un bien quede \"perdido\" y cause discusiones.\n\n2. Definir el valor real de los bienes\nMuchos conflictos nacen porque los herederos sienten que \"recibieron menos\".\nSolicitar avalúos o valoraciones profesionales ayuda a:\n• Repartir de manera equilibrada\n• Compensar diferencias económicas\n• Evitar discusiones por bienes de mayor valor sentimental\n\n3. Explicar por qué se asigna cada bien\nCuando la voluntad del testador o de la familia queda clara, se reducen los conflictos.\nPuedes justificar:\n• Quién vive actualmente en un inmueble\n• Quién administra un negocio familiar\n• Quién ha cuidado una propiedad rural\n• Quién necesita protección especial\nLa transparencia disminuye molestias o malos entendidos.\n\n4. Combinar bienes para equilibrar la repartición\nSi un heredero recibe un bien de alto valor (por ejemplo una casa), se puede compensar al resto con:\n• Dinero\n• Porcentajes de otros bienes\n• Beneficios económicos equivalentes\nEsto permite una distribución más equitativa y evita sentimientos de injusticia.\n\n5. Formalizar acuerdos por escrito\nEs común hacer acuerdos \"de palabra\", pero esto genera problemas futuros.\nUn acuerdo formal:\n• Evita interpretaciones\n• Tiene validez legal\n• Protege a todos los herederos\n• Deja reglas claras sobre el uso y administración de los bienes\n\n6. Considerar bienes con valor emocional\nTerrenos heredados, casas de familia o fincas suelen tener carga sentimental.\nPara estos casos se recomienda:\n• Determinar los derechos que a cada heredero se le asignan como usufructo (uso sin disposición), nuda propiedad (sin poder beneficiarse de los frutos en tanto otro es el usufructuario), pleno dominio (uso, goce y poder de disposición).\n• Definir reglas claras de uso\n• Determinar cómo se comparten gastos y beneficios\nEsto previene rupturas familiares por temas emocionales.\n\n7. Buscar mediación o acompañamiento jurídico\nUn abogado especializado puede ayudar a:\n• Explicar opciones legales\n• Mediar entre los herederos\n• Evitar decisiones impulsivas\n• Diseñar acuerdos que respeten la ley y la unión familiar\nUn acompañamiento profesional reduce tensiones y acelera el proceso.",
      youtubeId: "C3GouGa0noM"
    }
  ];

return (
  <div id="noticias" className="w-full py-16" style={{ backgroundColor: '#F7F4EF' }}>
    <div className="container mx-auto px-4">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-10" style={{ color: '#304B52' }}>Aprende a evitar conflictos</h1>
       <h1 className="text-4xl md:text-5xl font-bold text-center mb-10" style={{ color: '#304B52' }}>familiares</h1>
      <p className="text-lg md:text-2xl text-center mb-8">Recursos para comprender procesos sucesorales</p>
      <div ref={refCards} className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:max-w-5xl lg:mx-auto ${inViewCards ? 'animate-bounce-in' : 'opacity-0'}`}>
        {temas.map((tema, index) => (
          <ConflictCard
            key={index}
            orangeTitle={tema.orangeTitle}
            image={tema.image}
            title={tema.title}
            description={tema.description}
            fullText={tema.fullText}
            whiteBadge={true}
            textButton="Leer más"
          />
        ))}
      </div>
    </div>
  </div>
);
}
export default Noticias;
