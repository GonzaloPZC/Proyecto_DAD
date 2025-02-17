import React, { useState } from "react";
import { MessageList, Button, Message } from "@chatscope/chat-ui-kit-react";
import "../styles/ChatBot.css";
import { generateContent } from "./model";

export const ChatBox = () => {
    const [messages, setMessages] = useState([
        { id: Date.now(), text: "¡Hola! ¿Qué tal? ¿En qué puedo ayudarte hoy en el mundo del fútbol?", sender: "bot" }
    ]);
    const [input, setInput] = useState("");
    const [isOpen, setIsOpen] = useState(false); // Estado para controlar si el chat está abierto o cerrado

    const sendMessage = async () => {
        if (!input.trim()) return;

        const userMessage = { id: Date.now(), text: input, sender: "user" };
        setMessages((prev) => [...prev, userMessage]);
        setInput("");

        try {
            const response = await generateContent(input); // Asegurar que sea await
            console.log("Respuesta del servidor:", response); // Ver qué devuelve el servidor

            const botReply = response?.data?.reply ?? "No entendí, ¿puedes repetir?";
            const botMessage = { id: Date.now() + 1, text: botReply, sender: "bot" };

            setMessages((prev) => [...prev, botMessage]);
        } catch (error) {
            console.error("Error fetching response:", error);
            setMessages((prev) => [...prev, { id: Date.now() + 1, text: "Error en el servidor.", sender: "bot" }]);
        }
    };

    const toggleChat = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            
            <button className="chat-toggle-btn" onClick={toggleChat}>
                <i className="bi bi-chat-left-text"></i> 
            </button>

            
            {isOpen && (
                <div className="chatbox">
                    <MessageList className="message-list">
                        {messages.map((msg) => (
                            <Message
                                key={msg.id} // Clave única
                                model={{
                                    message: msg.text,
                                    direction: msg.sender === "user" ? "outgoing" : "incoming", // Mensajes a la derecha
                                    sender: msg.sender === "user" ? "Tú" : "Gemini AI",
                                }}
                            />
                        ))}
                    </MessageList>
                    <div className="chat-input">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Escribe un mensaje..."
                        />
                        <Button onClick={sendMessage}>Enviar</Button>
                    </div>
                </div>
            )}
        </>
    );
};
