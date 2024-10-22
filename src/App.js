// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Companies from './components/Companies';
import CompanyDetails from './components/CompanyDetails';
import Navbar from './components/Navbar'; // Assicurati di avere il Navbar se necessario

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar /> {/* Includi il componente Navbar */}
        <h1>My FastAPI and React App</h1>
        <Routes>
          <Route path="/" element={<Companies />} />
          <Route path="/companies/:id" element={<CompanyDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
