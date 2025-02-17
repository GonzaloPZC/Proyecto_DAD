import { useEffect, useState } from "react";
import axios from "axios";
import '../styles/Joke.css';

export const RandomJoke = () => {
    const [joke, setJoke] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchJoke = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get('https://official-joke-api.appspot.com/random_joke');
            setJoke(response.data);
            setLoading(false);
        } catch (err) {
            setError('Error de fetching con el chiste o la imagen');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchJoke();
    }, []);

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h1>Chiste Aleatorio</h1>
            {joke && (
                <div>
                    <p><strong>Pregunta:</strong> {joke.setup}</p>
                    <p><strong>Gracia:</strong> {joke.punchline}</p>
                </div>
            )}
            <button onClick={fetchJoke} style={{ marginTop: "20px" }}>Nuevo chiste</button>
        </div>
    )
}

//export default RandomJoke;