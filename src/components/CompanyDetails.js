// src/components/CompanyDetails.js

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const CompanyDetails = () => {
  const { companyId } = useParams();
  const [company, setCompany] = useState(null);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/companies/${companyId}/`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCompany(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchServices = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/companies/${companyId}/services/`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setServices(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchCompany();
    fetchServices();
  }, [companyId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h2>{company.name}</h2>
      <p><strong>Address:</strong> {company.address}</p>
      <p><strong>VAT/Tax Code:</strong> {company.vat_tax_code}</p>
      <p><strong>Registration Number:</strong> {company.registration_number}</p>
      <p><strong>Share Capital:</strong> {company.share_capital}</p>
      <p><strong>Toll-Free Number:</strong> {company.toll_free_number}</p>
      <p><strong>Website:</strong> <a href={company.website} target="_blank" rel="noopener noreferrer">{company.website}</a></p>

      <h3>Services</h3>
      <ul>
        {services.map(service => (
          <li key={service.id}>{service.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default CompanyDetails;
