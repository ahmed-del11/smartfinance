import { createContext, useContext, useState, useEffect } from 'react';
import { login as loginApi, register as registerApi, getCurrentUser } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            getCurrentUser()
                .then(({ data }) => setUser(data))
                .catch(() => localStorage.removeItem('token'))
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, []);

    const login = async (email, password) => {
        try {
            const { data } = await loginApi({ email, password });
            localStorage.setItem('token', data.access_token);

            const userResponse = await getCurrentUser();
            setUser(userResponse.data);

            return { success: true };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.detail || 'Login failed'
            };
        }
    };

    const register = async (username, email, password) => {
        try {
            const { data } = await registerApi({ username, email, password });
            localStorage.setItem('token', data.access_token);

            const userResponse = await getCurrentUser();
            setUser(userResponse.data);

            return { success: true };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.detail || 'Registration failed'
            };
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
