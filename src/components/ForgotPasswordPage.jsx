import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MdAlternateEmail } from 'react-icons/md';
import './ForgotPasswordPage.css';

const ForgotPasswordPage = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/verification-code');
  };

  return (
    <div className="forgot-password-page-container">
      <div className="forgot-password-form-container">
        <div className="forgot-password-header">
          <div className="forgot-password-logo-container">
             <svg className="forgot-password-logo-icon" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm0 36c-8.82 0-16-7.18-16-16S15.18 8 24 8s16 7.18 16 16-7.18 16-16 16z" fill="#c8102e"/>
                <path d="M24 12l-8 8h6v12h4V20h6l-8-8z" fill="#c8102e"/>
            </svg>
            <div className="forgot-password-logo-text">
              <span className="logo-text-main">CRÉDIT MUTUEL</span>
              <span className="logo-text-sub">DU SÉNÉGAL</span>
            </div>
          </div>
          <h2>Mot de passe oublié</h2>
          <p className="subtitle">Entrez votre email pour recevoir un code de réinitialisation.</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Identifiant / Email</label>
            <div className="input-with-icon">
              <MdAlternateEmail className="input-icon" />
              <input type="email" id="email" placeholder="votre.email@exemple.com" required />
            </div>
          </div>
          <button type="submit" className="forgot-password-button">Envoyer le code</button>
        </form>
        <div className="back-link">
          <Link to="/connexion">Retour à la connexion</Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
