import { Router } from "express";
import { copyTreino, createTreino, deleteTreino, getTreinoById, getTreinos, updateTreino } from "../controller/treino";
import authMiddleware from "../middlewares/auth";
import { errorHandler } from "../error-handler";
import cors from "cors"; 

const treinoRouter:Router = Router();

treinoRouter.use(cors({ origin: "http://localhost:5173" }));


treinoRouter.post("/", authMiddleware, errorHandler(createTreino))
treinoRouter.put("/:id", authMiddleware, errorHandler(updateTreino))
treinoRouter.delete("/:id", authMiddleware, errorHandler(deleteTreino))
treinoRouter.get("/", authMiddleware, errorHandler(getTreinos))
treinoRouter.get("/:id", authMiddleware, errorHandler(getTreinoById))
treinoRouter.post("/copyTreino/:id", authMiddleware, errorHandler(copyTreino))

export default treinoRouter;