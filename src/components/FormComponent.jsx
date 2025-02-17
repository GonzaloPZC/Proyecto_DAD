import { useContext } from "react";
import { LoginContext } from "../context/LoginContext";
import { useForm } from "../hooks/useForm";
import '../styles/FormComponent.css';

export const FormComponent = () => {
    const { updateLoginData } = useContext(LoginContext); // Obtener la función del contexto

    const initialForm = {
        userName: '',
        email: '',
        password: ''
    };

    const { userName, email, password, onInputChange, formState } = useForm(initialForm);

    const onSubmit = (e) => {
        e.preventDefault();

        // Actualizar los datos del contexto
        updateLoginData(formState);

        // Opcional: limpiar el formulario
        console.log("Formulario enviado:", formState);
    };

    return (
        
        <form onSubmit={onSubmit}>

            <h1>Formulario</h1>

            <div className="mb-3">
                <label htmlFor="userName" className="form-label">Usuario</label>
                <input
                    type="text"
                    className="form-control"
                    name="userName"
                    placeholder="Enter your UserName"
                    value={userName}
                    onChange={onInputChange}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input
                    type="email"
                    className="form-control"
                    name="email"
                    placeholder="Enter your Email"
                    value={email}
                    onChange={onInputChange}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                    type="password"
                    className="form-control"
                    name="password"
                    placeholder="Enter your Password"
                    value={password}
                    onChange={onInputChange}
                />
            </div>

            <div className="col-auto">
                <button type="submit" className="btn btn-primary">Submit</button>
            </div>
        </form>
    );
};