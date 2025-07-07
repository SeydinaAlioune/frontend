import React from 'react';
import './LoginPage.css';
import { FaUser, FaLock } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Logique de connexion à implémenter
    navigate('/dashboard');
  };

  return (
    <div className="login-page-container">
      <div className="login-form-container">
        <div className="login-header">
          <div className="login-logo-container">
            <svg
              className="login-logo-icon"
              viewBox="0 0 100 80"
              xmlns="http://www.w3.org/2000/svg"
              fill="#c8102e"
            >
              <path d="M 50,5 L 58,18 L 42,18 Z" />
              <path d="M 38,22 L 62,22 L 68,35 L 32,35 Z" />
              <path d="M 28,39 L 72,39 L 78,52 L 22,52 Z" />
              <path d="M 18,56 L 82,56 L 88,69 L 12,69 Z" />
            </svg>
            <div className="login-logo-text">
              <span className="logo-text-main">CRÉDIT MUTUEL</span>
              <span className="logo-text-sub">DU SÉNÉGAL</span>
            </div>
          </div>
          <h2>Connexion</h2>
        </div>
        <form className="login-form" onSubmit={handleLogin}>
          <div className="input-group">
            <label htmlFor="email">Identifiant / Email</label>
            <div className="input-with-icon">
              <FaUser className="input-icon" />
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
          <div className="options-group">
            <div className="remember-me">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Se souvenir de moi</label>
            </div>
            <Link to="/mot-de-passe-oublie" className="forgot-password">Mot de passe oublié ?</Link>
          </div>
          <button type="submit" className="login-button">Se connecter</button>
        </form>
        <div className="signup-link">
          <p>Vous n'avez pas de compte? <a href="#" onClick={() => navigate('/inscription')}>Créer un compte</a></p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
