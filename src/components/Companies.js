import React, { useEffect, useState } from 'react';
import './Companies.css'; // Importa il CSS personalizzato

const Companies = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState(''); // Stato per il termine di ricerca

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/companies/');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCompanies(data); // Imposta i dati delle aziende
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  // Filtra le aziende in base al termine di ricerca
  const filteredCompanies = companies.filter(company =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <p>Loading...</p>; // Messaggio di caricamento
  }

  if (error) {
    return <p>Error: {error}</p>; // Messaggio di errore
  }

  return (
    <div className="companies-container">
      <input
        type="text"
        placeholder="Search Companies..."
        onChange={(e) => setSearchTerm(e.target.value)} // Aggiorna il termine di ricerca
        className="search-input"
      />
      <h2>Companies</h2>
      <div className="companies-list">
        {filteredCompanies.length > 0 ? (
          filteredCompanies.map((company) => (
            <div className="company-card" key={company.id}>
              <h3>{company.name}</h3>
              <p><strong>Address:</strong> {company.address}</p>
              <p><strong>VAT/Tax Code:</strong> {company.vat_tax_code}</p>
              <p><strong>Registration Number:</strong> {company.registration_number}</p>
              <p><strong>Share Capital:</strong> {company.share_capital}</p>
              <p><strong>Toll-Free Number:</strong> {company.toll_free_number}</p>
              <p><strong>Website:</strong> <a href={company.website} target="_blank" rel="noopener noreferrer">{company.website}</a></p>
            </div>
          ))
        ) : (
          <p>No companies found matching your search.</p> // Messaggio se non ci sono aziende corrispondenti
        )}
      </div>
    </div>
  );
};

export default Companies;
