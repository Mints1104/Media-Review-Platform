import React, { createContext, useState, useEffect, useContext } from 'react';
import authService from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // Get user from localStorage if exists
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });

    // Effect to update localStorage whenever user state changes
    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
        }
    }, [user]);

    // Register function that updates context state
    const register = async (userData) => {
        const response = await authService.register(userData);
        if (response.token) {
            setUser(response);
        }
        return response;
    };

    // Login function that updates context state
    const login = async (userData) => {
        const response = await authService.login(userData);
        if (response.token) {
            setUser(response);
        }
        return response;
    };

    // Logout function that updates context state
    const logout = () => {
        authService.logout();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, register, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
export default AuthProvider;
