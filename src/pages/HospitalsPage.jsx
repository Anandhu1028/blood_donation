import { useState } from 'react';
import { motion } from 'framer-motion';
import { Hospital, Phone, MapPin, Droplet, Clock, AlertCircle } from 'lucide-react';
import { Card, CardBody } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { BloodGroupBadge } from '../components/ui/BloodGroupBadge';
import { mockHospitalRequests } from '../lib/data';
import { formatDate } from '../lib/utils';

export function HospitalsPage() {
    const [requests] = useState(mockHospitalRequests);
    const [filter, setFilter] = useState('All'); // All, Critical, High, Medium

    const filteredRequests = requests.filter(r => {
        if (filter === 'All') return true;
        return r.urgency === filter;
    });

    const getUrgencyColor = (urgency) => {
        switch (urgency) {
            case 'Critical':
                return 'danger';
            case 'High':
                return 'warning';
            case 'Medium':
                return 'info';
            default:
                return 'default';
        }
    };

    const getUrgencyIcon = (urgency) => {
        if (urgency === 'Critical') {
            return <AlertCircle className="w-4 h-4 animate-pulse text-accent-bright" />;
        }
        return <Clock className="w-4 h-4 text-page-subtle" />;
    };

    return (
        <div className="min-h-screen bg-page text-page">

            {/* HEADER — PREMIUM DARK + METALLIC RIPPLE */}
            {/* HEADER — PREMIUM DARK + METALLIC RIPPLE */}
            <div className="bg-hero-gradient text-page py-16 border-b border-page-border relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-red-600/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                <div className="container-custom px-4 relative z-10">
                    <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-display font-black tracking-tight mb-4">
                                Hospital <span className="text-accent">Requests</span>
                            </h1>
                            <p className="text-xl text-page-subtle max-w-2xl">
                                Live emergency blood requirements from verified hospitals. Your donation can save a life today.
                            </p>
                        </div>

                        {/* Live Indicator */}
                        <div className="flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-full animate-pulse">
                            <div className="w-2 h-2 bg-red-500 rounded-full" />
                            <span className="text-sm font-bold text-red-500 uppercase tracking-wider">Live Updates</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* EMERGENCY BANNER */}
            {/* EMERGENCY BANNER & FILTERS */}
            <div className="sticky top-0 z-30 bg-page/80 backdrop-blur-xl border-b border-page-border">
                <div className="container-custom px-4 py-4">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        {/* Stats */}
                        <div className="flex items-center gap-3 text-sm font-medium">
                            <AlertCircle className="w-5 h-5 text-accent animate-pulse" />
                            <span className="text-page">
                                <span className="text-accent font-bold">{requests.filter(r => r.urgency === 'Critical').length}</span> Critical Requests
                            </span>
                            <span className="w-1 h-1 bg-page-border rounded-full" />
                            <span className="text-page-subtle">
                                {requests.length} Total Active
                            </span>
                        </div>

                        {/* Filter Tabs */}
                        <div className="flex p-1 bg-page-border/20 rounded-xl">
                            {['All', 'Critical', 'High', 'Medium'].map((f) => (
                                <button
                                    key={f}
                                    onClick={() => setFilter(f)}
                                    className={`
                                        px-4 py-1.5 rounded-lg text-sm font-bold transition-all duration-200
                                        ${filter === f
                                            ? 'bg-card text-page shadow-sm scale-105'
                                            : 'text-page-subtle hover:text-page hover:bg-white/5'}
                                    `}
                                >
                                    {f}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* REQUEST LIST */}
            <div className="container-custom px-4 py-10">
                <div className="grid gap-6">
                    {filteredRequests.map((request, index) => (
                        <motion.div
                            key={request.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.06, type: 'spring', stiffness: 110 }}
                        >
                            <div className={`
                                group relative bg-card border rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1
                                ${request.urgency === 'Critical'
                                    ? 'border-red-500/50 shadow-red-500/10'
                                    : 'border-page-border hover:border-accent/30'}
                            `}>
                                {/* Urgency Strip */}
                                <div className={`h-1.5 w-full ${request.urgency === 'Critical' ? 'bg-red-500 animate-pulse' :
                                        request.urgency === 'High' ? 'bg-orange-500' :
                                            'bg-blue-500'
                                    }`} />

                                <div className="p-6">
                                    <div className="flex flex-col lg:flex-row gap-6 items-start">
                                        {/* Left: Blood Group & Units */}
                                        <div className="flex flex-col items-center gap-2 min-w-[80px]">
                                            <BloodGroupBadge bloodGroup={request.bloodGroup} size="xl" className="w-16 h-16 text-2xl shadow-lg" />
                                            <div className="flex items-center gap-1 text-sm font-bold text-page">
                                                <Droplet className="w-4 h-4 text-accent" />
                                                {request.unitsNeeded} Units
                                            </div>
                                        </div>

                                        {/* Middle: Hospital Details */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex flex-wrap items-start justify-between gap-4 mb-2">
                                                <div>
                                                    <h3 className="text-xl font-bold text-page flex items-center gap-2">
                                                        {request.hospitalName}
                                                        {request.urgency === 'Critical' && (
                                                            <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-red-500 text-white animate-pulse">
                                                                Critical
                                                            </span>
                                                        )}
                                                    </h3>
                                                    <div className="flex items-center gap-2 text-sm text-page-subtle mt-1">
                                                        <MapPin className="w-4 h-4 text-page-subtle" />
                                                        {request.address}
                                                    </div>
                                                </div>
                                                <div className="text-right text-xs text-page-subtle">
                                                    <div className="font-medium">Posted</div>
                                                    {formatDate(request.requestDate)}
                                                </div>
                                            </div>

                                            {/* Info Grid */}
                                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 my-4 p-4 bg-page/30 rounded-xl border border-page-border/50">
                                                <div>
                                                    <div className="text-xs text-page-subtle uppercase tracking-wider mb-1">Patient Case</div>
                                                    <div className="font-medium text-page">Emergency Surgery</div>
                                                </div>
                                                <div>
                                                    <div className="text-xs text-page-subtle uppercase tracking-wider mb-1">Contact</div>
                                                    <div className="font-medium text-page">{request.contactPerson}</div>
                                                </div>
                                                <div>
                                                    <div className="text-xs text-page-subtle uppercase tracking-wider mb-1">Status</div>
                                                    <span className="text-green-500 font-bold flex items-center gap-1">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                                                        {request.status}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Actions */}
                                            <div className="flex flex-wrap gap-3">
                                                <a href={`tel:${request.contactPhone}`} className="flex-1 sm:flex-none">
                                                    <Button
                                                        className={`w-full sm:w-auto border-none text-white shadow-lg ${request.urgency === 'Critical'
                                                                ? 'bg-red-600 hover:bg-red-700 shadow-red-600/20 animate-pulse'
                                                                : 'bg-accent hover:bg-accent-bright shadow-accent/20'
                                                            }`}
                                                    >
                                                        <Phone className="w-4 h-4 mr-2" />
                                                        Call Hospital
                                                    </Button>
                                                </a>
                                                <Button variant="outline" className="flex-1 sm:flex-none border-page-border hover:border-accent hover:bg-accent/5">
                                                    <MapPin className="w-4 h-4 mr-2" />
                                                    Directions
                                                </Button>
                                                <Button variant="ghost" className="flex-1 sm:flex-none text-page-subtle hover:text-page">
                                                    I Can Donate
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
