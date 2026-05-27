import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import "dotenv/config";

const sesClient = new SESClient({
  region: process.env.AWS_REGION || "us-east-2",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
});

const DEFAULT_FROM_EMAIL = "no-reply@arlenova.com.ar";

export const sendEmail = async ({ to, subject, htmlBody }) => {
  const command = new SendEmailCommand({
    Source: DEFAULT_FROM_EMAIL,
    Destination: { ToAddresses: [to] },
    Message: {
      Subject: { Data: subject, Charset: "UTF-8" },
      Body: {
        Html: { Data: htmlBody, Charset: "UTF-8" },
      },
    },
  });

  try {
    const response = await sesClient.send(command);
    return { success: true, messageId: response.MessageId };
  } catch (error) {
    console.error(`[SES Error] No se pudo enviar correo a ${to}:`, error);
    return { success: false, error };
  }
};