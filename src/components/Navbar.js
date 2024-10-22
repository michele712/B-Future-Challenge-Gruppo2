// src/components/Navbar.js

import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Aggiungi il tuo CSS qui

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/companies">Companies</Link>
        </li>
        <li>
          <Link to="/services">Services</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
