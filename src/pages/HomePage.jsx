import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Search,
    UserPlus,
    Heart,
    MapPin,
    Clock,
    Shield,
    Users,
    Activity,
    Award,
    Droplet,
    ArrowRight,
    CheckCircle,
    Zap,
    Star,
    TrendingUp,
    Phone,
    Calendar,
    Scale,
    XCircle,
    AlertCircle,
    HeartPulse,
    Brain,
    Smile,
    ShieldCheck,
    UserCheck
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardBody } from '../components/ui/Card';
import { BloodGroupBadge } from '../components/ui/BloodGroupBadge';
import { useLanguage } from '../contexts/LanguageContext';
import { useDonor } from '../contexts/DonorContext';
import { bloodGroups } from '../lib/data';

export function HomePage() {
    const { t } = useLanguage();
    const { donors } = useDonor();

    const features = [
        {
            icon: Zap,
            title: 'Instant Matching',
            description: 'AI-powered donor matching finds the perfect match in seconds.',
            color: 'from-yellow-500 via-orange-500 to-red-500',
            glow: 'shadow-neon-red',
        },
        {
            icon: MapPin,
            title: 'Geo-Location',
            description: 'Real-time location tracking finds donors within your radius.',
            color: 'from-blue-500 via-cyan-500 to-teal-500',
            glow: 'shadow-neon-blue',
        },
        {
            icon: Shield,
            title: 'Verified & Secure',
            description: 'Military-grade encryption keeps your data safe and private.',
            color: 'from-purple-500 via-pink-500 to-red-500',
            glow: 'shadow-neon-purple',
        },
        {
            icon: Clock,
            title: '24/7 Availability',
            description: 'Round-the-clock access to our global donor network.',
            color: 'from-green-500 via-emerald-500 to-teal-500',
            glow: 'shadow-neon-teal',
        },
        {
            icon: Heart,
            title: 'Emergency SOS',
            description: 'Critical alerts reach thousands of donors instantly.',
            color: 'from-red-500 via-rose-500 to-pink-500',
            glow: 'shadow-neon-red',
        },
        {
            icon: TrendingUp,
            title: 'Impact Tracking',
            description: 'See your real-time impact on lives saved worldwide.',
            color: 'from-indigo-500 via-purple-500 to-pink-500',
            glow: 'shadow-neon-purple',
        },
    ];

    const stats = [
        { icon: Users, label: 'Active Donors', value: donors.length.toString(), suffix: '+', color: 'text-blue-400' },
        { icon: Droplet, label: 'Lives Saved', value: '3.7', suffix: 'K', color: 'text-red-400' },
        { icon: Activity, label: 'Success Rate', value: '98', suffix: '%', color: 'text-green-400' },
        { icon: Award, label: 'Partner Hospitals', value: '156', suffix: '+', color: 'text-purple-400' },
    ];

    return (
        <div className="min-h-screen relative overflow-hidden">
            {/* Animated Background Particles */}
            <div className="particles fixed inset-0 z-0">
                {[...Array(30)].map((_, i) => (
                    <div
                        key={i}
                        className="particle"
                        style={{
                            left: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 20}s`,
                            animationDuration: `${15 + Math.random() * 10}s`,
                        }}
                    />
                ))}
            </div>

            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
                {/* Gradient Orbs */}
                <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-radial from-red-500/20 to-transparent blur-3xl animate-pulse" />
                <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-gradient-radial from-purple-500/20 to-transparent blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-radial from-blue-500/10 to-transparent blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />

                <div className="container-custom px-4 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        {/* Left Content */}
                        <motion.div
                            initial={{ opacity: 0, x: -100 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1, type: "spring", bounce: 0.4 }}
                            className="text-center lg:text-left"
                        >
                            <motion.div
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.2 }}
                                className="inline-block mb-6"
                            >
                                <span className="px-6 py-2 rounded-full bg-gradient-to-r from-red-500/20 to-purple-500/20 border border-red-500/30 text-red-400 text-sm font-bold uppercase tracking-wider backdrop-blur-xl">
                                    🩸 Saving Lives, One Drop at a Time
                                </span>
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="text-7xl md:text-8xl font-display font-black mb-6 leading-none"
                            >
                                <span className="gradient-text">BloodLife</span>
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="text-2xl text-page-subtle mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0"
                            >
                                The world's most advanced blood donor network. Connect instantly with verified donors and save lives in real-time.
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="flex flex-wrap gap-4 justify-center lg:justify-start"
                            >
                                <Link to="/search">
                                    <Button size="lg" className="glow-effect group">
                                        <Search className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                                        Find Donors
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </Button>
                                </Link>
                                <Link to="/register">
                                    <Button size="lg" variant="outline" className="group">
                                        <UserPlus className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                        Become a Hero
                                    </Button>
                                </Link>
                            </motion.div>

                            {/* Quick Stats */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                                className="grid grid-cols-3 gap-6 mt-12"
                            >
                                {stats.slice(0, 3).map((stat, index) => (
                                    <div key={stat.label} className="text-center lg:text-left">
                                        <div className={`text-4xl font-black ${stat.color} mb-1`}>
                                            {stat.value}{stat.suffix}
                                        </div>
                                        <div className="text-xs text-page-subtle uppercase tracking-wider">{stat.label}</div>
                                    </div>
                                ))}
                            </motion.div>
                        </motion.div>

                        {/* Right Content - 3D Blood Groups */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1, delay: 0.3 }}
                            className="hidden lg:block perspective-2000"
                        >
                            <div className="relative transform-3d">
                                {/* Circular arrangement */}
                                <div className="relative w-[500px] h-[500px] mx-auto">
                                    {bloodGroups.map((group, index) => {
                                        const angle = (index * 360) / bloodGroups.length;
                                        const radius = 180;
                                        const x = Math.cos((angle * Math.PI) / 180) * radius;
                                        const y = Math.sin((angle * Math.PI) / 180) * radius;

                                        return (
                                            <motion.div
                                                key={group}
                                                initial={{ opacity: 0, scale: 0, rotate: -180 }}
                                                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                                transition={{
                                                    delay: 0.5 + index * 0.1,
                                                    type: "spring",
                                                    stiffness: 200,
                                                }}
                                                className="absolute top-1/2 left-1/2"
                                                style={{
                                                    transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                                                }}
                                            >
                                                <BloodGroupBadge bloodGroup={group} size="xl" animate />
                                            </motion.div>
                                        );
                                    })}

                                    {/* Center Droplet */}
                                    <motion.div
                                        animate={{
                                            scale: [1, 1.1, 1],
                                            rotate: [0, 360],
                                        }}
                                        transition={{
                                            duration: 20,
                                            repeat: Infinity,
                                            ease: "linear",
                                        }}
                                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                                    >
                                        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-red-500 to-purple-600 flex items-center justify-center shadow-neon-red">
                                            <Droplet className="w-16 h-16 text-white" fill="currentColor" />
                                        </div>
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
                >
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center p-2"
                    >
                        <div className="w-1 h-2 bg-red-500 rounded-full" />
                    </motion.div>
                </motion.div>
            </section>

            {/* Stats Section */}
            <section className="section relative">
                <div className="container-custom px-4">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Card className="card-neon text-center group cursor-pointer">
                                    <CardBody className="p-8">
                                        <stat.icon className={`w-16 h-16 mx-auto mb-4 ${stat.color} group-hover:scale-110 transition-transform`} />
                                        <div className={`text-5xl font-black ${stat.color} mb-2`}>
                                            {stat.value}{stat.suffix}
                                        </div>
                                        <div className="text-page-subtle uppercase tracking-wider text-sm">{stat.label}</div>
                                    </CardBody>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="section relative">
                <div className="container-custom px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-6xl font-display font-black mb-6">
                            <span className="gradient-text">Next-Gen Features</span>
                        </h2>
                        <p className="text-2xl text-page-subtle max-w-3xl mx-auto">
                            Powered by cutting-edge technology to deliver the fastest, most reliable blood donor network on the planet.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Card className="card-hover h-full group cursor-pointer">
                                    <CardBody className="p-8">
                                        <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 ${feature.glow} group-hover:scale-110 transition-transform`}>
                                            <feature.icon className="w-10 h-10 text-white" />
                                        </div>
                                        <h3 className="text-2xl font-bold mb-3 text-white">{feature.title}</h3>
                                        <p className="text-page-subtle leading-relaxed">{feature.description}</p>
                                    </CardBody>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="section relative bg-page-border/5">
                <div className="container-custom px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-5xl font-display font-black mb-6">
                            <span className="gradient-text">How It Works</span>
                        </h2>
                        <p className="text-xl text-page-subtle max-w-2xl mx-auto">
                            Saving lives is easier than you think. Follow these simple steps to become a hero.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-4 gap-8 relative">

                        {[
                            { icon: UserPlus, title: 'Register', desc: 'Create your donor profile in under 2 minutes.', color: 'text-blue-500', bg: 'bg-blue-500/10' },
                            { icon: Search, title: 'Find / Be Found', desc: 'Advanced algorithms match donors with patients.', color: 'text-purple-500', bg: 'bg-purple-500/10' },
                            { icon: Phone, title: 'Connect', desc: 'Securely communicate to coordinate donation.', color: 'text-pink-500', bg: 'bg-pink-500/10' },
                            { icon: Heart, title: 'Save a Life', desc: 'Donate blood and become a real-life hero.', color: 'text-red-500', bg: 'bg-red-500/10' },
                        ].map((step, index) => (
                            <motion.div
                                key={step.title}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2 }}
                                className="relative z-10"
                            >
                                <Card className="h-full text-center hover:translate-y-[-10px] transition-transform duration-300 border-page-border bg-card">
                                    <CardBody className="p-8 flex flex-col items-center">
                                        <div className={`w-16 h-16 rounded-full ${step.bg} flex items-center justify-center mb-6 shadow-lg`}>
                                            <step.icon className={`w-8 h-8 ${step.color}`} />
                                        </div>
                                        <h3 className="text-xl font-bold mb-3 text-page">{step.title}</h3>
                                        <p className="text-page-subtle text-sm leading-relaxed">{step.desc}</p>
                                    </CardBody>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ELIGIBILITY CRITERIA - Full Content */}
            <section className="section relative">
                <div className="container-custom px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">
                            Can You <span className="gradient-text">Donate Blood?</span>
                        </h2>
                        <p className="text-xl text-page-subtle max-w-2xl mx-auto">
                            Most people can give blood. Check the basic eligibility requirements below to see if you're ready to be a lifesaver.
                        </p>
                    </motion.div>

                    {/* Core Requirements Grid */}
                    <div className="grid md:grid-cols-3 gap-8 mb-20">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-card border border-page-border p-8 rounded-3xl text-center hover:border-accent/50 transition-colors"
                        >
                            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6 text-accent">
                                <Calendar className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Age Requirement</h3>
                            <p className="text-page-subtle">
                                You must be between <strong>18 and 65 years old</strong>.
                                <br /><span className="text-sm opacity-75">(16-17 with parental consent in some regions)</span>
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="bg-card border border-page-border p-8 rounded-3xl text-center hover:border-accent/50 transition-colors"
                        >
                            <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-500">
                                <Scale className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Weight</h3>
                            <p className="text-page-subtle">
                                You should weigh at least <strong>50 kg (110 lbs)</strong> to ensure it's safe for your body to donate.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="bg-card border border-page-border p-8 rounded-3xl text-center hover:border-accent/50 transition-colors"
                        >
                            <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6 text-green-500">
                                <Heart className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Overall Health</h3>
                            <p className="text-page-subtle">
                                You must be in good health and feel well on the day of donation. No colds, flu, or infections.
                            </p>
                        </motion.div>
                    </div>

                    {/* Detailed Lists */}
                    <div className="grid md:grid-cols-2 gap-12 mb-20">
                        {/* Who CAN Donate */}
                        <div className="space-y-6">
                            <h2 className="text-3xl font-bold flex items-center gap-3">
                                <CheckCircle className="text-green-500 w-8 h-8" />
                                You Can Donate If...
                            </h2>
                            <ul className="space-y-4">
                                {[
                                    "Your hemoglobin level is at least 12.5 g/dL.",
                                    "Pulse rate is between 50 and 100 beats per minute.",
                                    "Blood pressure is within normal limits.",
                                    "It has been 3 months since your last whole blood donation.",
                                    "You have eaten a healthy meal before donating.",
                                    "You are well-hydrated."
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 p-4 bg-card/50 rounded-xl border border-page-border">
                                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2.5 flex-shrink-0" />
                                        <span className="text-page-subtle">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Who Cannot Donate */}
                        <div className="space-y-6">
                            <h2 className="text-3xl font-bold flex items-center gap-3">
                                <XCircle className="text-red-500 w-8 h-8" />
                                Temporary Deferrals
                            </h2>
                            <ul className="space-y-4">
                                {[
                                    "You have a cold, flu, or fever on the day of donation.",
                                    "You have had a tattoo or piercing in the last 6-12 months.",
                                    "You have traveled to malaria-endemic areas recently.",
                                    "You are pregnant or breastfeeding (wait 6 months after delivery/weaning).",
                                    "You have had major surgery recently.",
                                    "You are on antibiotics for an infection."
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 p-4 bg-card/50 rounded-xl border border-page-border">
                                        <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2.5 flex-shrink-0" />
                                        <span className="text-page-subtle">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Permanent Exclusions */}
                    <div className="bg-red-500/5 border border-red-500/20 rounded-3xl p-8 md:p-12">
                        <div className="flex flex-col md:flex-row gap-8 items-start">
                            <div className="bg-red-500/10 p-4 rounded-full text-red-500 flex-shrink-0">
                                <AlertCircle className="w-8 h-8" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold mb-4 text-page">Permanent Exclusions</h3>
                                <p className="text-page-subtle mb-6">
                                    For the safety of both donors and recipients, some conditions permanently prevent blood donation.
                                    These include HIV/AIDS, Hepatitis B or C, cardiac arrest, kidney failure, and certain types of cancer.
                                </p>
                                <p className="text-sm text-page-subtle italic">
                                    * Consult with a medical professional at the donation center if you have specific concerns about your eligibility.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* DONATION PROCESS - Full Content */}
            <section className="section relative bg-card/30">
                <div className="container-custom px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">
                            The Donation <span className="gradient-text">Process</span>
                        </h2>
                        <p className="text-xl text-page-subtle max-w-2xl mx-auto">
                            Donating blood is simple, safe, and takes less than an hour. Here's exactly what to expect from start to finish.
                        </p>
                    </motion.div>

                    {/* Steps Timeline */}
                    <div className="relative max-w-4xl mx-auto mb-32">
                        {/* Vertical Line (Desktop) */}
                        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-page-border hidden md:block -translate-x-1/2" />

                        <div className="space-y-12 md:space-y-24">
                            {[
                                {
                                    icon: UserPlus,
                                    title: "Registration",
                                    desc: "You'll sign in, show ID, and complete a basic health history questionnaire to ensure you're eligible.",
                                    time: "10-15 mins"
                                },
                                {
                                    icon: Activity,
                                    title: "Health Screening",
                                    desc: "A staff member will check your temperature, pulse, blood pressure, and hemoglobin levels.",
                                    time: "5-10 mins"
                                },
                                {
                                    icon: Droplet,
                                    title: "The Donation",
                                    desc: "You'll sit in a comfortable chair while a pint of blood is drawn. It's quick and relatively painless.",
                                    time: "8-10 mins"
                                },
                                {
                                    icon: Heart,
                                    title: "Refreshment & Recovery",
                                    desc: "Relax for a few minutes with a snack and drink to replenish your fluids before you leave.",
                                    time: "10-15 mins"
                                }
                            ].map((step, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className={`flex flex-col md:flex-row gap-8 items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                                >
                                    {/* Content Side */}
                                    <div className="flex-1 text-center md:text-left">
                                        <div className={`flex flex-col ${index % 2 === 0 ? 'md:items-start' : 'md:items-end md:text-right'}`}>
                                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium mb-3">
                                                <Clock className="w-3 h-3" /> {step.time}
                                            </div>
                                            <h3 className="text-2xl font-bold mb-3">
                                                <span className="text-accent mr-2">{index + 1}.</span>
                                                {step.title}
                                            </h3>
                                            <p className="text-page-subtle leading-relaxed">
                                                {step.desc}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Icon Center */}
                                    <div className="relative z-10 flex-shrink-0">
                                        <div className="w-20 h-20 rounded-full bg-card border-4 border-page flex items-center justify-center shadow-xl shadow-accent/10">
                                            <step.icon className="w-8 h-8 text-accent" />
                                        </div>
                                    </div>

                                    {/* Empty Side for Balance */}
                                    <div className="flex-1 hidden md:block" />
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Preparation Tips */}
                    <div className="max-w-5xl mx-auto">
                        <h2 className="text-3xl font-bold text-center mb-12">How to Prepare</h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="bg-card border border-page-border p-6 rounded-2xl">
                                <div className="text-4xl mb-4">💧</div>
                                <h3 className="text-lg font-bold mb-2">Hydrate</h3>
                                <p className="text-page-subtle text-sm">Drink an extra 16 oz. of water before your appointment.</p>
                            </div>
                            <div className="bg-card border border-page-border p-6 rounded-2xl">
                                <div className="text-4xl mb-4">🥗</div>
                                <h3 className="text-lg font-bold mb-2">Eat Well</h3>
                                <p className="text-page-subtle text-sm">Have a healthy meal, avoiding fatty foods like burgers or fries.</p>
                            </div>
                            <div className="bg-card border border-page-border p-6 rounded-2xl">
                                <div className="text-4xl mb-4">🪪</div>
                                <h3 className="text-lg font-bold mb-2">Bring ID</h3>
                                <p className="text-page-subtle text-sm">Don't forget your driver's license or donor ID card.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* HEALTH BENEFITS - Full Content */}
            <section className="section relative">
                <div className="container-custom px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">
                            Health <span className="gradient-text">Benefits</span>
                        </h2>
                        <p className="text-xl text-page-subtle max-w-2xl mx-auto">
                            Saving lives is the primary motivation, but did you know donating blood has surprising health benefits for you too?
                        </p>
                    </motion.div>

                    {/* Benefits Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
                        {[
                            {
                                icon: HeartPulse,
                                title: "Heart Health",
                                desc: "Regular blood donation helps reduce the viscosity of blood, which may lower the risk of heart attacks and strokes."
                            },
                            {
                                icon: Activity,
                                title: "Free Health Checkup",
                                desc: "Every time you donate, you get a mini-physical checking your pulse, blood pressure, body temperature, and hemoglobin."
                            },
                            {
                                icon: ShieldCheck,
                                title: "Iron Balance",
                                desc: "Donating helps balance iron levels in the body. Excess iron can cause oxidative stress, which is harmful to tissues."
                            },
                            {
                                icon: Brain,
                                title: "Mental Well-being",
                                desc: "The psychological benefit of knowing you're saving lives can reduce stress and improve your overall sense of well-being."
                            },
                            {
                                icon: UserCheck,
                                title: "Calorie Burn",
                                desc: "The body works to replenish the lost blood, burning approximately 650 calories per donation process."
                            },
                            {
                                icon: Smile,
                                title: "Liver Health",
                                desc: "By reducing excess iron stores, blood donation can lower the risk of liver damage and related ailments."
                            }
                        ].map((benefit, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-card border border-page-border p-8 rounded-3xl hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5 transition-all group"
                            >
                                <div className="w-14 h-14 bg-page-border/30 rounded-2xl flex items-center justify-center mb-6 text-page group-hover:bg-accent group-hover:text-white transition-colors">
                                    <benefit.icon className="w-7 h-7" />
                                </div>
                                <h3 className="text-xl font-bold mb-3 group-hover:text-accent transition-colors">{benefit.title}</h3>
                                <p className="text-page-subtle leading-relaxed">
                                    {benefit.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Highlight Section */}
                    <div className="flex flex-col md:flex-row items-center gap-12 bg-card border border-page-border rounded-3xl p-8 md:p-12">
                        <div className="flex-1">
                            <h2 className="text-3xl font-bold mb-6">The "Helper's High"</h2>
                            <p className="text-page-subtle text-lg mb-6 leading-relaxed">
                                Psychological research suggests that altruistic acts like blood donation release endorphins, creating a positive feeling known as the "helper's high."
                                <br /><br />
                                Regular donors often report a sense of belonging and reduced isolation, contributing to better mental health and longevity.
                            </p>
                            <Link to="/register">
                                <Button>Experience It Yourself</Button>
                            </Link>
                        </div>
                        <div className="flex-1 relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-purple-500/20 blur-3xl rounded-full" />
                            <div className="relative bg-page p-8 rounded-2xl border border-page-border shadow-xl text-center">
                                <div className="text-6xl font-black gradient-text mb-2">3</div>
                                <div className="text-xl font-bold text-page">Lives Saved</div>
                                <div className="text-sm text-page-subtle mt-2">Per single donation</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="section relative">
                <div className="container-custom px-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <Card className="card-neon overflow-hidden">
                            <CardBody className="p-16 text-center relative">
                                {/* Background Glow */}
                                <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 via-purple-500/10 to-blue-500/10" />

                                <div className="relative z-10">
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                        className="w-24 h-24 mx-auto mb-8"
                                    >
                                        <div className="w-full h-full rounded-full bg-gradient-to-br from-red-500 to-purple-600 flex items-center justify-center shadow-neon-red">
                                            <Heart className="w-12 h-12 text-white" fill="currentColor" />
                                        </div>
                                    </motion.div>

                                    <h2 className="text-5xl font-display font-black mb-6">
                                        <span className="gradient-text">Ready to Save Lives?</span>
                                    </h2>
                                    <p className="text-2xl text-page-subtle mb-10 max-w-3xl mx-auto">
                                        Join our global network of heroes. Every donation saves up to 3 lives. Your journey starts now.
                                    </p>

                                    <div className="flex flex-wrap gap-6 justify-center">
                                        <Link to="/register">
                                            <Button size="lg" className="glow-effect text-lg px-12 py-6">
                                                <Star className="w-6 h-6" />
                                                Start Your Journey
                                                <ArrowRight className="w-6 h-6" />
                                            </Button>
                                        </Link>
                                        <Link to="/hospitals">
                                            <Button size="lg" variant="outline" className="text-lg px-12 py-6">
                                                <Zap className="w-6 h-6" />
                                                Emergency Requests
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
