import { useState } from 'react';
import {
    Search,
    Trash2,
    Phone,
    MoreVertical,
    UserX
} from 'lucide-react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { Card, CardBody } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { useDonor } from '../../contexts/DonorContext';
import { toast } from 'sonner';

export function AdminUsersPage() {
    const { donors, deleteDonor } = useDonor();
    const [searchTerm, setSearchTerm] = useState('');

    const filteredDonors = donors.filter(d =>
        d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.phone.includes(searchTerm)
    );

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to remove this user?')) {
            deleteDonor(id);
            toast.success('User removed successfully');
        }
    };

    const handleCall = (phone) => {
        window.location.href = `tel:${phone}`;
    };

    return (
        <AdminLayout>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-black font-display text-page mb-2">User Management</h1>
                    <p className="text-page-subtle">Manage registered blood donors</p>
                </div>
                <div className="relative w-full md:w-auto">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-page-subtle" />
                    <input
                        type="text"
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-2 rounded-xl bg-white dark:bg-black/20 border border-page-border focus:ring-2 focus:ring-accent outline-none w-full md:w-64"
                    />
                </div>
            </div>

            <Card className="overflow-hidden border-none shadow-lg">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-page-border/10 text-xs font-bold uppercase text-page-subtle tracking-wider">
                            <tr>
                                <th className="p-4">User</th>
                                <th className="p-4">Blood Group</th>
                                <th className="p-4">Contact</th>
                                <th className="p-4">Location</th>
                                <th className="p-4">Status</th>
                                <th className="p-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-page-border/20 text-sm">
                            {filteredDonors.map((donor) => (
                                <tr key={donor.id} className="hover:bg-page-border/5 transition-colors">
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center font-bold text-accent">
                                                {donor.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-bold text-page">{donor.name}</p>
                                                <p className="text-xs text-page-subtle">ID: {donor.id.slice(0, 8)}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <span className="inline-flex items-center justify-center px-2 py-1 rounded bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 font-bold text-xs">
                                            {donor.bloodGroup}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <p>{donor.phone}</p>
                                        <p className="text-xs text-page-subtle">{donor.email}</p>
                                    </td>
                                    <td className="p-4">
                                        <p>{donor.city}, {donor.state}</p>
                                    </td>
                                    <td className="p-4">
                                        <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium border ${donor.verified
                                                ? 'bg-green-500/10 text-green-600 border-green-500/20'
                                                : 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20'
                                            }`}>
                                            <span className={`w-1.5 h-1.5 rounded-full ${donor.verified ? 'bg-green-500' : 'bg-yellow-500'}`} />
                                            {donor.verified ? 'Verified' : 'Pending'}
                                        </span>
                                    </td>
                                    <td className="p-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                className="h-8 w-8 p-0 border-blue-200 text-blue-600 hover:bg-blue-50 dark:border-blue-800 dark:hover:bg-blue-900/20"
                                                onClick={() => handleCall(donor.phone)}
                                                title="Call User"
                                            >
                                                <Phone className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                className="h-8 w-8 p-0 border-red-200 text-red-600 hover:bg-red-50 dark:border-red-800 dark:hover:bg-red-900/20"
                                                onClick={() => handleDelete(donor.id)}
                                                title="Remove User"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </AdminLayout>
    );
}
