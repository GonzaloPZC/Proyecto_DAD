import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Papa from 'papaparse';
import '../styles/Informe.css';

export const Informe = () => {
  const [champions, setChampions] = useState([]);
  const [difficulty, setDifficulty] = useState('');
  const [heroType, setHeroType] = useState('');
  const [filteredChampions, setFilteredChampions] = useState([]);

  useEffect(() => {
    fetch('/LoL_champion_data.csv')
      .then(response => response.text())
      .then(csvText => {
        Papa.parse(csvText, {
          header: true,
          dynamicTyping: true,
          complete: (result) => {
            setChampions(result.data);
          }
        });
      });
  }, []);

  const handleFilter = () => {
    const filtered = champions.filter(champ =>
      (difficulty ? champ.difficulty === parseInt(difficulty) : true) &&
      (heroType ? champ.herotype === heroType : true)
    );
    setFilteredChampions(filtered);
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("League of Legends Champions Report", 10, 10);
    
    const tableData = filteredChampions.map(champ => [
      champ.id, champ.apiname, champ.title, champ.difficulty, champ.herotype
    ]);

    doc.autoTable({
      head: [['ID', 'Name', 'Title', 'Difficulty', 'Hero Type']],
      body: tableData,
    });

    doc.save("Informe_LoL.pdf");
  };

  return (
    <div className="container mt-4">
      <h2>Informes de Campeones</h2>
      <div className="mb-3">
        <label className="form-label">Dificultad:</label>
        <select className="form-select" value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
          <option value="">Todos</option>
          <option value="1">1 - Fácil</option>
          <option value="2">2 - Medio</option>
          <option value="3">3 - Difícil</option>
        </select>
      </div>
      <div className="mb-3">
        <label className="form-label">Tipo de Héroe:</label>
        <select className="form-select" value={heroType} onChange={(e) => setHeroType(e.target.value)}>
          <option value="">Todos</option>
          <option value="Fighter">Fighter</option>
          <option value="Mage">Mage</option>
          <option value="Assassin">Assassin</option>
          <option value="Marksman">Marksman</option>
          <option value="Tank">Tank</option>
          <option value="Support">Support</option>
        </select>
      </div>
      <button className="btn btn-primary" onClick={handleFilter}>Filtrar</button>
      <button className="btn btn-success ms-2" onClick={generatePDF}>Imprimir</button>
      {filteredChampions.length === 0 && <p className="mt-3 text-danger">No hay campeones que coincidan con los filtros.</p>}
    </div>
  );
};
