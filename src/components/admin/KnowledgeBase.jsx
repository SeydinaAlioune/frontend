import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { FaArrowLeft, FaUpload, FaFilePdf, FaQuestionCircle, FaTrash } from 'react-icons/fa';
import './AdminPage.css'; // Shared styles
import './KnowledgeBase.css'; // Specific styles

const KnowledgeBase = () => {
    const navigate = useNavigate();
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const fetchDocuments = useCallback(async () => {
        try {
            const token = localStorage.getItem('authToken');
            const response = await fetch('http://localhost:8000/kb/documents', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (!response.ok) throw new Error('Erreur lors de la récupération des documents.');
            const data = await response.json();
            setDocuments(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchDocuments();
    }, [fetchDocuments]);

    const onDrop = useCallback(async (acceptedFiles) => {
        if (acceptedFiles.length === 0) return;
        
        const formData = new FormData();
        acceptedFiles.forEach(file => {
            formData.append('file', file);
        });

        setError('');
        setSuccess('');
        setLoading(true);

        try {
            const token = localStorage.getItem('authToken');
            const response = await fetch('http://localhost:8000/kb/upload', {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` },
                body: formData,
            });

            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.detail || 'Échec du téléversement.');
            }

            setSuccess(`${acceptedFiles.length} document(s) téléversé(s) avec succès !`);
            fetchDocuments(); // Refresh the list
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [fetchDocuments]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: {'application/pdf': ['.pdf'], 'application/json': ['.json']} });

    const handleDelete = async (docId, docTitle) => {
        if (!window.confirm(`Êtes-vous sûr de vouloir supprimer ${docTitle} ?`)) return;

        setError('');
        setSuccess('');
        setLoading(true);

        try {
            const token = localStorage.getItem('authToken');
            const response = await fetch(`http://localhost:8000/kb/documents/${docId}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` },
            });

            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.detail || 'Erreur lors de la suppression.');
            }

            setSuccess(`Le document ${docTitle} a été supprimé.`);
            fetchDocuments(); // Refresh the list
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const getFileIcon = (filename) => {
        if (!filename) return null; // Sécurité pour éviter les erreurs
        if (filename.endsWith('.pdf')) return <FaFilePdf />;
        if (filename.endsWith('.json')) return <FaQuestionCircle />;
        return null;
    };

    return (
        <div className="admin-page-container">
            <header className="admin-page-header">
                <button onClick={() => navigate('/admin/dashboard')} className="back-button"><FaArrowLeft /></button>
                <h1>Base de Connaissances de l'IA</h1>
                <div style={{width: '40px'}}></div>
            </header>
            <main className="admin-content-panel">
                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">{success}</p>}
                <div className="upload-section">
                    <h3>Téléverser de nouveaux documents</h3>
                    <p>Ajoutez des fichiers PDF ou des FAQs (.json) pour entraîner l'IA.</p>
                    <div {...getRootProps({ className: `upload-box ${isDragActive ? 'active' : ''}` })}>
                        <input {...getInputProps()} />
                        <FaUpload />
                        {isDragActive ?
                            <span>Relâchez pour déposer les fichiers</span> :
                            <span>Glissez-déposez vos fichiers ici ou cliquez pour sélectionner</span>
                        }
                    </div>
                    {loading && <p>Téléversement en cours...</p>}
                </div>
                <div className="documents-list">
                    <h3>Documents existants</h3>
                    {loading && documents.length === 0 ? (
                        <p>Chargement des documents...</p>
                    ) : (
                        <ul>
                            {documents.map((doc, index) => (
                                <li key={doc.id}>
                                    {getFileIcon(doc.title)} <span>{doc.title}</span>
                                    <button onClick={() => handleDelete(doc.id, doc.title)} className="delete-btn"><FaTrash /></button>
                                </li>
                            ))}
                            {documents.length === 0 && <p>Aucun document dans la base de connaissances.</p>}
                        </ul>
                    )}
                </div>
            </main>
        </div>
    );
};

export default KnowledgeBase;
