import { useState } from 'react';
import emailjs from '@emailjs/browser';

// Inicializar EmailJS con tu Public Key
emailjs.init('B3Y6Goto-YNi_fKZ6');

export const useEmailJS = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const sendEmail = async (nombre, email, consulta) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Enviar email usando el template "Contact Us"
      const response = await emailjs.send(
        'service_bey43tz', // Tu Service ID
        'template_tszbsg6', // Template ID del Contact Us
        {
          name: nombre,
          email: email,
          message: consulta,
          title: `Nueva consulta de ${nombre}`
        }
      );

      setSuccess(true);
      setLoading(false);
      return { success: true };
    } catch (err) {
      console.error('Error sending email:', err);
      setError('Error al enviar el email. Por favor, intenta de nuevo.');
      setLoading(false);
      return { success: false, error: err.message };
    }
  };

  return { sendEmail, loading, error, success };
};
