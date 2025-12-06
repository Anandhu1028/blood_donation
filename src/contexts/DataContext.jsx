import { createContext, useContext, useState, useEffect } from 'react';
import { mockDonors } from '../lib/data';

const DataContext = createContext();

const initialHospitals = [
    {
        id: 'h1',
        name: 'City General Hospital',
        email: 'city@hospital.com',
        phone: '1234567890',
        location: 'Downtown, Metro City',
        verified: true,
        inventory: {
            'A+': 50, 'A-': 10, 'B+': 45, 'B-': 15, 'O+': 60, 'O-': 5, 'AB+': 20, 'AB-': 5
        }
    },
    {
        id: 'h2',
        name: 'St. Mary\'s Medical Center',
        email: 'stmary@hospital.com',
        phone: '0987654321',
        location: 'Westside, Metro City',
        verified: true,
        inventory: {
            'A+': 30, 'A-': 5, 'B+': 25, 'B-': 10, 'O+': 40, 'O-': 8, 'AB+': 15, 'AB-': 2
        }
    }
];

const initialRequests = [
    {
        id: 'r1',
        hospitalId: 'h1',
        bloodGroup: 'O+',
        unitsNeeded: 5,
        urgency: 'Critical',
        requestDate: '2024-12-05',
        status: 'Active',
        donorsResponded: 12
    },
    {
        id: 'r2',
        hospitalId: 'h1',
        bloodGroup: 'A-',
        unitsNeeded: 3,
        urgency: 'High',
        requestDate: '2024-12-04',
        status: 'Active',
        donorsResponded: 8
    },
    {
        id: 'r3',
        hospitalId: 'h2',
        bloodGroup: 'B+',
        unitsNeeded: 10,
        urgency: 'Medium',
        requestDate: '2024-12-06',
        status: 'Active',
        donorsResponded: 4
    }
];

export function DataProvider({ children }) {
    // Hospitals
    const [hospitals, setHospitals] = useState(() => {
        const saved = localStorage.getItem('hospitals');
        return saved ? JSON.parse(saved) : initialHospitals;
    });

    // Blood Requests
    const [requests, setRequests] = useState(() => {
        const saved = localStorage.getItem('requests');
        return saved ? JSON.parse(saved) : initialRequests;
    });

    // Admin Stats (Mocked)
    const [stats, setStats] = useState({
        totalDonors: mockDonors.length,
        totalHospitals: initialHospitals.length,
        activeRequests: initialRequests.length,
        dailyDonations: 45
    });

    useEffect(() => {
        localStorage.setItem('hospitals', JSON.stringify(hospitals));
    }, [hospitals]);

    useEffect(() => {
        localStorage.setItem('requests', JSON.stringify(requests));
    }, [requests]);

    const registerHospital = (hospitalData) => {
        const newHospital = {
            id: `h${Date.now()}`,
            ...hospitalData,
            verified: false, // Default to false until admin approves (or just auto-approved for demo)
            inventory: {
                'A+': 0, 'A-': 0, 'B+': 0, 'B-': 0, 'O+': 0, 'O-': 0, 'AB+': 0, 'AB-': 0
            }
        };
        setHospitals(prev => [...prev, newHospital]);
        return newHospital;
    };

    const updateHospitalInventory = (hospitalId, bloodGroup, amount) => {
        setHospitals(prev => prev.map(h => {
            if (h.id === hospitalId) {
                return {
                    ...h,
                    inventory: {
                        ...h.inventory,
                        [bloodGroup]: amount
                    }
                };
            }
            return h;
        }));
    };

    const addRequest = (requestData) => {
        const newRequest = {
            id: `r${Date.now()}`,
            requestDate: new Date().toISOString().split('T')[0],
            status: 'Active',
            donorsResponded: 0,
            ...requestData
        };
        setRequests(prev => [newRequest, ...prev]);
        return newRequest;
    };

    const updateRequest = (id, updates) => {
        setRequests(prev => prev.map(r => r.id === id ? { ...r, ...updates } : r));
    };

    const deleteRequest = (id) => {
        setRequests(prev => prev.filter(r => r.id !== id));
    };

    const deleteHospital = (id) => {
        setHospitals(prev => prev.filter(h => h.id !== id));
    };

    return (
        <DataContext.Provider value={{
            hospitals,
            requests,
            stats,
            registerHospital,
            updateHospitalInventory,
            addRequest,
            updateRequest,
            deleteRequest,
            deleteHospital
        }}>
            {children}
        </DataContext.Provider>
    );
}

export function useData() {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error('useData must be used within DataProvider');
    }
    return context;
}
