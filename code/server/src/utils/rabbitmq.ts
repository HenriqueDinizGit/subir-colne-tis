import { connect, Connection, Channel } from 'amqplib';

async function connectRabbitMQ(): Promise<{ connection: Connection, channel: Channel }> {
    const connection = await connect('amqp://localhost'); 
    const channel = await connection.createChannel(); 

    await channel.assertQueue('treinos', {
        durable: true 
    });
    await channel.assertQueue('comunidades', {
        durable: true 
    });

    return { connection, channel };
}

export default connectRabbitMQ;
