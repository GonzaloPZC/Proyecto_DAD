import React, { useState, useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
//import '../styles/VoiceInput.css';

export const VoiceInputComponent = () => {
  const [text, setText] = useState('');
  const [submittedText, setSubmittedText] = useState('');

  const { transcript, resetTranscript, listening } = useSpeechRecognition();

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return <p>Tu navegador no soporta reconocimiento de voz.</p>;
  }

  const handleStartListening = () => {
    resetTranscript();
    SpeechRecognition.startListening({ continuous: true });
  };

  const handleStopListening = () => {
    SpeechRecognition.stopListening();
    resetTranscript();
    setText('');
    setSubmittedText('');
  };

  const handleSubmit = () => {
    setSubmittedText(text);
    setText('');
  };

  const handleInputChange = (e) => {
    setText(e.target.value);
  };

  useEffect(() => {
    setText(transcript);
  }, [transcript]);

  return (
    <div className="voice-page container mt-4">
      <h2>Reconocimiento de Voz</h2>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          value={text}
          onChange={handleInputChange}
          placeholder="Escribe algo o usa el micrófono..."
        />
      </div>
      <div className="d-flex gap-2 mb-3">
        <button className="btn btn-primary" onClick={handleSubmit}>
          Enviar
        </button>
        <button
          className={`btn ${listening ? 'btn-danger' : 'btn-success'}`}
          onClick={handleStartListening}
        >
          {listening ? 'Escuchando...' : 'Escuchar'}
        </button>
        <button className="btn btn-warning" onClick={handleStopListening}>
          Parar y Resetear
        </button>
      </div>
      <div className="submitted-text mt-3">
        <h5>Texto enviado:</h5>
        <p>{submittedText}</p>
      </div>
    </div>
  );
};