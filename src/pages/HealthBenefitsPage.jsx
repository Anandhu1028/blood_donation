import React from 'react';
import { motion } from 'framer-motion';
import { HeartPulse, Activity, Brain, Smile, ShieldCheck, UserCheck } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';

export function HealthBenefitsPage() {
    const benefits = [
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
                        Health <span className="gradient-text">Benefits</span>
                    </h1>
                    <p className="text-xl text-page-subtle max-w-2xl mx-auto">
                        Saving lives is the primary motivation, but did you know donating blood has surprising health benefits for you too?
                    </p>
                </motion.div>
            </div>

            <div className="container-custom px-4 py-16">

                {/* Benefits Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {benefits.map((benefit, index) => (
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
                <div className="mt-24 flex flex-col md:flex-row items-center gap-12 bg-card border border-page-border rounded-3xl p-8 md:p-12">
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
        </div>
    );
}

export default HealthBenefitsPage;
