import { createContext, useContext, useState, useEffect } from 'react';
import { mockDonors, mockDonationHistory } from '../lib/data';
import { generateId } from '../lib/utils';

const DonorContext = createContext();

export function DonorProvider({ children }) {
    const [donors, setDonors] = useState(() => {
        const saved = localStorage.getItem('donors');
        return saved ? JSON.parse(saved) : mockDonors;
    });

    const [currentDonor, setCurrentDonor] = useState(() => {
        const saved = localStorage.getItem('currentDonor');
        return saved ? JSON.parse(saved) : null;
    });

    const [donationHistory, setDonationHistory] = useState(() => {
        const saved = localStorage.getItem('donationHistory');
        return saved ? JSON.parse(saved) : mockDonationHistory;
    });

    useEffect(() => {
        localStorage.setItem('donors', JSON.stringify(donors));
    }, [donors]);

    useEffect(() => {
        if (currentDonor) {
            localStorage.setItem('currentDonor', JSON.stringify(currentDonor));
        } else {
            localStorage.removeItem('currentDonor');
        }
    }, [currentDonor]);

    useEffect(() => {
        localStorage.setItem('donationHistory', JSON.stringify(donationHistory));
    }, [donationHistory]);

    const registerDonor = (donorData) => {
        const newDonor = {
            ...donorData,
            id: generateId(),
            registrationDate: new Date().toISOString().split('T')[0],
            donationCount: 0,
            verified: true,
        };
        setDonors(prev => [...prev, newDonor]);
        setCurrentDonor(newDonor);
        return newDonor;
    };

    const updateDonor = (donorId, updates) => {
        setDonors(prev => prev.map(d => d.id === donorId ? { ...d, ...updates } : d));
        if (currentDonor?.id === donorId) {
            setCurrentDonor(prev => ({ ...prev, ...updates }));
        }
    };

    const deleteDonor = (donorId) => {
        setDonors(prev => prev.filter(d => d.id !== donorId));
        if (currentDonor?.id === donorId) {
            setCurrentDonor(null);
        }
    };

    const isDonorRegistered = (phone, email) => {
        return donors.some(d => d.phone === phone || d.email === email);
    };

    const loginDonor = (phone) => {
        const donor = donors.find(d => d.phone === phone);
        if (donor) {
            setCurrentDonor(donor);
            return donor;
        }
        return null;
    };

    const logoutDonor = () => {
        setCurrentDonor(null);
    };

    const addDonationRecord = (donorId, record) => {
        const newRecord = {
            ...record,
            id: generateId(),
        };

        setDonationHistory(prev => ({
            ...prev,
            [donorId]: [...(prev[donorId] || []), newRecord],
        }));

        // Update donor's last donation date and count
        updateDonor(donorId, {
            lastDonationDate: record.date,
            donationCount: (donors.find(d => d.id === donorId)?.donationCount || 0) + 1,
        });
    };

    return (
        <DonorContext.Provider value={{
            donors,
            currentDonor,
            donationHistory,
            registerDonor,
            updateDonor,
            deleteDonor,
            isDonorRegistered,
            loginDonor,
            logoutDonor,
            addDonationRecord,
        }}>
            {children}
        </DonorContext.Provider>
    );
}

export function useDonor() {
    const context = useContext(DonorContext);
    if (!context) {
        throw new Error('useDonor must be used within DonorProvider');
    }
    return context;
}
