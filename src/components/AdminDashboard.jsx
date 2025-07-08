import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaUsers, FaUserCheck, FaUserSlash, FaUserPlus } from 'react-icons/fa';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        setError('Aucun token d\'authentification trouvé.');
        return;
      }

      const response = await axios.get('http://127.0.0.1:8000/admin/users', {
        headers: { Authorization: `Bearer ${token}` }
      });
      // L'API renvoie {users: [...]}, nous extrayons le tableau.
      setUsers(response.data.users);
    } catch (err) {
      setError('Erreur lors de la récupération des utilisateurs.');
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleValidateUser = async (email) => {
    try {
      const token = localStorage.getItem('authToken');
      await axios.patch(`http://127.0.0.1:8000/admin/validate-user/${email}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchUsers(); // Re-fetch users to update the list
    } catch (err) {
      alert('Erreur lors de la validation de l\'utilisateur.');
    }
  };

  const handleUpdateStatus = async (email, newStatus) => {
    try {
      const token = localStorage.getItem('authToken');
      await axios.patch(`http://127.0.0.1:8000/admin/update-user/${email}`, { status: newStatus }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchUsers(); // Re-fetch users to update the list
    } catch (err) {
      alert('Erreur lors du changement de statut.');
    }
  };

  return (
    <div className="admin-dashboard">
      <aside className="admin-sidebar">
        <div className="admin-sidebar-header">
          <h2>Admin Panel</h2>
        </div>
        <nav className="admin-nav">
          <a href="#" className="active"><FaUsers /> Gestion des utilisateurs</a>
          <a href="#"><FaUserPlus /> Créer un utilisateur</a>
        </nav>
        <div className="admin-sidebar-footer">
          <p>Crédit Mutuel</p>
        </div>
      </aside>
      <main className="admin-main-content">
        <header className="admin-header">
          <h1>Gestion des utilisateurs</h1>
          {error && <p className="error-message-admin">{error}</p>}
          <button className="add-user-btn"><FaUserPlus /> Ajouter un utilisateur</button>
        </header>
        <div className="user-table-container">
          <table className="user-table">
            <thead>
              <tr>
                <th>Nom</th>
                <th>Email</th>
                <th>Rôle</th>
                <th>Statut</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.email}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td><span className={`role-badge role-${user.role.replace(' ', '-')}`}>{user.role}</span></td>
                  <td><span className={`status-badge status-${user.status}`}>{user.status}</span></td>
                  <td className="action-buttons">
                    {user.status === 'pending' && 
                      <button onClick={() => handleValidateUser(user.email)} className="action-btn validate" title="Valider l'utilisateur">
                        <FaUserCheck />
                      </button>}
                    {user.status === 'active' && 
                      <button onClick={() => handleUpdateStatus(user.email, 'blocked')} className="action-btn block" title="Bloquer l'utilisateur">
                        <FaUserSlash />
                      </button>}
                     {user.status === 'blocked' && 
                      <button onClick={() => handleUpdateStatus(user.email, 'active')} className="action-btn unblock" title="Débloquer l'utilisateur">
                        <FaUserCheck />
                      </button>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
