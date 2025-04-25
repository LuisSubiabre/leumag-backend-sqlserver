import { MatalumnoModel } from "../models/matalumno.model.js";

export class MatalumnoController {
  async getByRut(req, res) {
    try {
      const { rut } = req.query;

      if (!rut) {
        return res.status(400).json({
          error: "El RUT del alumno es requerido",
          ejemplo: "?rut=12.345.678-9",
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

      res.json(alumno);
    } catch (error) {
      console.error("Error en getByRut:", error);
      res.status(500).json({
        error: "Error interno del servidor",
        message: error.message,
      });
    }
  }
}
