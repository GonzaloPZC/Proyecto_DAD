import React, { useState } from "react";
import '../styles/Componente.css';

export const Componente = () => {
    const [showComponent1, setShowComponent1] = useState(false);
    const [showComponent2, setShowComponent2] = useState(false);
    const [showComponent3, setShowComponent3] = useState(false);

    return (
        <div className="responsive-tabs">
            <h1>Pestaña de Componentes Responsive</h1>
            <div className="buttons-container">
                <button onClick={() => setShowComponent1(!showComponent1)}>
                    {showComponent1 ? "Ocultar Cantante 1" : "Mostrar Cantante 1"}
                </button>
                <button onClick={() => setShowComponent2(!showComponent2)}>
                    {showComponent2 ? "Ocultar Cantante 2" : "Mostrar Cantante 2"}
                </button>
                <button onClick={() => setShowComponent3(!showComponent3)}>
                    {showComponent3 ? "Ocultar Cantante 3" : "Mostrar Cantante 3"}
                </button>
            </div>
            <div className="components-container">
                {showComponent1 && (
                    <div className="component">
                        <h2>Cantante 1</h2>
                        <p>Lit Killah</p>
                        <img 
                            src="https://pbs.twimg.com/profile_images/1849938775889104898/ZklDX3it_400x400.jpg"
                            alt="Lit Killah"
                            className="singer-image"
                        />
                    </div>
                )}
                {showComponent2 && (
                    <div className="component">
                        <h2>Cantante 2</h2>
                        <p>Tiago PZK</p>
                        <img 
                            src="https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da84c0dcf1f612c06a4e0a2709b9" 
                            alt="Tiago PZK" 
                            className="singer-image" 
                        />
                    </div>
                )}
                {showComponent3 && (
                    <div className="component">
                        <h2>Cantante 3</h2>
                        <p>Duki</p>
                        <img 
                            src="https://recursos.marketingnews.es/files/1721/82.png" 
                            alt="Duki" 
                            className="singer-image" 
                        />
                    </div>
                )}
            </div>
        </div>
    );
};
