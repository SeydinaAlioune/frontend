import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaSave } from 'react-icons/fa';
import './AdminPage.css'; // Shared styles

const GlpiConfig = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        GLPI_API_URL: '',
        GLPI_APP_TOKEN: '',
        GLPI_USER_TOKEN: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        const fetchConfig = async () => {
            try {
                const token = localStorage.getItem('authToken');
                const response = await fetch('http://localhost:8000/config/glpi', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                if (!response.ok) throw new Error('Erreur lors de la récupération de la configuration.');
                
                const data = await response.json();
                // We only get the URL back for security, which is correct.
                setFormData(prev => ({ ...prev, GLPI_API_URL: data.GLPI_API_URL }));
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchConfig();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        try {
            const token = localStorage.getItem('authToken');
            const response = await fetch('http://localhost:8000/config/glpi', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.detail || 'Erreur lors de la mise à jour.');
            }

            setSuccess('Configuration mise à jour avec succès !');
            // Clear both token fields for security after successful submission
            setFormData(prev => ({ ...prev, GLPI_APP_TOKEN: '', GLPI_USER_TOKEN: '' }));

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading && !formData.GLPI_API_URL) {
        return <div className="admin-page-container"><p>Chargement...</p></div>;
    }

    return (
        <div className="admin-page-container">
            <header className="admin-page-header">
                <button onClick={() => navigate('/admin/dashboard')} className="back-button">
                    <FaArrowLeft />
                </button>
                <h1>Configuration de la Connexion GLPI</h1>
                <div style={{width: '40px'}}></div> {/* Spacer */}
            </header>
            <main className="admin-content-panel">
                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">{success}</p>}
                <form onSubmit={handleSubmit} className="glpi-config-form">
                    <div className="form-group">
                        <label htmlFor="glpi-url">URL de l'API GLPI</label>
                        <input 
                            type="text" 
                            id="glpi-url" 
                            name="GLPI_API_URL"
                            value={formData.GLPI_API_URL}
                            onChange={handleChange}
                            placeholder="https://votre-glpi.com/apirest.php" 
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="app-token">Token d'application</label>
                        <input 
                            type="password" 
                            id="app-token" 
                            name="GLPI_APP_TOKEN"
                            value={formData.GLPI_APP_TOKEN}
                            onChange={handleChange}
                            placeholder="Laisser vide pour ne pas changer" 
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="user-token">Token Utilisateur</label>
                        <input 
                            type="password" 
                            id="user-token" 
                            name="GLPI_USER_TOKEN"
                            value={formData.GLPI_USER_TOKEN}
                            onChange={handleChange}
                            placeholder="Laisser vide pour ne pas changer" 
                        />
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

export default GlpiConfig;
