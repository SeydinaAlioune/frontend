import React from 'react';
import { Link } from 'react-router-dom';
import './AdminWelcome.css';
import { FaUsersCog, FaPlug, FaBook, FaWrench } from 'react-icons/fa';

const AdminWelcome = () => {
    const features = [
        {
            title: 'Gestion des Rôles et des Accès',
            description: 'C\'est la fonction la plus importante. L\'administrateur doit pouvoir créer de nouveaux utilisateurs, modifier leurs informations, et surtout leur assigner un rôle.',
            icon: <FaUsersCog />,
            link: '/admin/dashboard/roles',
        },
        {
            title: 'Configuration de la Connexion GLPI',
            description: 'L\'administrateur a besoin d\'un formulaire simple pour entrer les informations de connexion à votre système GLPI (comme l\'URL ou un token d\'application).',
            icon: <FaPlug />,
            link: '/admin/dashboard/glpi',
        },
        {
            title: 'Base de Connaissances de l\'IA',
            description: 'C\'est le cerveau du chatbot. L\'administrateur doit avoir une interface pour \'entraîner\' l\'IA, par exemple en téléversant des Q/R.',
            icon: <FaBook />,
            link: '/admin/dashboard/knowledge',
        },
        {
            title: 'Configuration du Middleware',
            description: 'Un panneau de configuration plus général pour les paramètres techniques du système qui ne rentrent pas dans les autres catégories.',
            icon: <FaWrench />,
            link: '/admin/dashboard/middleware',
        },
    ];

    return (
        <div className="admin-dashboard-home">
            <h1 className="dashboard-title">Bienvenue sur le tableau de bord admin</h1>
            <div className="features-grid">
                {features.map((feature, index) => (
                    <Link to={feature.link} key={index} className="feature-card">
                        <div className="feature-card-icon">{feature.icon}</div>
                        <div className="feature-card-content">
                            <h3>{feature.title}</h3>
                            <p>{feature.description}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default AdminWelcome;
