import React from 'react'
import BookChart from './Dashboard/BookChart.jsx'
import Sidebar from './Sidebar.jsx'
import Header from '../Main Page/Header/Header.jsx';
import DashboardCards from './Card.jsx';
import './Admin.css'
const Admin = () => {
        return (
          <div className="admin-dashboard">
            <Header />
            <div className="sidebarfixed">
              <Sidebar />
            </div>
            
            {/* Render other dashboard components here */}
            <div className="dashboard-content">
              <DashboardCards/>
              <BookChart/>
              {/* Add your dashboard components here */}
            </div>
            
          </div>
        );
      };

export default Admin
