import { useImagePreload } from './hooks/usePerformance';
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Abogada from "./components/Abogada";
import Especializacion from "./components/Especializacion";
import Nosotros from "./components/Nosotros";
import Noticias from "./components/Conflictos";
import AgendarConsulta from "./components/AgendarConsulta";
import Contacto from "./components/Contacto";
import Footer from "./components/Footer";

// Importar imágenes críticas para precarga
import imgHero from "./img/img_hero.png";
import imgAbogada from "./img/img_abogada.jpeg";

function App() {
  // Precargar imágenes críticas
  useImagePreload([imgHero, imgAbogada]);

  return (
    <div className="font-sans bg-gray-50 lg:pt-16">
      <Navbar />
      <Hero />
      <Abogada />
      <Especializacion />
      <Nosotros />
      <Noticias />
      <AgendarConsulta />
      <Contacto />
      <Footer />
    </div>
  );
}

export default App;
