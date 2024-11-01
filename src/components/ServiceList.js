// src/components/Services.js
import React, { useState, useEffect } from 'react';

const Services = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await fetch('https://official-hedwig-airoleplaychat-36373dad.koyeb.app/services/'); // Modifica l'URL in base alla tua API

                if (!response.ok) {
                    throw new Error(`Error: ${response.status} - ${response.statusText}`);
                }

                const data = await response.json();
                setServices(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchServices();
    }, []);

    return (
        <div>
            <h1>Services</h1>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>Error fetching services: {error}</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Created At</th>
                            <th>Updated At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {services.map(service => (
                            <tr key={service.id}>
                                <td>{service.name}</td>
                                <td>{service.description}</td>
                                <td>{service.price} €</td> {/* Assumendo che ci sia un campo 'price' */}
                                <td>{service.status}</td>
                                <td>{new Date(service.created_at).toLocaleString('it-IT')}</td>
                                <td>{new Date(service.updated_at).toLocaleString('it-IT')}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Services;
