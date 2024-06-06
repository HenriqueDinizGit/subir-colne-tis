import { prismaClient } from "..";
import { BadRequestException } from "../exceptions/bad-requests";
import { NotFoundException } from "../exceptions/not-found";
import { ErrorCode } from "../exceptions/root";
import { Request, Response } from "express";
import { v4 as uuidv4 } from 'uuid';
import connectRabbitMQ from "../utils/rabbitmq";
import { differenceInDays } from 'date-fns'; 


export const getMembros = async (req: Request, res: Response) => {

    try{
    const membros =  await prismaClient.comunidade.findUnique({
        where: {
            id: +req.params.comunidadeId
        },
        include: {
            membros: true
        }
    });

    if (!membros || membros.membros.length === 0) {
        throw new NotFoundException("Membros não encontrados ou a comunidade não possui nenhum membro ainda", ErrorCode.MEMBROS_NOT_FOUND);
    }

    res.json(membros.membros);

} catch (error) {
    console.error("Falha ao buscar membros:", error);
    throw new NotFoundException("Membros não encontrados", ErrorCode.MEMBROS_NOT_FOUND);
}

}


export const shareComunidade = async (req: Request, res: Response) => {
    const comunidadeId = +req.params.comunidadeId;

    const comunidade = await prismaClient.comunidade.findFirst({
        where: { id: comunidadeId,  },
      });
    
      if (!comunidade) {
          throw new NotFoundException("Comunidade não encontrada", ErrorCode.COMUNNITY_NOT_FOUND);
      }


  const linkCompartilhamento = `${req.protocol}://${req.get('host')}/api/comunidade/shared-comunidade/${comunidade.token}`;
  
  res.json({ linkCompartilhamento });
}

export const createComunidade = async (req: any, res: Response) => {
    try {
        const userId = +req.usuario.id;

        const dataDeInicio = new Date(req.body.dataDeInicio);
        const dataDeFim = new Date(req.body.dataDeFim);
        
        if (isNaN(dataDeInicio.getTime()) || isNaN(dataDeFim.getTime())) {
            return res.status(400).json({ error: "Datas fornecidas são inválidas" });
        }

        const comunidade = await prismaClient.comunidade.create({
            data: {
              adminId: userId,
              nome: req.body.nome,
              descricao: req.body.descricao,
              dataDeFim: dataDeFim,
              dataDeInicio: dataDeInicio,
              token: uuidv4(),
              membros: {
                connect: [{ id: userId }],
              },
            },
            include: {
              membros: true, 
            },
        });

        res.json(comunidade);
    } catch (error) {
        console.error("Falha ao criar comunidade:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}



export const getComunidadesDoUsuario = async (req: any, res: Response) => {
    try {
        const comunidades = await prismaClient.comunidade.findMany({
            where: {
                OR: [
                    {
                        membros: {
                            some: {
                                id: +req.usuario.id
                            }
                        }
                    },
                    {
                        adminId: +req.usuario.id
                    }
                ]
            }
        });
        res.json(comunidades);
    } catch (error) {
        console.error("Falha ao buscar comunidades:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}


export const getComunidade = async (req: Request, res: Response) => {
    try {
        const comunidade = await prismaClient.comunidade.findFirst({
            where: {
                id: +req.params.id
            }
        });
        if (!comunidade) {
            throw new NotFoundException("Comunidade não encontrada", ErrorCode.COMUNNITY_NOT_FOUND);
        }
        res.json(comunidade);
    } catch (error) {
        throw new NotFoundException("Comunidade não encontrada", ErrorCode.COMUNNITY_NOT_FOUND);
    }
}

export const deleteComunidade = async (req: any, res: Response) => {
    try {
        const comunidade = await prismaClient.comunidade.delete({
            where: {
                id: +req.params.id,
                adminId: +req.usuario.id
            }
        });

        if (!comunidade) {
            throw new NotFoundException("Comunidade não encontrada", ErrorCode.COMUNNITY_NOT_FOUND);
        }

        res.json(comunidade);
    } catch (error) {
        throw new NotFoundException("Comunidade não encontrada", ErrorCode.COMUNNITY_NOT_FOUND);
    }
}

export const editComunidade = async (req: any, res: Response) => {
    try {
        const comunidade = await prismaClient.comunidade.update({
            where: {
                id: +req.params.id,
                adminId: +req.usuario.id
            },
            data: {
                nome: req.body.nome,
                descricao: req.body.descricao,
                dataDeInicio: req.body.dataDeInicio,
                dataDeFim: req.body.dataDeFim,
            }
        });

        if (!comunidade) {
            throw new NotFoundException("Comunidade não encontrada", ErrorCode.COMUNNITY_NOT_FOUND);
        }

        res.json(comunidade);
    } catch (error) {
        throw new NotFoundException("Comunidade não encontrada", ErrorCode.COMUNNITY_NOT_FOUND);
    }
}

export const removerMembro = async (req: any, res: Response) => {
    try {
        const comunidade = await prismaClient.comunidade.update({
            where: {
                id: +req.params.id,
                adminId: +req.usuario.id
            },
            data: {
                membros: {
                    disconnect: {
                        id: +req.params.membroId
                    }
                }
            }
        });

        if (!comunidade) {
            throw new NotFoundException("Comunidade não encontrada", ErrorCode.COMUNNITY_NOT_FOUND);
        }

        res.json(comunidade);
    } catch (error) {
        throw new NotFoundException("Comunidade não encontrada", ErrorCode.COMUNNITY_NOT_FOUND);
    }
}

export const verificarAdmin = async (req: any, res: Response) => {
    try {
        const comunidade = await prismaClient.comunidade.findFirst({
            where: {
                id: +req.params.id,
                adminId: +req.usuario.id
            }
        });

        if (!comunidade) {
            res.json({ admin: false });
        }

        res.json({ admin: true });
    } catch (error) {
        throw new NotFoundException("Comunidade não encontrada", ErrorCode.COMUNNITY_NOT_FOUND);
    }
}


export const calcularPontosMembrosComunidade = async (req: Request, res: Response) => {
    
   const comunidadeId = +req.params.comunidadeId;
    
    // Obtém a comunidade e suas datas de início e fim
    const comunidade = await prismaClient.comunidade.findUnique({
      where: { id: comunidadeId },
      include: {
        membros: true, // Inclui os membros da comunidade
      },
    });
  

    if (!comunidade) {
        return;
    }
  
    const { dataDeInicio, dataDeFim, membros } = comunidade;
  
    const membrosComPontos = await Promise.all(
      membros.map(async (membro) => {
        const treinosRealizados = await prismaClient.treinoRealizado.count({
          where: {
            idUsuario: membro.id,
            treino_iniciado: {
              gte: dataDeInicio,
            },
            treino_finalizado: {
              lte: dataDeFim,
            },
          },
        });
  
        return {
          usuarioId: membro.id,
          email: membro.email,
          nome: membro.nome,
          foto: membro.foto,
          pontos: treinosRealizados,
        };
      })
    );
  
    res.json(membrosComPontos);
  }

export const redirectComunidade = async (req: any, res: Response) => {
    const { token } = req.params;
  
    if (typeof token !== 'string') {
      throw new BadRequestException('Token inválido', ErrorCode.INVALID_TOKEN);
    }
  
    res.redirect(`https://subir-colne-tis-frontend.onrender.com/shared-comunidade/${token}`);
  }


  export const acceptInviteComunnity = async (req: any, res: Response): Promise<void> => {
    const { token } = req.params;
    const usuarioId = +req.usuario.id; 
  
    const { channel } = await connectRabbitMQ();
  
    const message = JSON.stringify({ token, usuarioId });
  
    channel.sendToQueue('comunidades', Buffer.from(message));
  
    res.json({ message: 'Usuário está para ser aceito na comunidade' });
  };

  export const getDiasRestantes = async (req: Request, res: Response) => {
    try {
      const comunidadeId = +req.params.comunidadeId;
  
      if (isNaN(comunidadeId) || comunidadeId <= 0) {
        return res.status(400).json({ error: 'ID de comunidade inválido' });
      }
  
      const comunidade = await prismaClient.comunidade.findUnique({
        where: {
          id: comunidadeId,
        },
      });
  
      if (!comunidade) {
        return res.status(404).json({ error: `Comunidade com ID ${comunidadeId} não encontrada` });
      }
  
      const today = new Date();
      const dataDeFim = new Date(comunidade.dataDeFim);
      
      // Calcular os dias restantes
      const diasRestantes = differenceInDays(dataDeFim, today);
  
      res.json({ diasRestantes });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar dias restantes para a comunidade' });
    }
  };

  

