import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();

  

  const handleStartDiscussion = () => {
    navigate('/login');
  };
  return (
    <div className="landing-container">
      <div className="header-logo">
        <div className="logo-line-1">Crédit Mutuel</div>
        <div className="logo-line-2">DU SENEGAL</div>
      </div>

      <div className="landing-content">
        <div className="chatbot-icon"></div>
        <h1>Bienvenue sur notre chatbot</h1>
        <h2>Crédit Mutuel du Sénégal</h2>
        <p>Posez vos questions bancaires 24h/24</p>
      </div>

      <div className="bottom-wave-container">
        {/* These divs will be styled in CSS to create the layered wave effect */}
        <div className="wave wave-blue"></div>
        <div className="wave wave-white"></div>
        <div className="wave wave-red"></div>
        <button className="start-button" onClick={handleStartDiscussion}>Démarrer la discussion</button>
      </div>
    </div>
  );
};

export default LandingPage;
