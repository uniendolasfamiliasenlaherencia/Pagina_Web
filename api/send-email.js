export default async function handler(req, res) {
  // Solo aceptar POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { nombre, email, consulta } = req.body;

  // Validar campos requeridos
  if (!nombre || !email || !consulta) {
    return res.status(400).json({ error: 'Faltan campos requeridos' });
  }

  // Validar email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Email no válido' });
  }

  try {
    // Verificar que la API key está disponible
    const apiKey = process.env.RESEND_API_KEY;
    
    if (!apiKey) {
      console.error('RESEND_API_KEY environment variable is missing');
      return res.status(500).json({ 
        error: 'Error de configuración del servidor. Por favor, contacta al administrador.',
        debug: 'RESEND_API_KEY not found'
      });
    }

    // Importar Resend dinámicamente
    const { Resend } = await import('resend');
    const resend = new Resend(apiKey);
    // Enviar email a ti (administrador)
    const adminResponse = await resend.emails.send({
      from: 'onboarding@resend.dev', // Email de prueba de Resend (cambia cuando tengas dominio)
      to: 'anyyelo6941@gmail.com', // Email de la abogada
      subject: `Nueva consulta de ${nombre}`,
      html: `
        <h2>Nueva consulta recibida</h2>
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Consulta:</strong></p>
        <p>${consulta.replace(/\n/g, '<br>')}</p>
      `,
    });

    // Enviar confirmación al cliente
    await resend.emails.send({
      from: 'onboarding@resend.dev', // Email de prueba de Resend
      to: email,
      subject: 'Hemos recibido tu consulta - Uniendolafamiliasenlaherencia',
      html: `
        <h2>Gracias por tu consulta</h2>
        <p>Hola ${nombre},</p>
        <p>Hemos recibido tu mensaje y nos pondremos en contacto contigo pronto.</p>
        <p>Tu consulta:</p>
        <p>${consulta.replace(/\n/g, '<br>')}</p>
        <p>Saludos,<br>Uniendolafamiliasenlaherencia</p>
      `,
    });

    return res.status(200).json({ 
      success: true, 
      message: 'Email enviado exitosamente' 
    });
  } catch (error) {
    console.error('Error enviando email:', error);
    return res.status(500).json({ 
      error: 'Error al enviar el email',
      details: error.message 
    });
  }
}
