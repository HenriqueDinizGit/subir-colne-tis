import { Router } from 'express';
import { shareTreino, redirectSharedTreino, acceptSharedTreino } from '../controller/shareTreino';
import authMiddleware from '../middlewares/auth';
import { errorHandler } from '../error-handler';
import cors from 'cors';

const shareTreinoRouter: Router = Router();

shareTreinoRouter.use(cors({ origin: "https://subir-colne-tis-frontend.onrender.com" }));

shareTreinoRouter.post("/compartilhar/:treinoId", authMiddleware, errorHandler(shareTreino));
shareTreinoRouter.get("/aceitar-compartilhamento/:token", errorHandler(redirectSharedTreino));
shareTreinoRouter.post("/aceitar-compartilhamento/:token", authMiddleware, errorHandler(acceptSharedTreino));

export default shareTreinoRouter;
