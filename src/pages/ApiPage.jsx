import React from "react";
import { RandomJoke } from "../components/JokesApi";

export const ApiPage = () => {
    //console.log("ApiPage montado");
    return (
        <div>
            {/* <h1>Página API</h1> */}
            <RandomJoke />      {/* <RandomJoke /></RandomJoke> */}
        </div>
    )
}