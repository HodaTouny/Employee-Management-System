import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../../libraries/bootstrap.min.css';
import '../../libraries/navbar.css';

function Navbar() {
  const location = useLocation(); 
  return (
    <nav className="navbar navbar-expand-lg navbar-custom">
      <div className="container-fluid container">
        <span className="navbar-brand brand-title">EmpSystem</span>
        <div className="collapse navbar-collapse justify-content-end">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link
                className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${location.pathname === '/employees' ? 'active' : ''}`}
                to="/employees"
              >
                Employees
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${location.pathname === '/add-employee' ? 'active' : ''}`}
                to="/add-employee"
              >
                Add Employee
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
