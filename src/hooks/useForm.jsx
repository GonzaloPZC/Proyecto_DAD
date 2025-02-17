import { useState } from "react";
export const useForm = (initialValue={}) => {

    //Capturar la información
    const [formState, setFormState]= useState(initialValue)

    const onInputChange = ({target}) => {
        const {name, value} = target
        setFormState({
            ...formState,
            //////////IMPORTANTE: para recibir el name del target es necesario ponerlo entre corchete
            [name]:value
        })
    }

    return {
        ...formState, //Para mandar destructurado el formState usamos el operador spread
        formState,
        onInputChange,
    }
}