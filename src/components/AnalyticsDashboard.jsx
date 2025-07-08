import React from 'react';
import './AnalyticsDashboard.css';
import { FaLightbulb, FaSyncAlt, FaChartBar, FaTicketAlt, FaClock, FaCheckCircle } from 'react-icons/fa';

const AnalyticsDashboard = () => {
    // Données factices
    const recurringIssues = [
        { id: 1, title: 'Problème de connexion au compte', count: 42 },
        { id: 2, title: 'Échec de la transaction par carte', count: 28 },
        { id: 3, title: 'Demande de modification de plafond', count: 15 },
    ];

    return (
        <div className="analytics-dashboard">
            <div className="analytics-header">
                <h2>Analyse Intelligente</h2>
            </div>

            <div className="analytics-grid">
                {/* Résumé Intelligent */}
                <div className="analytics-card summary-card">
                    <div className="card-header">
                        <FaLightbulb className="card-icon" />
                        <h3>Résumé Intelligent (Ticket #785)</h3>
                    </div>
                    <p>
                        Le client rencontre des difficultés pour accéder à son espace personnel. Il a tenté de réinitialiser son mot de passe sans succès et reçoit un message d'erreur générique. Le problème semble lié à la synchronisation du compte.
                    </p>
                </div>

                {/* Problèmes Récurrents */}
                <div className="analytics-card issues-card">
                    <div className="card-header">
                        <FaSyncAlt className="card-icon" />
                        <h3>Problèmes Récurrents (30 jours)</h3>
                    </div>
                    <ul className="issues-list">
                        {recurringIssues.map(issue => (
                            <li key={issue.id}>
                                <span>{issue.title}</span>
                                <span className="issue-count">{issue.count}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Rapports Automatiques */}
                <div className="analytics-card reports-card full-width">
                    <div className="card-header">
                        <FaChartBar className="card-icon" />
                        <h3>Rapports Automatiques</h3>
                    </div>
                    <div className="reports-grid">
                        <div className="report-item">
                            <FaTicketAlt className="report-icon" />
                            <div className="report-value">124</div>
                            <div className="report-label">Tickets Reçus</div>
                        </div>
                        <div className="report-item">
                            <FaClock className="report-icon" />
                            <div className="report-value">2h 15m</div>
                            <div className="report-label">Temps de réponse moyen</div>
                        </div>
                        <div className="report-item">
                            <FaCheckCircle className="report-icon" />
                            <div className="report-value">92%</div>
                            <div className="report-label">Taux de résolution</div>
                        </div>
                    </div>
                </div>
            </div>
            <footer className="chat-footer">
                2025 Crédit Mutuel du Sénégal
            </footer>
        </div>
    );
};

export default AnalyticsDashboard;
