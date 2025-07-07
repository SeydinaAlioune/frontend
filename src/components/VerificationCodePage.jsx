import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RiKey2Line } from 'react-icons/ri';
import './VerificationCodePage.css';

const VerificationCodePage = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/reset-password');
  };

  return (
    <div className="verification-code-page-container">
      <div className="verification-code-form-container">
        <div className="verification-code-header">
          <div className="verification-code-logo-container">
            <svg className="verification-code-logo-icon" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm0 36c-8.82 0-16-7.18-16-16S15.18 8 24 8s16 7.18 16 16-7.18 16-16 16z" fill="#c8102e"/>
                <path d="M24 12l-8 8h6v12h4V20h6l-8-8z" fill="#c8102e"/>
            </svg>
            <div className="verification-code-logo-text">
              <span className="logo-text-main">CRÉDIT MUTUEL</span>
              <span className="logo-text-sub">DU SÉNÉGAL</span>
            </div>
          </div>
          <h2>Vérification du code</h2>
          <p className="subtitle">Veuillez saisir le code à 6 chiffres que vous avez reçu par e-mail.</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="verification-code">Code de vérification</label>
            <div className="input-with-icon">
              <RiKey2Line className="input-icon" />
              <input 
                type="text" 
                id="verification-code" 
                className="verification-code-input"
                maxLength="6"
                placeholder="_ _ _ _ _ _"
                required 
              />
            </div>
          </div>
          <button type="submit" className="verification-code-button">Vérifier le code</button>
        </form>
        <div className="resend-code-link">
            Vous n'avez pas reçu de code? <a href="#">Renvoyer le code</a>
        </div>
        <div className="back-link">
          <Link to="/connexion">Retour à la connexion</Link>
        </div>
      </div>
    </div>
  );
};

export default VerificationCodePage;
