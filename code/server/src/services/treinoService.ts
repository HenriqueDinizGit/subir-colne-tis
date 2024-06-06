import { prismaClient } from "..";
import { NotFoundException } from "../exceptions/not-found";
import { ErrorCode } from "../exceptions/root";

export async function processSharedTreino(token: string, usuarioId: number): Promise<any> {
  try{

    if (!token || !usuarioId) {
      throw new NotFoundException("Token or UsuarioID not provided, function will not execute.",ErrorCode.NOT_ALL_PARAMETERS_PROVIDED);
    }
    
    const sharedTreino = await prismaClient.treinoCompartilhado.findUnique({
        where: { tokenCompartilhamento: token },
        include: { treinoCompartilhado: true },
      });
    
      if (!sharedTreino) {
        throw new NotFoundException("Link de compartilhamento inválido ou expirado", ErrorCode.SHARED_TREINO_NOT_FOUND);
      }
    
      const sharedExercicios = await prismaClient.exercicio.findMany({
        where: { treinoId: sharedTreino.treinoCompartilhadoId }
      });
    
      const novoTreino = await prismaClient.treino.create({
        data: {
          nome: sharedTreino.treinoCompartilhado.nome,
          grupoMuscular: sharedTreino.treinoCompartilhado.grupoMuscular,
          imagemBanner: sharedTreino.treinoCompartilhado.imagemBanner,
          usuarioId: usuarioId,
          isOriginal: false,
          treinoOriginalId: sharedTreino.id,
        }
      });

      await prismaClient.treinoCompartilhado.update({
        where: { tokenCompartilhamento: token },
        data: {
            treinosCriadosPeloCompartilhamento: {
                connect: [{ id: novoTreino.id }]
            }
        },
    });
  
      await prismaClient.$transaction(async (prisma) => {
        for (const exercicio of sharedExercicios) {
          const novoExercicio = await prisma.exercicio.create({
            data: {
              nome: exercicio.nome,
              treinoId: novoTreino.id, 
            }
          });
    
          const seriesExerciciosOriginais = await prisma.serieExercicio.findMany({
            where: { exercicioId: exercicio.id }
          });
    
          for (const serie of seriesExerciciosOriginais) {
            await prisma.serieExercicio.create({
              data: {
                repeticoes: serie.repeticoes,
                peso: serie.peso,
                exercicioId: novoExercicio.id, 
              }
            });
          }
        }
      });
  
      await prismaClient.treinoCompartilhado.update({
        where: { tokenCompartilhamento: token },
        data: {
            usuariosRecebidos: {
                connect: [{ id: usuarioId }]
            }
        },
    });
 
      return novoTreino;   
  }catch (error) {
    console.error("Erro ao processar treino compartilhado:", error);
    throw error; 
}
}
