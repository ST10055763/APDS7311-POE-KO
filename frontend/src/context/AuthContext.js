import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Initialize user as null

    // Implement login and logout methods here
    const login = (userData) => {
        setUser(userData);
        // Store token or user info as needed
    };

    const logout = () => {
        setUser(null); // Clear user info on logout
        // Clear token or other related info as needed
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
