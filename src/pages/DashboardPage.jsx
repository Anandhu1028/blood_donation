import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    User,
    Edit,
    Trash2,
    Calendar,
    Award,
    QrCode,
    Download,
    CheckCircle,
    Clock,
    Droplet,
    MapPin
} from 'lucide-react';

import { Card, CardBody, CardHeader } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { BloodGroupBadge } from '../components/ui/BloodGroupBadge';
import { Modal } from '../components/ui/Modal';
import { Input } from '../components/ui/Input';

import { useDonor } from '../contexts/DonorContext';
import {
    formatDate,
    formatPhoneNumber,
    isDonorEligible,
    calculateNextDonationDate,
    daysUntilEligible
} from '../lib/utils';

import { toast } from 'sonner';

export function DashboardPage() {
    const { currentDonor, updateDonor, deleteDonor, donationHistory, logoutDonor, addDonationRecord } = useDonor();

    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showQRModal, setShowQRModal] = useState(false);
    const [showScheduleModal, setShowScheduleModal] = useState(false);

    const [editData, setEditData] = useState({});
    const [scheduleData, setScheduleData] = useState({
        date: new Date().toISOString().split('T')[0],
        location: '',
        bloodUnits: 1,
        notes: ''
    });

    if (!currentDonor) return <Navigate to="/register" />;

    const history = donationHistory[currentDonor.id] || [];

    const isEligible = isDonorEligible(currentDonor.lastDonationDate);
    const nextDonationDate = calculateNextDonationDate(currentDonor.lastDonationDate);
    const daysRemaining = daysUntilEligible(currentDonor.lastDonationDate);

    const handleEdit = () => {
        setEditData({
            phone: currentDonor.phone,
            email: currentDonor.email,
            address: currentDonor.address,
            city: currentDonor.city,
            emergencyContact: currentDonor.emergencyContact,
            isAvailable: currentDonor.isAvailable,
        });
        setShowEditModal(true);
    };

    const handleSaveEdit = () => {
        updateDonor(currentDonor.id, editData);
        setShowEditModal(false);
        toast.success('Profile updated successfully');
    };

    const handleDelete = () => {
        deleteDonor(currentDonor.id);
        logoutDonor();
        toast.success('Profile deleted successfully');
    };

    const handleScheduleDonation = () => {
        if (!scheduleData.location) {
            toast.error('Please enter a location');
            return;
        }

        // In a real app, this would likely be a separate "scheduled" state
        // For this demo, we'll add it as a record but maybe mark it differently or just add it
        // Simulating a completed donation for now as per "Schedule" usually implies future, 
        // but the request is "set the Schedule Donation", which often means "Log a Donation" in simple apps.
        // However, to be precise, let's treat it as logging a new donation record.

        addDonationRecord(currentDonor.id, {
            date: scheduleData.date,
            location: scheduleData.location,
            bloodUnits: parseInt(scheduleData.bloodUnits),
            notes: scheduleData.notes
        });

        setShowScheduleModal(false);
        toast.success('Donation scheduled successfully!');

        // Reset form
        setScheduleData({
            date: new Date().toISOString().split('T')[0],
            location: '',
            bloodUnits: 1,
            notes: ''
        });
    };

    return (
        <div className="min-h-screen bg-page text-page pb-20">

            {/* HEADER — Premium Metallic Ripple */}
            <div className="bg-hero-gradient py-16 border-b border-page-border text-page">
                <div className="container-custom px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h1 className="text-4xl font-display font-extrabold mb-3">
                            My Dashboard
                        </h1>
                        <p className="text-page-subtle text-lg">
                            Manage your donor profile and track your journey
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* CONTENT */}
            <div className="container-custom px-4 mt-10">

                <div className="grid lg:grid-cols-3 gap-8">

                    {/* --- PROFILE CARD --- */}
                    <div className="lg:col-span-1">
                        <Card hover>
                            <CardBody className="text-center">

                                <BloodGroupBadge
                                    bloodGroup={currentDonor.bloodGroup}
                                    size="lg"
                                    className="mx-auto mb-4"
                                />

                                <h2 className="text-2xl font-bold mb-1">{currentDonor.name}</h2>
                                <p className="text-page-subtle mb-4">
                                    {currentDonor.age} yrs • {currentDonor.gender}
                                </p>

                                {isEligible ? (
                                    <Badge variant="success" className="mb-4">
                                        <CheckCircle className="w-4 h-4" /> Available to Donate
                                    </Badge>
                                ) : (
                                    <Badge variant="warning" className="mb-4">
                                        <Clock className="w-4 h-4" />
                                        Eligible in {daysRemaining} days
                                    </Badge>
                                )}

                                {/* Info Grid */}
                                <div className="space-y-2 text-sm text-left mb-6">
                                    <div className="flex justify-between">
                                        <span className="text-page-subtle">Phone:</span>
                                        <span className="font-medium">{formatPhoneNumber(currentDonor.phone)}</span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span className="text-page-subtle">Email:</span>
                                        <span className="font-medium break-all">{currentDonor.email}</span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span className="text-page-subtle">City:</span>
                                        <span className="font-medium">{currentDonor.city}</span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span className="text-page-subtle">Total Donations:</span>
                                        <span className="font-medium">{currentDonor.donationCount}</span>
                                    </div>
                                </div>

                                <div className="flex gap-2">
                                    <Button onClick={handleEdit} className="flex-1 bg-black text-white hover:bg-gray-800 border-none text-sm">
                                        <Edit className="w-4 h-4" /> Edit
                                    </Button>

                                    <Button onClick={() => setShowQRModal(true)} className="flex-1 bg-black text-white hover:bg-gray-800 border-none text-sm">
                                        <QrCode className="w-4 h-4" /> QR Card
                                    </Button>
                                </div>

                                <button
                                    onClick={() => setShowDeleteModal(true)}
                                    className="mt-4 text-sm text-accent-bright hover:underline"
                                >
                                    Delete Profile
                                </button>
                            </CardBody>
                        </Card>
                    </div>

                    {/* --- RIGHT SIDE CONTENT --- */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* --- STATS GRID --- */}
                        <div className="grid sm:grid-cols-3 gap-6">

                            <Card hover>
                                <CardBody className="text-center">
                                    <Droplet className="w-10 h-10 mx-auto mb-2 text-accent-bright" />
                                    <h3 className="text-3xl font-bold">{currentDonor.donationCount}</h3>
                                    <p className="text-page-subtle">Total Donations</p>
                                </CardBody>
                            </Card>

                            <Card hover>
                                <CardBody className="text-center">
                                    <Calendar className="w-10 h-10 mx-auto mb-2 text-blue-400" />
                                    <h3 className="text-lg font-bold">{formatDate(currentDonor.lastDonationDate)}</h3>
                                    <p className="text-page-subtle">Last Donation</p>
                                </CardBody>
                            </Card>

                            <Card hover>
                                <CardBody className="text-center">
                                    <Award className="w-10 h-10 mx-auto mb-2 text-purple-400" />

                                    <h3 className="text-lg font-bold">
                                        {currentDonor.donationCount >= 10 ? 'Gold' :
                                            currentDonor.donationCount >= 5 ? 'Silver' :
                                                'Bronze'}
                                    </h3>

                                    <p className="text-page-subtle">Donor Badge</p>
                                </CardBody>
                            </Card>

                        </div>

                        {/* --- NEXT DONATION SECTION --- */}
                        <Card hover>
                            <CardHeader>
                                <h3 className="text-xl font-bold">Next Eligible Donation</h3>
                            </CardHeader>

                            <CardBody>

                                {isEligible ? (
                                    <div className="text-center py-8">
                                        <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-500" />

                                        <h4 className="text-2xl font-bold mb-2">You're Eligible!</h4>

                                        <p className="text-page-subtle mb-4">
                                            You can donate now — thank you for your commitment!
                                        </p>

                                        <Button onClick={() => setShowScheduleModal(true)}>
                                            Schedule Donation
                                        </Button>
                                    </div>
                                ) : (
                                    <div className="text-center py-8">
                                        <Clock className="w-16 h-16 mx-auto mb-4 text-orange-400" />

                                        <h4 className="text-2xl font-bold mb-2">{daysRemaining} Days Left</h4>

                                        <p className="text-page-subtle">
                                            Eligible on <strong>{formatDate(nextDonationDate)}</strong>
                                        </p>
                                    </div>
                                )}

                            </CardBody>
                        </Card>

                        {/* --- DONATION HISTORY --- */}
                        <Card hover>
                            <CardHeader>
                                <h3 className="text-xl font-bold">Donation History</h3>
                            </CardHeader>

                            <CardBody>
                                {history.length === 0 ? (
                                    <div className="text-center py-10 text-page-subtle">
                                        <Calendar className="w-12 h-12 mx-auto mb-3 opacity-40" />
                                        <p>No previous donations found</p>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {history.map((record) => (
                                            <div
                                                key={record.id}
                                                className="p-4 rounded-lg bg-card/40 border border-card-border flex items-center justify-between"
                                            >
                                                <div>
                                                    <p className="font-medium">{record.location}</p>
                                                    <p className="text-page-subtle text-sm">{formatDate(record.date)}</p>
                                                </div>

                                                <Badge variant="success">
                                                    {record.bloodUnits} Unit(s)
                                                </Badge>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </CardBody>
                        </Card>

                    </div>
                </div>
            </div>

            {/* ========================================= */}
            {/* EDIT PROFILE MODAL */}
            {/* ========================================= */}
            <Modal
                isOpen={showEditModal}
                onClose={() => setShowEditModal(false)}
                title="Edit Profile"
            >
                <div className="space-y-4">
                    <Input
                        label="Phone"
                        value={editData.phone}
                        onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                    />
                    <Input
                        label="Email"
                        value={editData.email}
                        onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                    />
                    <Input
                        label="Address"
                        value={editData.address}
                        onChange={(e) => setEditData({ ...editData, address: e.target.value })}
                    />
                    <Input
                        label="City"
                        value={editData.city}
                        onChange={(e) => setEditData({ ...editData, city: e.target.value })}
                    />
                    <Input
                        label="Emergency Contact"
                        value={editData.emergencyContact}
                        onChange={(e) => setEditData({ ...editData, emergencyContact: e.target.value })}
                    />

                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="isAvailable"
                            checked={editData.isAvailable}
                            onChange={(e) =>
                                setEditData({ ...editData, isAvailable: e.target.checked })
                            }
                            className="w-4 h-4"
                        />

                        <label htmlFor="isAvailable" className="text-sm">
                            Available for donation
                        </label>
                    </div>

                    <div className="flex gap-3 pt-4">
                        <Button className="flex-1" onClick={handleSaveEdit}>
                            Save Changes
                        </Button>

                        <Button className="flex-1 bg-black text-white hover:bg-gray-800 border-none" onClick={() => setShowEditModal(false)}>
                            Cancel
                        </Button>
                    </div>
                </div>
            </Modal>

            {/* ========================================= */}
            {/* SCHEDULE DONATION MODAL */}
            {/* ========================================= */}
            <Modal
                isOpen={showScheduleModal}
                onClose={() => setShowScheduleModal(false)}
                title="Schedule Donation"
            >
                <div className="space-y-4">
                    <div className="bg-accent/10 p-4 rounded-lg border border-accent/20 mb-4">
                        <p className="text-sm text-accent-bright flex items-center gap-2">
                            <CheckCircle className="w-4 h-4" />
                            You are eligible to donate today!
                        </p>
                    </div>

                    <Input
                        label="Donation Date"
                        type="date"
                        value={scheduleData.date}
                        onChange={(e) => setScheduleData({ ...scheduleData, date: e.target.value })}
                    />

                    <Input
                        label="Hospital / Camp Location"
                        placeholder="e.g. City Hospital, Red Cross Camp"
                        value={scheduleData.location}
                        onChange={(e) => setScheduleData({ ...scheduleData, location: e.target.value })}
                        icon={<MapPin className="w-4 h-4 text-page-subtle" />}
                    />

                    <div>
                        <label className="block text-sm font-medium mb-1 text-page-subtle">Units</label>
                        <select
                            className="w-full px-4 py-2 rounded-lg bg-card border border-card-border focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all"
                            value={scheduleData.bloodUnits}
                            onChange={(e) => setScheduleData({ ...scheduleData, bloodUnits: e.target.value })}
                        >
                            <option value="1">1 Unit</option>
                            <option value="2">2 Units</option>
                        </select>
                    </div>

                    <Input
                        label="Notes (Optional)"
                        placeholder="Any specific details..."
                        value={scheduleData.notes}
                        onChange={(e) => setScheduleData({ ...scheduleData, notes: e.target.value })}
                    />

                    <div className="flex gap-3 pt-4">
                        <Button className="flex-1" onClick={handleScheduleDonation}>
                            Confirm Schedule
                        </Button>

                        <Button className="flex-1 bg-black text-white hover:bg-gray-800 border-none" onClick={() => setShowScheduleModal(false)}>
                            Cancel
                        </Button>
                    </div>
                </div>
            </Modal>

            {/* ========================================= */}
            {/* DELETE MODAL */}
            {/* ========================================= */}
            <Modal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                title="Delete Profile"
                size="sm"
            >
                <div className="text-center">
                    <Trash2 className="w-14 h-14 mx-auto mb-4 text-accent-bright" />

                    <h3 className="text-xl font-bold mb-2">Are you sure?</h3>

                    <p className="text-page-subtle mb-6">
                        This action will permanently delete your profile and donation history.
                    </p>

                    <div className="flex gap-3">
                        <Button
                            className="flex-1 bg-accent-bright hover:bg-accent-dark"
                            onClick={handleDelete}
                        >
                            Yes, Delete
                        </Button>

                        <Button className="flex-1 bg-black text-white hover:bg-gray-800 border-none" onClick={() => setShowDeleteModal(false)}>
                            Cancel
                        </Button>
                    </div>
                </div>
            </Modal>

            {/* ========================================= */}
            {/* QR MODAL */}
            {/* ========================================= */}
            <Modal
                isOpen={showQRModal}
                onClose={() => setShowQRModal(false)}
                title="Digital Donor Card"
            >
                <div className="text-center">

                    <div className="bg-gradient-to-br from-accent to-accent-bright p-8 rounded-xl text-white mb-6 shadow-lg shadow-accent/30">
                        <BloodGroupBadge
                            bloodGroup={currentDonor.bloodGroup}
                            size="lg"
                            className="mx-auto mb-4"
                        />

                        <h3 className="text-2xl font-bold mb-1">{currentDonor.name}</h3>
                        <p className="mb-4 opacity-90">Donor ID: {currentDonor.id}</p>

                        {/* Mock QR */}
                        <div className="bg-white p-4 rounded-lg inline-block shadow-md">
                            <div className="w-48 h-48 bg-gray-200 flex items-center justify-center">
                                <QrCode className="w-24 h-24 text-gray-400" />
                            </div>
                        </div>

                        <p className="mt-4 text-sm opacity-90">Mock QR Code (Demo Only)</p>
                    </div>

                    <Button
                        className="w-full"
                        onClick={() => toast.success('QR Card downloaded')}
                    >
                        <Download className="w-4 h-4" />
                        Download Card
                    </Button>
                </div>
            </Modal>
        </div>
    );
}
