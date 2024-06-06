import { prismaClient } from "..";
import { InternalException } from "../exceptions/internal-exception";
import { NotFoundException } from "../exceptions/not-found";
import { ErrorCode } from "../exceptions/root";
import { Request, Response } from "express";


export const getTreinoRealizado = async (req: Request, res: Response) => {
    try {
        const treinoRealizado = await prismaClient.treinoRealizado.findUnique({
            where: {
                id: +req.params.id
            }
        });
        if (!treinoRealizado) {
            throw new NotFoundException("Treino Realizado não encontrado", ErrorCode.TREINO_NOT_FOUND);
        }
        res.json(treinoRealizado);
    } catch (error) {
        throw new NotFoundException("Treino Realizado não encontrado", ErrorCode.TREINO_NOT_FOUND);
    }
}

export const getTreinosRealizadosDoUsuario = async (req: any, res: Response) => {
    try {
        const treinosRealizados = await prismaClient.treinoRealizado.findMany({
            where: {
                idUsuario: +req.usuario.id
            },
            orderBy: {
                treino_iniciado: 'desc' // Ordena pela data de início do treino, do mais recente para o mais antigo
            },
            include:
            {
                treino: true
            }   
        });
        res.json(treinosRealizados);
    } catch (error) {
        throw new NotFoundException("Treino Realizado não encontrado", ErrorCode.TREINO_NOT_FOUND);
    }
};
export const getTreinoRealizadoNaComunidade = async (req: Request, res: Response) => {
    const { comunidadeId } = req.params;
  
    try {
      // Validar a existência da comunidade
      const comunidade = await prismaClient.comunidade.findUnique({
        where: { id: parseInt(comunidadeId, 10) },
        include: {
          membros: true,
        },
      });
  
      if (!comunidade) {
        return res.status(404).json({ error: 'Comunidade não encontrada' });
      }
  
      const { dataDeInicio, dataDeFim, membros } = comunidade;
  
      const membroIds = membros.map(membro => membro.id);
  
      const treinosRealizados = await prismaClient.treinoRealizado.findMany({
        where: {
          idUsuario: {
            in: membroIds,
          },
          treino_iniciado: {
            gte: dataDeInicio,
          },
          treino_finalizado: {
            lte: dataDeFim,
          },
        },
        include: {
          usuario: true,
          treino: true,
        },
      });
  
      res.json(treinosRealizados);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar treinos realizados' });
    }
  };

  export const createTreinoRealizado = async (req: any, res: Response) => {
    try {
        const { descricao, foto } = req.body;
        const newTreinoRealizado = await prismaClient.treinoRealizado.create({
            data: {
                idUsuario: +req.usuario.id,
                treinoId: +req.params.treinoId,
                descricao,
                foto,
            }
        });
        res.json(newTreinoRealizado);
    } catch (error) {
        throw new InternalException("Não foi possível criar o treino, verifique os parâmetros passados", error, ErrorCode.INTERNAL_EXCEPTION);
    }
}

export const deleteTreinoRealizado = async (req: Request, res: Response) => {
    try {
        const treinoRealizado = await prismaClient.treinoRealizado.delete({
            where: {
                id: +req.params.id
            }
        });
        res.json(treinoRealizado);
    } catch (error) {
        throw new NotFoundException("Treino Realizado não encontrado", ErrorCode.TREINO_NOT_FOUND);
    }
}

export const updateTreinoRealizado = async (req: Request, res: Response) => {

    try {
        const treinoRealizado = await prismaClient.treinoRealizado.update({
            where: {
                id: +req.params.id
            },
            data: {
                descricao: req.body.descricao,
                foto: req.body.foto,
            }
        });
        res.json(treinoRealizado);
    } catch (error) {
        throw new NotFoundException("Treino Realizado não encontrado", ErrorCode.TREINO_NOT_FOUND);
    }
}