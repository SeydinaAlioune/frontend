import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ChatPage.css';
import { FaPrint, FaCreditCard, FaChevronDown } from 'react-icons/fa';
import { FiMic } from 'react-icons/fi';
import { RiSendPlaneFill } from 'react-icons/ri';

const ChatPage = () => {
  const navigate = useNavigate();
  const [isUserMenuOpen, setUserMenuOpen] = useState(false);

  const handleLogout = () => {
    navigate('/connexion');
  };

  return (
    <div className="chat-page-container">
      <header className="chat-header">
        <div className="chat-logo-container">
          <svg className="chat-logo-icon" viewBox="0 0 100 80" xmlns="http://www.w3.org/2000/svg" fill="#c8102e">
            <path d="M 50,5 L 58,18 L 42,18 Z" />
            <path d="M 38,22 L 62,22 L 68,35 L 32,35 Z" />
            <path d="M 28,39 L 72,39 L 78,52 L 22,52 Z" />
            <path d="M 18,56 L 82,56 L 88,69 L 12,69 Z" />
          </svg>
          <div className="chat-logo-text">
            <span className="logo-text-main">CRÉDIT MUTUEL</span>
            <span className="logo-text-sub">DU SÉNÉGAL</span>
          </div>
        </div>
        <div className="user-info-header">
          <span>Bonjour, <span className="user-name">Marie Dupont</span> 👋 Comment puis-je vous aider ?</span>
        </div>
      </header>

      <div className="chat-main-content">
        <div className="chat-area">
          <div className="chat-messages">
            <div className="message bot-message">
              <p>Bonjour, comment puis-je vous aider concernant votre problème d'imprimante ?</p>
            </div>
            <div className="message user-message">
              <p>Bonjour, j'ai un problème avec mon imprimante qui ne veut plus imprimer. Elle affiche "Erreur papier" mais j'ai vérifié et il n'y a pas de bourrage.</p>
            </div>
          </div>
          <div className="chat-input-area">
            <input type="text" placeholder="Posez votre question ici !" />
            <div className="input-icons-wrapper">
              <FiMic className="input-icon mic-icon" />
              <div className="send-button">
                <RiSendPlaneFill className="input-icon send-icon" />
              </div>
            </div>
          </div>
          <footer className="chat-footer">
            <div className="user-profile-menu">
              <div className="user-avatar-container" onClick={() => setUserMenuOpen(!isUserMenuOpen)}>
                <div className="user-avatar">M</div>
                <div className="user-details">
                  <span className="user-name-footer">Marie Dupont <FaChevronDown className="user-menu-arrow" /></span>
                  <span className="user-status">● En ligne</span>
                </div>
              </div>
              {isUserMenuOpen && (
                <div className="user-menu-popup">
                  <ul>
                    <li>Voir l'état des tickets</li>
                    <li onClick={handleLogout}>Se déconnecter</li>
                  </ul>
                </div>
              )}
            </div>
          </footer>
        </div>

        <aside className="history-sidebar">
          <h3>Historique des requêtes</h3>
          <div className="ticket-list">
            <div className="ticket-card active">
              <div className="ticket-icon"><FaPrint /></div>
              <div className="ticket-details">
                <h4>Problème d'imprimante</h4>
                <p>Mon imprimante n'imprime plus depuis ...</p>
              </div>
              <div className="ticket-status">
                <span className="status-badge in-progress">En cours</span>
                <span className="ticket-timestamp">Aujourd'hui, 10:24</span>
              </div>
            </div>
            <div className="ticket-card">
              <div className="ticket-icon"><FaCreditCard /></div>
              <div className="ticket-details">
                <h4>Paiement refusé</h4>
                <p>Mon paiement a été refusé lors de ma d...</p>
              </div>
              <div className="ticket-status">
                <span className="status-badge resolved">Résolu</span>
                <span className="ticket-timestamp">Hier, 14:05</span>
              </div>
            </div>
          </div>
        </aside>
      </div>


    </div>
  );
};

export default ChatPage;
