import { Request, Response } from "express";
import { prismaClient } from "..";
import { NotFoundException } from "../exceptions/not-found";
import { ErrorCode } from "../exceptions/root";
import { treinoSchema } from "../schema/treino";

export const createTreino = async (req: any, res: Response) => {
  treinoSchema.parse(req.body);

  const treino = await prismaClient.treino.create({
    data: {
      nome: req.body.nome,
      grupoMuscular: req.body.grupoMuscular,
      usuarioId: +req.usuario.id,
    },
  });
  res.json(treino);
};

// export const updateTreino = async (req: Request, res: Response) => {
//   treinoSchema.parse(req.body);
//   console.log('áaaaaaaasdasdasdasdasdasdasdasdasdasdasdasdasdasdasd')
//   try {
//     const treino = await prismaClient.treino.update({
//       where: {
//         id: +req.params.id,
//       },
//       data: {
//         nome: req.body.nome,
//         grupoMuscular: req.body.grupoMuscular,
//       },
//     });

//     console.log('to aqui')
//     const casoTreinoCompartilhado = await prismaClient.treinoCompartilhado.findFirst({
//       where: {
//         treinoCompartilhadoId: treino.id,
//         isEditable: true,
//         treinosCriadosPeloCompartilhamento: {
//           some: {
//             id: treino.id,
//           },
//         },
//       },
//       include: {
//         treinosCriadosPeloCompartilhamento: true, // Inclui os treinos criados a partir do compartilhamento
//       }
//     });
//     console.log('to aqui2')

//     if (casoTreinoCompartilhado){
//       await prismaClient.treino.update({
//         where:{
//           id: casoTreinoCompartilhado.treinoCompartilhadoId
//         },
//         data:{
//           nome: treino.nome,
//           grupoMuscular: treino.grupoMuscular
//         }
//       });
//       const updatePromises = casoTreinoCompartilhado.treinosCriadosPeloCompartilhamento.map(treinoCriado => {
//         return prismaClient.treino.update({
//           where: { id: treinoCriado.id },
//           data: {
//             nome: treino.nome,
//             grupoMuscular: treino.grupoMuscular
//           }
//         });
//       });

//       await Promise.all(updatePromises);
//     }

//     res.json(treino);
  // } catch (error) {
  //   throw new NotFoundException(
  //     "Treino não encontrado",
  //     ErrorCode.TREINO_NOT_FOUND
  //   );
  // }
// };

export const updateTreino = async (req: any, res: Response): Promise<void> => {
  const treinoId = +req.params.id;
  const nomeTreinoAlterado = req.body.nome;
  const grupoMuscularTreinoAlterado = req.body.grupoMuscular;

  try {
    await prismaClient.$transaction(async (prisma) => {
      let permissaoParaEditar = await prisma.treinoCompartilhado.findFirst({
        where: {
             treinosCriadosPeloCompartilhamento: { some: { id: treinoId } }, isEditable: true 
        },
        include: { treinosCriadosPeloCompartilhamento: true }
      });

      if (!permissaoParaEditar) {
      permissaoParaEditar = await prisma.treinoCompartilhado.findFirst({
        where: {

            treinoCompartilhadoId: treinoId, isEditable: true ,
        },
        include: { treinosCriadosPeloCompartilhamento: true }
      });
    }
      if (!permissaoParaEditar) {
        throw new Error("Usuário não autorizado a editar este treino");
      }

      // Atualiza o treino principal
      await prisma.treino.update({
        where: { id: treinoId },
        data: {
          nome: nomeTreinoAlterado,
          grupoMuscular: grupoMuscularTreinoAlterado,
        },
      });


      // Verifica se existem treinos relacionados para atualizar
      if (permissaoParaEditar) {

        await prisma.treino.update({
          where: { id: permissaoParaEditar.treinoCompartilhadoId },
          data: {
            nome: nomeTreinoAlterado,
            grupoMuscular: grupoMuscularTreinoAlterado,
          },
        });
      
        await Promise.all(permissaoParaEditar.treinosCriadosPeloCompartilhamento.map(async (treinoCriado) => {
          if (treinoCriado && treinoCriado.id) {
            return prisma.treino.update({
              where: { id: treinoCriado.id },
              data: {
                nome: nomeTreinoAlterado,
                grupoMuscular: grupoMuscularTreinoAlterado,
              },
            });
          }
        }));
      }
    });

    res.json({ message: "Treino atualizado com sucesso!" });
  } catch (error) {
    console.error('Erro ao atualizar o treino:', error);
    res.status(500).send({ message: 'Erro interno ao atualizar o treino.' });
  }
};


export const deleteTreino = async (req: Request, res: Response) => {
  try {
    await prismaClient.treino.delete({
      where: {
        id: +req.params.id,
      },
    });

    const treinosCompartilhados = await prismaClient.treinoCompartilhado.findMany({
      where: {
        treinoCompartilhadoId: +req.params.id,
      },
    });

    if (treinosCompartilhados.length > 0) {
      await prismaClient.treinoCompartilhado.deleteMany({
        where: {
          treinoCompartilhadoId: +req.params.id,
        },
      });
    };


    const tr = await prismaClient.treinoRealizado.deleteMany({
      where: {
        treinoId: +req.params.id,
      },
    });

  

    res.json({ message: "Treino deletado com sucesso" });
  } catch (error) {
    throw new NotFoundException(
      "Treino não encontrado",
      ErrorCode.TREINO_NOT_FOUND
    );
  }
};

export const getTreinos = async (req: any, res: Response) => {
  const treinos = await prismaClient.treino.findMany({
    where: {
      usuarioId: +req.usuario.id,
    },
  });

  if(treinos.length === 0){
    res.json({message: "Nenhum treino encontrado"});
    return;
  }

  res.json(treinos);
};

export const getTreinoById = async (req: Request, res: Response) => {
  const treino = await prismaClient.treino.findFirst({
    where: {
      id: +req.params.id,
    },
  });
  if (!treino) {
    throw new NotFoundException(
      "Treino não encontrado",
      ErrorCode.TREINO_NOT_FOUND
    );
  }
  res.json(treino);
};

export const copyTreino = async (req: any, res: Response) => {
  const  treinoId  = +req.params.id;
  const usuarioId = +req.usuario.id; // Supondo que este já seja um número

  console.log(treinoId, usuarioId);

  // Encontrar o treino original
  const treino = await prismaClient.treino.findFirst({
    where: { id: treinoId, usuarioId: usuarioId },
  });

  if (!treino) {
    throw new NotFoundException(
      "Treino não encontrado ou não pertence ao usuário",
      ErrorCode.TREINO_NOT_FOUND
    );
  }

  
  // Criar uma cópia do treino
  const treinoCopiado = await prismaClient.treino.create({
    data: {
      nome: treino.nome,
      grupoMuscular: treino.grupoMuscular,
      imagemBanner: treino.imagemBanner,
      usuarioId: usuarioId,
    },
  });


  // Encontrar e copiar exercícios e suas séries de exercícios
  const exercicios = await prismaClient.exercicio.findMany({
    where: { treinoId: treinoId },
  });


  const copiasExerciciosPromessas = exercicios.map(async (exercicio) => {
    const novoExercicio = await prismaClient.exercicio.create({
      data: {
        nome: exercicio.nome,
        treinoId: treinoCopiado.id,
      },
    });

    const seriesExercicios = await prismaClient.serieExercicio.findMany({
      where: { exercicioId: exercicio.id },
    });

    const copiasSeriesPromessas = seriesExercicios.map(serie => 
      prismaClient.serieExercicio.create({
        data: {
          repeticoes: serie.repeticoes,
          peso: serie.peso,
          exercicioId: novoExercicio.id,
        }
      })
    );

    const seriesCopiadas = await Promise.all(copiasSeriesPromessas);

    return {
      exercicio: novoExercicio,
      seriesExercicios: seriesCopiadas,
    };
  });

  const exerciciosCopiados = await Promise.all(copiasExerciciosPromessas);

  // Responder com o treino, exercícios copiados e suas séries
  res.json({ treino: treinoCopiado, exercicios: exerciciosCopiados });
};