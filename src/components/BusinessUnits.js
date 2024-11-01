// src/components/BusinessUnits.js
import React, { useState, useEffect } from 'react';

const BusinessUnits = () => {
    const [units, setUnits] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUnits = async () => {
            try {
                const response = await fetch('https://official-hedwig-airoleplaychat-36373dad.koyeb.app/business-units/'); 

                if (!response.ok) {
                    throw new Error(`Error: ${response.status} - ${response.statusText}`);
                }

                const data = await response.json();
                setUnits(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUnits();
    }, []);

    return (
        <div>
            <h1>Business Units</h1>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>Error fetching business units: {error}</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Status</th>
                            {/* Aggiungi altre intestazioni di colonna se necessario */}
                        </tr>
                    </thead>
                    <tbody>
                        {units.map(unit => (
                            <tr key={unit.id}>
                                <td>{unit.name}</td>
                                <td>{unit.description}</td>
                                <td>{unit.status}</td>
                                {/* Aggiungi altre celle di dati se necessario */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default BusinessUnits;
