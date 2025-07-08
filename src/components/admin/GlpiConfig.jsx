import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaSave } from 'react-icons/fa';
import './AdminPage.css'; // Shared styles

const GlpiConfig = () => {
    const navigate = useNavigate();

    return (
        <div className="admin-page-container">
            <header className="admin-page-header">
                <button onClick={() => navigate('/admin/dashboard')} className="back-button">
                    <FaArrowLeft />
                </button>
                <h1>Configuration de la Connexion GLPI</h1>
                <div style={{width: '40px'}}></div> {/* Spacer to balance the header */}
            </header>
            <main className="admin-content-panel">
                <form onSubmit={(e) => e.preventDefault()} className="glpi-config-form">
                    <div className="form-group">
                        <label htmlFor="glpi-url">URL de l'API GLPI</label>
                        <input type="text" id="glpi-url" placeholder="https://votre-glpi.com/apirest.php" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="app-token">Token d'application</label>
                        <input type="password" id="app-token" placeholder="********************" />
                    </div>
                    <div className="form-actions">
                        <button type="submit" className="save-btn"><FaSave /> Sauvegarder</button>
                    </div>
                </form>
            </main>
        </div>
    );
};

export default GlpiConfig;
