import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import './AgentDashboard.css';
import { FaComments, FaChartBar, FaSignOutAlt } from 'react-icons/fa';

const AgentLayout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        navigate('/login');
    };

    return (
        <div className="agent-layout">
            <header className="agent-header">
                <div className="logo-container">
                    <img src="/logo.jpg" alt="Crédit Mutuel du Sénégal" className="logo-img" />
                    <span className="header-title">Tableau de Bord Agent</span>
                </div>
                <button onClick={handleLogout} className="logout-button">
                    <FaSignOutAlt />
                    <span>Se déconnecter</span>
                </button>
            </header>
            <div className="agent-body">
                <aside className="agent-sidebar">
                    <nav>
                        <NavLink to="/agent/dashboard" end className={({ isActive }) => isActive ? 'active-link' : ''}>
                            <FaComments />
                            <span>Conversations</span>
                        </NavLink>
                        <NavLink to="/agent/dashboard/analytics" className={({ isActive }) => isActive ? 'active-link' : ''}>
                            <FaChartBar />
                            <span>Analyse IA</span>
                        </NavLink>
                    </nav>
                </aside>
                <main className="agent-main-content">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AgentLayout;
