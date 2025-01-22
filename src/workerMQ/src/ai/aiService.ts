import { pipeline } from "@xenova/transformers";
process.env.ORT_LOG_SEVERITY_LEVEL = "0";

let aiModel: any = null;

export const initAI = async (model: string = "Xenova/gpt2") => {
    if (!aiModel) {
        console.log("🟢 Initializing AI model...");
        aiModel = await pipeline("text-generation", model);
        console.log("✅ AI model loaded successfully.");
    }
    return aiModel;
};

export const processMessage = async (messageContent: string) => {
    if (!aiModel) await initAI();

    console.log(`🚀 Sending to AI: ${messageContent}`);
    try {
        console.log("🔵 Generating response...");
        const result = await aiModel(messageContent);
        console.log("🎉 Generated response:", result);
        return result;
    } catch (error) {
        console.error("❌ Error generating AI response:", error);
        return null;
    }
};
