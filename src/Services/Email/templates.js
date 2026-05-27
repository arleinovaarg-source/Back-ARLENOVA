import { getBaseLayout } from "./layout.js";

export const templates = {
  // 1. Notificaciones genéricas
  notification: (userName, messageText, buttonText, buttonUrl) => {
    const html = `
      <h2 style="color: #1a1a1a; font-size: 22px; font-weight: 600; margin-top: 0; margin-bottom: 16px;">¡Hola, ${userName}!</h2>
      <p style="font-size: 16px; color: #4a4a4a; line-height: 1.6; margin-bottom: 25px;">${messageText}</p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${buttonUrl}" style="background-color: #1a1a1a; color: #ffffff; padding: 12px 28px; text-decoration: none; border-radius: 6px; font-size: 15px; font-weight: 500; display: inline-block;">
          ${buttonText}
        </a>
      </div>
    `;
    return getBaseLayout(html);
  },

  // 2. Restablecer Contraseña
  passwordReset: (userName, resetLink) => {
    const html = `
      <h2 style="color: #1a1a1a; font-size: 22px; font-weight: 600; margin-top: 0; margin-bottom: 16px;">Recuperar contraseña</h2>
      <p style="font-size: 16px; color: #4a4a4a; line-height: 1.6;">Hola ${userName}, recibimos una solicitud para restablecer tu contraseña en nuestra plataforma.</p>
      <p style="font-size: 16px; color: #4a4a4a; line-height: 1.6; margin-bottom: 25px;">Hacé clic en el siguiente botón para continuar. Este enlace expira en 1 hora.</p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${resetLink}" style="background-color: #0070f3; color: #ffffff; padding: 12px 28px; text-decoration: none; border-radius: 6px; font-size: 15px; font-weight: 500; display: inline-block;">
          Restablecer Contraseña
        </a>
      </div>
      <p style="font-size: 13px; color: #8c8c8c; line-height: 1.4;">Si vos no solicitaste esto, podés ignorar este correo de forma segura.</p>
    `;
    return getBaseLayout(html);
  },

  // 3. Facturas / Recibos
  invoice: (userName, invoiceNumber, totalAmount, downloadUrl) => {
    const html = `
      <h2 style="color: #1a1a1a; font-size: 22px; font-weight: 600; margin-top: 0; margin-bottom: 16px;">Tu factura está lista</h2>
      <p style="font-size: 16px; color: #4a4a4a; line-height: 1.6;">Hola ${userName}, te adjuntamos el detalle de tu última operación.</p>
      
      <div style="background-color: #f9f9f9; padding: 20px; border-radius: 6px; margin: 20px 0;">
        <table style="width: 100%; font-size: 15px; color: #4a4a4a;">
          <tr>
            <td style="padding: 5px 0;"><strong>Comprobante:</strong></td>
            <td style="text-align: right; padding: 5px 0;">${invoiceNumber}</td>
          </tr>
          <tr>
            <td style="padding: 5px 0;"><strong>Total abonado:</strong></td>
            <td style="text-align: right; padding: 5px 0; color: #1a1a1a; font-weight: bold;">$${totalAmount}</td>
          </tr>
        </table>
      </div>

      <div style="text-align: center; margin: 30px 0;">
        <a href="${downloadUrl}" style="background-color: #1a1a1a; color: #ffffff; padding: 12px 28px; text-decoration: none; border-radius: 6px; font-size: 15px; font-weight: 500; display: inline-block;">
          Descargar Factura PDF
        </a>
      </div>
    `;
    return getBaseLayout(html);
  }
};