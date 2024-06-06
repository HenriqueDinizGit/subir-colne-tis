import {z} from 'zod';

export const treinoSchema = z.object({
    nome: z.string(),
    grupoMuscular: z.string(),
});

