import { sendEmail } from "../../Config/emailService.js";
import { templates } from "./templates.js";

export const mailer = {
  sendNotification: async (to, { userName, titleText, messageText, buttonText, buttonUrl }) => {
    const htmlBody = templates.notification(userName, messageText, buttonText, buttonUrl);
    return sendEmail({ to, subject: `${titleText} 🔔`, htmlBody });
  },

  sendPasswordReset: async (to, { userName, resetLink }) => {
    
    const htmlBody = templates.passwordReset(userName, resetLink);
    return sendEmail({ to, subject: "Restablecer tu contraseña 🔑", htmlBody });
  },

  invoice: async ({ to, subject, text }) => {
  return sendEmail({ 
    to, 
    subject, 
    htmlBody: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
        <h2 style="color: #4CAF50; text-align: center;">¡Pago Aprobado! 🎉</h2>
        <hr style="border: 0; border-top: 1px solid #eee;" />
        <p style="font-size: 16px;">${text.replace(/\n/g, '<br>')}</p>
        <hr style="border: 0; border-top: 1px solid #eee;" />
        <p style="font-size: 12px; color: #777; text-align: center;">Este es un correo automático, por favor no respondas a este mensaje.</p>
      </div>
    ` 
  });
}
};