import React, { useState } from 'react';
import './LoginPage.css';
import { FaUser, FaLock } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');



  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    const params = new URLSearchParams();
    params.append('username', email);
    params.append('password', password);

    try {
      const response = await axios.post('http://localhost:8000/auth/login', params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });

      const { access_token } = response.data;
      localStorage.setItem('authToken', access_token);

      // Decode token to get user role
      const decodedToken = jwtDecode(access_token);
      const userRole = decodedToken.role; // Assumes the role is in a 'role' claim

      // Redirect based on role
      switch (userRole) {
        case 'admin':
          navigate('/admin/dashboard');
          window.location.reload();
          break;
        case 'agent_support':
        case 'agent_interne':
          navigate('/agent/dashboard');
          window.location.reload();
          break;
        case 'client':
          navigate('/dashboard');
          window.location.reload();
          break;
        default:
          // Fallback for unknown roles or if role is not in token
          setError('Rôle non reconnu. Impossible de vous connecter.');
          localStorage.removeItem('authToken'); // Clear invalid token
          break;
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
            <img src="/logo.jpg" alt="Logo Crédit Mutuel" className="login-logo-icon" />
            <div className="login-logo-text">
              <span className="logo-text-main">CRÉDIT MUTUEL DU SÉNÉGAL</span>
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
