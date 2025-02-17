import { useContext } from "react";
import React from "react";
import { LoginContext } from "../context/LoginContext"; 
import '../styles/UserPage.css';

export const UserPage = () => {
    const { loginData } = useContext(LoginContext);

    return (
        <div>
            {`Hola ${loginData.userName || "Invitado"}`} <br /> 
            {`Cuyo correo es: ${loginData.email || "No tiene correo, cree uno"}`} <br />
            {`Y contraseña: ${loginData.password || "No tiene, a hackear la cuenta ;=)"}`}
        </div>
    );
};  {/* Mostrar un valor por defecto si userName está vacío */}


