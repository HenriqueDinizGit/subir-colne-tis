import { Router } from "express";
import authMiddleware from "../middlewares/auth";
import { errorHandler } from "../error-handler";
import cors from "cors"; 
import { createTreinoRealizado, deleteTreinoRealizado, getTreinoRealizado, getTreinoRealizadoNaComunidade, getTreinosRealizadosDoUsuario, updateTreinoRealizado } from "../controller/treinoRealizado";


const treinoRealizadoRouter:Router = Router();

treinoRealizadoRouter.use(cors({ origin: "http://localhost:5173" }));


treinoRealizadoRouter.post("/:treinoId", authMiddleware, errorHandler(createTreinoRealizado))
treinoRealizadoRouter.get("/comunidade/:comunidadeId", authMiddleware, errorHandler(getTreinoRealizadoNaComunidade))
treinoRealizadoRouter.get("/usuario", authMiddleware, errorHandler(getTreinosRealizadosDoUsuario))
treinoRealizadoRouter.get("/:id", authMiddleware, errorHandler(getTreinoRealizado))
treinoRealizadoRouter.delete("/:id", authMiddleware, errorHandler(deleteTreinoRealizado))
treinoRealizadoRouter.put("/:id", authMiddleware, errorHandler(updateTreinoRealizado))


export default treinoRealizadoRouter;