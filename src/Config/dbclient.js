import mongoose from "mongoose";

class DbClient {
  constructor() {
    this.connectDB();
  }

  async connectDB() {
    try {
      const queryString = process.env.URL_DATABASE;
      await mongoose.connect(queryString);
      console.log("Conectado a la base de datos 🚀");
    } catch (error) {
      console.error("Error conectando a la base de datos ❌:", error.message);
      process.exit(1); // Detiene la app si no hay DB
    }
  }

  async closeDB() {
    await mongoose.connection.close();
    console.log("Conexión cerrada 🚨");
  }
}

export default new DbClient();
