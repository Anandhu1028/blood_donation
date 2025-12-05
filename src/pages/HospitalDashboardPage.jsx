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
    FileText
} from 'lucide-react';
import { Card, CardBody } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { BloodGroupBadge } from '../components/ui/BloodGroupBadge';
import { formatDate } from '../lib/utils';

export function HospitalDashboardPage() {
    const [hospitalData] = useState({
        name: "City General Hospital",
        location: "123 Medical Center Dr, Downtown",
        phone: "+1 234-567-8900",
        email: "contact@citygeneralhospital.com"
    });

    const [requests, setRequests] = useState([
        {
            id: 1,
            bloodGroup: 'O+',
            unitsNeeded: 5,
            urgency: 'Critical',
            requestDate: '2024-12-05',
            status: 'Active',
            donorsResponded: 12
        },
        {
            id: 2,
            bloodGroup: 'A-',
            unitsNeeded: 3,
            urgency: 'High',
            requestDate: '2024-12-04',
            status: 'Active',
            donorsResponded: 8
        },
        {
            id: 3,
            bloodGroup: 'B+',
            unitsNeeded: 2,
            urgency: 'Medium',
            requestDate: '2024-12-03',
            status: 'Fulfilled',
            donorsResponded: 15
        }
    ]);

    const [showAddModal, setShowAddModal] = useState(false);
    const [editingRequest, setEditingRequest] = useState(null);

    const stats = [
        { label: 'Active Requests', value: requests.filter(r => r.status === 'Active').length, icon: Activity, color: 'text-red-500', bg: 'bg-red-500/10' },
        { label: 'Total Donors', value: requests.reduce((sum, r) => sum + r.donorsResponded, 0), icon: Users, color: 'text-blue-500', bg: 'bg-blue-500/10' },
        { label: 'Fulfilled', value: requests.filter(r => r.status === 'Fulfilled').length, icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-500/10' },
        { label: 'This Month', value: requests.length, icon: TrendingUp, color: 'text-purple-500', bg: 'bg-purple-500/10' }
    ];

    const getUrgencyColor = (urgency) => {
        switch (urgency) {
            case 'Critical': return 'bg-red-500 text-white';
            case 'High': return 'bg-orange-500 text-white';
            case 'Medium': return 'bg-blue-500 text-white';
            default: return 'bg-gray-500 text-white';
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Active': return 'bg-green-500/10 text-green-600 border-green-500/30';
            case 'Fulfilled': return 'bg-blue-500/10 text-blue-600 border-blue-500/30';
            case 'Cancelled': return 'bg-gray-500/10 text-gray-600 border-gray-500/30';
            default: return 'bg-gray-500/10 text-gray-600 border-gray-500/30';
        }
    };

    const handleDeleteRequest = (id) => {
        if (confirm('Are you sure you want to delete this request?')) {
            setRequests(requests.filter(r => r.id !== id));
        }
    };

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
                                <p className="text-page-subtle font-semibold">{hospitalData.name}</p>
                            </div>
                        </div>
                        <Button onClick={() => setShowAddModal(true)} className="group">
                            <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
                            New Request
                        </Button>
                    </div>
                </div>
            </div>

            <div className="container-custom px-4 py-8">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Card className="border-2 border-page-border hover:border-accent/30 transition-all">
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
                        </motion.div>
                    ))}
                </div>

                {/* Hospital Info Card */}
                <Card className="mb-8 border-2 border-page-border">
                    <CardBody className="p-6">
                        <h2 className="text-2xl font-black mb-4 text-page">Hospital Information</h2>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="flex items-center gap-3">
                                <MapPin className="w-5 h-5 text-accent" />
                                <div>
                                    <p className="text-xs font-semibold text-page-subtle uppercase">Location</p>
                                    <p className="text-page font-medium">{hospitalData.location}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <Phone className="w-5 h-5 text-accent" />
                                <div>
                                    <p className="text-xs font-semibold text-page-subtle uppercase">Phone</p>
                                    <p className="text-page font-medium">{hospitalData.phone}</p>
                                </div>
                            </div>
                        </div>
                    </CardBody>
                </Card>

                {/* Requests Table */}
                <Card className="border-2 border-page-border">
                    <CardBody className="p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-black text-page">Blood Requests</h2>
                            <div className="flex items-center gap-2 text-sm text-page-subtle">
                                <Clock className="w-4 h-4" />
                                <span>Last updated: {formatDate(new Date())}</span>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {requests.map((request, index) => (
                                <motion.div
                                    key={request.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="group"
                                >
                                    <div className="p-6 bg-page-border/20 hover:bg-page-border/40 rounded-2xl border-2 border-transparent hover:border-accent/30 transition-all">
                                        <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center">
                                            {/* Blood Group */}
                                            <div className="flex items-center gap-4">
                                                <Droplet className="w-6 h-6 text-accent" />
                                                <BloodGroupBadge bloodGroup={request.bloodGroup} size="xl" />
                                            </div>

                                            {/* Details */}
                                            <div className="flex-1 grid md:grid-cols-3 gap-4">
                                                <div>
                                                    <p className="text-xs font-semibold text-page-subtle uppercase mb-1">Units Needed</p>
                                                    <p className="text-2xl font-black text-accent">{request.unitsNeeded}</p>
                                                </div>
                                                <div>
                                                    <p className="text-xs font-semibold text-page-subtle uppercase mb-1">Urgency</p>
                                                    <span className={`inline-flex px-3 py-1 rounded-lg text-sm font-bold ${getUrgencyColor(request.urgency)}`}>
                                                        {request.urgency}
                                                    </span>
                                                </div>
                                                <div>
                                                    <p className="text-xs font-semibold text-page-subtle uppercase mb-1">Status</p>
                                                    <span className={`inline-flex px-3 py-1 rounded-lg text-sm font-bold border ${getStatusColor(request.status)}`}>
                                                        {request.status}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Stats & Actions */}
                                            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 lg:w-48">
                                                <div className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 rounded-xl border border-blue-500/30">
                                                    <Users className="w-5 h-5 text-blue-500" />
                                                    <div>
                                                        <p className="text-xs text-page-subtle">Donors</p>
                                                        <p className="text-lg font-black text-blue-500">{request.donorsResponded}</p>
                                                    </div>
                                                </div>
                                                <div className="flex gap-2">
                                                    <Button
                                                        variant="outline"
                                                        className="flex-1"
                                                        onClick={() => setEditingRequest(request)}
                                                    >
                                                        <Edit className="w-4 h-4" />
                                                    </Button>
                                                    <Button
                                                        variant="outline"
                                                        className="flex-1 hover:bg-red-500/10 hover:border-red-500/30 hover:text-red-500"
                                                        onClick={() => handleDeleteRequest(request.id)}
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Posted Date */}
                                        <div className="mt-4 pt-4 border-t border-page-border flex items-center gap-2 text-sm text-page-subtle">
                                            <Calendar className="w-4 h-4" />
                                            <span>Posted: {formatDate(request.requestDate)}</span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {requests.length === 0 && (
                            <div className="text-center py-12">
                                <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                                <h3 className="text-xl font-bold mb-2">No Requests Yet</h3>
                                <p className="text-page-subtle mb-4">Create your first blood request</p>
                                <Button onClick={() => setShowAddModal(true)}>
                                    <Plus className="w-5 h-5" />
                                    Create Request
                                </Button>
                            </div>
                        )}
                    </CardBody>
                </Card>
            </div>

            {/* Add/Edit Modal (Placeholder) */}
            {(showAddModal || editingRequest) && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-card rounded-3xl p-8 max-w-2xl w-full border-2 border-page-border"
                    >
                        <h2 className="text-3xl font-black mb-6">
                            {editingRequest ? 'Edit Request' : 'New Blood Request'}
                        </h2>
                        <p className="text-page-subtle mb-6">
                            Form fields would go here (blood group, units, urgency, etc.)
                        </p>
                        <div className="flex gap-3">
                            <Button className="flex-1">Save Request</Button>
                            <Button
                                variant="outline"
                                className="flex-1"
                                onClick={() => {
                                    setShowAddModal(false);
                                    setEditingRequest(null);
                                }}
                            >
                                Cancel
                            </Button>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
}

export default HospitalDashboardPage;
