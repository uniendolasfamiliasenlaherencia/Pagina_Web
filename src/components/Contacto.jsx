import React, { useState, useEffect } from "react";
import { useInView } from 'react-intersection-observer';
import { useEmailJS } from '../hooks/useEmailJS';

export default function Contacto() {
  const { ref: refContent, inView: inViewContent } = useInView({ threshold: 0.1, triggerOnce: false });
  const { sendEmail, loading, error: hookError, success } = useEmailJS();
  const [successVisible, setSuccessVisible] = useState(false);
  
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    consulta: "",
    terminos: false
  });

  const [errores, setErrores] = useState({
    nombre: "",
    email: "",
    consulta: "",
    terminos: ""
  });

  // Efecto para ocultar el mensaje de éxito después de 2 minutos
  useEffect(() => {
    if (success) {
      setSuccessVisible(true);
      const timer = setTimeout(() => {
        setSuccessVisible(false);
      }, 120000); // 2 minutos en milisegundos
      return () => clearTimeout(timer);
    }
  }, [success]);

  const validarEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleNombreChange = (e) => {
    const valor = e.target.value;
    // Solo permite letras y espacios
    if (/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/.test(valor) || valor === "") {
      setFormData({ ...formData, nombre: valor });
      setErrores({ ...errores, nombre: "" });
    } else {
      setErrores({ ...errores, nombre: "Solo Letras" });
    }
  };

  const handleEmailChange = (e) => {
    const valor = e.target.value;
    setFormData({ ...formData, email: valor });
    if (valor && !validarEmail(valor)) {
      setErrores({ ...errores, email: "Ingrese un correo válido" });
    } else {
      setErrores({ ...errores, email: "" });
    }
  };

  const handleConsultaChange = (e) => {
    setFormData({ ...formData, consulta: e.target.value });
    setErrores({ ...errores, consulta: "" });
  };

  const handleTerminosChange = (e) => {
    setFormData({ ...formData, terminos: e.target.checked });
    setErrores({ ...errores, terminos: "" });
  };

  const handleEnviar = async (e) => {
    e.preventDefault();
    let erroresNuevos = {};

    // Validar nombre
    if (!formData.nombre.trim()) {
      erroresNuevos.nombre = "El nombre es requerido";
    }

    // Validar email
    if (!formData.email.trim()) {
      erroresNuevos.email = "El email es requerido";
    } else if (!validarEmail(formData.email)) {
      erroresNuevos.email = "Ingrese un correo válido";
    }

    // Validar consulta
    if (!formData.consulta.trim()) {
      erroresNuevos.consulta = "La consulta es requerida";
    }

    // Validar términos
    if (!formData.terminos) {
      erroresNuevos.terminos = "Debes aceptar los términos y condiciones";
    }

    setErrores(erroresNuevos);

    if (Object.keys(erroresNuevos).length === 0) {
      // Enviar formulario a través de EmailJS
      const result = await sendEmail(
        formData.nombre,
        formData.email,
        formData.consulta
      );

      if (result.success) {
        // Limpiar formulario y mostrar éxito
        setFormData({
          nombre: "",
          email: "",
          consulta: "",
          terminos: false
        });
        alert("¡Consulta enviada exitosamente! Pronto nos pondremos en contacto.");
      } else {
        alert("Error al enviar la consulta: " + result.error);
      }
    }
  };

  return (
    <section id="contacto" ref={refContent} className={`w-full bg-white py-16 ${inViewContent ? 'animate-slide-up' : 'opacity-0'}`}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Parte Izquierda - Información de Contacto */}
          <div className="flex flex-col justify-start">
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: '#304B52' }}>
              Contáctanos
            </h2>
            <p className="text-base md:text-lg text-gray-700 mb-8">
              Estamos listos para escuchar tu situación y ofrecer orientación
            </p>

            {/* Correo */}
            <div className="flex items-start gap-4 mb-8">
              <svg
                className="w-6 h-6 flex-shrink-0 mt-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                style={{ color: '#304B52' }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <div>
                <p className="text-gray-900 font-semibold underline">uniendolasfamiliasenlaherencia@gmail.com</p>
              </div>
            </div>

            {/* Teléfono */}
            <div className="flex items-start gap-4 mb-8">
              <svg
                className="w-6 h-6 flex-shrink-0 mt-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                style={{ color: '#304B52' }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              <div>
                <p className="text-gray-900 font-semibold underline">+57 314 299 9366</p>
              </div>
            </div>

            {/* Ubicación */}
            <div className="flex items-start gap-4">
              <svg
                className="w-6 h-6 flex-shrink-0 mt-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                style={{ color: '#304B52' }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <div>
                <p className="text-gray-900 font-semibold">Cra 7 # 17 -51, oficina 607- Edificio Séptima</p>
                <p className="text-gray-700 mt-1">Barrio Las Nieves - Bogotá</p>
                <p className="text-gray-700 mt-1">Cita previa</p>
              </div>
            </div>
          </div>

          {/* Parte Derecha - Formulario */}
          <div>
            <form onSubmit={handleEnviar} className="space-y-6">
              {/* Nombre Completo */}
              <div>
                <label className="block text-gray-900 font-semibold mb-2">
                  Nombre completo
                </label>
                <input
                  type="text"
                  value={formData.nombre}
                  onChange={handleNombreChange}
                  placeholder="Tu nombre"
                  className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 ${
                    errores.nombre
                      ? "border-red-500 focus:ring-red-500 bg-red-50"
                      : "border-gray-300"
                  }`}
                  style={!errores.nombre ? { '--tw-ring-color': '#304B52' } : {}}
                  onFocus={(e) => e.target.style.outlineColor = '#304B52'}
                />
                {errores.nombre && (
                  <p className="text-red-500 text-sm mt-2">{errores.nombre}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-gray-900 font-semibold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={handleEmailChange}
                  placeholder="tu@email.com"
                  className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 ${
                    errores.email
                      ? "border-red-500 focus:ring-red-500 bg-red-50"
                      : "border-gray-300"
                  }`}
                  style={!errores.email ? { '--tw-ring-color': '#304B52' } : {}}
                  onFocus={(e) => e.target.style.outlineColor = '#304B52'}
                />
                {errores.email && (
                  <p className="text-red-500 text-sm mt-2">{errores.email}</p>
                )}
              </div>

              {/* Tu Consulta */}
              <div>
                <label className="block text-gray-900 font-semibold mb-2">
                  Tu consulta:
                </label>
                <textarea
                  value={formData.consulta}
                  onChange={handleConsultaChange}
                  placeholder="Escribe tu mensaje..."
                  className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 min-h-40 resize-none ${
                    errores.consulta
                      ? "border-red-500 focus:ring-red-500 bg-red-50"
                      : "border-gray-300"
                  }`}
                  style={!errores.consulta ? { '--tw-ring-color': '#304B52' } : {}}
                  onFocus={(e) => e.target.style.outlineColor = '#304B52'}
                />
                {errores.consulta && (
                  <p className="text-red-500 text-sm mt-2">{errores.consulta}</p>
                )}
              </div>

              {/* Términos y Condiciones */}
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="terminos"
                  checked={formData.terminos}
                  onChange={handleTerminosChange}
                  className="w-5 h-5 mt-1 cursor-pointer"
                  style={{ accentColor: '#304B52' }}
                />
                <label htmlFor="terminos" className="text-gray-700 cursor-pointer">
                  Acepto los términos y condiciones
                </label>
              </div>
              {errores.terminos && (
                <p className="text-red-500 text-sm">{errores.terminos}</p>
              )}

              {/* Botón Enviar */}
              <button
                type="submit"
                disabled={loading}
                className={`text-white font-semibold px-6 py-2 rounded-md shadow-lg transition text-sm ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                style={{ backgroundColor: '#C47A59' }}
                onMouseEnter={(e) => !loading && (e.target.style.opacity = '0.9')}
                onMouseLeave={(e) => !loading && (e.target.style.opacity = '1')}
              >
                {loading ? 'Enviando...' : 'Enviar'}
              </button>
              
              {/* Mensaje de error */}
              {hookError && (
                <p className="text-red-500 text-sm">{hookError}</p>
              )}
              
              {/* Mensaje de éxito */}
              {successVisible && (
                <p className="text-green-500 text-sm">¡Consulta enviada correctamente!</p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
