import { Router } from 'express';
import authMiddleware from '../middlewares/auth';
import { errorHandler } from '../error-handler';
import cors from 'cors';
import { deleteSharedTreino, deleteUsuarioFromSharedTreino, getSharedTreinos, getUsuariosFromSharedTreino } from '../controller/manageSharedTreino';

const manageSharedTreinoRouter: Router = Router();

manageSharedTreinoRouter.use(cors({ origin: "http://localhost:5173" }));

manageSharedTreinoRouter.get("/", authMiddleware, errorHandler(getSharedTreinos));
manageSharedTreinoRouter.delete("/:id", authMiddleware, errorHandler(deleteSharedTreino));
manageSharedTreinoRouter.get("/:id", authMiddleware, errorHandler(getUsuariosFromSharedTreino));
manageSharedTreinoRouter.delete("/:id/user/:usuarioId", authMiddleware, errorHandler(deleteUsuarioFromSharedTreino));

export default manageSharedTreinoRouter;
