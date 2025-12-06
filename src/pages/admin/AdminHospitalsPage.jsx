import { useState } from 'react';
import {
    Search,
    Trash2,
    Phone,
    Link as LinkIcon,
    MapPin,
    Building2
} from 'lucide-react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { useData } from '../../contexts/DataContext';
import { toast } from 'sonner';

export function AdminHospitalsPage() {
    const { hospitals, deleteHospital } = useData();
    const [searchTerm, setSearchTerm] = useState('');

    const filteredHospitals = hospitals.filter(h =>
        h.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        h.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to remove this hospital? This will also remove all associated requests.')) {
            deleteHospital(id);
            toast.success('Hospital removed successfully');
        }
    };

    const handleCall = (phone) => {
        window.location.href = `tel:${phone}`;
    };

    return (
        <AdminLayout>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-black font-display text-page mb-2">Hospital Management</h1>
                    <p className="text-page-subtle">Manage partner hospitals and centers</p>
                </div>
                <div className="relative w-full md:w-auto">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-page-subtle" />
                    <input
                        type="text"
                        placeholder="Search hospitals..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-2 rounded-xl bg-white dark:bg-black/20 border border-page-border focus:ring-2 focus:ring-accent outline-none w-full md:w-64"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredHospitals.map(hospital => (
                    <Card key={hospital.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 group border-none shadow-md">
                        <div className="h-24 bg-gradient-to-r from-blue-500 to-purple-600 relative">
                            <div className="absolute -bottom-8 left-6">
                                <div className="w-16 h-16 rounded-2xl bg-white dark:bg-gray-800 p-3 shadow-lg flex items-center justify-center">
                                    <Building2 className="w-8 h-8 text-blue-500" />
                                </div>
                            </div>
                        </div>
                        <div className="pt-10 px-6 pb-6">
                            <h3 className="text-xl font-bold mb-1 line-clamp-1">{hospital.name}</h3>
                            <div className="flex items-center gap-1.5 text-page-subtle text-sm mb-4">
                                <MapPin className="w-4 h-4" />
                                <span className="line-clamp-1">{hospital.location}</span>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div className="bg-page-border/10 rounded-lg p-3">
                                    <p className="text-xs text-page-subtle uppercase font-bold">Inventory</p>
                                    <p className="text-lg font-black text-page">
                                        {Object.values(hospital.inventory).reduce((a, b) => a + b, 0)} <span className="text-sm font-normal text-page-subtle">units</span>
                                    </p>
                                </div>
                                <div className="bg-page-border/10 rounded-lg p-3">
                                    <p className="text-xs text-page-subtle uppercase font-bold">Status</p>
                                    <p className={`text-lg font-black ${hospital.verified ? 'text-green-500' : 'text-yellow-500'}`}>
                                        {hospital.verified ? 'Verified' : 'Pending'}
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <Button
                                    className="flex-1"
                                    variant="outline"
                                    onClick={() => handleCall(hospital.phone)}
                                >
                                    <Phone className="w-4 h-4 mr-2" />
                                    Call
                                </Button>
                                <Button
                                    className="flex-shrink-0"
                                    variant="outline"
                                    onClick={() => handleDelete(hospital.id)}
                                >
                                    <Trash2 className="w-4 h-4 text-red-500" />
                                </Button>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </AdminLayout>
    );
}
