// src/components/SuccessStories.js
import React, { useEffect, useState } from 'react';
import { fetchSuccessStories } from '../services/api';

const SuccessStories = () => {
    const [stories, setStories] = useState([]);

    useEffect(() => {
        const getSuccessStories = async () => {
            try {
                const response = await fetchSuccessStories();
                setStories(response.data);
            } catch (error) {
                console.error("Error fetching success stories:", error);
            }
        };

        getSuccessStories();
    }, []);

    return (
        <div>
            <h2>Storie di Successo</h2>
            <table>
                <thead>
                    <tr>
                        <th>Nome Progetto</th>
                        <th>Cliente</th>
                        <th>Settore</th>
                    </tr>
                </thead>
                <tbody>
                    {stories.map(story => (
                        <tr key={story.id}>
                            <td>{story.projectName}</td>
                            <td>{story.clientName}</td>
                            <td>{story.industry}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SuccessStories;
