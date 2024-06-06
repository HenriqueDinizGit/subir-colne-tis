import {z} from 'zod';

export const createSerieExercicioSchema = z.object({
    peso: z.number(),
    repeticoes: z.number(),
    exercicioId: z.number()
});


export const updateSerieExercicioSchema = z.object({
    peso: z.number(),
    repeticoes: z.number(),
});
