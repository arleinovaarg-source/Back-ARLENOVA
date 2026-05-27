import { mpClient } from "../../Config/MDClient.js";
import { Payment } from "mercadopago";
import TeacherModel from "../../Models/Teacher.js";

import { mailer } from "../../Services/Email/index.js";


const paymentClient = new Payment(mpClient);

export const handlePaymentWebhook = async (req, res) => {
  try {

    let paymentId = null;
    
    if (req.body.data?.id && req.body.type === "payment") {
      paymentId = req.body.data.id;
    } else if (req.body.resource && req.body.topic === "payment") {
      paymentId = req.body.resource;
    } else if (req.query.id && req.query.type === "payment") {
      paymentId = req.query.id;
    }
    
    if (!paymentId) {
      console.log("⚠️ No se encontró ID de pago");
      return res.status(200).json({ received: true });
    }
    
    const payment = await paymentClient.get({ id: paymentId });
    
    
    if (payment.status === "approved") {
      const teacherId = payment.external_reference;
      
      if (!teacherId) {
        console.error("❌ No hay teacherId en external_reference");
        return res.status(200).json({ received: true });
      }
      
     
      const teacher = await TeacherModel.existById(teacherId);
      
      if (!teacher) {
        console.error(`❌ Profesor no encontrado: ${teacherId}`);
        return res.status(200).json({ received: true });
      }
      
      const now = new Date();
      const subscriptionEndsAt = new Date(now);
      subscriptionEndsAt.setDate(now.getDate() + 30);
      
   
      const updatedTeacher = await TeacherModel.updateSubscription(teacherId, {
        subscriptionEndsAt,
        now
      });
     
    
     await mailer.invoice({
  to: updatedTeacher.email,
  subject: "📧 Tu pago ha sido aprobado",
  text: `Hola ${updatedTeacher.name},
  vinculado al email: ${updatedTeacher.email}.
  
  Queremos informarte que tu pago por un total de ${process.env.PRICE} ha sido aprobado con éxito. ¡Gracias por tu compra! :)`
});
      
      
    } else {
      console.log(`⏳ Pago NO aprobado. Estado: ${payment.status}`);
    }
    
    res.status(200).json({ received: true });
    
  } catch (error) {
    console.error("❌ Error en webhook:", error);
    res.status(200).json({ received: true });
  }
};