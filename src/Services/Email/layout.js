const LOGO_URL = "https://res.cloudinary.com/dmxriftxk/image/upload/v1779232035/logo_rvxmzh.png";

export const getBaseLayout = (contentHtml) => `
  <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 0; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden; background-color: #ffffff;">
    
    <div style="background-color: #ffffff; padding: 25px; text-align: center; border-bottom: 1px solid #f0f0f0;">
      <img src="${LOGO_URL}" alt="Arlenova" style="max-height: 45px; width: auto; display: inline-block;" />
    </div>

    <div style="padding: 30px 40px;">
      ${contentHtml}
    </div>

    <div style="background-color: #fafafa; padding: 20px 40px; text-align: center; border-top: 1px solid #f0f0f0;">
      <p style="font-size: 12px; color: #8c8c8c; margin: 0 0 8px 0;">Este es un mensaje automático enviado de manera segura por Arlenova.</p>
      <p style="font-size: 11px; color: #b5b5b5; margin: 0;">&copy; ${new Date().getFullYear()} Arlenova. Todos los derechos reservados.</p>
    </div>

  </div>
`;