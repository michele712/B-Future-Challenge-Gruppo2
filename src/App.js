// src/App.js
import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { FaTachometerAlt, FaUsers, FaServicestack, FaStar, FaBuilding } from 'react-icons/fa'; // Importa le icone
import Chatbot from './components/Chatbot';
import AppRoutes from './components/AppRoutes';
import './App.css';

const App = () => {
    return (
        <Router>
            <div className="app-container">
                <header>
                    <h1>SynergyHub</h1>
                    <Navigation />
                </header>
                
                <main>
                    {/* Area dei contenuti principali */}
                    <AppRoutes />
                    
                    {/* Aggiungi il chatbot alla fine del contenuto principale */}
                    <Chatbot />
                </main>
                
                <footer>
                    <p>© 2024 VarGroup</p>
                </footer>
            </div>
        </Router>
    );
};

// Componente Navigation separato per modularità
const Navigation = () => (
    <nav>
        <ul>
            <li>
                <Link to="/">
                    <FaTachometerAlt /> Dashboard
                </Link>
            </li>
            <li>
                <Link to="/clients">
                    <FaUsers /> Clienti
                </Link>
            </li>
            <li>
                <Link to="/services">
                    <FaServicestack /> Servizi
                </Link>
            </li>
            <li>
                <Link to="/success-stories-view">
                    <FaStar /> Success Stories
                </Link>
            </li>
            <li>
                <Link to="/business-units">
                    <FaBuilding /> Business Units
                </Link>
            </li>
        </ul>
    </nav>
);

export default App;
