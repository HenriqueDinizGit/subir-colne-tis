import express from 'express';
import { PORT } from './secrets';
//import dotenv from 'dotenv';
import rootRouter from './routes';
import { PrismaClient } from '@prisma/client';
import {errorMiddleware} from './middlewares/errors';
import cors from 'cors'; 
import { createServer } from 'http';
import { Server } from 'socket.io';

// Carrega as variáveis de ambiente do arquivo .env para o processo
//dotenv.config();

const app = express();
const httpServer = createServer(app);

export { httpServer }

app.use(express.json())

app.use(cors({
    origin: 'https://subir-colne-tis-frontend.onrender.com'
    //origin: ['http://localhost:3000', 'https://plf-es-2024-1-ti5-5104100-muscleuup-e5ew.onrender.com']
})); 

app.use('/api', rootRouter)

export const prismaClient = new PrismaClient({
    log:[]
    //log:['query']
})

app.use(errorMiddleware);

//const port = process.env.PORT || 3000; // Use a porta definida no ambiente ou 3000 se não estiver definida

httpServer.listen(PORT, () => {
    console.log('Server is running on http://localhost:' + PORT);
    }
);


export default app;
