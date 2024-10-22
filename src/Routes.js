// src/Routes.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Companies from './components/Companies';
import CompanyDetails from './components/CompanyDetails';
import Navbar from './components/Navbar';

const AppRoutes = () => {
  return (
    <Router>
      <Navbar /> {/* Aggiungi la Navbar qui */}
      <Routes>
        <Route path="/" element={<Companies />} />
        <Route path="/companies/:id" element={<CompanyDetails />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
