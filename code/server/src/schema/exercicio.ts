import {z} from 'zod';
import { treino } from '@prisma/client';

export const createExercicioSchema = z.object({
    nome: z.string(),
    treinoId: z.number()
});

export const updateExercicioSchema = z.object({
    nome: z.string().optional(),
});