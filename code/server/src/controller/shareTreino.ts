import { Request, Response } from "express";
import { prismaClient } from "..";
import { NotFoundException } from "../exceptions/not-found";
import { ErrorCode } from "../exceptions/root";
import { BadRequestException } from "../exceptions/bad-requests";
import { v4 as uuidv4 } from 'uuid';
import connectRabbitMQ from '../utils/rabbitmq';

// Função para compartilhar um treino
export const shareTreino = async (req: any, res: Response) => {
  const treinoId = +req.params.treinoId;
  const usuarioId = +req.usuario.id;
  const isEditable = req.query.editavel === 'true';

  const treino = await prismaClient.treino.findFirst({
    where: { id: treinoId, usuarioId },
  });

  if (!treino) {
    throw new NotFoundException("Treino não encontrado ou não pertence ao usuário", ErrorCode.TREINO_NOT_FOUND);
  }

  const sharedTreinoExists = await prismaClient.treinoCompartilhado.findFirst({
    where: {
      treinoCompartilhadoId: treinoId,
    },
  });

  if (sharedTreinoExists) {
    const linkCompartilhamento = `${req.protocol}://${req.get('host')}/api/share-treino/aceitar-compartilhamento/${sharedTreinoExists.tokenCompartilhamento}`;
    return res.json({ linkCompartilhamento }); // Use return para garantir que não haverá outra resposta
  }

  const token = uuidv4();

  await prismaClient.treinoCompartilhado.create({
    data: {
      treinoCompartilhadoId: treinoId,
      tokenCompartilhamento: token,
      enviadoPorId: usuarioId,
      isEditable: isEditable,
    },
  });

  const linkCompartilhamento = `${req.protocol}://${req.get('host')}/api/share-treino/aceitar-compartilhamento/${token}`;

  return res.json({ linkCompartilhamento }); // Use return aqui também por consistência
};

// Outras funções permanecem inalteradas
export const redirectSharedTreino = async (req: any, res: Response) => {
  const { token } = req.params;

  if (typeof token !== 'string') {
    throw new BadRequestException('Token inválido', ErrorCode.INVALID_TOKEN);
  }

  res.redirect(`https://subir-colne-tis-frontend.onrender.com/shared-treino/${token}`);
};

export const acceptSharedTreino = async (req: any, res: Response): Promise<void> => {
  const { token } = req.params;
  const usuarioId = +req.usuario.id;

  const { channel } = await connectRabbitMQ();

  const message = JSON.stringify({ token, usuarioId });
  channel.sendToQueue('treinos', Buffer.from(message));

  res.json({ message: 'Treino compartilhado será processado.' });
};
