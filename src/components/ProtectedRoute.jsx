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

    if (allowedRoles) {
        // 'sub' is often used for the user's role or primary identifier in JWTs.
        if (!userData.role || !allowedRoles.includes(userData.role)) {
            // If roles are required and the user doesn't have the right one, redirect to login.
            return <Navigate to="/login" replace />;
        }
    }


    // User is authenticated and has the correct role, render the requested page
    return <Outlet />;
};

export default ProtectedRoute;
