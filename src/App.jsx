import 'regenerator-runtime/runtime';

import React, { useEffect } from 'react'
import { Routes, Route} from 'react-router'
import { useState } from 'react'
import { LoginProvider } from './context/LoginProvider'
import { NavBar } from './components/NavBar'
import { ApiPage } from './pages/ApiPage'
import { LoginPage } from './pages/LoginPage'
import { UserPage } from './pages/UserPage'
import { GestorPage } from './pages/GestorPage'
import { ComponentePage } from './pages/ComponentePage'
import { VoicePage } from './pages/VoicePage'
import { Informe } from './components/Informe';
import { InformeInteractivo } from './components/InformeInteractivo';

import { ChatBox } from './components/ChatBot';

import { Bienvenido } from './pages/Bienvenida'

import './App.css'
//import { Route } from 'react-router-dom'

const App = () => {

  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    // Agregar clase de modo oscuro al body
    document.body.className = darkMode ? 'dark-mode' : 'light-mode';
  }, [darkMode]);

  return (
    <div className={darkMode ? 'dark-mode' : 'light-mode'}>
      <h1>Proyecto DAD</h1>
      <NavBar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
      <LoginProvider>
        <div className="container">
        

          <Routes>
            <Route path="/" element={<Bienvenido/>} />
            <Route path="/api" element={<ApiPage />} />
            <Route path="/componente" element={<ComponentePage />} />
            <Route path='/gestor' element={<GestorPage/>} /> 
            <Route path="/login" element={<LoginPage />} />
            <Route path="/user" element={<UserPage />} /> 
            <Route path="/voice" element={<VoicePage />} />
            <Route path="/informe" element={< Informe/>} />
            <Route path="/interactivo" element={< InformeInteractivo/>} />
            {/* <Route path="/chat" element={<ChatBotPage/>} /> */}
            {/* <Route path="/search" element={<SearchBar />} /> */}
          </Routes>
        </div>
        <ChatBox />
      </LoginProvider>
    </div>
  );
};

export default App;