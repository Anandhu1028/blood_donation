import { motion } from 'framer-motion';
import {
    Users,
    Building2,
    Activity,
    TrendingUp,
    Droplet
} from 'lucide-react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { Card, CardBody } from '../../components/ui/Card';
import { useData } from '../../contexts/DataContext';

export function AdminDashboardPage() {
    const { stats, requests } = useData();

    const statCards = [
        { label: 'Total Donors', value: stats.totalDonors, icon: Users, color: 'text-blue-500', bg: 'bg-blue-500/10' },
        { label: 'Hospitals', value: stats.totalHospitals, icon: Building2, color: 'text-purple-500', bg: 'bg-purple-500/10' },
        { label: 'Active Requests', value: stats.activeRequests, icon: Activity, color: 'text-red-500', bg: 'bg-red-500/10' },
        { label: 'Daily Donations', value: stats.dailyDonations, icon: Droplet, color: 'text-accent', bg: 'bg-accent/10' },
    ];

    return (
        <AdminLayout>
            <div className="mb-8">
                <h1 className="text-3xl font-black font-display text-page mb-2">Dashboard Overview</h1>
                <p className="text-page-subtle">Welcome back, Admin. Here's what's happening today.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {statCards.map((stat, index) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <Card className="border-none shadow-lg">
                            <CardBody className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-bold text-page-subtle uppercase tracking-wider mb-1">
                                            {stat.label}
                                        </p>
                                        <p className="text-3xl font-black text-page">{stat.value}</p>
                                    </div>
                                    <div className={`w-12 h-12 ${stat.bg} rounded-xl flex items-center justify-center`}>
                                        <stat.icon className={`w-6 h-6 ${stat.color}`} />
                                    </div>
                                </div>
                                <div className="mt-4 flex items-center gap-2 text-sm text-green-500 font-bold">
                                    <TrendingUp className="w-4 h-4" />
                                    <span>+12% from last month</span>
                                </div>
                            </CardBody>
                        </Card>
                    </motion.div>
                ))}
            </div>

            {/* Recent Activity Section */}
            <div className="grid lg:grid-cols-2 gap-8">
                <Card>
                    <CardBody className="p-6">
                        <h2 className="text-xl font-bold mb-4">Recent Blood Requests</h2>
                        <div className="space-y-4">
                            {requests.slice(0, 5).map(req => (
                                <div key={req.id} className="flex items-center justify-between p-4 rounded-xl bg-page-border/10">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center font-bold text-red-600 dark:text-red-400">
                                            {req.bloodGroup}
                                        </div>
                                        <div>
                                            <p className="font-bold text-sm">Urgency: {req.urgency}</p>
                                            <p className="text-xs text-page-subtle">{req.unitsNeeded} Units • {req.status}</p>
                                        </div>
                                    </div>
                                    <span className="text-xs font-medium px-2 py-1 rounded bg-white dark:bg-black/20 border border-page-border">
                                        {req.requestDate}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </CardBody>
                </Card>

                <Card>
                    <CardBody className="p-6">
                        <h2 className="text-xl font-bold mb-4">System Reports</h2>
                        <div className="h-64 flex items-center justify-center bg-page-border/5 rounded-xl border-2 border-dashed border-page-border text-page-subtle">
                            Chart placeholder (Revenue / Engagement)
                        </div>
                    </CardBody>
                </Card>
            </div>
        </AdminLayout>
    );
}
