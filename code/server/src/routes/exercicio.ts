import authMiddleware from "../middlewares/auth";
import { errorHandler } from "../error-handler";
import { Router } from "express";
import { createExercicio, deleteExercicio, getExercicioById, getExercicios, updateExercicio } from "../controller/exercicio";
import cors from "cors"; // Importe o pacote cors


const exercicioRouter:Router = Router();

exercicioRouter.use(cors({ origin: "https://subir-colne-tis-frontend.onrender.com" }));


exercicioRouter.post("/", authMiddleware, errorHandler(createExercicio))
exercicioRouter.put("/:id", authMiddleware, errorHandler(updateExercicio))
exercicioRouter.delete("/:id", authMiddleware, errorHandler(deleteExercicio))
exercicioRouter.get("/:treinoId", authMiddleware, errorHandler(getExercicios))
exercicioRouter.get("/:id", authMiddleware, errorHandler(getExercicioById))

export default exercicioRouter;