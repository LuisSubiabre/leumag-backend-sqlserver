import express from "express";
import cors from "cors";
import { poolPromise } from "./db.js";
import matalumnoRoutes from "./routes/matalumno.routes.js";

const app = express();
const PORT = 3001;

// Configuración de CORS
const corsOptions = {
  origin: function (origin, callback) {
    // Lista de orígenes permitidos
    const allowedOrigins = [
      "http://localhost:3000", // Desarrollo local
      "http://localhost:5173", // Vite por defecto
      "https://tu-dominio.com", // Tu dominio de producción
    ];

    // Permitir solicitudes sin origen (como aplicaciones móviles o curl)
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Origen no permitido por CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Rutas
app.use("/api/matalumno", matalumnoRoutes);

// Función para verificar la conexión a la base de datos
async function verificarConexionDB() {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query("SELECT 1");
    console.log("✅ Conexión a la base de datos establecida correctamente");
    return true;
  } catch (err) {
    console.error("❌ Error al conectar con la base de datos:", err);
    return false;
  }
}

app.get("/api/usuarios", async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query("SELECT * FROM Usuarios"); // reemplaza con tu tabla real
    res.json(result.recordset);
  } catch (err) {
    console.error("Error al consultar SQL Server:", err);
    res.status(500).send("Error interno del servidor");
  }
});

// Iniciar el servidor y verificar la conexión
verificarConexionDB().then((conectado) => {
  if (conectado) {
    app.listen(PORT, () => {
      console.log(
        `🚀 Servidor SQLServer API escuchando en http://localhost:${PORT}`
      );
    });
  } else {
    console.log(
      "⚠️ El servidor no se iniciará debido a problemas de conexión con la base de datos"
    );
  }
});
