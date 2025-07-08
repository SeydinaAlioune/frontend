import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';
import { FaUsersCog, FaPlug, FaBook, FaWrench, FaSignOutAlt } from 'react-icons/fa';

const AdminDashboard = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const features = [
        {
            title: 'Gestion des Rôles et des Accès',
            description: 'C\'est la fonction la plus importante. L\'administrateur doit pouvoir créer de nouveaux utilisateurs (agents, autres admins), modifier leurs informations, et surtout leur assigner un rôle (Admin ou Agent). Cela contrôle',
            icon: <FaUsersCog />,
            path: '/admin/dashboard/roles'
        },
        {
            title: 'Configuration de la Connexion GLPI',
            description: 'L\'administrateur a besoin d\'un formulaire simple pour entrer les informations de connexion à votre système GLPI (comme l\'URL de l\'API, un token d\'application, etc.).',
            icon: <FaPlug />,
            path: '/admin/dashboard/glpi'
        },
        {
            title: 'Paramétrage de la Base de Connaissances de l\'IA',
            description: 'C\'est le cerveau du chatbot. L\'administrateur doit avoir une interface pour \'entraîner\' l\'IA. Cela peut prendre la forme d\'un outil pour téléverser des documents (PDFs, FAQs).',
            icon: <FaBook />,
            path: '/admin/dashboard/knowledge'
        },
        {
            title: 'Configuration du Middleware',
            description: 'Un panneau de configuration plus général pour les paramètres techniques du système qui ne rentrent pas dans les autres catégories.',
            icon: <FaWrench />,
            path: '/admin/dashboard/middleware'
        }
    ];

    return (
        <div className="admin-dashboard-container">
            <header className="admin-dashboard-header">
                <h1 className="admin-dashboard-title">TABLEAU DE BORD ADMIN</h1>
                <button onClick={handleLogout} className="logout-button">Se déconnecter</button>
            </header>
            <main className="admin-features-grid">
                {features.map((feature, index) => (
                    <div key={index} className="feature-card" onClick={() => navigate(feature.path)}>
                        <div className="feature-card-content">
                            <h2>{feature.title}</h2>
                            <p>{feature.description}</p>
                        </div>
                        <div className="feature-card-icon">
                            {feature.icon}
                        </div>
                    </div>
                ))}
            </main>
        </div>
    );
};

export default AdminDashboard;

