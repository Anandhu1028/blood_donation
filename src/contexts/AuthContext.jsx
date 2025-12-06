import { createContext, useContext, useState, useEffect } from 'react';
import { useDonor } from './DonorContext';
import { useData } from './DataContext';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const { loginDonor } = useDonor();
    const { hospitals } = useData();

    const [user, setUser] = useState(() => {
        const saved = localStorage.getItem('authUser');
        return saved ? JSON.parse(saved) : null;
    });

    useEffect(() => {
        if (user) {
            localStorage.setItem('authUser', JSON.stringify(user));
        } else {
            localStorage.removeItem('authUser');
        }
    }, [user]);

    const login = (role, identifier, password) => {
        if (role === 'admin') {
            if (identifier === 'admin' && password === 'admin123') {
                const adminUser = { role: 'admin', name: 'Super Admin', id: 'admin' };
                setUser(adminUser);
                return { success: true, user: adminUser };
            }
            return { success: false, message: 'Invalid admin credentials' };
        }

        if (role === 'hospital') {
            const hospital = hospitals.find(h => h.email === identifier || h.phone === identifier);
            // In a real app, we would check password hash. For demo, we just check existence.
            if (hospital) {
                const hospitalUser = { role: 'hospital', ...hospital };
                setUser(hospitalUser);
                return { success: true, user: hospitalUser };
            }
            return { success: false, message: 'Hospital not found' };
        }

        if (role === 'donor') {
            // Identifier is phone for donor
            const donor = loginDonor(identifier);
            if (donor) {
                const donorUser = { role: 'donor', ...donor };
                setUser(donorUser);
                return { success: true, user: donorUser };
            }
            return { success: false, message: 'Donor not found' };
        }

        return { success: false, message: 'Invalid role' };
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('authUser');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
}
