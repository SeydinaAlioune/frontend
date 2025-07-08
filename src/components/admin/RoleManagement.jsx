import React, { useState } from 'react';
import './RoleManagement.css';
import { FaEdit, FaTrash, FaPlus, FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const RoleManagement = () => {
    const navigate = useNavigate();
    // Données factices pour l'affichage
    const [users, setUsers] = useState([
        { id: 1, name: 'Seydina Alioune', email: 'seydina@example.com', role: 'Admin' },
        { id: 2, name: 'Mamadou Diop', email: 'mamadou.diop@example.com', role: 'Agent' },
        { id: 3, name: 'Aïssatou Fall', email: 'aissatou.fall@example.com', role: 'Agent' },
        { id: 4, name: 'Client Test', email: 'client.test@example.com', role: 'Client' },
    ]);

    return (
        <div className="role-management-container">
            <header className="admin-page-header">
                <button onClick={() => navigate('/admin/dashboard')} className="back-button">
                    <FaArrowLeft />
                </button>
                <h1>Gestion des Rôles et Accès</h1>
                <button className="add-user-btn"><FaPlus /> Ajouter un utilisateur</button>
            </header>
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
                                    <button className="action-btn edit-btn" title="Modifier"><FaEdit /></button>
                                    <button className="action-btn delete-btn" title="Supprimer"><FaTrash /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </main>
        </div>
    );
};

export default RoleManagement;

