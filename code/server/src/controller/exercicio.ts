import { Request, Response } from "express";
import { prismaClient } from "..";
import { createExercicioSchema, updateExercicioSchema } from "../schema/exercicio";
import { treino } from "@prisma/client";
import { NotFoundException } from "../exceptions/not-found";
import { ErrorCode } from "../exceptions/root";


export const createExercicio = async (req: Request, res: Response) => {
     createExercicioSchema.parse(req.body);
     let treino: treino;
    try {
        treino = await prismaClient.treino.findFirstOrThrow({
            where:{
                id: req.body.treinoId
            }
        });
     } catch (error) {
        throw new NotFoundException("Treino não encontrado", ErrorCode.TREINO_NOT_FOUND);
     }

     const exercicio = await prismaClient.exercicio.create({
            data:{
                nome: req.body.nome,
                treinoId: treino.id
            }
     });
     res.json(exercicio);
};

export const deleteExercicio = async (req: Request, res: Response) => {
    let exercicio: any ;
    try {
        exercicio = await prismaClient.exercicio.delete({
            where:{
                id: +req.params.id
            }
        });
    } catch (error) {
        throw new NotFoundException("Exercicio não encontrado", ErrorCode.EXERCICIO_NOT_FOUND);
    }
    res.json({message: "Exercicio deletado com sucesso"});
};

export const getExercicios = async (req: any, res: Response) => {
    const exericios = await prismaClient.exercicio.findMany({
        where:{
            treinoId: +req.params.treinoId
        }
    });
    if (exericios.length === 0){
        // throw new NotFoundException("Exercicios não encontrados", ErrorCode.EXERCICIO_NOT_FOUND);
        console.log(exericios);
    }
    res.json(exericios);
};

export const getExercicioById = async (req: Request, res: Response) => {
    let exercicio: any ;
    try {
        exercicio = await prismaClient.exercicio.findFirstOrThrow({
            where:{
                id: +req.params.id
            }
        });
    } catch (error) {
        throw new NotFoundException("Exercicio não encontrado", ErrorCode.EXERCICIO_NOT_FOUND);
    }
    res.json(exercicio);
};

export const updateExercicio = async (req: Request, res: Response) => {
    updateExercicioSchema.parse(req.body);
    let exercicio: any ;
    try {
        exercicio = await prismaClient.exercicio.update({
            where:{
                id: +req.params.id
            },
            data:{
                nome: req.body.nome,
            }
        });
    } catch (error) {
        throw new NotFoundException("Exercicio não encontrado", ErrorCode.EXERCICIO_NOT_FOUND);
    }
    res.json(exercicio);
};