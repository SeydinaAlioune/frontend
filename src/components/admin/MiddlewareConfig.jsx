import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaSave } from 'react-icons/fa';
import './AdminPage.css'; // Shared styles
import './MiddlewareConfig.css'; // Specific styles

const MiddlewareConfig = () => {
    const navigate = useNavigate();
    const [config, setConfig] = useState({ log_level: 'INFO', cache_enabled: false });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        const fetchConfig = async () => {
            try {
                const token = localStorage.getItem('authToken');
                const response = await fetch('http://localhost:8000/config/middleware', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (!response.ok) throw new Error('Erreur lors de la récupération de la configuration.');
                const data = await response.json();
                setConfig(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchConfig();
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setConfig(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);
        try {
            const token = localStorage.getItem('authToken');
            const response = await fetch('http://localhost:8000/config/middleware', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(config)
            });
            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.detail || 'Erreur lors de la mise à jour.');
            }
            setSuccess('Configuration mise à jour avec succès. Un redémarrage du serveur peut être nécessaire pour appliquer les changements.');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading && !success) {
        return <div className="admin-page-container"><p>Chargement...</p></div>;
    }

    return (
        <div className="admin-page-container">
            <header className="admin-page-header">
                <button onClick={() => navigate('/admin/dashboard')} className="back-button">
                    <FaArrowLeft />
                </button>
                <h1>Configuration du Middleware</h1>
                <div style={{width: '40px'}}></div> {/* Spacer */}
            </header>
            <main className="admin-content-panel">
                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">{success}</p>}
                 <form onSubmit={handleSubmit} className="middleware-config-form">
                    <div className="form-group">
                        <label htmlFor="log-level">Niveau de journalisation</label>
                        <select id="log-level" name="log_level" value={config.log_level} onChange={handleChange}>
                            <option>DEBUG</option>
                            <option>INFO</option>
                            <option>WARNING</option>
                            <option>ERROR</option>
                        </select>
                    </div>
                     <div className="form-group toggle-group">
                        <label>Activer le cache</label>
                        <label className="switch">
                          <input type="checkbox" name="cache_enabled" checked={config.cache_enabled} onChange={handleChange} />
                          <span className="slider round"></span>
                        </label>
                    </div>
                    <div className="form-actions">
                        <button type="submit" className="save-btn" disabled={loading}>
                            {loading ? 'Sauvegarde...' : <><FaSave /> Sauvegarder</>}
                        </button>
                    </div>
                </form>
            </main>
        </div>
    );
};

export default MiddlewareConfig;
