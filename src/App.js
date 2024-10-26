// src/App.js
import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import Chatbot from './components/Chatbot';
import AppRoutes from './components/AppRoutes';
import './App.css';

const App = () => {
    return (
        <Router>
            <div>
                <header>
                    <h1>Gestione Aziendale</h1>
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
            <li><Link to="/">Dashboard</Link></li>
            <li><Link to="/clients">Clienti</Link></li>
            <li><Link to="/services">Servizi</Link></li>
            <li><Link to="/success-stories-view">Success Stories</Link></li>
            <li><Link to="/business-units">Business Units</Link></li>
        </ul>
    </nav>
);

export default App;
