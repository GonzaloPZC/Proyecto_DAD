import React, { useEffect, useState } from "react";
import algoliasearch from "algoliasearch/lite";
import { InstantSearch, SearchBox, Hits, Configure } from "react-instantsearch-dom";
import "../styles/SearchBar.css";

const searchClient = algoliasearch("YourApplicationID", "YourSearchOnlyAPIKey");

export const SearchBar = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Cargar datos de la API
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        // Aquí deberías sincronizar los datos con tu índice de Algolia
      })
      .catch((err) => console.error(err));
  }, []);

  const ProductHit = ({ hit }) => (
    <div className="hit">
      <img src={hit.image} alt={hit.title} className="hit-image" />
      <div className="hit-info">
        <h4 className="hit-title">{hit.title}</h4>
        <p className="hit-price">${hit.price}</p>
      </div>
    </div>
  );

  return (
    <div className="search-bar">
      <h2>Buscar Productos</h2>
      <InstantSearch indexName="products" searchClient={searchClient}>
        <SearchBox /><Configure hitsPerPage={10} />
        <Hits hitComponent={ProductHit} />
      </InstantSearch>
    </div>
  );
};
