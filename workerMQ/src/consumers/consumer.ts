import { setupRabbitMQ } from '../exchanges/exchange';

const consumeMessage  = async (
    channelName: string,
    exchangeName: string,
    exchangeType: string,
    queueName: string,
    routingKey: string,
    onMessage: (msg: string) =>Promise<string>
): Promise<string> => {
    try {
        const channel = await setupRabbitMQ(channelName, exchangeName, exchangeType, queueName, routingKey);
        if (channel) {
            channel.consume(queueName, (msg) => {
                if (msg) {
                    const messageContent = msg.content.toString();
                    const end = onMessage(messageContent);
                    channel.ack(msg);
                    return end;
                }
                
            }, { noAck: false });
        }
    } catch (error) {
        console.error('Error consuming message:', error);
    }
    return '';
}

    

export { consumeMessage  };
