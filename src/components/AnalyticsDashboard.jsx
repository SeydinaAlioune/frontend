import React, { useState, useEffect } from 'react';
import './AnalyticsDashboard.css';
import { FaLightbulb, FaSyncAlt, FaChartBar, FaTicketAlt, FaClock, FaCheckCircle } from 'react-icons/fa';

const AnalyticsDashboard = () => {
    const [stats, setStats] = useState({ total_tickets: 0, avg_response_time_hours: 0, resolution_rate_percent: 0 });
    const [recurringIssues, setRecurringIssues] = useState([]);
    const [summary, setSummary] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token'); // Récupérer le token
                if (!token) {
                    throw new Error('Token non trouvé. Veuillez vous connecter.');
                }

                const headers = { 'Authorization': `Bearer ${token}` };
                const apiBaseUrl = 'http://localhost:8000/api/analytics';

                // Utiliser Promise.all pour lancer les requêtes en parallèle
                const [statsRes, issuesRes, summaryRes] = await Promise.all([
                    fetch(`${apiBaseUrl}/stats`, { headers }),
                    fetch(`${apiBaseUrl}/recurring-issues`, { headers }),
                    fetch(`${apiBaseUrl}/ticket-summary/1`, { headers }) // Ticket ID 1 pour l'exemple
                ]);

                if (!statsRes.ok || !issuesRes.ok || !summaryRes.ok) {
                    throw new Error('Erreur lors de la récupération des données analytiques.');
                }

                const statsData = await statsRes.json();
                const issuesData = await issuesRes.json();
                const summaryData = await summaryRes.json();

                setStats(statsData);
                setRecurringIssues(issuesData);
                setSummary(summaryData.summary);

            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div className="analytics-dashboard"><p>Chargement des analyses...</p></div>;
    }

    if (error) {
        return <div className="analytics-dashboard"><p className="error-message">Erreur : {error}</p></div>;
    }

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
                    <p>{summary}</p>
                </div>

                {/* Problèmes Récurrents */}
                <div className="analytics-card issues-card">
                    <div className="card-header">
                        <FaSyncAlt className="card-icon" />
                        <h3>Problèmes Récurrents (30 jours)</h3>
                    </div>
                    <ul className="issues-list">
                        {recurringIssues.map(([title, count], index) => (
                            <li key={index}>
                                <span>{title}</span>
                                <span className="issue-count">{count}</span>
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
                            <div className="report-value">{stats.total_tickets}</div>
                            <div className="report-label">Tickets Reçus</div>
                        </div>
                        <div className="report-item">
                            <FaClock className="report-icon" />
                            <div className="report-value">{stats.avg_response_time_hours}h</div>
                            <div className="report-label">Temps de réponse moyen</div>
                        </div>
                        <div className="report-item">
                            <FaCheckCircle className="report-icon" />
                            <div className="report-value">{stats.resolution_rate_percent}%</div>
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
