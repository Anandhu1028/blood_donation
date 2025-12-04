import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    User,
    Phone,
    Mail,
    MapPin,
    Droplet,
    Upload,
    CheckCircle,
    ArrowRight,
    ArrowLeft,
    Shield
} from 'lucide-react';

import { Card, CardBody } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Button } from '../components/ui/Button';
import { useDonor } from '../contexts/DonorContext';
import { bloodGroups, indianStates, idProofTypes } from '../lib/data';
import { validatePhone, validateEmail, generateOTP } from '../lib/utils';
import { toast } from 'sonner';

export function RegisterPage() {
    const navigate = useNavigate();
    const { registerDonor, isDonorRegistered } = useDonor();

    const [currentStep, setCurrentStep] = useState(1);
    const [otp, setOtp] = useState('');
    const [generatedOTP, setGeneratedOTP] = useState('');
    const [errors, setErrors] = useState({});

    const [formData, setFormData] = useState({
        name: '',
        age: '',
        gender: '',
        bloodGroup: '',
        phone: '',
        email: '',
        address: '',
        city: '',
        state: '',
        pincode: '',
        coordinates: { lat: 28.6139, lng: 77.2090 },
        lastDonationDate: '',
        isAvailable: true,
        idProof: '',
        idProofNumber: '',
        emergencyContact: '',
    });

    const totalSteps = 4;

    /* -------------------------------
       VALIDATION LOGIC
    --------------------------------*/
    const validateStep = (step) => {
        const newErrors = {};

        if (step === 1) {
            if (!formData.name.trim()) newErrors.name = 'Name is required';
            if (!formData.age || formData.age < 18 || formData.age > 65)
                newErrors.age = 'Age must be between 18 and 65';
            if (!formData.gender) newErrors.gender = 'Gender is required';
            if (!formData.bloodGroup) newErrors.bloodGroup = 'Blood group is required';
        }

        if (step === 2) {
            if (!formData.phone) newErrors.phone = 'Phone number is required';
            else if (!validatePhone(formData.phone)) newErrors.phone = 'Invalid phone number';

            if (!formData.email) newErrors.email = 'Email is required';
            else if (!validateEmail(formData.email)) newErrors.email = 'Invalid email address';

            if (!formData.emergencyContact) newErrors.emergencyContact = 'Emergency contact required';
            else if (!validatePhone(formData.emergencyContact)) newErrors.emergencyContact = 'Invalid phone number';

            if (isDonorRegistered(formData.phone, formData.email)) {
                newErrors.phone = 'This phone/email is already registered';
                toast.error('You are already registered!');
            }
        }

        if (step === 3) {
            if (!formData.address.trim()) newErrors.address = 'Address required';
            if (!formData.city.trim()) newErrors.city = 'City required';
            if (!formData.state) newErrors.state = 'State required';

            if (!formData.pincode || formData.pincode.length !== 6)
                newErrors.pincode = 'Enter valid 6-digit pincode';

            if (!formData.idProof) newErrors.idProof = 'Select an ID proof type';
            if (!formData.idProofNumber.trim())
                newErrors.idProofNumber = 'ID proof number required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    /* -------------------------------
       STEP NAVIGATION
    --------------------------------*/
    const handleNext = () => {
        if (validateStep(currentStep)) {
            if (currentStep === 2) {
                const newOTP = generateOTP();
                setGeneratedOTP(newOTP);
                toast.success(`OTP sent to ${formData.phone}: ${newOTP}`, {
                    description: 'Mock OTP for demo only',
                });
            }
            setCurrentStep(currentStep + 1);
        }
    };

    const handleBack = () => setCurrentStep(currentStep - 1);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (otp !== generatedOTP) {
            setErrors({ otp: 'Invalid OTP' });
            toast.error('Invalid OTP. Try again.');
            return;
        }

        registerDonor(formData);
        toast.success('Registration successful!');
        navigate('/dashboard');
    };

    const updateFormData = (field, value) => {
        setFormData({ ...formData, [field]: value });
        if (errors[field]) setErrors({ ...errors, [field]: '' });
    };

    const steps = [
        { number: 1, title: 'Personal Info', icon: User },
        { number: 2, title: 'Contact Details', icon: Phone },
        { number: 3, title: 'Address & ID', icon: MapPin },
        { number: 4, title: 'Verification', icon: Shield },
    ];

    return (
        <div className="min-h-screen bg-page text-page pb-24">

            {/* HEADER — Metallic Ripple Dark */}
            <div className="bg-hero-gradient text-white py-16 mb-10 border-b border-page-border">
                <div className="container-custom px-4 text-center">
                    <h1 className="text-4xl font-display font-extrabold mb-3">
                        Become a Donor
                    </h1>
                    <p className="text-page-subtle text-lg">
                        Join our mission and start saving lives today
                    </p>
                </div>
            </div>

            <div className="container-custom px-4 max-w-3xl mx-auto">

                {/* PROGRESS STEPS — Premium Dark */}
                <div className="mb-10">
                    <div className="flex items-center justify-between">
                        {steps.map((step, index) => (
                            <div key={step.number} className="flex items-center flex-1">
                                <div className="flex flex-col items-center flex-1">
                                    <div
                                        className={`
                                            w-12 h-12 rounded-full flex items-center justify-center
                                            border-2 transition-all
                                            ${
                                                currentStep >= step.number
                                                    ? 'bg-accent border-accent text-white shadow-lg shadow-accent/40'
                                                    : 'border-page-border text-page-subtle'
                                            }
                                        `}
                                    >
                                        {currentStep > step.number ? (
                                            <CheckCircle className="w-6 h-6" />
                                        ) : (
                                            <step.icon className="w-6 h-6" />
                                        )}
                                    </div>
                                    <span className="text-xs mt-2 hidden sm:block text-page-subtle">
                                        {step.title}
                                    </span>
                                </div>

                                {index < steps.length - 1 && (
                                    <div
                                        className={`h-0.5 flex-1 mx-2 rounded-full transition-all
                                            ${
                                                currentStep > step.number
                                                    ? 'bg-accent'
                                                    : 'bg-page-border'
                                            }`}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* FORM CARD — PREMIUM DARK */}
                <Card hover>
                    <CardBody className="p-8 space-y-6">
                        <form onSubmit={handleSubmit}>
                            <AnimatePresence mode="wait">

                                {/* -------------------------------
                                    STEP 1 — Personal Info
                                --------------------------------*/}
                                {currentStep === 1 && (
                                    <motion.div
                                        key="step1"
                                        initial={{ opacity: 0, x: 25 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -25 }}
                                        transition={{ duration: 0.3 }}
                                        className="space-y-4"
                                    >
                                        <h2 className="text-2xl font-bold mb-4">Personal Information</h2>

                                        <Input
                                            label="Full Name *"
                                            value={formData.name}
                                            onChange={(e) => updateFormData('name', e.target.value)}
                                            error={errors.name}
                                            placeholder="Enter your name"
                                        />

                                        <div className="grid sm:grid-cols-2 gap-4">
                                            <Input
                                                label="Age *"
                                                type="number"
                                                value={formData.age}
                                                onChange={(e) => updateFormData('age', e.target.value)}
                                                error={errors.age}
                                                placeholder="18–65"
                                            />

                                            <Select
                                                label="Gender *"
                                                value={formData.gender}
                                                onChange={(e) => updateFormData('gender', e.target.value)}
                                                error={errors.gender}
                                                options={['Male', 'Female', 'Other']}
                                                placeholder="Select"
                                            />
                                        </div>

                                        <Select
                                            label="Blood Group *"
                                            value={formData.bloodGroup}
                                            onChange={(e) => updateFormData('bloodGroup', e.target.value)}
                                            error={errors.bloodGroup}
                                            options={bloodGroups}
                                            placeholder="Choose your blood group"
                                        />

                                        <Input
                                            label="Last Donation Date (Optional)"
                                            type="date"
                                            value={formData.lastDonationDate}
                                            onChange={(e) => updateFormData('lastDonationDate', e.target.value)}
                                            max={new Date().toISOString().split('T')[0]}
                                        />
                                    </motion.div>
                                )}

                                {/* -------------------------------
                                    STEP 2 — Contact Details
                                --------------------------------*/}
                                {currentStep === 2 && (
                                    <motion.div
                                        key="step2"
                                        initial={{ opacity: 0, x: 25 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -25 }}
                                        transition={{ duration: 0.3 }}
                                        className="space-y-4"
                                    >
                                        <h2 className="text-2xl font-bold mb-4">Contact Details</h2>

                                        <Input
                                            label="Phone Number *"
                                            value={formData.phone}
                                            type="tel"
                                            onChange={(e) => updateFormData('phone', e.target.value)}
                                            error={errors.phone}
                                            placeholder="10-digit number"
                                        />

                                        <Input
                                            label="Email Address *"
                                            value={formData.email}
                                            type="email"
                                            onChange={(e) => updateFormData('email', e.target.value)}
                                            error={errors.email}
                                            placeholder="name@example.com"
                                        />

                                        <Input
                                            label="Emergency Contact *"
                                            value={formData.emergencyContact}
                                            type="tel"
                                            onChange={(e) => updateFormData('emergencyContact', e.target.value)}
                                            error={errors.emergencyContact}
                                            placeholder="10-digit number"
                                        />
                                    </motion.div>
                                )}

                                {/* -------------------------------
                                    STEP 3 — Address & ID
                                --------------------------------*/}
                                {currentStep === 3 && (
                                    <motion.div
                                        key="step3"
                                        initial={{ opacity: 0, x: 25 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -25 }}
                                        transition={{ duration: 0.3 }}
                                        className="space-y-4"
                                    >
                                        <h2 className="text-2xl font-bold mb-4">Address & ID Proof</h2>

                                        <Input
                                            label="Address *"
                                            value={formData.address}
                                            onChange={(e) => updateFormData('address', e.target.value)}
                                            error={errors.address}
                                        />

                                        <div className="grid sm:grid-cols-2 gap-4">
                                            <Input
                                                label="City *"
                                                value={formData.city}
                                                onChange={(e) => updateFormData('city', e.target.value)}
                                                error={errors.city}
                                            />

                                            <Select
                                                label="State *"
                                                value={formData.state}
                                                onChange={(e) => updateFormData('state', e.target.value)}
                                                error={errors.state}
                                                options={indianStates}
                                            />
                                        </div>

                                        <Input
                                            label="Pincode *"
                                            value={formData.pincode}
                                            onChange={(e) => updateFormData('pincode', e.target.value)}
                                            error={errors.pincode}
                                            placeholder="6-digit"
                                            maxLength="6"
                                        />

                                        <Select
                                            label="ID Proof *"
                                            value={formData.idProof}
                                            onChange={(e) => updateFormData('idProof', e.target.value)}
                                            error={errors.idProof}
                                            options={idProofTypes}
                                        />

                                        <Input
                                            label="ID Proof Number *"
                                            value={formData.idProofNumber}
                                            onChange={(e) => updateFormData('idProofNumber', e.target.value)}
                                            error={errors.idProofNumber}
                                        />

                                        {/* INFO BOX — Premium Dark */}
                                        <div className="rounded-lg p-4 border border-accent/20 bg-accent/10">
                                            <p className="text-sm text-accent-bright flex items-center">
                                                <Upload className="w-4 h-4 mr-2" />
                                                ID proof upload is simulated for demo.
                                            </p>
                                        </div>
                                    </motion.div>
                                )}

                                {/* -------------------------------
                                    STEP 4 — OTP Verification
                                --------------------------------*/}
                                {currentStep === 4 && (
                                    <motion.div
                                        key="step4"
                                        initial={{ opacity: 0, x: 25 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -25 }}
                                        transition={{ duration: 0.3 }}
                                        className="space-y-6"
                                    >
                                        <h2 className="text-2xl font-bold mb-4">Verify Phone</h2>

                                        {/* OTP Info Box */}
                                        <div className="rounded-lg p-4 border border-green-500/30 bg-green-500/10">
                                            <p className="text-sm text-green-400 flex items-center mb-1">
                                                <CheckCircle className="w-4 h-4 mr-2" />
                                                OTP sent to {formData.phone}
                                            </p>
                                            <p className="text-xs text-green-300">
                                                Mock OTP: <strong>{generatedOTP}</strong> (demo only)
                                            </p>
                                        </div>

                                        <Input
                                            label="Enter OTP *"
                                            value={otp}
                                            onChange={(e) => setOtp(e.target.value)}
                                            error={errors.otp}
                                            maxLength="6"
                                            placeholder="6-digit OTP"
                                        />

                                        <button
                                            type="button"
                                            onClick={() => {
                                                const newOTP = generateOTP();
                                                setGeneratedOTP(newOTP);
                                                toast.success(`New OTP: ${newOTP}`);
                                            }}
                                            className="text-accent text-sm hover:underline"
                                        >
                                            Resend OTP
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* -------------------------------
                                NAVIGATION BUTTONS
                            --------------------------------*/}
                            <div className="flex justify-between mt-10 pt-6 border-t border-page-border">
                                {currentStep > 1 ? (
                                    <Button variant="outline" type="button" onClick={handleBack}>
                                        <ArrowLeft className="w-4 h-4" />
                                        Back
                                    </Button>
                                ) : (
                                    <div />
                                )}

                                {currentStep < totalSteps ? (
                                    <Button type="button" onClick={handleNext}>
                                        Next <ArrowRight className="w-4 h-4" />
                                    </Button>
                                ) : (
                                    <Button type="submit">
                                        Complete Registration <CheckCircle className="w-4 h-4" />
                                    </Button>
                                )}
                            </div>
                        </form>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
}
