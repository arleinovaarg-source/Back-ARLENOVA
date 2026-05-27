import QuarterShema from "../Schemas/Quarter.js";

class QuarterModel {
  async create(name, userId, subjectId) {
    const currentYear = new Date().getFullYear();

    // Usamos findOneAndUpdate con upsert para evitar duplicados exactos
    // Si existe: lo actualiza. Si no existe: lo crea.
    return await QuarterShema.findOneAndUpdate(
      { 
        name: name, 
        subject: subjectId, 
        year: currentYear 
      },
      { 
        name: name, 
        teacher: userId, 
        subject: subjectId, 
        year: currentYear 
      },
      { 
        new: true, 
        upsert: true // Esta es la clave para no llenar de basura la DB
      }
    );
  }

  async deleteQuarter(id) {
    return await QuarterShema.findByIdAndDelete(id);
  }

  async getQuarterById(subjectId) {
    // Corregí el filtro: debe buscar por 'subject' no por 'school' 
    // según tu esquema de creación
    return await QuarterShema.find({
      subject: subjectId,
    }).sort({ createdAt: 1 });
  }
}

export default new QuarterModel();