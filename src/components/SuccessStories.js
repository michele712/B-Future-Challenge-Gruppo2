// src/components/SuccessStories.js
import React, { useEffect, useState } from 'react';

const SuccessStories = () => {
    const [stories, setStories] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getSuccessStories = async () => {
            try {
                const response = await fetch('https://b-future-challenge-gruppo2-3.onrender.com'/success-stories-view/');
                
                // Controlla che la risposta sia OK (status code 200)
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json(); // Converti la risposta in JSON
                console.log('API Response:', data); // Log della risposta per debug

                setStories(data); // Imposta i dati delle storie di successo
            } catch (error) {
                console.error("Error fetching success stories:", error);
                setError('Failed to fetch success stories');
            }
        };

        getSuccessStories();
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!Array.isArray(stories)) {
        return <div>No success stories available.</div>;
    }

    return (
        <div>
            <h2>Success Stories</h2>
            <table>
                <thead>
                    <tr>
                        <th>Project Name</th>
                        <th>Client Name</th>
                        <th>Industry</th>
                    </tr>
                </thead>
                <tbody>
                    {stories.map((story, index) => (
                        <tr key={index}>
                            <td>{story.project_name || story.projectName}</td>
                            <td>{story.client_name || story.clientName}</td>
                            <td>{story.industry}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SuccessStories;
