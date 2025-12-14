import logo from '../img/logo.svg';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');

  const handleNavClick = (e, sectionId) => {
    e.preventDefault();
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  // Detectar sección activa al hacer scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['inicio', 'abogada', 'especializacion', 'noticias'];
      const scrollPosition = window.scrollY + 100;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cerrar menú al hacer scroll
  useEffect(() => {
    const handleScroll = () => {
      if (isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isOpen]);

  return (
    <nav className="fixed top-0 w-full text-white py-4 shadow-md z-50" style={{ backgroundColor: '#304B52' }}>
      <div className="mx-auto px-4 md:px-8 flex items-center justify-between">
        
        {/* Logo */}
        <img src={logo} alt="Logo" className="h-10 w-auto" />

        {/* Botón Hamburguesa - Solo visible en móvil */}
        <button
          className="md:hidden flex flex-col gap-1.5"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <span className={`h-0.5 w-6 bg-white transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`h-0.5 w-6 bg-white transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`}></span>
          <span className={`h-0.5 w-6 bg-white transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>

        {/* Menu y Botón - Desktop */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex gap-4 sm:gap-8 text-xs sm:text-sm">
            <li><a href="#" onClick={(e) => handleNavClick(e, 'inicio')} className="hover:text-gray-200 transition pb-1" style={{ borderBottom: activeSection === 'inicio' ? '2px solid #D0B68A' : 'none' }}>Inicio</a></li>
            <li><a href="#" onClick={(e) => handleNavClick(e, 'abogada')} className="hover:text-gray-200 transition pb-1" style={{ borderBottom: activeSection === 'abogada' ? '2px solid #D0B68A' : 'none' }}>Abogada</a></li>
            <li><a href="#" onClick={(e) => handleNavClick(e, 'especializacion')} className="hover:text-gray-200 transition pb-1" style={{ borderBottom: activeSection === 'especializacion' ? '2px solid #D0B68A' : 'none' }}>Servicios</a></li>
            <li><a href="#" onClick={(e) => handleNavClick(e, 'noticias')} className="hover:text-gray-200 transition pb-1" style={{ borderBottom: activeSection === 'noticias' ? '2px solid #D0B68A' : 'none' }}>Noticias</a></li>
          </ul>

          {/* Botón Contacto - Desktop */}
          <button
            onClick={(e) => {
              e.preventDefault();
              const contactoElement = document.getElementById('contacto');
              if (contactoElement) {
                contactoElement.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="px-4 py-2 rounded-md text-sm transition whitespace-nowrap cursor-pointer border-2"
            style={{ 
              borderColor: '#D0B68A', 
              color: '#FFFFFF',
              backgroundColor: 'transparent'
            }}
            onMouseEnter={(e) => { 
              e.currentTarget.style.backgroundColor = '#D0B68A'; 
              e.currentTarget.style.color = '#304B52'; 
            }}
            onMouseLeave={(e) => { 
              e.currentTarget.style.backgroundColor = 'transparent'; 
              e.currentTarget.style.color = '#FFFFFF'; 
            }}
          >
            Contacto
          </button>
        </div>
      </div>

      {/* Menu Móvil - Hamburguesa */}
      {isOpen && (
        <div className="md:hidden fixed top-16 left-0 w-full shadow-lg max-h-[calc(100vh-4rem)] overflow-y-auto" style={{ backgroundColor: '#304B52' }}>
          <ul className="flex flex-col gap-0 text-sm py-4">
            <li><a href="#" onClick={(e) => handleNavClick(e, 'inicio')} className="block px-8 py-3 hover:bg-white hover:bg-opacity-10 transition">Inicio</a></li>
            <li><a href="#" onClick={(e) => handleNavClick(e, 'abogada')} className="block px-8 py-3 hover:bg-white hover:bg-opacity-10 transition">Abogada</a></li>
            <li><a href="#" onClick={(e) => handleNavClick(e, 'especializacion')} className="block px-8 py-3 hover:bg-white hover:bg-opacity-10 transition">Servicios</a></li>
            <li><a href="#" onClick={(e) => handleNavClick(e, 'noticias')} className="block px-8 py-3 hover:bg-white hover:bg-opacity-10 transition">Noticias</a></li>
            <li className="border-t border-white border-opacity-20 px-8 py-3">
              <a
                href="#"
                onClick={(e) => handleNavClick(e, 'contacto')}
                className="block w-full px-3 py-2 rounded-md text-sm text-center transition"
                style={{ 
                  borderColor: '#D0B68A', 
                  border: '2px solid #D0B68A', 
                  color: '#FFFFFF',
                  backgroundColor: 'transparent'
                }}
                onMouseEnter={(e) => { 
                  e.target.style.backgroundColor = '#D0B68A'; 
                  e.target.style.color = '#304B52'; 
                }}
                onMouseLeave={(e) => { 
                  e.target.style.backgroundColor = 'transparent'; 
                  e.target.style.color = '#FFFFFF'; 
                }}
              >
                Contacto
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
