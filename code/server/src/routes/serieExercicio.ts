import authMiddleware from "../middlewares/auth";
import { errorHandler } from "../error-handler";
import { Router } from "express";
import { createSerieExercicio, deleteSerieExercicio, getSeriesExercicios, updateSerieExercicio } from "../controller/serieExercicio";
import cors from "cors"; // Importe o pacote cors


const serieExercicioRouter:Router = Router();

serieExercicioRouter.use(cors({ origin: "https://subir-colne-tis-frontend.onrender.com" }));


serieExercicioRouter.post("/", authMiddleware, errorHandler(createSerieExercicio))
serieExercicioRouter.put("/:id", authMiddleware, errorHandler(updateSerieExercicio))
serieExercicioRouter.delete("/:id", authMiddleware, errorHandler(deleteSerieExercicio))
serieExercicioRouter.get("/:exercicioId", authMiddleware, errorHandler(getSeriesExercicios))

export default serieExercicioRouter;