import authMiddleware from "../middlewares/auth";
import { errorHandler } from "../error-handler";
import { Router } from "express";

import cors from "cors"; // Importe o pacote cors
import { acceptInviteComunnity, calcularPontosMembrosComunidade, createComunidade, deleteComunidade, editComunidade, getComunidade, getComunidadesDoUsuario, getDiasRestantes, getMembros, redirectComunidade, removerMembro, shareComunidade, verificarAdmin } from "../controller/comunidade";


const comunidadeRouter:Router = Router();

comunidadeRouter.use(cors({ origin: "https://subir-colne-tis-frontend.onrender.com" }));


comunidadeRouter.post("/", authMiddleware, errorHandler(createComunidade))
comunidadeRouter.get("/getMembros/:comunidadeId", authMiddleware, errorHandler(getMembros));
comunidadeRouter.get("/compartilhar-comunidade/:comunidadeId", authMiddleware, errorHandler(shareComunidade))
comunidadeRouter.get("/", authMiddleware, errorHandler(getComunidadesDoUsuario))
comunidadeRouter.get("/:id", authMiddleware, errorHandler(getComunidade))
comunidadeRouter.delete("/:id", authMiddleware, errorHandler(deleteComunidade))
comunidadeRouter.put("/:id", authMiddleware, errorHandler(editComunidade))
comunidadeRouter.put("/:id/:membroId", authMiddleware, errorHandler(removerMembro))
comunidadeRouter.get("/verificarADM/:id", authMiddleware, errorHandler(verificarAdmin))
comunidadeRouter.get("/ranking/:comunidadeId", authMiddleware, errorHandler(calcularPontosMembrosComunidade))
comunidadeRouter.get("/shared-comunidade/:token", errorHandler(redirectComunidade))
comunidadeRouter.post("/shared-comunidade/:token", authMiddleware, errorHandler(acceptInviteComunnity))
comunidadeRouter.get("/diasRestantes/:comunidadeId", authMiddleware, errorHandler(getDiasRestantes))

export default comunidadeRouter;