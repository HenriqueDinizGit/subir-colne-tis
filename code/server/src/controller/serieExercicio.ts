import { exercicio } from "@prisma/client";
import { createSerieExercicioSchema, updateSerieExercicioSchema } from "../schema/serieExercicio";
import { NotFoundException } from "../exceptions/not-found";
import { prismaClient } from "..";
import { ErrorCode } from "../exceptions/root";
import { Request, Response } from "express";

export const createSerieExercicio = async (req: Request, res: Response) => {
    const validateData = createSerieExercicioSchema.parse(req.body);
    let exercicio: exercicio;
    try {
        exercicio = await prismaClient.exercicio.findFirstOrThrow({
            where:{
                id: validateData.exercicioId
            }
        });
    } catch (error) {
        throw new NotFoundException("Exercicio não encontrado", ErrorCode.EXERCICIO_NOT_FOUND);
    }

    const serieExercicio = await prismaClient.serieExercicio.create({
        data:{
            peso: +validateData.peso,
            repeticoes: +validateData.repeticoes,
            exercicioId: exercicio.id
        }
    });
    res.json(serieExercicio);
};

export const updateSerieExercicio = async (req: Request, res: Response) => {
    updateSerieExercicioSchema.parse(req.body);
    let serieExercicio: any;
    try {
        serieExercicio = await prismaClient.serieExercicio.update({
            where:{
                id: +req.params.id
            },
            data:{
                peso: +req.body.peso,
                repeticoes: +req.body.repeticoes
            }
        });
    } catch (error) {
        throw new NotFoundException("Serie de exercicio não encontrada", ErrorCode.EXERCICIO_NOT_FOUND);
    }
    res.json(serieExercicio);
};

export const deleteSerieExercicio = async (req: Request, res: Response) => {
    let serieExercicio: any;
    try {
        serieExercicio = await prismaClient.serieExercicio.delete({
            where:{
                id: +req.params.id
            }
        });
    } catch (error) {
        throw new NotFoundException("Serie de exercicio não encontrada", ErrorCode.EXERCICIO_NOT_FOUND);
    }
    res.json({message: "Serie de exercicio deletada com sucesso"});
};

export const getSeriesExercicios = async (req: Request, res: Response) => {
    const seriesExercicio = await prismaClient.serieExercicio.findMany({
        where:{
            exercicioId: +req.params.exercicioId
        }
    });
    if (seriesExercicio.length === 0){
        throw new NotFoundException("Series de exercicio não encontradas", ErrorCode.EXERCICIO_NOT_FOUND);
    }
    res.json(seriesExercicio);
};
