import { useState } from 'react';
import { motion } from 'framer-motion';
import { Hospital, Phone, MapPin, Droplet, Clock, AlertCircle, Heart, Users, Calendar } from 'lucide-react';
import { Card, CardBody } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { BloodGroupBadge } from '../components/ui/BloodGroupBadge';
import { formatDate } from '../lib/utils';
import { useData } from '../contexts/DataContext';

export function HospitalsPage() {
    const { requests, hospitals } = useData();
    const [filter, setFilter] = useState('All');

    // Join requests with hospital data
    const enrichedRequests = requests.map(req => {
        const hospital = hospitals.find(h => h.id === req.hospitalId);
        return {
            ...req,
            hospitalName: hospital?.name || 'Unknown Hospital',
            location: hospital?.location || 'Unknown Location',
            contactNumber: hospital?.phone || '',
        };
    });

    const filteredRequests = enrichedRequests.filter(r => {
        if (filter === 'All') return true;
        return r.urgency === filter;
    });

    const getUrgencyStyles = (urgency) => {
        switch (urgency) {
            case 'Critical':
                return {
                    bg: 'bg-red-500/10',
                    border: 'border-red-500/30',
                    text: 'text-red-500',
                    badge: 'bg-red-500 text-white',
                    glow: 'shadow-[0_0_20px_rgba(239,68,68,0.3)]'
                };
            case 'High':
                return {
                    bg: 'bg-orange-500/10',
                    border: 'border-orange-500/30',
                    text: 'text-orange-500',
                    badge: 'bg-orange-500 text-white',
                    glow: 'shadow-[0_0_15px_rgba(249,115,22,0.2)]'
                };
            case 'Medium':
                return {
                    bg: 'bg-blue-500/10',
                    border: 'border-blue-500/30',
                    text: 'text-blue-500',
                    badge: 'bg-blue-500 text-white',
                    glow: ''
                };
            default:
                return {
                    bg: 'bg-gray-500/10',
                    border: 'border-gray-500/30',
                    text: 'text-gray-500',
                    badge: 'bg-gray-500 text-white',
                    glow: ''
                };
        }
    };

    return (
        <div className="min-h-screen bg-page">
            {/* Beautiful Hero Section with Quote */}
            <div className="relative bg-gradient-to-br from-red-50 via-pink-50 to-purple-50 dark:from-gray-900 dark:via-red-900/20 dark:to-purple-900/20 py-20 overflow-hidden">
                {/* Animated Background Elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.3, 0.5, 0.3],
                        }}
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="absolute top-0 right-0 w-96 h-96 bg-red-400/20 rounded-full blur-3xl"
                    />
                    <motion.div
                        animate={{
                            scale: [1, 1.3, 1],
                            opacity: [0.2, 0.4, 0.2],
                        }}
                        transition={{
                            duration: 10,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 1,
                        }}
                        className="absolute bottom-0 left-0 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl"
                    />
                </div>

                <div className="container-custom px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center max-w-4xl mx-auto"
                    >
                        {/* Icon with Heartbeat */}
                        <motion.div
                            animate={{
                                scale: [1, 1.1, 1],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-red-500 to-pink-600 rounded-3xl mb-6 shadow-2xl shadow-red-500/30"
                        >
                            <Hospital className="w-12 h-12 text-white" />
                        </motion.div>

                        <h1 className="text-5xl md:text-7xl font-display font-black mb-6 leading-tight">
                            Emergency Blood <span className="gradient-text">Requests</span>
                        </h1>

                        {/* Inspiring Quote */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="mb-8 px-6 py-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-red-200/50 dark:border-red-500/20"
                        >
                            <p className="text-lg md:text-xl italic text-page font-medium mb-2">
                                "A single pint of blood can save up to three lives."
                            </p>
                            <p className="text-sm text-page-subtle">
                                — American Red Cross
                            </p>
                        </motion.div>

                        <p className="text-xl md:text-2xl text-page-subtle mb-10 leading-relaxed">
                            Real-time blood requirements from verified hospitals.<br />
                            <span className="text-accent font-semibold">Your donation saves lives today.</span>
                        </p>

                        {/* Enhanced Live Stats */}
                        <div className="flex flex-wrap justify-center gap-4 mb-8">
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="flex items-center gap-3 px-8 py-4 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-red-100 dark:border-red-900/30"
                            >
                                <div className="relative">
                                    <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse" />
                                    <div className="absolute inset-0 w-4 h-4 bg-red-500 rounded-full animate-ping" />
                                </div>
                                <div className="text-left">
                                    <div className="text-3xl font-black text-red-500">
                                        {requests.filter(r => r.urgency === 'Critical').length}
                                    </div>
                                    <div className="text-xs font-semibold text-page-subtle uppercase tracking-wider">
                                        Critical Requests
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="flex items-center gap-3 px-8 py-4 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-pink-100 dark:border-pink-900/30"
                            >
                                <Heart className="w-6 h-6 text-pink-500" />
                                <div className="text-left">
                                    <div className="text-3xl font-black text-page">
                                        {requests.length}
                                    </div>
                                    <div className="text-xs font-semibold text-page-subtle uppercase tracking-wider">
                                        Active Requests
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="flex items-center gap-3 px-8 py-4 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-purple-100 dark:border-purple-900/30"
                            >
                                <Users className="w-6 h-6 text-purple-500" />
                                <div className="text-left">
                                    <div className="text-3xl font-black text-page">
                                        {requests.reduce((sum, r) => sum + r.unitsNeeded, 0)}
                                    </div>
                                    <div className="text-xs font-semibold text-page-subtle uppercase tracking-wider">
                                        Units Needed
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Professional Filter Section */}
            <div className="sticky top-0 z-40 bg-page/95 backdrop-blur-xl border-b border-page-border shadow-sm">
                <div className="container-custom px-4 py-4">
                    <div className="flex flex-wrap justify-center gap-2">
                        {['All', 'Critical', 'High', 'Medium'].map((f) => (
                            <motion.button
                                key={f}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setFilter(f)}
                                className={`
                                    px-6 py-2.5 rounded-xl font-semibold transition-all duration-300
                                    ${filter === f
                                        ? 'bg-gradient-to-r from-red-500 to-pink-600 text-white shadow-lg shadow-red-500/30'
                                        : 'bg-white dark:bg-gray-800 text-page-subtle hover:text-page border border-page-border hover:border-accent/30'
                                    }
                                `}
                            >
                                {f}
                                {f !== 'All' && (
                                    <span className="ml-2 px-2 py-0.5 rounded-full bg-white/20 text-xs">
                                        {enrichedRequests.filter(r => r.urgency === f).length}
                                    </span>
                                )}
                            </motion.button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Requests List View */}
            <div className="container-custom px-4 py-12">
                {filteredRequests.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-20"
                    >
                        <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                            <Heart className="w-12 h-12 text-gray-400" />
                        </div>
                        <h3 className="text-2xl font-bold mb-2">No Requests Found</h3>
                        <p className="text-page-subtle">Try adjusting your filters</p>
                    </motion.div>
                ) : (
                    <div className="space-y-6">
                        {filteredRequests.map((request, index) => {
                            const styles = getUrgencyStyles(request.urgency);

                            return (
                                <motion.div
                                    key={request.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
                                    whileHover={{ x: 5, scale: 1.01 }}
                                    className="group"
                                >
                                    <Card className={`border-2 ${styles.border} ${styles.bg} ${styles.glow} hover:shadow-2xl transition-all duration-500 overflow-hidden relative`}>
                                        {/* Gradient Overlay */}
                                        <div className="absolute top-0 right-0 w-64 h-full bg-gradient-to-l from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                        <CardBody className="p-6 md:p-8">
                                            <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center">
                                                {/* Left Section - Hospital Info */}
                                                <div className="flex items-start gap-4 flex-1 min-w-0">
                                                    <motion.div
                                                        whileHover={{ rotate: 360, scale: 1.1 }}
                                                        transition={{ duration: 0.6 }}
                                                        className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0"
                                                    >
                                                        <Hospital className="w-8 h-8 text-white" />
                                                    </motion.div>
                                                    <div className="flex-1 min-w-0">
                                                        <h3 className="font-black text-xl md:text-2xl text-page mb-2 group-hover:text-accent transition-colors">
                                                            {request.hospitalName}
                                                        </h3>
                                                        <div className="flex items-center gap-2 text-sm text-page-subtle mb-3">
                                                            <MapPin className="w-4 h-4 flex-shrink-0" />
                                                            <span className="line-clamp-1">{request.location}</span>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <Calendar className="w-4 h-4 text-page-subtle" />
                                                            <span className="text-sm font-medium text-page-subtle">Posted: {formatDate(request.requestDate)}</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Middle Section - Blood & Units */}
                                                <div className="flex flex-wrap lg:flex-nowrap gap-4 items-center">
                                                    {/* Urgency Badge */}
                                                    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl ${styles.badge} shadow-lg`}>
                                                        {request.urgency === 'Critical' && (
                                                            <AlertCircle className="w-5 h-5 animate-pulse" />
                                                        )}
                                                        <span className="text-sm font-black uppercase tracking-wider whitespace-nowrap">
                                                            {request.urgency}
                                                        </span>
                                                    </div>

                                                    {/* Blood Group */}
                                                    <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-br from-white/50 to-white/30 dark:from-gray-800/50 dark:to-gray-800/30 rounded-xl backdrop-blur-sm border border-white/20 dark:border-gray-700/20">
                                                        <Droplet className="w-5 h-5 text-accent" />
                                                        <BloodGroupBadge bloodGroup={request.bloodGroup} size="lg" />
                                                    </div>

                                                    {/* Units */}
                                                    <div className="flex items-center gap-3 px-5 py-3 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl border border-blue-200/50 dark:border-blue-800/30">
                                                        <Users className="w-6 h-6 text-blue-500" />
                                                        <div>
                                                            <div className="text-xs font-semibold text-page-subtle uppercase">Units</div>
                                                            <div className="text-2xl font-black text-accent">{request.unitsNeeded}</div>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Right Section - Actions */}
                                                <div className="flex flex-col sm:flex-row lg:flex-col gap-2 lg:w-48">
                                                    <Button className="group/btn relative overflow-hidden">
                                                        <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-red-600 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                                                        <div className="relative flex items-center justify-center gap-2">
                                                            <Heart className="w-5 h-5" fill="currentColor" />
                                                            <span className="font-bold">Donate</span>
                                                        </div>
                                                    </Button>
                                                    <a href={`tel:${request.contactNumber}`} className="flex-1 lg:flex-none">
                                                        <Button variant="outline" className="w-full group/btn">
                                                            <Phone className="w-5 h-5 group-hover/btn:rotate-12 transition-transform" />
                                                            <span className="font-bold">Call</span>
                                                        </Button>
                                                    </a>
                                                </div>
                                            </div>
                                        </CardBody>
                                    </Card>
                                </motion.div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}

export default HospitalsPage;
