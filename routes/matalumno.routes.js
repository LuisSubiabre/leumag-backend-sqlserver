import { Router } from "express";
import { MatalumnoController } from "../controllers/matalumno.controller.js";

const router = Router();
const controller = new MatalumnoController();

router.get("/", (req, res) => controller.getByRut(req, res));

export default router;
