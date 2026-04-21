import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/header.css';

const Header = () => {
  const navigate = useNavigate();

  return (
    <nav className="navbar-custom">
      <div className="logo" onClick={() => navigate('/employees')}>
        EMS
      </div>

      <div className="nav-links">
        <button onClick={() => navigate('/employees')}>Employees</button>
        <button onClick={() => navigate('/dashboard')}>Dashboard</button>
      </div>
    </nav>
  );
};

export default Header;