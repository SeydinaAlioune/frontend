import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaUpload, FaFilePdf, FaQuestionCircle } from 'react-icons/fa';
import './AdminPage.css'; // Shared styles
import './KnowledgeBase.css'; // Specific styles

const KnowledgeBase = () => {
    const navigate = useNavigate();

    return (
        <div className="admin-page-container">
            <header className="admin-page-header">
                <button onClick={() => navigate('/admin/dashboard')} className="back-button">
                    <FaArrowLeft />
                </button>
                <h1>Base de Connaissances de l'IA</h1>
                <div style={{width: '40px'}}></div> {/* Spacer */}
            </header>
            <main className="admin-content-panel">
                <div className="upload-section">
                    <h3>Téléverser de nouveaux documents</h3>
                    <p>Ajoutez des fichiers PDF ou des FAQs pour entraîner l'IA.</p>
                    <div className="upload-box">
                        <FaUpload />
                        <span>Glissez-déposez vos fichiers ici ou cliquez pour sélectionner</span>
                    </div>
                </div>
                <div className="documents-list">
                    <h3>Documents existants</h3>
                    <ul>
                        <li><FaFilePdf /> <span>guide_installation.pdf</span></li>
                        <li><FaQuestionCircle /> <span>faq_produits.json</span></li>
                    </ul>
                </div>
            </main>
        </div>
    );
};

export default KnowledgeBase;
