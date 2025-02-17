import React, { useReducer, useState } from "react";
import '../styles/GestorTarea.css';

// Estado inicial
const initialState = [];

// Reducer para manejar las acciones
const taskReducer = (state, action) => {
    switch (action.type) {
        case "ADD_TASK":
            return [...state, { id: Date.now(), text: action.payload, completed: false }];
        case "TOGGLE_TASK":
            return state.map(task =>
                task.id === action.payload ? { ...task, completed: !task.completed } : task
            );
        case "DELETE_TASK":
            return state.filter(task => task.id !== action.payload);
        default:
            return state;
    }
};

export const GestorTarea = () => {
    const [tasks, dispatch] = useReducer(taskReducer, initialState);
    const [taskText, setTaskText] = useState("");

    // Agregar tarea
    const addTask = () => {
        if (taskText.trim() === "") return; // Evitar agregar tareas vacías
        dispatch({ type: "ADD_TASK", payload: taskText });
        setTaskText("");
    };

    // Manejar enter para agregar tareas
    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            addTask();
        }
    };

    return (
        <div className="task-manager">
            <h1>Gestor de Tareas (UseReducer)</h1>
            <div className="task-input">
                <input
                    type="text"
                    placeholder="Escribe una tarea..."
                    value={taskText}
                    onChange={(e) => setTaskText(e.target.value)}
                    onKeyPress={handleKeyPress}
                />
                <button onClick={addTask}>Agregar</button>
            </div>
            <ul className="task-list">
                {tasks.map(task => (
                    <li key={task.id} className={task.completed ? "completed" : ""}>
                        <span onClick={() => dispatch({ type: "TOGGLE_TASK", payload: task.id })}>
                            {task.text}
                        </span>
                        <button onClick={() => dispatch({ type: "DELETE_TASK", payload: task.id })}>
                            Eliminar
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};
