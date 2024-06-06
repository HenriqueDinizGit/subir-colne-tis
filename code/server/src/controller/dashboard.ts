import { prismaClient } from ".."
import { NotFoundException } from "../exceptions/not-found";
import { ErrorCode } from "../exceptions/root";
import { Response } from "express";


export const getTreinosFinalizadosDashboard = async (req: any, res: Response) => {
    try {
     const treinosFinalizadosCount = await prismaClient.treinoRealizado.count({  
        where: {
            idUsuario: req.usuario.id
        }});
        res.json({treinosFinalizadosTotal: treinosFinalizadosCount});
    } catch (error) {
        throw new NotFoundException("Treinos Finalizados não encontrados", ErrorCode.TREINOS_FINALIZADOS_NOT_FOUND);
    }
}

export const getMaiorSequenciaDeTreinosDashboard = async (req: any, res: Response) => {
    try {
        const treinos = await prismaClient.treinoRealizado.findMany({
            where: {
                idUsuario: req.usuario.id
            },
            orderBy: {
                treino_iniciado: 'asc'
            }
        });

        if (treinos.length === 0) {
            return res.json({ maiorSequenciaDeTreinos: 0 });
        }

        let maiorSequencia = 1;
        let sequenciaAtual = 1;

        for (let i = 1; i < treinos.length; i++) {
            const dataAtual = new Date(treinos[i].treino_iniciado);
            const dataAnterior = new Date(treinos[i - 1].treino_iniciado);

            const diaAtual = new Date(dataAtual.getFullYear(), dataAtual.getMonth(), dataAtual.getDate());
            const diaAnterior = new Date(dataAnterior.getFullYear(), dataAnterior.getMonth(), dataAnterior.getDate());

            const diffInTime = diaAtual.getTime() - diaAnterior.getTime();
            const diffInDays = diffInTime / (1000 * 3600 * 24);

            if (diffInDays === 1) {
                sequenciaAtual++;
                if (sequenciaAtual > maiorSequencia) {
                    maiorSequencia = sequenciaAtual;
                }
            } else if (diffInDays > 1) {
                sequenciaAtual = 1;
            }
        }

        res.json({ maiorSequenciaDeTreinos: maiorSequencia });
    } catch (error) {
        throw new NotFoundException("Treinos Finalizados não encontrados", ErrorCode.TREINOS_FINALIZADOS_NOT_FOUND);
    }
}

export const getSequenciaDeTreinosAtualDashboard = async (req: any, res: Response) => {
    try {
        const treinos = await prismaClient.treinoRealizado.findMany({
            where: {
                idUsuario: req.usuario.id
            },
            orderBy: {
                treino_iniciado: 'asc'
            }
        });

        if (treinos.length === 0) {
            return res.json({ sequenciaAtualdeTreinos: 0 });
        }

        let sequenciaAtual = 0;
        const hoje = new Date();
        const diaAtual = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate());

        for (let i = treinos.length - 1; i >= 0; i--) {
            const dataTreino = new Date(treinos[i].treino_iniciado);
            const diaTreino = new Date(dataTreino.getFullYear(), dataTreino.getMonth(), dataTreino.getDate());

            const diffInTime = diaAtual.getTime() - diaTreino.getTime();
            const diffInDays = diffInTime / (1000 * 3600 * 24);

            if (diffInDays === sequenciaAtual) {
                sequenciaAtual++;
            } else if (diffInDays > sequenciaAtual) {
                break;
            }
        }

        res.json({ sequenciaAtualdeTreinos: sequenciaAtual });
    } catch (error) {
        throw new NotFoundException("Treinos Finalizados não encontrados", ErrorCode.TREINOS_FINALIZADOS_NOT_FOUND);
    }
}



export const getDiasNaAcademiaPorMes = async (req: any, res: Response) => {
    const monthNames = [
        'Jan', 'Fev', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'
      ];
    try {
        const treinos = await prismaClient.treinoRealizado.findMany({
            where: {
              idUsuario: req.usuario.id
            },
            orderBy: {
              treino_iniciado: 'asc'
            }
          });
      
          if (treinos.length === 0) {
            return res.json([]);
          }
      
          const diasNaAcademiaPorMes: { [key: string]: Set<number> } = {};
      
          treinos.forEach(treino => {
            const dataTreino = new Date(treino.treino_iniciado);
            const mes = dataTreino.getMonth();
            const ano = dataTreino.getFullYear();
            const chave = `${ano}-${mes}`;
      
            if (!diasNaAcademiaPorMes[chave]) {
              diasNaAcademiaPorMes[chave] = new Set();
            }
      
            diasNaAcademiaPorMes[chave].add(dataTreino.getDate());
          });
      
          const dataset = Object.keys(diasNaAcademiaPorMes).map(key => {
            const [year, month] = key.split('-');
            return {
              month: `${monthNames[parseInt(month)]} ${year}`,
              diasNaAcademia: diasNaAcademiaPorMes[key].size
            };
          });
      
          res.json(dataset);
    } catch (error) {
        throw new NotFoundException("Treinos Finalizados não encontrados", ErrorCode.TREINOS_FINALIZADOS_NOT_FOUND);
    }
  };

export const getTreinosEspecificosPorMes = async (req: any, res: Response) => {
    const monthNames = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
      ];
  try {
    const treinos = await prismaClient.treinoRealizado.findMany({
      where: {
        idUsuario: req.usuario.id
      },
      include: {
        treino: true // Inclui os detalhes do treino relacionado
      },
      orderBy: {
        treino_iniciado: 'asc'
      }
    });

    if (treinos.length === 0) {
      return res.json([]);
    }

    const treinosPorMes: { [key: string]: { [key: string]: number } } = {};

    treinos.forEach(treino => {
      const dataTreino = new Date(treino.treino_iniciado);
      const mes = dataTreino.getMonth();
      const ano = dataTreino.getFullYear();
      const chave = `${ano}-${mes}`;
      const treinoNome = treino.treino.nome; // Supondo que o modelo 'treino' tem um campo 'nome'

      if (!treinosPorMes[chave]) {
        treinosPorMes[chave] = {};
      }

      if (!treinosPorMes[chave][treinoNome]) {
        treinosPorMes[chave][treinoNome] = 0;
      }

      treinosPorMes[chave][treinoNome]++;
    });

    const dataset = Object.keys(treinosPorMes).map(key => {
      const [year, month] = key.split('-');
      const treinosNoMes = treinosPorMes[key];
      return {
        mes: `${monthNames[parseInt(month)]} ${year}`,
        ...treinosNoMes
      };
    });

    res.json(dataset);
  } catch (error) {
    throw new NotFoundException("Falha ao saber a quantidade de treinos específicos por mês", ErrorCode.TREINOS_FINALIZADOS_NOT_FOUND);
  } 
};


export const getTreinosDia = async (req: any, res: Response) => {
    try {
        const treinos = await prismaClient.treinoRealizado.findMany({
            where: {
                idUsuario: req.usuario.id
            },
            orderBy: {
                treino_iniciado: 'asc'
            },
            include: {
                treino: true
            }
        });

        // Format the response to only include the required fields
        const formattedTreinos = treinos.map(treino => ({
            date: treino.treino_iniciado.toISOString().split('T')[0], // YYYY-MM-DD format
            treino: treino.treino.nome,
            descricao: treino.descricao
        }));

        res.json(formattedTreinos);
    } catch (error) {
        throw new NotFoundException("Treinos Finalizados não encontrados", ErrorCode.TREINOS_FINALIZADOS_NOT_FOUND);
    }
};