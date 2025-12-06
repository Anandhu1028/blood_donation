import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { Card, CardBody } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Button } from '../components/ui/Button';

import { useDonor } from '../contexts/DonorContext';
import { useData } from '../contexts/DataContext';

import { bloodGroups } from '../lib/data';
import { validatePhone, validateEmail, validateName, validatePassword, generateOTP } from '../lib/utils';

import {
    Building2,
    Phone,
    Mail,
    MapPin,
    Lock,
    Shield
} from 'lucide-react';

export function RegisterPage() {
    const navigate = useNavigate();
    const { registerDonor } = useDonor();
    const { registerHospital } = useData();

    const [registrationType, setRegistrationType] = useState("donor");
    const [currentStep, setCurrentStep] = useState(1);
    const [errors, setErrors] = useState({});

    const [otp, setOtp] = useState("");
    const [generatedOTP, setGeneratedOTP] = useState("");

    const [donorData, setDonorData] = useState({
        name: "", age: "", gender: "", bloodGroup: "", phone: "",
        email: "", address: "", city: "", state: "", pincode: "",
        idProof: "", idProofNumber: "", emergencyContact: ""
    });

    const [hospitalData, setHospitalData] = useState({
        name: "",
        email: "",
        phone: "",
        location: "",
        licenseNumber: "",
        password: "",
        confirmPassword: ""
    });

    const [termsAccepted, setTermsAccepted] = useState(false);

    const updateDonor = (f, v) => setDonorData(prev => ({ ...prev, [f]: v }));
    const updateHospital = (f, v) => setHospitalData(prev => ({ ...prev, [f]: v }));

    // -------------------------------------------------------
    // VALIDATION FOR HOSPITAL (ALL FIELDS REQUIRED)
    // -------------------------------------------------------
    const validateHospital = () => {
        const newErrors = {};

        if (!hospitalData.name) newErrors.name = "Hospital name is required";
        else if (!validateName(hospitalData.name)) newErrors.name = "Name must contain letters only";

        if (!hospitalData.licenseNumber) newErrors.licenseNumber = "License Number is required";

        if (!hospitalData.email) newErrors.email = "Email required";
        else if (!validateEmail(hospitalData.email)) newErrors.email = "Enter a valid email";

        if (!hospitalData.phone) newErrors.phone = "Phone number required";
        else if (!validatePhone(hospitalData.phone)) newErrors.phone = "Invalid phone number";

        if (!hospitalData.location) newErrors.location = "Address / Location required";

        if (!hospitalData.password) newErrors.password = "Password required";
        else if (!validatePassword(hospitalData.password))
            newErrors.password = "Password must be at least 8 characters";

        if (!hospitalData.confirmPassword)
            newErrors.confirmPassword = "Confirm your password";
        else if (hospitalData.password !== hospitalData.confirmPassword)
            newErrors.confirmPassword = "Passwords do not match";

        if (!termsAccepted) {
            toast.error("You must accept Terms & Conditions");
            newErrors.terms = "Required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // -------------------------------------------------------
    // DONOR VALIDATION (your original logic kept)
    // -------------------------------------------------------
    const validateDonorStep = () => {
        const newErrors = {};

        if (currentStep === 1) {
            if (!donorData.name) newErrors.name = "Name required";
            else if (!validateName(donorData.name))
                newErrors.name = "Invalid name";

            if (!donorData.bloodGroup)
                newErrors.bloodGroup = "Blood group required";
        }

        if (currentStep === 2) {
            if (!donorData.phone || !validatePhone(donorData.phone))
                newErrors.phone = "Valid phone required";

            if (donorData.email && !validateEmail(donorData.email))
                newErrors.email = "Invalid email";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // -------------------------------------------------------
    // STEP HANDLING
    // -------------------------------------------------------
    const handleNext = () => {
        if (registrationType === "donor") {
            if (!validateDonorStep()) return;

            if (currentStep === 2) {
                const code = generateOTP();
                setGeneratedOTP(code);
                toast.success(`OTP: ${code}`);
            }

            setCurrentStep(prev => prev + 1);
        }
    };

    const handleBack = () => setCurrentStep(prev => prev - 1);

    // -------------------------------------------------------
    // FINAL SUBMIT
    // -------------------------------------------------------
    const handleSubmit = (e) => {
        e.preventDefault();

        if (registrationType === "donor") {
            if (otp !== generatedOTP) {
                toast.error("Invalid OTP");
                return;
            }
            registerDonor(donorData);
            toast.success("Donor Registered!");
            navigate("/login");
            return;
        }

        // Hospital
        if (!validateHospital()) return;

        registerHospital(hospitalData);
        toast.success("Hospital Registered!");
        navigate("/login");
    };

    return (
        <div className="min-h-screen bg-page text-page pb-24">

            {/* HEADER */}
            <div className="bg-hero-gradient py-16 mb-10 border-b border-page-border text-center">
                <h1 className="text-4xl font-extrabold">Join Our Network</h1>
                <p className="text-page-subtle text-lg">Register as a Donor or Hospital</p>
            </div>

            <div className="max-w-3xl mx-auto px-4">

                {/* TYPE SWITCH */}
                <div className="flex justify-center mb-8">
                    <div className="bg-card border p-1 rounded-full flex">
                        <button
                            onClick={() => { setRegistrationType("donor"); setCurrentStep(1); }}
                            className={`px-6 py-2 rounded-full font-bold ${registrationType === "donor" ? "bg-accent text-white" : "text-page-subtle"}`}
                        >
                            Donor
                        </button>
                        <button
                            onClick={() => { setRegistrationType("hospital"); }}
                            className={`px-6 py-2 rounded-full font-bold ${registrationType === "hospital" ? "bg-accent text-white" : "text-page-subtle"}`}
                        >
                            Hospital
                        </button>
                    </div>
                </div>

                <Card hover>
                    <CardBody className="p-8">

                        {/* -----------------------------------------------------
                           HOSPITAL REGISTRATION FORM (FULLY VALIDATED)
                           ----------------------------------------------------- */}
                        {registrationType === "hospital" && (
                            <form onSubmit={handleSubmit} className="space-y-4">

                                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                                    <Building2 className="text-accent" /> Hospital Registration
                                </h2>

                                <Input
                                    label="Hospital Name"
                                    value={hospitalData.name}
                                    onChange={e => updateHospital("name", e.target.value)}
                                    error={errors.name}
                                    icon={Building2}
                                />

                                <Input
                                    label="License Number"
                                    value={hospitalData.licenseNumber}
                                    onChange={e => updateHospital("licenseNumber", e.target.value)}
                                    error={errors.licenseNumber}
                                    icon={Shield}
                                />

                                <div className="grid md:grid-cols-2 gap-4">
                                    <Input
                                        label="Official Email"
                                        value={hospitalData.email}
                                        onChange={e => updateHospital("email", e.target.value)}
                                        error={errors.email}
                                        icon={Mail}
                                    />

                                    <Input
                                        label="Phone"
                                        value={hospitalData.phone}
                                        onChange={e => updateHospital("phone", e.target.value)}
                                        error={errors.phone}
                                        icon={Phone}
                                    />
                                </div>

                                <Input
                                    label="Address / Location"
                                    value={hospitalData.location}
                                    onChange={e => updateHospital("location", e.target.value)}
                                    error={errors.location}
                                    icon={MapPin}
                                />

                                <div className="grid md:grid-cols-2 gap-4">
                                    <Input
                                        label="Password"
                                        type="password"
                                        value={hospitalData.password}
                                        onChange={e => updateHospital("password", e.target.value)}
                                        error={errors.password}
                                        icon={Lock}
                                    />

                                    <Input
                                        label="Confirm Password"
                                        type="password"
                                        value={hospitalData.confirmPassword}
                                        onChange={e => updateHospital("confirmPassword", e.target.value)}
                                        error={errors.confirmPassword}
                                        icon={Lock}
                                    />
                                </div>

                                <label className="flex items-center gap-2 mt-4">
                                    <input
                                        type="checkbox"
                                        checked={termsAccepted}
                                        onChange={e => setTermsAccepted(e.target.checked)}
                                    />
                                    <span>I agree to the Terms & Conditions</span>
                                </label>

                                <Button type="submit" className="w-full mt-6" size="lg">
                                    Register Hospital
                                </Button>
                            </form>
                        )}

                        {/* -----------------------------------------------------
                           DONOR REGISTRATION (UNCHANGED)
                           ----------------------------------------------------- */}
                        {registrationType === "donor" && (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {currentStep === 1 && (
                                    <>
                                        <Input
                                            label="Full Name"
                                            value={donorData.name}
                                            onChange={e => updateDonor("name", e.target.value)}
                                            error={errors.name}
                                        />
                                        <Select
                                            label="Blood Group"
                                            options={bloodGroups}
                                            value={donorData.bloodGroup}
                                            onChange={e => updateDonor("bloodGroup", e.target.value)}
                                            error={errors.bloodGroup}
                                        />
                                    </>
                                )}

                                {currentStep === 2 && (
                                    <>
                                        <Input
                                            label="Phone"
                                            value={donorData.phone}
                                            onChange={e => updateDonor("phone", e.target.value)}
                                            error={errors.phone}
                                        />
                                        <Input
                                            label="Email"
                                            value={donorData.email}
                                            onChange={e => updateDonor("email", e.target.value)}
                                            error={errors.email}
                                        />
                                    </>
                                )}

                                {currentStep === 3 && (
                                    <>
                                        <Input
                                            label="Enter OTP"
                                            value={otp}
                                            onChange={e => setOtp(e.target.value)}
                                        />
                                        <p className="text-xs text-page-subtle">Mock OTP: {generatedOTP}</p>
                                    </>
                                )}

                                <div className="flex justify-between mt-6">
                                    {currentStep > 1 && (
                                        <Button onClick={handleBack} type="button" variant="outline">
                                            Back
                                        </Button>
                                    )}

                                    {currentStep < 3 ? (
                                        <Button onClick={handleNext} type="button">
                                            Next
                                        </Button>
                                    ) : (
                                        <Button type="submit">Complete Registration</Button>
                                    )}
                                </div>
                            </form>
                        )}

                    </CardBody>
                </Card>
            </div>
        </div>
    );
}
