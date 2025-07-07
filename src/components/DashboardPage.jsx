import React from 'react';
import { useNavigate } from 'react-router-dom';
import './DashboardPage.css';
import { FaPrint, FaLock, FaCreditCard, FaBoxOpen, FaArrowRight } from 'react-icons/fa';

const DashboardPage = () => {
  const navigate = useNavigate();

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
            <svg className="dashboard-logo-icon" viewBox="0 0 100 80" xmlns="http://www.w3.org/2000/svg" fill="#c8102e">
                <path d="M 50,5 L 58,18 L 42,18 Z" />
                <path d="M 38,22 L 62,22 L 68,35 L 32,35 Z" />
                <path d="M 28,39 L 72,39 L 78,52 L 22,52 Z" />
                <path d="M 18,56 L 82,56 L 88,69 L 12,69 Z" />
            </svg>
            <div className="dashboard-logo-text">
                <span className="logo-text-main">CRÉDIT MUTUEL</span>
                <span className="logo-text-sub">DU SÉNÉGAL</span>
            </div>
        </div>
      </header>

      <main className="dashboard-main-content">
        <div className="welcome-message">
          <h1>
            Bonjour, <span className="user-name">Marie Dupont</span> 👋 Comment puis-je vous aider aujourd'hui ?
          </h1>
        </div>

        <div className="action-bar" onClick={() => navigate('/chat')}>
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
