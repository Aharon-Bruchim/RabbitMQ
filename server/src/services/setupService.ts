import { consumeMessage } from "../../../workerMQ/src/consumers/consumer";
import { sendMessage } from "../../../workerMQ/src/producers/producer";
import { processMessage } from "../../../workerMQ/src/ai/aiService";

const handleMessage = async (messageContent: string):Promise<string> => {
    console.log(`📩 Received message: ${messageContent}`);
    const response:string = await processMessage(messageContent);
    if (!response) {
        console.error("❌ Failed to process message!");
    }
    return response;
};

export const receiveMessages = async (
    channelName: string,
    exchangeName: string,
    exchangeType: string,
    queueName: string,
    routingKey: string
): Promise<string> => {
    console.log(`🎧 Listening for messages on queue '${queueName}'...`);
    const result = await consumeMessage(
        channelName,
        exchangeName,
        exchangeType,
        queueName,
        routingKey,
        handleMessage
    );
    return result;

};


const options = {
    channelName: "storyChannel",
    queueName: "storyQueue",
    exchangeName: "storyExchange",
    exchangeType: "direct",
    routingKey: "storyRoutingKey",
};

export const sendToQueue = async (message: string): Promise<void> => {
    console.log(`📤 Sending message to queue: ${message}`);
    await sendMessage(
        options.channelName,
        options.exchangeName,
        options.exchangeType,
        options.queueName,
        options.routingKey,
        message
    );
};

export const startListening = async (): Promise<string> => {
   
   const rssAi = await receiveMessages(
        options.channelName,
        options.exchangeName,
        options.exchangeType,
        options.queueName,
        options.routingKey
    );
    return rssAi;
};

