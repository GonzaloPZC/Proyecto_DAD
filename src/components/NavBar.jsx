import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router';
import '../styles/NavBar.css';
import Switch from '@mui/material/Switch';

const fetchProducts = async () => {
  try {
    const response = await fetch('https://fakestoreapi.com/products');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

const ProductHit = ({ product }) => (
  <div className="hit-item d-flex align-items-start mb-2">
    <img 
      src={product.image} 
      alt={product.title} 
      className="product-image me-3" 
      style={{ width: '50px', height: '50px', objectFit: 'contain' }} 
    />
    <div>
      <h6>{product.title}</h6>
      <p className="mb-1 text-muted">{product.description}</p>
      <p className="fw-bold">${product.price}</p>
    </div>
  </div>
);

export const NavBar = ({ darkMode, toggleDarkMode }) => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchAndSetProducts = async () => {
      const fetchedProducts = await fetchProducts();
      setProducts(fetchedProducts);
    };
    fetchAndSetProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <nav className={`navbar navbar-expand-lg ${darkMode ? 'bg-dark' : 'bg-body-tertiary'}`}>
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">Barra</NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" to='/componente'>Componentes</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/api">API</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to='/gestor'>Gestor de tareas</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to='/voice'>Voz</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to='/informe'>Informe</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to='/interactivo'>Inf. interactivo</NavLink>
            </li>
          </ul>

          

          <ul className="navbar-nav ms-auto">

              {/* Search and Results */}
              <div className="ms-auto d-inline align-items-center search-container">
            <input
              type="text"
              className="form-control search-box"
              placeholder="Buscar productos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <div className="search-results">
                {filteredProducts.map((product) => (
                  <ProductHit key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>

            <li className="nav-item">
              <NavLink to='sun' className="nav-link active">
                <i className="bi bi-brightness-high"></i>
              </NavLink>
            </li>
            <li className="nav-item">
              <Switch
                checked={darkMode}
                onChange={toggleDarkMode}
                inputProps={{ 'aria-label': 'Toggle dark mode' }}
              />
            </li>
            <li className="nav-item">
              <NavLink to='moon' className="nav-link active">
                <i className="bi bi-moon"></i>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to='user' className="nav-link active">
                <i className="bi bi-person"></i>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to='login' className="nav-link active">
                <i className="bi bi-door-open"></i>
              </NavLink>
            </li>
            {/* <li className="nav-item">
              <NavLink to='chat' className="nav-link active">
                <i class="bi bi-briefcase"></i>
              </NavLink>
            </li> */}
          </ul>
        </div>
      </div>
    </nav>
  );
};
