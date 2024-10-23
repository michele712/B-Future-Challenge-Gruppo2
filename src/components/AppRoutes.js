// src/components/AppRoutes.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ClientList from './ClientList';
import ServiceList from './ServiceList'; // Assicurati di importare gli altri componenti
import ClientProjects from './ClientProjects'; // Importa ClientProjects
import BusinessUnits from './BusinessUnits'; // Importa BusinessUnits
import SuccessStories from './SuccessStories'; // Importa SuccessStories    
import Dashboard from './Dashboard';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/clients" element={<ClientList />} />
            <Route path="/services" element={<ServiceList />} />
             <Route path="/success-stories-view" element={<SuccessStories />} />
            {/* Aggiungi qui la route per ClientProjects */}
            <Route path="/clients/:clientId/projects" element={<ClientProjects />} />
            {/* Aggiungi qui la route per Business Units */}
            <Route path="/business-units" element={<BusinessUnits />} /> {/* Route per Business Units */}
        </Routes>
    );
};

export default AppRoutes;
