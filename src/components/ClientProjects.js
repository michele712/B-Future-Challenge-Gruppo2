// src/components/ClientProjects.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ClientProjects = ({ clientId }) => {
  const [projects, setProjects] = useState([]);
  const [name, setName] = useState('');
  const [status, setStatus] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(`/clients/${clientId}/projects/`);
        setProjects(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, [clientId]);

  const createProject = async () => {
    const newProject = { client_id: clientId, name, status, start_date: startDate, end_date: endDate, description };
    try {
      const response = await axios.post(`/clients/${clientId}/projects/`, newProject);
      setProjects([...projects, response.data]); // Assicurati di aggiungere il progetto appena creato
      // Resetta i campi del modulo
      setName('');
      setStatus('');
      setStartDate('');
      setEndDate('');
      setDescription('');
    } catch (error) {
      console.error('Error creating project:', error);
      setError('Failed to create project');
    }
  };

  return (
    <div>
      <h1>Client Projects</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error fetching projects: {error}</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Status</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {projects.map(project => (
              <tr key={project.id}>
                <td>{project.name}</td>
                <td>{project.status}</td>
                <td>{new Date(project.start_date).toLocaleDateString('it-IT')}</td>
                <td>{new Date(project.end_date).toLocaleDateString('it-IT')}</td>
                <td>{project.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <h2>Create New Project</h2>
      <input
        type="text"
        placeholder="Project Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Status"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      />
      <input
        type="date"
        placeholder="Start Date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />
      <input
        type="date"
        placeholder="End Date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={createProject}>Create Project</button>
    </div>
  );
};

export default ClientProjects;
