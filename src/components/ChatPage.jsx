import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import './ChatPage.css';
import { FaPrint, FaCreditCard, FaChevronDown, FaChevronRight } from 'react-icons/fa';

const ChatPage = () => {
  const navigate = useNavigate();
  const [isUserMenuOpen, setUserMenuOpen] = useState(false);
  const [userName, setUserName] = useState('');
  const [inputValue, setInputValue] = useState(''); // Ajout pour la barre de chat
  const [tickets, setTickets] = useState([]);
  const [loadingTickets, setLoadingTickets] = useState(true);
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [messages, setMessages] = useState([]); // Pour stocker les messages de la conversation active
  const [activeTicketId, setActiveTicketId] = useState(null); // Pour savoir quel ticket est ouvert

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUserName(decodedToken.name || 'Utilisateur');
      } catch (error) {
        console.error("Failed to decode token", error);
        setUserName('Utilisateur');
      }
    }

    const fetchTickets = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        setLoadingTickets(false);
        return;
      }
      try {
        const response = await fetch('http://localhost:8000/api/glpi/tickets', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch tickets');
        }
        const data = await response.json();
        setTickets(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingTickets(false);
      }
    };

    fetchTickets();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  const handleTicketClick = async (ticket) => {
    if (activeTicketId === ticket.id) return; // Ne recharge pas si déjà actif

    setActiveTicketId(ticket.id);
    setMessages([{ sender: 'bot', text: 'Chargement de la conversation...' }]);

    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`http://localhost:8000/api/glpi/tickets/${ticket.id}/followups`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch ticket follow-ups');
      }

      const followups = await response.json();

      // Nettoyer le contenu original du ticket pour enlever l'email
      const emailHeader = `Email du demandeur: ${userName}@gmail.com\n\n`; // Adaptez si le format de l'email est différent
      const originalContent = ticket.content.replace(/Email du demandeur:.*\n\n/i, '');

      const conversation = [
        { sender: 'user', text: originalContent },
        ...followups.map(f => ({
          sender: f.users_id === 0 ? 'user' : 'bot', // 0 = demandeur, autre = agent
          text: f.content.replace(/<[^>]*>/g, '') // Nettoie le HTML
        }))
      ];

      setMessages(conversation);

    } catch (error) {
      console.error('Failed to load ticket conversation:', error);
      setMessages([{ sender: 'bot', text: 'Erreur lors du chargement de la conversation.' }]);
    }
  };

  const handleSendMessage = async () => {
    if (inputValue.trim() === '') return;

    const userMessage = { sender: 'user', text: inputValue };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    const question = inputValue;
    setInputValue(''); // Vide l'input après envoi

    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch('http://localhost:8000/api/chatbot/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ question: question, ticket_id: activeTicketId }),
      });

      if (!response.ok) {
        throw new Error('La réponse du serveur n\'était pas OK');
      }

      const data = await response.json();
      // Si un suivi a été ajouté, on rafraîchit la conversation pour voir le nouveau message
      if (data.type === 'followup_added') {
        const botMessage = { sender: 'bot', text: data.message };
        setMessages(prevMessages => [...prevMessages, botMessage]);
        // Optionnel : on pourrait ici re-déclencher `handleTicketClick` pour rafraîchir toute la conversation
      } else {
        const botMessage = { sender: 'bot', text: data.message || data.faq_answer || 'Désolé, je n\'ai pas compris.' };
        setMessages(prevMessages => [...prevMessages, botMessage]);
      }

    } catch (error) {
      console.error("Erreur lors de l'appel au chatbot:", error);
      const errorMessage = { sender: 'bot', text: 'Désolé, une erreur est survenue. Veuillez réessayer.' };
      setMessages(prevMessages => [...prevMessages, errorMessage]);
    }
  };

  return (
    <div className="chat-page-container">
      <header className="chat-header">
        <div className="chat-logo-container">
          <img src="/logo.jpg" alt="Logo Crédit Mutuel" className="chat-logo-icon" />
          <div className="chat-logo-text">
            <span className="logo-text-main">CRÉDIT MUTUEL DU SÉNÉGAL</span>
        
          </div>
        </div>
        <div className="user-info-header">
          <span>Bonjour, <span className="user-name">{userName}</span> 👋 Comment puis-je vous aider ?</span>
        </div>
      </header>

      <div className="chat-main-content">
        <div className="chat-area">
          <div className="chat-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender === 'user' ? 'user-message' : 'bot-message'}`}>
                <p>{msg.text}</p>
              </div>
            ))}
          </div>
          {/* NOUVELLE BARRE DE CHAT INTÉGRÉE */}
          <div className="chat-input-area">
            <div className="chat-input-bar">
              <input
                type="text"
                className="chat-input"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Posez votre question ici !"
              />
              <div className="chat-buttons">
                <button type="button" className="mic-button" aria-label="Utiliser le microphone">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>
                </button>
                <button type="button" className="send-button" aria-label="Envoyer le message" onClick={handleSendMessage}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" /></svg>
                </button>
              </div>
            </div>
          </div>
          <footer className="chat-footer">
            <div className="user-profile-menu">
              <div className="user-avatar-container" onClick={() => setUserMenuOpen(!isUserMenuOpen)}>
                <div className="user-avatar">M</div>
                <div className="user-details">
                  <span className="user-name-footer">{userName} <FaChevronDown className="user-menu-arrow" /></span>
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

        <aside className={`history-sidebar ${isSidebarCollapsed ? 'collapsed' : ''}`}>
          <button 
            className="sidebar-toggle-button"
            onClick={() => setSidebarCollapsed(!isSidebarCollapsed)}
          >
            <FaChevronRight />
          </button>
          <h3>Historique des requêtes</h3>
          <div className="ticket-list">
            {loadingTickets ? (
              <p>Chargement de l'historique...</p>
            ) : tickets.length > 0 ? (
              tickets.map((ticket, index) => (
                <div key={ticket.id} className={`ticket-card ${activeTicketId === ticket.id ? 'active' : ''}`} onClick={() => handleTicketClick(ticket)}>
                  <div className="ticket-icon"><FaPrint /></div>
                  <div className="ticket-details">
                    <h4>{ticket.name}</h4>
                    <p>{ticket.content.substring(0, 40)}...</p>
                  </div>
                  <div className="ticket-status">
                    <span className={`status-badge status-${ticket.status}`}>{ticket.status === 1 ? 'Nouveau' : ticket.status === 2 ? 'En cours' : 'Résolu'}</span>
                    <span className="ticket-timestamp">{new Date(ticket.date).toLocaleDateString()}</span>
                  </div>
                </div>
              ))
            ) : (
              <p>Aucune requête trouvée.</p>
            )}
          </div>
        </aside>
      </div>


    </div>
  );
};

export default ChatPage;
