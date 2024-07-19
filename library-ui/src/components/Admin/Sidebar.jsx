import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="logo">
          <i className="fas fa-chart-line"></i>
          <span 
            style={
              {
                fontSize: '30px',
                marginLeft: '-4vw',
              }
            
            }>Admin</span>
        </div>
      </div>
      <div className="sidebar-nav">
        <ul>
          <li className={location.pathname === '/admin' ? 'active' : ''}>
            <Link to="/admin">
              <i className="fas fa-tachometer-alt"></i>
              <span >Dashboard</span>
            </Link>
          </li>
          <li className={location.pathname === '/admin/user-management' ? 'active' : ''}>
            <Link to="/admin/user-management">
              <i className="fas fa-users"></i>
              <span>User Management</span>
            </Link>
          </li>
          <li className={location.pathname === '/admin/book' ? 'active' : ''}>
            <Link to="/admin/book">
              <i className="fas fa-book"></i>
              <span>Book Management</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;

