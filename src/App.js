// src/App.js
import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import AppRoutes from './components/AppRoutes'; // Assicurati di avere AppRoutes configurato
import './App.css';

const App = () => {
    return (
        <Router>
            <div>
                <header>
                    <h1>Gestione Aziendale</h1>
                    <nav>
                        <ul>
                            <li><Link to="/">Dashboard</Link></li>
                            <li><Link to="/clients">Clienti</Link></li>
                            <li><Link to="/services">Servizi</Link></li>
                            <li><Link to="/success-stories">Success Stories</Link></li>
                            <li><Link to="/business-units">Business Units</Link></li> {/* Aggiungi il link per Business Units */}
                        </ul>
                    </nav>
                </header>
                <main>
                    <AppRoutes />
                    {/* Rimosso ClientProjects e BusinessUnits */}
                </main>
                <footer>
                    <p>© 2024 VarGroup</p>
                </footer>
            </div>
        </Router>
    );
};

export default App;
