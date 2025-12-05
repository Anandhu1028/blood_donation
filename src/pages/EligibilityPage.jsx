import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, AlertCircle, Scale, Calendar, Heart } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';

export function EligibilityPage() {
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
                        Can You <span className="gradient-text">Donate Blood?</span>
                    </h1>
                    <p className="text-xl text-page-subtle max-w-2xl mx-auto">
                        Most people can give blood. Check the basic eligibility requirements below to see if you're ready to be a lifesaver.
                    </p>
                </motion.div>
            </div>

            <div className="container-custom px-4 py-16 space-y-20">

                {/* Core Requirements Grid */}
                <div className="grid md:grid-cols-3 gap-8">
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
                <div className="grid md:grid-cols-2 gap-12">

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

                {/* CTA */}
                <div className="text-center py-12">
                    <h2 className="text-3xl font-bold mb-6">Ready to Save a Life?</h2>
                    <div className="flex justify-center gap-4">
                        <Link to="/register">
                            <Button size="lg" className="px-8">Register as Donor</Button>
                        </Link>
                        <Link to="/hospitals">
                            <Button variant="outline" size="lg" className="px-8">Find Blood Drives</Button>
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default EligibilityPage;
