import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const getAiResponse = async (question, context) => {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const prompt = `You are an AI tutor for FreeSiksha. 
        Context: ${context}
        Student Question: ${question}
        Provide a helpful, educational, and concise answer.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error("Gemini Error:", error.message);
        return "I'm sorry, I'm having trouble connecting to my brain right now. Please try again later.";
    }
};


