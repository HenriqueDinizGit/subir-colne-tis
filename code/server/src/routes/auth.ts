import { Router } from "express";
import Express from "express";
import cors from "cors"; // Importe o pacote cors
import { getCurrentUser, login, register } from "../controller/auth";
import { errorHandler } from "../error-handler";
import authMiddleware from "../middlewares/auth";

const authRoutes: Router = Express.Router();

// Use o middleware cors para permitir solicitações de http://localhost:5173
authRoutes.use(cors({ origin: "http://localhost:5173" }));

authRoutes.post("/login", errorHandler(login));
authRoutes.post("/register", errorHandler(register));
authRoutes.get("/currentUser", [authMiddleware], errorHandler(getCurrentUser));

export default authRoutes;
