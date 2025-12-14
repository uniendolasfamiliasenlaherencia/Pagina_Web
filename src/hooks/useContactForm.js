import { useState } from 'react';

export const useContactForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const submitForm = async (nombre, email, consulta) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre,
          email,
          consulta,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al enviar el formulario');
      }

      setSuccess(true);
      setLoading(false);
      return { success: true };
    } catch (err) {
      setError(err.message);
      setLoading(false);
      return { success: false, error: err.message };
    }
  };

  return { submitForm, loading, error, success };
};
