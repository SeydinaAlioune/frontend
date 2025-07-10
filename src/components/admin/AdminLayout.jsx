import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import './AdminLayout.css';
import { 
    FaTachometerAlt, 
    FaUsersCog, 
    FaPlug, 
    FaBook, 
    FaWrench, 
    FaSignOutAlt, 
    FaBars, 
    FaTimes 
} from 'react-icons/fa';

const AdminLayout = () => {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('authToken'); // Assurez-vous que la clé est correcte
        navigate('/login');
    };

    const toggleSidebar = () => {
        setIsSidebarCollapsed(!isSidebarCollapsed);
    };

    const navItems = [
        {
            path: '/admin/dashboard',
            icon: <FaTachometerAlt />,
            name: 'Tableau de bord'
        },
        {
            path: '/admin/dashboard/roles',
            icon: <FaUsersCog />,
            name: 'Utilisateurs & Rôles'
        },
        {
            path: '/admin/dashboard/glpi',
            icon: <FaPlug />,
            name: 'Connexion GLPI'
        },
        {
            path: '/admin/dashboard/knowledge',
            icon: <FaBook />,
            name: 'Base de connaissances'
        },
        {
            path: '/admin/dashboard/middleware',
            icon: <FaWrench />,
            name: 'Middleware'
        }
    ];

    return (
        <div className={`admin-layout ${isSidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
            <aside className="sidebar">
                <div className="sidebar-header">
                    {!isSidebarCollapsed && <img src="/logo.jpg" alt="Logo Crédit Mutuel" className="sidebar-logo" />}
                    <button onClick={toggleSidebar} className="sidebar-toggle">
                        {isSidebarCollapsed ? <FaBars /> : <FaTimes />}
                    </button>
                </div>
                <nav className="sidebar-nav">
                    {navItems.map(item => (
                        <NavLink key={item.name} to={item.path} className="nav-item" end>
                            <span className="nav-icon">{item.icon}</span>
                            {!isSidebarCollapsed && <span className="nav-text">{item.name}</span>}
                        </NavLink>
                    ))}
                </nav>
                <div className="sidebar-footer">
                    <button onClick={handleLogout} className="logout-button">
                        <span className="nav-icon"><FaSignOutAlt /></span>
                        {!isSidebarCollapsed && <span className="nav-text">Déconnexion</span>}
                    </button>
                </div>
            </aside>
            <main className="main-content">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;
