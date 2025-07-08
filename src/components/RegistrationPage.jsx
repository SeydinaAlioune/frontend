import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './RegistrationPage.css';
import { FaUser, FaLock, FaEnvelope } from 'react-icons/fa';

const RegistrationPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('client'); // Default role
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await axios.post('http://127.0.0.1:8000/auth/register', {
        name,
        email,
        password,
        role
      });

      setSuccess('Inscription réussie ! Votre compte est en attente de validation par un administrateur.');
      // Optionnel: rediriger après quelques secondes
      // setTimeout(() => navigate('/login'), 5000);

    } catch (err) {
      if (err.response && err.response.data && err.response.data.detail) {
        setError(err.response.data.detail);
      } else {
        setError('Une erreur est survenue lors de l\'inscription.');
      }
    }
  };

  return (
    <div className="registration-page-container">
      <div className="registration-form-container">
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
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
        <form onSubmit={handleRegister} className="registration-form">
          <div className="input-group">
            <label htmlFor="fullName">Nom complet</label>
            <div className="input-with-icon">
              <FaUser className="input-icon" />
              <input type="text" placeholder="Nom complet" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
          </div>
          <div className="input-group">
            <label htmlFor="email">Identifiant / Email</label>
            <div className="input-with-icon">
              <FaEnvelope className="input-icon" />
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
          <div className="input-group">
            <label htmlFor="role">Vous êtes</label>
            <div className="input-with-icon">
              <select id="role" value={role} onChange={(e) => setRole(e.target.value)} required>
                <option value="client">Client</option>
                <option value="agent support">Agent de Support</option>
              </select>
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
