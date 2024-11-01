// src/components/Dashboard.js
import React, { useEffect, useState } from 'react';
import ClientList from './ClientList';
import BusinessUnits from './BusinessUnits';
import Services from './Services';
import SuccessStories from './SuccessStories';
import { Bar } from 'react-chartjs-2'; // Assicurati di avere react-chartjs-2 installato

const Dashboard = () => {
    const [clientCount, setClientCount] = useState(0);
    const [businessUnitCount, setBusinessUnitCount] = useState(0);
    const [serviceCount, setServiceCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCounts = async () => {
            try {
                const clientsResponse = await fetch('https://b-future-challenge-gruppo2-3.onrender.com//clients/');
                const unitsResponse = await fetch('https://b-future-challenge-gruppo2-3.onrender.com//business-units/');
                const servicesResponse = await fetch('https://b-future-challenge-gruppo2-3.onrender.com//services/');
                
                if (!clientsResponse.ok || !unitsResponse.ok || !servicesResponse.ok) {
                    throw new Error('Failed to fetch data');
                }

                const clientsData = await clientsResponse.json();
                const unitsData = await unitsResponse.json();
                const servicesData = await servicesResponse.json();

                setClientCount(clientsData.length);
                setBusinessUnitCount(unitsData.length);
                setServiceCount(servicesData.length);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCounts();
    }, []);

    // Configurazione per il grafico
    const data = {
        labels: ['Clients', 'Business Units', 'Services'],
        datasets: [
            {
                label: 'Total Count',
                data: [clientCount, businessUnitCount, serviceCount],
                backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)', 'rgba(255, 206, 86, 0.6)'],
                borderWidth: 1,
            },
        ],
    };

    return (
        <div>
            <h1>Dashboard</h1>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>Error fetching data: {error}</p>
            ) : (
                <div>
                    <Bar data={data} />
                    <h2>Client List</h2>
                    <ClientList />
                    <h2>Business Units</h2>
                    <BusinessUnits />
                    <h2>Services</h2>
                    <Services />
                    <h2>Success Stories</h2>
                    <SuccessStories />
                </div>
            )}
        </div>
    );
};

export default Dashboard;
