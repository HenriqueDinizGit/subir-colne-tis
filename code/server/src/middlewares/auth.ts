import { Request, Response, NextFunction } from 'express';
import { UnauthorizedException } from '../exceptions/unauthorized';
import { ErrorCode } from '../exceptions/root';
import * as jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../secrets';
import { prismaClient } from '..';


const authMiddleware = async (req: any, res: Response, next: NextFunction) => {

    const token = req.headers.token;

    if (!token) {
        next(new UnauthorizedException("Não autorizado",ErrorCode.UNAUTHORIZED));
    } try {
        const payload = jwt.verify(token, JWT_SECRET) as any;
        const user = await prismaClient.usuario.findFirst({where: {id: payload.id}});

        if (!user){
            next(new UnauthorizedException("Não autorizado",ErrorCode.UNAUTHORIZED));
        }

        req.usuario = user;
        next();
        
    } catch (error) {
        next(new UnauthorizedException("Não autorizado",ErrorCode.UNAUTHORIZED));
    } 
    
}

export default authMiddleware;