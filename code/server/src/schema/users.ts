import {z} from 'zod';

export const registerSchema = z.object({
    nome: z.string(),
    email: z.string().email(),
    senha: z.string(),
});

export const loginSchema = z.object({
    email: z.string().email(),
    senha: z.string(),
});