import React, { useState } from 'react';
import './ChatInterface.css';
import { FaFilter, FaUserCircle } from 'react-icons/fa';

const ChatInterface = () => {
    const [conversations, setConversations] = useState([
        { id: 1, name: 'Joanna Guver', lastMessage: 'Gusave', time: '5 h', avatar: 'M' },
        { id: 2, name: 'Marie Dupont', lastMessage: 'Resolu', time: '10 h', avatar: 'A' },
        { id: 3, name: 'Julien Cartes', lastMessage: 'T\'aire ute', time: '5 h', avatar: 'B' },
        { id: 4, name: 'John Hehen', lastMessage: 'Heten', time: '14 h', avatar: 'C' },
        { id: 5, name: 'Oilen Honac', lastMessage: 'Amica', time: '12 h', avatar: 'G' },
        { id: 6, name: 'Juien Ohing', lastMessage: 'Castillac', time: '8 h', avatar: 'J' },
        { id: 7, name: 'Eric Lucuen', lastMessage: 'Emma', time: '3 h', avatar: 'A' },
    ]);

    const [activeConversationId, setActiveConversationId] = useState(2);

    const selectedConversation = conversations.find(c => c.id === activeConversationId);

    const messages = {
        1: [],
        2: [
            { from: 'user', text: 'Bonjour, j\'ai besoin d\'aide concernant mon compte', time: '10:45' },
            { from: 'agent', text: 'Bonjour, en quoi puis-je vous aider?', time: '10:47' },
        ],
        3: [], 4: [], 5: [], 6: [], 7: []
    };

    return (
        <div className="chat-interface-container">
            <section className="conversations-list">
                <div className="list-header">
                    <h2>Conversations</h2>
                    <FaFilter className="filter-icon" />
                </div>
                <div className="conversations-scroll">
                    {conversations.map(convo => (
                        <div 
                            key={convo.id} 
                            className={`conversation-item ${selectedConversation && selectedConversation.id === convo.id ? 'selected' : ''}`}
                            onClick={() => setActiveConversationId(convo.id)}
                        >
                            <div className={`avatar avatar-${convo.avatar}`}>{convo.avatar}</div>
                            <div className="convo-details">
                                <div className="convo-header">
                                    <span className="name">{convo.name}</span>
                                    <span className="time">{convo.time}</span>
                                </div>
                                <p className="last-message">{convo.lastMessage}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
            <main className="chat-view-wrapper">
                <div className="chat-view">
                    {selectedConversation ? (
                        <>
                            <div className="chat-header">
                                <h3>{selectedConversation.name}</h3>
                                <div className="chat-actions">
                                    <select className="mark-as-select">
                                        <option>Marquer comme</option>
                                        <option>Résolu</option>
                                        <option>En attente</option>
                                    </select>
                                </div>
                            </div>
                            <div className="messages-area">
                                {(messages[selectedConversation.id] || []).map((msg, index) => (
                                    <div key={index} className={`message-wrapper ${msg.from}`}>
                                        {msg.from === 'user' && <FaUserCircle className="message-avatar" />}
                                        <div className="message-bubble">
                                            <p>{msg.text}</p>
                                            <span className="time">{msg.time}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="reply-area">
                                <div className="reply-options">
                                    <select className="action-select">
                                        <option>Sélectionnez</option>
                                        <option>Réponse rapide</option>
                                    </select>
                                </div>
                                <div className="reply-input-wrapper">
                                    <textarea placeholder="Écrire un message..."></textarea>
                                    <button className="send-button">Envoyer</button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="no-conversation-selected">
                            <p>Sélectionnez une conversation pour commencer</p>
                        </div>
                    )}
                </div>
                <footer className="chat-footer">
                    © 2025 Crédit Mutuel du Sénégal
                </footer>
            </main>
        </div>
    );
};

export default ChatInterface;
