import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import 'dotenv/config'; // Asegúrate de tener instalado 'dotenv' para leer el archivo .env

// Inicializamos el cliente con la v3 de AWS
const sesClient = new SESClient({
  region: process.env.AWS_REGION ,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
});

const runTest = async () => {
  console.log("⏳ Iniciando prueba de envío con AWS SES v3...");

  // IMPORTANTE: Cambia este correo por tu email personal para la prueba
  const emailDePrueba = "arinovaarg@gmail.com"; 

  const command = new SendEmailCommand({
    Source: "test@arlenova.com.ar", // Usa tu dominio verificado
    Destination: {
      ToAddresses: [emailDePrueba],
    },
    Message: {
      Subject: {
        Data: "🚀 Prueba de AWS SES - Arlenova",
        Charset: "UTF-8",
      },
      Body: {
        Html: {
          Data: `
            <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; max-width: 500px;">
              <h2 style="color: #232f3e;">¡Conexión Exitosa!</h2>
              <p>Si estás leyendo esto, tu backend en Node.js se autenticó correctamente con IAM y envió el correo usando el dominio a través de Cloudflare.</p>
              <span style="font-size: 12px; color: #888;">Test enviado el: ${new Date().toLocaleString()}</span>
            </div>
          `,
          Charset: "UTF-8",
        },
      },
    },
  });

  try {
    const response = await sesClient.send(command);
    console.log("✅ ¡Correo enviado con éxito!");
    console.log(`🆔 Message ID: ${response.MessageId}`);
  } catch (error) {
    console.error("❌ Error en el envío:");
    console.error(error.message || error);
    
    if (error.name === "MessageRejected") {
      console.log("\n💡 Pista: Si el error es 'MessageRejected', recuerda que estás en el Sandbox de AWS. Debes verificar primero tu correo personal ('ToAddresses') en el panel de AWS SES antes de enviarle mensajes.");
    }
  }
};

runTest();