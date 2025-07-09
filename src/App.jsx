import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Core Components
import ProtectedRoute from './components/ProtectedRoute';

// General Pages
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import RegistrationPage from './components/RegistrationPage';

// Agent Components
import AgentLayout from './components/AgentDashboard';
import ChatInterface from './components/ChatInterface';
import AnalyticsDashboard from './components/AnalyticsDashboard';

// Admin Components
import AdminDashboard from './components/admin/AdminDashboard';
import RoleManagement from './components/admin/RoleManagement';
import GlpiConfig from './components/admin/GlpiConfig';
import KnowledgeBase from './components/admin/KnowledgeBase';
import MiddlewareConfig from './components/admin/MiddlewareConfig';


function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />


        {/* Protected Agent Routes */}
        <Route element={<ProtectedRoute allowedRoles={['agent']} />}>
          <Route path="/agent/dashboard" element={<AgentLayout />}>
            <Route index element={<ChatInterface />} />
            <Route path="analytics" element={<AnalyticsDashboard />} />
          </Route>
        </Route>

        {/* Protected Admin Routes */}
        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/dashboard/roles" element={<RoleManagement />} />
          <Route path="/admin/dashboard/glpi" element={<GlpiConfig />} />
          <Route path="/admin/dashboard/knowledge" element={<KnowledgeBase />} />
          <Route path="/admin/dashboard/middleware" element={<MiddlewareConfig />} />
        </Route>

        {/* Protected Client Route */}
        <Route element={<ProtectedRoute allowedRoles={['client']} />}>
            <Route path="/chat" element={<ChatInterface />} />
        </Route>

        {/* Fallback Redirect */}
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
