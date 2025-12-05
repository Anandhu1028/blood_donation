import React from 'react';
import { motion } from 'framer-motion';
import { ClipboardList, Stethoscope, Droplet, Coffee, Clock, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';

export function DonationProcessPage() {
    const steps = [
        {
            icon: ClipboardList,
            title: "Registration",
            desc: "You'll sign in, show ID, and complete a basic health history questionnaire to ensure you're eligible.",
            time: "10-15 mins"
        },
        {
            icon: Stethoscope,
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
            icon: Coffee,
            title: "Refreshment & Recovery",
            desc: "Relax for a few minutes with a snack and drink to replenish your fluids before you leave.",
            time: "10-15 mins"
        }
    ];

    return (
        <div className="min-h-screen bg-page text-page">
            {/* Hero Section */}
            <div className="bg-hero-gradient py-20 px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-4xl mx-auto"
                >
                    <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
                        The Donation <span className="gradient-text">Process</span>
                    </h1>
                    <p className="text-xl text-page-subtle max-w-2xl mx-auto">
                        Donating blood is simple, safe, and takes less than an hour. Here's exactly what to expect from start to finish.
                    </p>
                </motion.div>
            </div>

            <div className="container-custom px-4 py-16">

                {/* Steps Timeline */}
                <div className="relative max-w-4xl mx-auto">
                    {/* Vertical Line (Desktop) */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-px bg-page-border hidden md:block -translate-x-1/2" />

                    <div className="space-y-12 md:space-y-24">
                        {steps.map((step, index) => (
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
                <div className="mt-32 max-w-5xl mx-auto">
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

                {/* CTA */}
                <div className="mt-24 bg-accent text-white rounded-3xl p-12 text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-black/10 to-transparent pointer-events-none" />
                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to start the process?</h2>
                        <p className="text-white/90 text-lg max-w-2xl mx-auto mb-8">
                            It only takes an hour to save up to three lives. Join our community of heroes today.
                        </p>
                        <Link to="/register">
                            <Button size="lg" className="bg-white text-accent hover:bg-gray-100 border-none">
                                Schedule Appointment <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default DonationProcessPage;
