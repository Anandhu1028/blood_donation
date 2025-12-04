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
            <div className="bg-hero-gradient text-white py-12 border-b border-page-border">
                <div className="container-custom px-4">
                    <h1 className="text-4xl font-display font-extrabold tracking-tight mb-3">
                        Hospital Blood Requests
                    </h1>
                    <p className="text-lg text-page-subtle">
                        Emergency blood requirements from hospitals near you
                    </p>
                </div>
            </div>

            {/* EMERGENCY BANNER */}
            <div className="bg-accent/10 border-y border-accent/20 py-4 backdrop-blur">
                <div className="container-custom px-4">
                    <div className="flex items-center gap-3">
                        <AlertCircle className="w-6 h-6 text-accent-bright animate-pulse" />
                        <p className="text-accent-bright font-medium">
                            {requests.filter(r => r.urgency === 'Critical').length} Critical requests need immediate attention
                        </p>
                    </div>
                </div>
            </div>

            {/* REQUEST LIST */}
            <div className="container-custom px-4 py-10">
                <div className="grid gap-6">
                    {requests.map((request, index) => (
                        <motion.div
                            key={request.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.06, type: 'spring', stiffness: 110 }}
                        >
                            <Card
                                hover
                                className={`
                                    ${request.urgency === 'Critical' ? 'card-critical-glow' : ''}
                                `}
                            >
                                <CardBody>
                                    <div className="flex flex-col lg:flex-row gap-8">

                                        {/* Blood Group Badge */}
                                        <div className="flex-shrink-0">
                                            <BloodGroupBadge bloodGroup={request.bloodGroup} size="lg" />
                                        </div>

                                        {/* MAIN INFO SECTION */}
                                        <div className="flex-1">
                                            <div className="flex flex-wrap items-start justify-between gap-4 mb-4">

                                                {/* Hospital Title */}
                                                <div>
                                                    <h3 className="text-2xl font-bold flex items-center gap-2 mb-1">
                                                        <Hospital className="w-6 h-6 text-accent" />
                                                        {request.hospitalName}
                                                    </h3>

                                                    <div className="flex flex-wrap gap-3 text-sm text-page-subtle">
                                                        <span className="flex items-center gap-1">
                                                            <MapPin className="w-4 h-4 text-accent" />
                                                            {request.address}
                                                        </span>
                                                        <span className="opacity-50">•</span>
                                                        <span>Posted: {formatDate(request.requestDate)}</span>
                                                    </div>
                                                </div>

                                                {/* Urgency Badge */}
                                                <Badge
                                                    variant={getUrgencyColor(request.urgency)}
                                                    className="text-base px-3 py-1 flex items-center gap-2 shadow-sm"
                                                >
                                                    {getUrgencyIcon(request.urgency)}
                                                    {request.urgency} Urgency
                                                </Badge>
                                            </div>

                                            {/* GRID INFO BOXES */}
                                            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                                                <div className="info-box-premium">
                                                    <p className="info-label">Blood Group</p>
                                                    <p className="info-value">{request.bloodGroup}</p>
                                                </div>

                                                <div className="info-box-premium">
                                                    <p className="info-label">Units Needed</p>
                                                    <p className="info-value flex items-center gap-1">
                                                        <Droplet className="w-5 h-5 text-accent-bright" />
                                                        {request.unitsNeeded}
                                                    </p>
                                                </div>

                                                <div className="info-box-premium">
                                                    <p className="info-label">Contact Person</p>
                                                    <p className="info-value">{request.contactPerson}</p>
                                                </div>

                                                <div className="info-box-premium">
                                                    <p className="info-label">Status</p>
                                                    <Badge variant="success">{request.status}</Badge>
                                                </div>
                                            </div>

                                            {/* ACTION BUTTONS */}
                                            <div className="flex flex-wrap gap-4">
                                                <a href={`tel:${request.contactPhone}`}>
                                                    <Button>
                                                        <Phone className="w-4 h-4 mr-1" />
                                                        Call Hospital
                                                    </Button>
                                                </a>

                                                <Button variant="outline">
                                                    <MapPin className="w-4 h-4 mr-1" />
                                                    View on Map
                                                </Button>

                                                <Button variant="ghost">
                                                    I Can Donate
                                                </Button>
                                            </div>

                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
