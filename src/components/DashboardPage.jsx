import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './DashboardPage.css';
import { FaPrint, FaLock, FaCreditCard, FaBoxOpen, FaArrowRight } from 'react-icons/fa';
import { jwtDecode } from 'jwt-decode';

const DashboardPage = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUserName(decodedToken.name || 'Utilisateur');
      } catch (error) {
        console.error('Failed to decode token:', error);
      }
    }
  }, []);

  const faqs = [
    {
      icon: <FaPrint />,
      title: 'Problème d\'impression',
      subtitle: 'Résoudre les problèmes d\'imprimante',
    },
    {
      icon: <FaLock />,
      title: 'Accès à mon compte',
      subtitle: 'Problèmes de connexion',
    },
    {
      icon: <FaCreditCard />,
      title: 'Paiement non pris en compte',
      subtitle: 'Problèmes de transaction',
    },
    {
      icon: <FaBoxOpen />,
      title: 'Suivi de commande',
      subtitle: 'Localiser ma commande',
    },
  ];


  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="dashboard-logo-container">
            <img src="/logo.jpg" alt="Logo Crédit Mutuel" className="dashboard-logo-icon" />
            <div className="dashboard-logo-text">
                <span className="logo-text-main">CRÉDIT MUTUEL DU SÉNÉGAL</span>
            </div>
        </div>
      </header>

      <main className="dashboard-main-content">
        <div className="welcome-message">
          <h1>
            Bonjour, <span className="user-name">{userName}</span> 👋 Comment puis-je vous aider aujourd'hui ?
          </h1>
        </div>

        <div className="action-bar" onClick={() => navigate('/client/chat')}>
          <input type="text" placeholder="Sur quoi travaillez-vous ?" />
          <FaArrowRight className="action-arrow" />
        </div>

        <section className="faq-section">
          <h2>Questions fréquentes</h2>
          <div className="faq-grid">
            {faqs.map((faq, index) => (
              <div key={index} className="faq-card">
                <div className="faq-icon">{faq.icon}</div>
                <div className="faq-text">
                  <h3>{faq.title}</h3>
                  <p>{faq.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="dashboard-footer">
        <p>© 2025 Service de Support - Centre d'aide</p>
      </footer>
    </div>
  );
};

export default DashboardPage;
