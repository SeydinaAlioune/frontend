import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RiLockPasswordLine } from 'react-icons/ri';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import './ResetPasswordPage.css';

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/connexion');
  };

  return (
    <div className="reset-password-page-container">
      <div className="reset-password-form-container">
        <div className="reset-password-header">
          <div className="reset-password-logo-container">
            <svg className="reset-password-logo-icon" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm0 36c-8.82 0-16-7.18-16-16S15.18 8 24 8s16 7.18 16 16-7.18 16-16 16z" fill="#c8102e"/>
                <path d="M24 12l-8 8h6v12h4V20h6l-8-8z" fill="#c8102e"/>
            </svg>
            <div className="reset-password-logo-text">
              <span className="logo-text-main">CRÉDIT MUTUEL</span>
              <span className="logo-text-sub">DU SÉNÉGAL</span>
            </div>
          </div>
          <h2>Réinitialiser le mot de passe</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="new-password">Nouveau mot de passe</label>
            <div className="input-with-icon">
              <RiLockPasswordLine className="input-icon" />
              <input type={showPassword ? 'text' : 'password'} id="new-password" required />
              <div className="password-toggle-icon" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </div>
            </div>
          </div>
          <div className="input-group">
            <label htmlFor="confirm-password">Confirmer le nouveau mot de passe</label>
            <div className="input-with-icon">
              <RiLockPasswordLine className="input-icon" />
              <input type={showConfirmPassword ? 'text' : 'password'} id="confirm-password" required />
               <div className="password-toggle-icon" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                {showConfirmPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </div>
            </div>
          </div>
          <button type="submit" className="reset-password-button">Réinitialiser le mot de passe</button>
        </form>
        <div className="back-link">
          <Link to="/connexion">Retour à la connexion</Link>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
