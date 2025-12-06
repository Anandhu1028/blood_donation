import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Hospital,
    Plus,
    Edit,
    Trash2,
    Users,
    Activity,
    TrendingUp,
    Calendar,
    Droplet,
    Phone,
    MapPin,
    AlertCircle,
    CheckCircle,
    Clock,
    FileText,
    LogOut
} from 'lucide-react';
import { Card, CardBody } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { BloodGroupBadge } from '../components/ui/BloodGroupBadge';
import { formatDate } from '../lib/utils';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export function HospitalDashboardPage() {
    const { user, logout } = useAuth();
    const { requests, addRequest, deleteRequest, updateHospitalInventory, hospitals } = useData(); // we need to access hospital inventory from 'hospitals' array
    const navigate = useNavigate();

    // Redirect if not hospital
    if (!user || user.role !== 'hospital') {
        // In a real app, use a protected route wrapper. For now, simple redirect.
        // navigate('/login'); // Effect calls are better 
    }

    // Get current hospital's latest data from Context
    const currentHospital = hospitals.find(h => h.id === user?.id) || user;

    const myRequests = requests.filter(r => r.hospitalId === user?.id);

    const [showRequestModal, setShowRequestModal] = useState(false);
    const [showInventoryModal, setShowInventoryModal] = useState(false);

    // Request Form
    const [requestForm, setRequestForm] = useState({
        bloodGroup: 'A+', unitsNeeded: 1, urgency: 'Medium'
    });

    // Handle Request Submit
    const handleRequestSubmit = () => {
        if (!requestForm.unitsNeeded || requestForm.unitsNeeded <= 0) {
            toast.error('Please enter a valid number of units');
            return;
        }

        addRequest({
            hospitalId: user.id,
            ...requestForm
        });
        toast.success('Blood Request Posted');
        setShowRequestModal(false);
    };

    // Inventory Update
    const [inventoryUpdates, setInventoryUpdates] = useState(currentHospital?.inventory || {});

    const handleInventorySave = () => {
        // Validate
        const invalid = Object.values(inventoryUpdates).some(val => val < 0 || val === '');
        if (invalid) {
            toast.error('Inventory units cannot be negative');
            return;
        }

        // Save each key
        Object.keys(inventoryUpdates).forEach(bg => {
            updateHospitalInventory(user.id, bg, parseInt(inventoryUpdates[bg]));
        });
        toast.success('Inventory Updated');
        setShowInventoryModal(false);
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    // Stats
    const stats = [
        { label: 'Active Requests', value: myRequests.length, icon: Activity, color: 'text-red-500', bg: 'bg-red-500/10' },
        { label: 'Total Units in Stock', value: Object.values(currentHospital?.inventory || {}).reduce((a, b) => a + b, 0), icon: Droplet, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    ];

    if (!user) return <div className="p-8 text-center text-page">Please login as a hospital to view this page.</div>;

    return (
        <div className="min-h-screen bg-page">
            {/* Header */}
            <div className="bg-gradient-to-br from-red-50 via-pink-50 to-purple-50 dark:from-gray-900 dark:via-red-900/20 dark:to-purple-900/20 border-b border-page-border">
                <div className="container-custom px-4 py-8">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-xl">
                                <Hospital className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <h1 className="text-3xl md:text-4xl font-display font-black text-page">
                                    Hospital Dashboard
                                </h1>
                                <p className="text-page-subtle font-semibold">{currentHospital.name}</p>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <Button className="bg-black text-white hover:bg-gray-800 border-none" onClick={handleLogout}>
                                <LogOut className="w-4 h-4 mr-2" /> Logout
                            </Button>
                            <Button variant="secondary" onClick={() => setShowRequestModal(true)} className="group">
                                <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
                                New Request
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-custom px-4 py-8">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {stats.map((stat, index) => (
                        <Card key={stat.label} className="border-2 border-page-border hover:border-accent/30 transition-all">
                            <CardBody className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-semibold text-page-subtle uppercase tracking-wider mb-2">
                                            {stat.label}
                                        </p>
                                        <p className="text-4xl font-black text-page">{stat.value}</p>
                                    </div>
                                    <div className={`w-14 h-14 ${stat.bg} rounded-2xl flex items-center justify-center`}>
                                        <stat.icon className={`w-7 h-7 ${stat.color}`} />
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    ))}
                </div>

                {/* Inventory Overview */}
                <Card className="mb-8 border-2 border-page-border">
                    <CardBody className="p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-black text-page">Blood Inventory</h2>
                            <Button variant="secondary" onClick={() => setShowInventoryModal(true)}>
                                <Edit className="w-4 h-4 mr-2" /> Update Stock
                            </Button>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-4">
                            {Object.entries(currentHospital.inventory || {}).map(([bg, count]) => (
                                <div key={bg} className="text-center p-3 rounded-xl bg-page-border/10">
                                    <div className="text-lg font-black text-accent mb-1">{bg}</div>
                                    <div className="text-sm font-bold text-page-subtle">{count} units</div>
                                </div>
                            ))}
                        </div>
                    </CardBody>
                </Card>

                {/* Info & Requests */}
                <Card className="border-2 border-page-border">
                    <CardBody className="p-6">
                        <h2 className="text-2xl font-black text-page mb-6">Active Requests</h2>
                        <div className="space-y-4">
                            {myRequests.map((request) => (
                                <div key={request.id} className="p-4 rounded-xl bg-page-border/10 flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <BloodGroupBadge bloodGroup={request.bloodGroup} />
                                        <div>
                                            <p className="font-bold">{request.unitsNeeded} Units Needed</p>
                                            <p className="text-xs uppercase font-bold text-page-subtle">{request.urgency} Urgency</p>
                                        </div>
                                    </div>
                                    <Button size="sm" className="bg-none bg-red-800 text-white hover:bg-red-900 border-none shadow-md" onClick={() => deleteRequest(request.id)}>
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            ))}
                            {myRequests.length === 0 && (
                                <p className="text-center text-page-subtle py-8">No active requests.</p>
                            )}
                        </div>
                    </CardBody>
                </Card>
            </div>

            {/* Modal: Add Request */}
            {showRequestModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-card p-6 rounded-2xl w-full max-w-md border border-page-border shadow-2xl">
                        <h2 className="text-xl font-bold mb-4">Create Blood Request</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-semibold mb-1 block">Blood Group</label>
                                <select
                                    className="w-full p-2 rounded-lg bg-page-border/20 border border-page-border"
                                    value={requestForm.bloodGroup}
                                    onChange={e => setRequestForm({ ...requestForm, bloodGroup: e.target.value })}
                                >
                                    {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map(bg => (
                                        <option key={bg} value={bg}>{bg}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="text-sm font-semibold mb-1 block">Units Needed</label>
                                <input
                                    type="number"
                                    className="w-full p-2 rounded-lg bg-page-border/20 border border-page-border"
                                    value={requestForm.unitsNeeded}
                                    onChange={e => setRequestForm({ ...requestForm, unitsNeeded: parseInt(e.target.value) })}
                                    min="1"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-semibold mb-1 block">Urgency</label>
                                <select
                                    className="w-full p-2 rounded-lg bg-page-border/20 border border-page-border"
                                    value={requestForm.urgency}
                                    onChange={e => setRequestForm({ ...requestForm, urgency: e.target.value })}
                                >
                                    <option value="Critical">Critical</option>
                                    <option value="High">High</option>
                                    <option value="Medium">Medium</option>
                                    <option value="Low">Low</option>
                                </select>
                            </div>
                            <div className="flex gap-2 mt-6">
                                <Button className="flex-1" onClick={handleRequestSubmit}>Post Request</Button>
                                <Button className="flex-1 bg-black text-white hover:bg-gray-800 border-none" onClick={() => setShowRequestModal(false)}>Cancel</Button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}

            {/* Modal: Inventory */}
            {showInventoryModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-card p-6 rounded-2xl w-full max-w-2xl border border-page-border shadow-2xl overflow-y-auto max-h-[90vh]">
                        <h2 className="text-xl font-bold mb-4">Update Stock Levels</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {Object.keys(inventoryUpdates).map(bg => (
                                <div key={bg}>
                                    <label className="text-xs font-bold text-accent mb-1 block">{bg}</label>
                                    <input
                                        type="number"
                                        className="w-full p-2 rounded-lg bg-page-border/20 border border-page-border"
                                        value={inventoryUpdates[bg]}
                                        onChange={e => setInventoryUpdates({ ...inventoryUpdates, [bg]: e.target.value })}
                                        min="0"
                                    />
                                </div>
                            ))}
                        </div>
                        <div className="flex gap-2 mt-6">
                            <Button className="flex-1" onClick={handleInventorySave}>Save Changes</Button>
                            <Button className="flex-1 bg-black text-white hover:bg-gray-800 border-none" onClick={() => setShowInventoryModal(false)}>Cancel</Button>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
}
