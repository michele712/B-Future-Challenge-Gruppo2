import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ServiceRecommendations = ({ clientId }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [serviceId, setServiceId] = useState('');
  const [businessUnitId, setBusinessUnitId] = useState('');
  const [matchingScore, setMatchingScore] = useState('');
  const [recommendationBasis, setRecommendationBasis] = useState('');

  useEffect(() => {
    const fetchRecommendations = async () => {
      const response = await axios.get(`/clients/${clientId}/recommendations/`);
      setRecommendations(response.data);
    };
    fetchRecommendations();
  }, [clientId]);

  const createRecommendation = async () => {
    const newRecommendation = { client_id: clientId, service_id: serviceId, business_unit_id: businessUnitId, matching_score: Number(matchingScore), recommendation_basis: recommendationBasis };
    await axios.post(`/clients/${clientId}/recommendations/`, newRecommendation);
    setRecommendations([...recommendations, newRecommendation]);
  };

  return (
    <div>
      <h1>Service Recommendations</h1>
      <ul>
        {recommendations.map(rec => (
          <li key={rec.id}>{`Service ID: ${rec.service_id}, Score: ${rec.matching_score}`}</li>
        ))}
      </ul>
      <input
        type="text"
        placeholder="Service ID"
        value={serviceId}
        onChange={(e) => setServiceId(e.target.value)}
      />
      <input
        type="text"
        placeholder="Business Unit ID"
        value={businessUnitId}
        onChange={(e) => setBusinessUnitId(e.target.value)}
      />
      <input
        type="number"
        placeholder="Matching Score"
        value={matchingScore}
        onChange={(e) => setMatchingScore(e.target.value)}
      />
      <textarea
        placeholder="Recommendation Basis"
        value={recommendationBasis}
        onChange={(e) => setRecommendationBasis(e.target.value)}
      />
      <button onClick={createRecommendation}>Create Recommendation</button>
    </div>
  );
};

export default ServiceRecommendations;
