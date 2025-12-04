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
    TrendingUp
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
                                className="text-2xl text-gray-400 mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0"
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
                                        <div className="text-xs text-gray-500 uppercase tracking-wider">{stat.label}</div>
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
                                        <div className="text-gray-400 uppercase tracking-wider text-sm">{stat.label}</div>
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
                        <p className="text-2xl text-gray-400 max-w-3xl mx-auto">
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
                                        <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                                    </CardBody>
                                </Card>
                            </motion.div>
                        ))}
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
                                    <p className="text-2xl text-gray-400 mb-10 max-w-3xl mx-auto">
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
