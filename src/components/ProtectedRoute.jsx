import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const decodeToken = (token) => {
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        // Check if the token is expired
        if (payload.exp * 1000 < Date.now()) {
            localStorage.removeItem('authToken');
            return null;
        }
        return payload;
    } catch (e) {
        localStorage.removeItem('authToken');
        return null;
    }
};

const ProtectedRoute = ({ allowedRoles }) => {
    const token = localStorage.getItem('authToken');

    if (!token) {
        // User not authenticated
        return <Navigate to="/login" replace />;
    }

    const userData = decodeToken(token);

    if (!userData) {
        // Token is invalid or expired
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(userData.role)) {
        // User does not have the required role
        // Redirect them to a default page based on their actual role
        switch (userData.role) {
            case 'admin':
                return <Navigate to="/admin/dashboard" replace />;
            case 'agent support':
                return <Navigate to="/agent/dashboard" replace />;
            default:
                return <Navigate to="/login" replace />;
        }
    }

    // User is authenticated and has the correct role, render the requested page
    return <Outlet />;
};

export default ProtectedRoute;
