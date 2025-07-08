import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaSave } from 'react-icons/fa';
import './AdminPage.css'; // Shared styles
import './MiddlewareConfig.css'; // Specific styles

const MiddlewareConfig = () => {
    const navigate = useNavigate();

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
                 <form onSubmit={(e) => e.preventDefault()} className="middleware-config-form">
                    <div className="form-group">
                        <label htmlFor="log-level">Niveau de journalisation</label>
                        <select id="log-level" defaultValue="INFO">
                            <option>DEBUG</option>
                            <option>INFO</option>
                            <option>WARNING</option>
                            <option>ERROR</option>
                        </select>
                    </div>
                     <div className="form-group toggle-group">
                        <label>Activer le cache</label>
                        <label className="switch">
                          <input type="checkbox" defaultChecked />
                          <span className="slider round"></span>
                        </label>
                    </div>
                    <div className="form-actions">
                        <button type="submit" className="save-btn"><FaSave /> Sauvegarder</button>
                    </div>
                </form>
            </main>
        </div>
    );
};

export default MiddlewareConfig;
