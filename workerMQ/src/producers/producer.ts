import { setupRabbitMQ,  } from '../exchanges/exchange';

const sendMessage = async (
    channelName: string,
    exchangeName: string,
    exchangeType: string,
    queueName: string,
    routingKey: string,
    message: string,
): Promise<void> => {
    try {
        const channel = await setupRabbitMQ(channelName, exchangeName, exchangeType, queueName, routingKey);
        if (!channel) {
            throw new Error('Failed to create channel');
        }
        const msg = Buffer.from(message);
        channel.publish(exchangeName, routingKey, msg, { persistent: true });
        console.log(`Message sent: ${message}`);
    } catch (error) {
        console.error('Error sending message:', error);
    }
};

export { sendMessage };
