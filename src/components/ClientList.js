// src/components/ClientList.js
import './ClientList.css'
import React, { useState, useEffect } from 'react';

const ClientList = () => {
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const response = await fetch('https://official-hedwig-airoleplaychat-36373dad.koyeb.app/clients/');

                if (!response.ok) {
                    throw new Error(`Error: ${response.status} - ${response.statusText}`);
                }

                const data = await response.json();
                setClients(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchClients();
    }, []);

    return (
        <div>
            <h1>Client List</h1>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>Error fetching clients: {error}</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Industry</th>
                            <th>Size</th>
                            <th>Annual Revenue</th>
                            <th>Atoka ID</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clients.map(client => (
                            <tr key={client.id}>
                                <td>{client.name}</td>
                                <td>{client.industry}</td>
                                <td>{client.size}</td>
                                <td>{client.annual_revenue.toLocaleString('it-IT', { style: 'currency', currency: 'EUR' })}</td>
                                <td>{client.atoka_id}</td>
                                <td>{client.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ClientList;
