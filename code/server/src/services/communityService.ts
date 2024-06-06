import { prismaClient } from "..";
import { NotFoundException } from "../exceptions/not-found";
import { ErrorCode } from "../exceptions/root";

export async function processComunidade(token: string, usuarioId: number): Promise<any> {

        await prismaClient.comunidade.update({
            where: {
                token: token
            },
            data: {
                membros: {
                    connect: [{ id: usuarioId }]
                }
            }
        }).catch(() => {
            throw new NotFoundException("Erro ao adicionar o usuário a comunidade", ErrorCode.INTERNAL_EXCEPTION);
        });

    }
