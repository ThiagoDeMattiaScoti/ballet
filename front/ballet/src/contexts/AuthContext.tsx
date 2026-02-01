'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Usuario } from '@/types';

interface AuthContextType {
    user: Usuario | null;
    userData: string | null;
    isLoading: boolean;
    login: (user: Usuario, userData: string) => void;
    logout: () => void;
    updateUser: (user: Usuario, userData: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<Usuario | null>(null);
    const [userData, setUserData] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Carregar dados do localStorage na inicialização
        const storedUser = localStorage.getItem('ballet_user');
        const storedUserData = localStorage.getItem('ballet_user_data');

        if (storedUser && storedUserData) {
            setUser(JSON.parse(storedUser));
            setUserData(storedUserData);
        }
        setIsLoading(false);
    }, []);

    const login = (newUser: Usuario, newUserData: string) => {
        setUser(newUser);
        setUserData(newUserData);
        localStorage.setItem('ballet_user', JSON.stringify(newUser));
        localStorage.setItem('ballet_user_data', newUserData);
    };

    const logout = () => {
        setUser(null);
        setUserData(null);
        localStorage.removeItem('ballet_user');
        localStorage.removeItem('ballet_user_data');
    };

    const updateUser = (newUser: Usuario, newUserData: string) => {
        setUser(newUser);
        setUserData(newUserData);
        localStorage.setItem('ballet_user', JSON.stringify(newUser));
        localStorage.setItem('ballet_user_data', newUserData);
    };

    return (
        <AuthContext.Provider value={{ user, userData, isLoading, login, logout, updateUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
