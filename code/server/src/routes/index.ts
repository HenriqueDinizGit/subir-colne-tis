import { Router } from "express";
import authRoutes from "./auth";
import treinoRouter from "./treino";
import exercicioRouter from "./exercicio";
import serieExercicioRouter from "./serieExercicio";
import shareTreinoRouter from "./shareTreino";
import manageSharedTreinoRouter from "./manageSharedTreino";
import comunidadeRouter from "./comunidade";
import treinoRealizadoRouter from "./treinoRealizado";
import dashboardRouter from "./dashboard";

const rootRouter: Router = Router();

rootRouter.use("/auth", authRoutes);
rootRouter.use("/treino", treinoRouter);
rootRouter.use("/exercicio", exercicioRouter);
rootRouter.use("/serie-exercicio", serieExercicioRouter);
rootRouter.use("/share-treino", shareTreinoRouter);
rootRouter.use("/manage-shared-treinos", manageSharedTreinoRouter);
rootRouter.use("/comunidade", comunidadeRouter);
rootRouter.use("/treino-realizado", treinoRealizadoRouter);
rootRouter.use("/dashboard", dashboardRouter);


export default rootRouter;