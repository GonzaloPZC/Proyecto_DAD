import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyDij-ecrE5524HB-ZuG_r6zqNGaHYDXopA");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const generateContent = async (prompt) => {
    try {
        const context = "Eres Geminis, un chatbot especializado en fútbol.";
        const fullPrompt = `${context}\nUsuario: ${prompt}`;

        const result = await model.generateContent(fullPrompt);
        const reply = result.response.text(); // Obtener texto de la respuesta

        return { data: { reply } }; // Devuelve un objeto que el frontend espera
    } catch (error) {
        console.error("Error en Gemini API:", error);
        return { data: { reply: "Error al obtener respuesta del servidor." } };
    }
};
