import amqp from 'amqplib';
import dotenv from 'dotenv';
dotenv.config();

const URL_RABBITMQ = process.env.URL_RABBITMQ || 'amqp://localhost:5672';

let connection: amqp.Connection | null = null;
let channels: { [key: string]: amqp.Channel } = {};

const connectToRabbitMQ = async (): Promise<amqp.Connection> => {
    try {
        if (!connection) {
            connection = await amqp.connect(URL_RABBITMQ);
            console.log(`🔗 Connected to RabbitMQ at ${URL_RABBITMQ}`);
        }
        return connection;
    } catch (error) {
        console.error('🚨 Error connecting to RabbitMQ:', error);
        throw error;
    }
};

const createChannel = async (channelName: string): Promise<amqp.Channel> => {
    if (!channels[channelName]) {
        const conn = await connectToRabbitMQ();
        const channel = await conn.createChannel();
        channels[channelName] = channel;
        console.log(`📢 Channel '${channelName}' created`);
    }
    return channels[channelName];
};

const assertExchange = async (channelName: string, exchangeName: string, exchangeType: string): Promise<void> => {
    const channel = await createChannel(channelName);
    await channel.assertExchange(exchangeName, exchangeType, { durable: true });
    console.log(`🔄 Exchange '${exchangeName}' of type '${exchangeType}' asserted`);
};

const assertQueue = async (channelName: string, queueName: string): Promise<void> => {
    const channel = await createChannel(channelName);
    await channel.assertQueue(queueName, { durable: true });
    console.log(`📥 Queue '${queueName}' asserted`);
};

const bindQueue = async (channelName: string, queueName: string, exchangeName: string, routingKey: string): Promise<void> => {
    const channel = await createChannel(channelName);
    await channel.bindQueue(queueName, exchangeName, routingKey);
    console.log(`🔗 Queue '${queueName}' bound to Exchange '${exchangeName}' with routing key '${routingKey}'`);
};

const setupRabbitMQ = async (
    channelName: string,
    exchangeName: string,
    exchangeType: string,
    queueName: string,
    routingKey: string
) => {
    const channel = await createChannel(channelName);
    await assertExchange(channelName, exchangeName, exchangeType);
    await assertQueue(channelName, queueName);
    await bindQueue(channelName, queueName, exchangeName, routingKey);
    return channel;
};

export { setupRabbitMQ };
