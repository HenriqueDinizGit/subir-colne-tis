import { Request, Response } from "express";
import { prismaClient } from "..";
import { NotFoundException } from "../exceptions/not-found";
import { ErrorCode } from "../exceptions/root";

export const getSharedTreinos = async (req: any, res: Response) => {

    try {
        const sharedTreinos = await prismaClient.treinoCompartilhado.findMany({
            where: {
                enviadoPorId: +req.usuario.id
            },
            include: {
                treinoCompartilhado: true 
            }
        });

        res.json(sharedTreinos);
    } catch (error) {
        throw new NotFoundException(
            "Treinos compartilhados não encontrados",
            ErrorCode.TREINO_NOT_FOUND
          );
    }
}


export const deleteSharedTreino = async (req: Request, res: Response) => {
    try {
       const treino =  await prismaClient.treinoCompartilhado.delete({
            where: {
                id: +req.params.id
            },
            include: {
                treinosCriadosPeloCompartilhamento: true
            }
        });


        if (treino.treinosCriadosPeloCompartilhamento.length > 0) {
            const deletePromises = treino.treinosCriadosPeloCompartilhamento.map(treino => {
                return prismaClient.treino.delete({
                    where: {
                        id: treino.id
                    }
                });
            });

            await Promise.all(deletePromises);
        }
            
        res.json(treino);
    } catch (error) {
        throw new NotFoundException(
            "Treino compartilhado não encontrado",
            ErrorCode.SHARED_TREINO_NOT_FOUND
          );
    }
}

export const getUsuariosFromSharedTreino = async (req: Request, res: Response) => {
    try {
        const sharedTreino = await prismaClient.treinoCompartilhado.findUnique({
            where: {
                id: +req.params.id
            },
            include: {
                usuariosRecebidos: true
            }
        });
        if (!sharedTreino) {
            throw new NotFoundException("Treino compartilhado não encontrado", ErrorCode.SHARED_TREINO_NOT_FOUND);
        }
        res.json(sharedTreino.usuariosRecebidos);
    } catch (error) {
        throw new NotFoundException(
            "Treino compartilhado não encontrado",
            ErrorCode.SHARED_TREINO_NOT_FOUND
          );
    }
}
export const deleteUsuarioFromSharedTreino = async (req: Request, res: Response) => {
    try {
        // Desconecta o usuário do treino compartilhado
       const treinoD = await prismaClient.treinoCompartilhado.update({
            where: {
                id: +req.params.id  // id do treino compartilhado
            },
            data: {
                usuariosRecebidos: {
                    disconnect: {
                        id: +req.params.usuarioId
                    }
                }
            }
        });

        // Procura por treinos específicos para deletar
        const treinosParaDeletar = await prismaClient.treinoCompartilhado.findMany({
            where: {
                AND: [
                    {
                        treinosCriadosPeloCompartilhamento: {
                            some: {
                                usuarioId: +req.params.usuarioId
                            }
                        }
                    },
                    {
                        treinoCompartilhadoId: treinoD.treinoCompartilhadoId
                    }
                ]
            },
            include: {
                treinosCriadosPeloCompartilhamento: true // Inclui os detalhes dos treinos criados pelo compartilhamento
            }
        });

        // Log para verificar IDs antes de tentar deletar
        console.log("Treinos a deletar:", treinosParaDeletar.flatMap(treino => treino.treinosCriadosPeloCompartilhamento.map(t => t.id)));

        // Deleta cada treino encontrado, verificando se eles realmente existem antes da deleção
        const deletePromises = treinosParaDeletar.flatMap(treino =>
            treino.treinosCriadosPeloCompartilhamento.map(async t => {
                const exists = await prismaClient.treino.findUnique({ where: { id: t.id } });
                if (exists) {
                    return prismaClient.treino.delete({
                        where: { id: t.id }
                    });
                } else {
                    console.log("Registro já foi deletado ou não existe:", t.id);
                }
            })
        );

        // Executa todas as promessas de deleção
        await Promise.all(deletePromises);

        // Verifica se alguma deleção foi realizada
        if (deletePromises.length > 0) {
            res.json({ message: "Usuário deletado do treino compartilhado e todos os treinos associados removidos com sucesso." });
        } else {
            res.json({ message: "Usuário deletado do treino compartilhado, mas nenhum treino adicional precisou ser removido." });
        }
    } catch (error) {
        console.error("Erro ao deletar usuário do treino compartilhado:", error);
        res.status(404).json({
            message: "Usuário ou treino que deveria ser deletado não encontrado",
            errorCode: "USER_NOT_FOUND"
        });
    }
}