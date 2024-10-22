// src/components/Subservices.js
import React, { useEffect, useState } from 'react';

const Subservices = ({ serviceId }) => {
    const [subservices, setSubservices] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSubservices = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/services/${serviceId}/subservices/`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setSubservices(data);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchSubservices();
    }, [serviceId]);

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div>
            {subservices.length > 0 ? (
                <ul>
                    {subservices.map((subservice) => (
                        <li key={subservice.id}>{subservice.name}</li>
                    ))}
                </ul>
            ) : (
                <p>No subservices found for this service.</p>
            )}
        </div>
    );
};

export default Subservices;
