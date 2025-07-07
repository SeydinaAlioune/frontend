import React from 'react';
import { useNavigate } from 'react-router-dom';
import './RegistrationPage.css';
import { FaUser, FaLock, FaEnvelope } from 'react-icons/fa';

const RegistrationPage = () => {
  const navigate = useNavigate();

  return (
    <div className="registration-page-container">
      <div className="registration-form-container">
        <div className="registration-header">
          <div className="registration-logo-container">
            <svg
              className="registration-logo-icon"
              viewBox="0 0 100 80"
              xmlns="http://www.w3.org/2000/svg"
              fill="#c8102e"
            >
              <path d="M 50,5 L 58,18 L 42,18 Z" />
              <path d="M 38,22 L 62,22 L 68,35 L 32,35 Z" />
              <path d="M 28,39 L 72,39 L 78,52 L 22,52 Z" />
              <path d="M 18,56 L 82,56 L 88,69 L 12,69 Z" />
            </svg>
            <div className="registration-logo-text">
              <span className="logo-text-main">CRÉDIT MUTUEL</span>
              <span className="logo-text-sub">DU SÉNÉGAL</span>
            </div>
          </div>
          <h2>Créer un compte</h2>
        </div>
        <form className="registration-form">
          <div className="input-group">
            <label htmlFor="fullName">Nom complet</label>
            <div className="input-with-icon">
              <FaUser className="input-icon" />
              <input type="text" id="fullName" defaultValue="Seydina Alioune Diao" className="input-active" />
            </div>
          </div>
          <div className="input-group">
            <label htmlFor="email">Identifiant / Email</label>
            <div className="input-with-icon">
              <FaEnvelope className="input-icon" />
              <input type="email" id="email" defaultValue="diaoseydina62@gmail.com" />
            </div>
          </div>
          <div className="input-group">
            <label htmlFor="password">Mot de passe</label>
            <div className="input-with-icon">
              <FaLock className="input-icon" />
              <input type="password" id="password" defaultValue="************" />
            </div>
          </div>
          <div className="input-group">
            <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
            <div className="input-with-icon">
              <FaLock className="input-icon" />
              <input type="password" id="confirmPassword" defaultValue="************" />
            </div>
          </div>
          <button type="submit" className="registration-button">Créer le compte</button>
        </form>
        <div className="signin-link">
          <p>Vous avez déjà un compte ? <a href="#" onClick={() => navigate('/connexion')}>Se connecter</a></p>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
