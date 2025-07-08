import React, { useState } from 'react';
import './LoginPage.css';
import { FaUser, FaLock } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Helper function to decode JWT
  const decodeToken = (token) => {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      console.error('Failed to decode token:', e);
      return null;
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    const params = new URLSearchParams();
    params.append('username', email);
    params.append('password', password);

    try {
      const response = await axios.post('http://127.0.0.1:8000/login', params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });

      const { access_token } = response.data;
      localStorage.setItem('authToken', access_token);

      const userData = decodeToken(access_token);

      if (userData && userData.role) {
        switch (userData.role) {
          case 'admin':
            navigate('/admin/dashboard');
            break;
          case 'agent support':
            navigate('/agent/dashboard');
            break;
          case 'client':
            navigate('/chat');
            break;
          default:
            navigate('/dashboard'); // Fallback
            break;
        }
      } else {
        setError('Rôle non trouvé dans le token.');
      }

    } catch (err) {
      if (err.response && err.response.data && err.response.data.detail) {
        setError(err.response.data.detail);
      } else {
        setError('Une erreur est survenue. Veuillez réessayer.');
      }
    }
  };

  return (
    <div className="login-page-container">
      <div className="login-form-container">
        {error && <div className="error-message">{error}</div>}
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
              <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
          </div>
          <div className="input-group">
            <label htmlFor="password">Mot de passe</label>
            <div className="input-with-icon">
              <FaLock className="input-icon" />
              <input type="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} required />
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
