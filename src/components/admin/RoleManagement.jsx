import React, { useState, useEffect } from 'react';
import './RoleManagement.css';
import { FaEdit, FaTrash, FaPlus, FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const RoleManagement = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [formData, setFormData] = useState({ name: '', email: '', role: 'client', password: '' });

    const openModal = (user = null) => {
        setEditingUser(user);
        if (user) {
            setFormData({ name: user.name, email: user.email, role: user.role, password: '' });
        } else {
            setFormData({ name: '', email: '', role: 'client', password: '' });
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingUser(null);
    };

    const fetchUsers = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:8000/admin/users', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (!response.ok) {
                throw new Error('Erreur lors de la récupération des utilisateurs.');
            }
            const data = await response.json();
            setUsers(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleDelete = async (userId) => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch(`http://localhost:8000/admin/users/${userId}`, {
                    method: 'DELETE',
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (!response.ok) {
                    throw new Error('La suppression a échoué.');
                }
                // Mettre à jour la liste des utilisateurs après suppression
                setUsers(users.filter(user => user.id !== userId));
            } catch (err) {
                setError(err.message);
            }
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const method = editingUser ? 'PUT' : 'POST';
        const url = editingUser 
            ? `http://localhost:8000/admin/users/${editingUser.id}` 
            : 'http://localhost:8000/admin/users';

        // Pour une mise à jour, on ne veut pas envoyer le mot de passe s'il est vide
        const body = { ...formData };
        if (editingUser && !body.password) {
            delete body.password;
        }

        try {
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(body)
            });

            if (!response.ok) {
                const errorData = await response.json();
                // FastAPI validation errors are in detail[0].msg
                const message = errorData.detail[0]?.msg || errorData.detail || 'Une erreur est survenue.';
                throw new Error(message);
            }

            // Rafraîchir la liste des utilisateurs et fermer la modale
            fetchUsers();
            closeModal();

        } catch (err) {
            setError(err.message);
            // Optionnel: garder la modale ouverte pour corriger l'erreur
        }
    };

    return (
        <div className="role-management-container">
            <header className="admin-page-header">
                <button onClick={() => navigate('/admin/dashboard')} className="back-button">
                    <FaArrowLeft />
                </button>
                <h1>Gestion des Rôles et Accès</h1>
                <button onClick={() => openModal()} className="add-btn">Ajouter un utilisateur</button>
            </header>
            {error && <p className="error-message">{error}</p>}
            {loading && <p>Chargement des utilisateurs...</p>}
            <main className="admin-content-panel">
                <table className="users-table">
                    <thead>
                        <tr>
                            <th>Nom d'utilisateur</th>
                            <th>Adresse Email</th>
                            <th>Rôle</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    <span className={`role-badge role-${user.role.toLowerCase()}`}>
                                        {user.role}
                                    </span>
                                </td>
                                <td className="action-cell">
                                    <button onClick={() => openModal(user)} className="action-btn edit-btn" title="Modifier"><FaEdit /></button>
                                    <button onClick={() => handleDelete(user.id)} className="action-btn delete-btn" title="Supprimer"><FaTrash /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </main>

            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>{editingUser ? 'Modifier l\'utilisateur' : 'Ajouter un utilisateur'}</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Nom</label>
                                <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <input type="email" name="email" value={formData.email} onChange={handleInputChange} required />
                            </div>
                            {!editingUser && (
                                <div className="form-group">
                                    <label>Mot de passe</label>
                                    <input type="password" name="password" value={formData.password} onChange={handleInputChange} required />
                                </div>
                            )}
                            <div className="form-group">
                                <label>Rôle</label>
                                <select name="role" value={formData.role} onChange={handleInputChange}>
                                    <option value="admin">Administrateur</option>
                                    <option value="agent_support">Agent Support</option>
                                    <option value="agent_interne">Agent Interne</option>
                                    <option value="client">Client Externe</option>
                                </select>
                            </div>
                            {error && <p style={{ color: 'red', marginBottom: '10px' }}>{error}</p>}
                            <div className="modal-actions">
                                <button type="submit" className="btn-submit">{editingUser ? 'Mettre à jour' : 'Créer'}</button>
                                <button type="button" className="btn-cancel" onClick={closeModal}>Annuler</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RoleManagement;
