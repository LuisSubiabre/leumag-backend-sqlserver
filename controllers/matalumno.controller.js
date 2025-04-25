import { MatalumnoModel } from "../models/matalumno.model.js";

export class MatalumnoController {
  async getByRut(req, res) {
    try {
      const { rut } = req.query;

      if (!rut) {
        return res.status(400).json({
          error: "El RUT del alumno es requerido",
          ejemplo: "?rut=25.122.910-4",
        });
      }

      // Limpiar el formato del RUT (eliminar puntos y guión)
      const rutalum = rut.replace(/[.-]/g, "");

      const alumno = await MatalumnoModel.getByRut(rutalum);

      if (!alumno) {
        return res.status(404).json({
          error: "Alumno no encontrado",
        });
      }

      // Asegurarse de que la respuesta tenga el header CORS
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.json(alumno);
    } catch (error) {
      console.error("Error en getByRut:", error);
      // Asegurarse de que el error también tenga el header CORS
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.status(500).json({
        error: "Error interno del servidor",
        message: error.message,
      });
    }
  }
}
