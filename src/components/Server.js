import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { generateContent } from "./model.js"; // Importa la función corregida

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.post("/chat", async (req, res) => {
    const { message } = req.body;
    const response = await generateContent(message); // Llama a la función corregida
    res.json(response.data); // Enviar solo la data
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
