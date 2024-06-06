import authMiddleware from "../middlewares/auth";
import { errorHandler } from "../error-handler";
import { Router } from "express";
import cors from "cors"; // 
import { getDiasNaAcademiaPorMes, getMaiorSequenciaDeTreinosDashboard, getSequenciaDeTreinosAtualDashboard, getTreinosDia, getTreinosEspecificosPorMes, getTreinosFinalizadosDashboard } from "../controller/dashboard";


const dashboardRouter:Router = Router();

dashboardRouter.use(cors({ origin: "http://localhost:5173" }));


dashboardRouter.get("/treinos-finalizados", authMiddleware, errorHandler(getTreinosFinalizadosDashboard))
dashboardRouter.get("/maior-sequencia", authMiddleware, errorHandler(getMaiorSequenciaDeTreinosDashboard))
dashboardRouter.get("/sequencia-atual", authMiddleware, errorHandler(getSequenciaDeTreinosAtualDashboard))
dashboardRouter.get("/dias-academia-mes", authMiddleware, errorHandler(getDiasNaAcademiaPorMes))
dashboardRouter.get("/treinos-especificos-mes", authMiddleware, errorHandler(getTreinosEspecificosPorMes))
dashboardRouter.get("/treinos-especificos-dia", authMiddleware, errorHandler(getTreinosDia))

export default dashboardRouter;