import { NextFunction, Request, Response } from "express";
import { prismaClient } from '../index';
import { hashSync, compareSync } from 'bcrypt';
import { JWT_SECRET } from "../secrets";
import * as jwt from 'jsonwebtoken';
import { BadRequestException } from "../exceptions/bad-requests";
import { ErrorCode } from "../exceptions/root";
import { loginSchema, registerSchema } from "../schema/users";



export const register = async (req: Request, res: Response) => {
    
        registerSchema.parse(req.body);
        const { email, senha, nome } = req.body;

        let usuario = await prismaClient.usuario.findFirst({ where: { email } });
        if (usuario) {
            throw new BadRequestException("Usuário já existe", ErrorCode.USER_ALREADY_EXISTS);
        }

        const senhaHashed = hashSync(senha, 10);
        usuario = await prismaClient.usuario.create({
            data: {
                email,
                nome,
                senha: senhaHashed
            }
        });
        
        res.json(usuario);
  
}

export const login = async (req: Request, res: Response) => {
        loginSchema.parse(req.body);
        const { email, senha } = req.body;

        let usuario = await prismaClient.usuario.findFirst({ where: { email } });
        if (!usuario || !compareSync(senha, usuario.senha)) {
            throw new BadRequestException("Usuário ou senha incorretos", ErrorCode.USER_OR_INCORRECT_PASSWORD);
        }

        const token = jwt.sign({ id: usuario.id }, JWT_SECRET);

        res.json({ usuario, token });
   
}

export const getCurrentUser = async (req: any, res: Response) => {
    res.json(req.usuario);
}

