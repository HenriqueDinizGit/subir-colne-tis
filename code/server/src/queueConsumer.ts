import { Channel } from 'amqplib'; // Assumindo que você está usando amqplib
import connectRabbitMQ from './utils/rabbitmq';
import { processSharedTreino } from './services/treinoService';
import { processComunidade } from './services/communityService';


interface TreinoMessage {
    token: string;
    usuarioId: number;
}


interface ComunidadeMessage {
    token: string;
    usuarioId: number;
}

async function ensureQueue(channel: Channel, queueName: string): Promise<void> {
    await channel.assertQueue(queueName, {
        durable: true  
    });
}

async function processTreinoQueue(): Promise<void> {
    const { channel } = await connectRabbitMQ();
    await ensureQueue(channel, 'treinos');

    channel.consume('treinos', async (msg) => {
        if (msg) {
            const { token, usuarioId }: TreinoMessage = JSON.parse(msg.content.toString());
            try {
                await processSharedTreino(token, usuarioId);
                channel.ack(msg);
            } catch (error) {
                console.error('Failed to process treino message:', error);
                channel.nack(msg);
            }
        }
    }, {
        noAck: false
    });
}

async function processCommunityQueue(): Promise<void> {
    const { channel } = await connectRabbitMQ();
    await ensureQueue(channel, 'comunidades');

    channel.consume('comunidades', async (msg) => {
        if (msg) {
            const { token, usuarioId }: ComunidadeMessage = JSON.parse(msg.content.toString());
            try {
                await processComunidade(token, usuarioId);
                channel.ack(msg);
            } catch (error) {
                console.error('Failed to process community message:', error);
                channel.nack(msg);
            }
        }
    }, {
        noAck: false
    });
}

async function main() {
    await processCommunityQueue();
    await processTreinoQueue();
}

main().catch(console.error);
