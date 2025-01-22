// import { setupRabbitMQ } from '../exchanges/exchange';
// import { pipeline } from "@xenova/transformers";
// process.env.ORT_LOG_SEVERITY_LEVEL = '0';


// const initAI = async (model: string = "Xenova/gpt2") => {
//     const classifier = await pipeline("text-generation", model);
//     return classifier;
// };

// const processMessage = async (messageContent: string, ai: any) => {
//     console.log(`🚀 Sending to AI: ${messageContent}`);
    
//     try {
//         console.log("🔵 Generating response...");
//         const result = await ai(messageContent);
//         console.log("🎉 Generated response:", result);
//         return result;
//     } catch (error) {
//         console.error("❌ Error generating AI response:", error);
//         return null;
//     }
// };

// const handleMessage = async (messageContent: string) => {
//     const ai = await initAI(); 
//     if (!ai) {
//         console.error("❌ AI initialization failed!");
//         return null;
//     }
//     return await processMessage(messageContent, ai);
// };

// const receiveMessages = async (channelName: string, queueName: string, exchangeName: string) => {
//     try {
//         const channel = await setupRabbitMQ(channelName, exchangeName, "direct", queueName, "");
//         if (!channel) {
//             throw new Error('Failed to create channel');
//         }

//         const q = await channel.assertQueue(queueName, { durable: true });
//         await channel.bindQueue(q.queue, exchangeName, '');

//         channel.consume(q.queue, async (message) => {
//             if (message) {
//                 const messageContent = message.content.toString();
//                 console.log(`Received message: ${messageContent}`);
                
//                 const aiResponse = await handleMessage(messageContent);
//                 console.log('AI Response:', aiResponse);
                
//                 channel.ack(message);
//             }
//         });

//         console.log('📡 Waiting for messages...');
        
//     } catch (error) {
//         console.error('🚨 Error receiving messages:', error);
//     }
// };

// export { receiveMessages };
