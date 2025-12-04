import { motion } from 'framer-motion';
import { Heart, Users, Shield, Target, Zap } from 'lucide-react';
import { Card, CardBody } from '../components/ui/Card';

export function AboutPage() {
    const values = [
        {
            icon: Heart,
            title: 'Compassion',
            description: 'We believe in the power of human kindness and the willingness to help others in need.',
        },
        {
            icon: Shield,
            title: 'Trust & Safety',
            description: 'All donors are verified with ID proof and OTP authentication for maximum security.',
        },
        {
            icon: Users,
            title: 'Community',
            description: 'Building a strong network of donors and recipients working together to save lives.',
        },
        {
            icon: Target,
            title: 'Accessibility',
            description: 'Making blood donation simple, fast, and accessible for everyone, everywhere.',
        },
    ];

    const stats = [
        { label: 'Lives Saved', value: '10,000+' },
        { label: 'Registered Donors', value: '5,000+' },
        { label: 'Partner Hospitals', value: '150+' },
        { label: 'Cities Covered', value: '50+' },
    ];

    const team = [
        { name: 'Dr. Rajesh Kumar', role: 'Medical Advisor', image: '👨‍⚕️' },
        { name: 'Priya Sharma', role: 'Community Manager', image: '👩‍💼' },
        { name: 'Amit Patel', role: 'Tech Lead', image: '👨‍💻' },
        { name: 'Sneha Reddy', role: 'Operations Head', image: '👩‍💼' },
    ];

    return (
        <div className="min-h-screen bg-page text-page">

            {/* HERO — METALLIC RIPPLE DARK HEADER */}
            <div className="bg-hero-gradient text-white py-20 border-b border-page-border">
                <div className="container-custom px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h1 className="text-5xl font-display font-extrabold mb-6">
                            About BloodLife
                        </h1>

                        <p className="text-xl text-page-subtle max-w-3xl mx-auto">
                            We’re on a mission to make blood donation accessible, efficient and impactful.
                            Every drop counts — together we save lives across India.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* MISSION */}
            <section className="section py-20">
                <div className="container-custom px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-4xl font-display font-bold mb-6">Our Mission</h2>
                            <p className="text-xl text-page-subtle leading-relaxed">
                                To create a seamless platform that connects donors with those in need.
                                We ensure no life is lost due to blood unavailability — using technology
                                to make donation transparent, fast, and rewarding.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* STATS — PREMIUM DARK GRID */}
            <section className="py-20 border-y border-page-border bg-card/30">
                <div className="container-custom px-4">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="text-center"
                            >
                                <h3 className="text-4xl font-bold text-accent mb-1">{stat.value}</h3>
                                <p className="text-page-subtle">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* VALUES — PREMIUM DARK CARDS */}
            <section className="section py-20">
                <div className="container-custom px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-display font-bold mb-4">Our Core Values</h2>
                        <p className="text-xl text-page-subtle">The principles that guide our mission</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((value, index) => (
                            <motion.div
                                key={value.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Card hover className="h-full">
                                    <CardBody className="text-center">
                                        <div className="w-16 h-16 mx-auto mb-5 rounded-full
                                            bg-gradient-to-br from-accent to-accent-bright flex items-center justify-center shadow-lg shadow-accent/40">
                                            <value.icon className="w-8 h-8 text-white" />
                                        </div>

                                        <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                                        <p className="text-page-subtle">{value.description}</p>
                                    </CardBody>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* HOW IT WORKS */}
            <section className="py-20 bg-card/20 border-y border-page-border">
                <div className="container-custom px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-display font-bold mb-4">How It Works</h2>
                        <p className="text-xl text-page-subtle">Simple steps to save lives</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
                        {[
                            { step: '01', title: 'Register as Donor', description: 'Sign up and verify via OTP.' },
                            { step: '02', title: 'Get Matched', description: 'Hospitals can find you by blood group and location.' },
                            { step: '03', title: 'Save Lives', description: 'Donate blood and track your life-saving impact.' },
                        ].map((item, index) => (
                            <motion.div
                                key={item.step}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.15 }}
                                className="text-center"
                            >
                                <div className="text-6xl font-extrabold text-accent/25 mb-3">{item.step}</div>
                                <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                                <p className="text-page-subtle">{item.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* TEAM — PREMIUM DARK CARDS */}
            <section className="section py-20">
                <div className="container-custom px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-display font-bold mb-4">Meet Our Team</h2>
                        <p className="text-xl text-page-subtle">
                            Dedicated professionals working to save lives
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
                        {team.map((member, index) => (
                            <motion.div
                                key={member.name}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Card hover>
                                    <CardBody className="text-center">
                                        <div className="text-6xl mb-4">{member.image}</div>
                                        <h3 className="text-xl font-bold">{member.name}</h3>
                                        <p className="text-page-subtle">{member.role}</p>
                                    </CardBody>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA — PREMIUM DARK CLEAN */}
            <section className="py-24 bg-hero-gradient text-white">
                <div className="container-custom px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <Zap className="w-16 h-16 mx-auto mb-6 text-accent-bright" />

                        <h2 className="text-4xl font-display font-bold mb-4">
                            Ready to Make a Difference?
                        </h2>

                        <p className="text-xl text-page-subtle mb-8 max-w-2xl mx-auto">
                            Join thousands of donors saving lives every day.
                        </p>

                        <a href="/register">
                            <button className="px-10 py-4 text-lg font-semibold rounded-xl
                                bg-white text-accent hover:bg-gray-200 transition">
                                Become a Donor Today
                            </button>
                        </a>
                    </motion.div>
                </div>
            </section>

        </div>
    );
}
