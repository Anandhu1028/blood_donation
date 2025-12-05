import { Link } from 'react-router-dom';
import {
    Droplet,
    Mail,
    Phone,
    MapPin,
    Github,
    Twitter,
    Linkedin,
    Instagram,
    Heart,
    Facebook,
    Youtube
} from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

export function Footer() {
    const { t } = useLanguage();
    const currentYear = new Date().getFullYear();

    const quickLinks = [
        { path: '/', label: t('home') },
        { path: '/search', label: t('search') },
        { path: '/register', label: t('register') },
        { path: '/hospitals', label: t('hospitals') },
        { path: '/about', label: t('about') },
    ];

    const resources = [
        { label: 'Blood Donation Facts', path: '#' },
        { label: 'Eligibility Criteria', path: '#' },
        { label: 'Donation Process', path: '#' },
        { label: 'Health Benefits', path: '#' },
        { label: 'FAQs', path: '#' },
    ];

    const socialLinks = [
        { icon: Twitter, href: '#', label: 'Twitter' },
        { icon: Instagram, href: '#', label: 'Instagram' },
        { icon: Facebook, href: '#', label: 'Facebook' },
        { icon: Youtube, href: '#', label: 'Youtube' },
    ];

    return (
        <footer className="relative mt-20 bg-page border-t border-page-border overflow-hidden">

            {/* ANIMATIONS */}
            <style>{`
                @keyframes footerFloat {
                    0% { transform: translateY(0px); opacity: .85; }
                    50% { transform: translateY(-6px); opacity: 1; }
                    100% { transform: translateY(0px); opacity: .85; }
                }

                @keyframes footerPulse {
                    0% { transform: scale(1); opacity: 0.8; }
                    50% { transform: scale(1.12); opacity: 1; }
                    100% { transform: scale(1); opacity: 0.8; }
                }

                .icon-float { animation: footerFloat 4s ease-in-out infinite; }
                .icon-pulse { animation: footerPulse 3s ease-in-out infinite; }
            `}</style>

            {/* DARK HOLOGRAPHIC BACKGROUND GLOWS */}
            <div className="absolute -top-20 -left-10 w-[420px] h-[420px] bg-gradient-radial from-red-600/15 to-transparent blur-3xl opacity-50" />
            <div className="absolute bottom-0 right-0 w-[420px] h-[420px] bg-gradient-radial from-purple-600/15 to-transparent blur-3xl opacity-50" />

            <div className="container-custom px-6 py-20 relative z-10">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-14">

                    {/* BRAND */}
                    <div>
                        <Link to="/" className="flex items-center gap-3 mb-6 group">
                            <div className="p-3 rounded-2xl bg-gradient-to-br from-red-600 to-purple-600 shadow-[0_0_25px_rgba(255,0,80,0.35)] icon-pulse">
                                <Droplet className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-2xl font-display font-black gradient-text group-hover:opacity-80 transition-opacity">
                                {t('appName')}
                            </span>
                        </Link>



                        <p className="text-page-subtle mb-6 leading-relaxed max-w-xs">
                            The world's most advanced donor network — built for speed, trust, and real-world impact.
                        </p>

                        {/* SOCIAL ICONS */}
                        <div className="flex gap-3">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    aria-label={social.label}
                                    className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-page-border hover:border-accent/40 transition-all duration-300 group"
                                >
                                    <social.icon className="w-5 h-5 text-page-subtle group-hover:text-accent transition-colors icon-float" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* QUICK LINKS */}
                    <div>
                        <h3 className="text-lg font-display font-semibold text-page mb-6 tracking-wider">
                            Quick Links
                        </h3>
                        <ul className="space-y-3">
                            {quickLinks.map((link) => (
                                <li key={link.path}>
                                    <Link
                                        to={link.path}
                                        className="text-page-subtle hover:text-accent transition-colors flex items-center gap-2 group"
                                    >
                                        <span className="w-1.5 h-1.5 rounded-full bg-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* RESOURCES */}
                    <div>
                        <h3 className="text-lg font-display font-semibold text-page mb-6 tracking-wider">
                            Resources
                        </h3>
                        <ul className="space-y-3">
                            {resources.map((resource) => (
                                <li key={resource.label}>
                                    <a
                                        href={resource.path}
                                        className="text-page-subtle hover:text-accent transition-colors flex items-center gap-2 group"
                                    >
                                        <span className="w-1.5 h-1.5 rounded-full bg-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                                        {resource.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* CONTACT */}
                    <div>
                        <h3 className="text-lg font-display font-semibold text-page mb-6 tracking-wider">
                            Contact Us
                        </h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-page-subtle">
                                <Mail className="w-5 h-5 text-accent mt-0.5 icon-float" />
                                <a href="mailto:contact@bloodlife.com" className="hover:text-accent transition-colors">
                                   focuzonfutures@gmail.com
                                </a>
                            </li>

                            <li className="flex items-start gap-3 text-page-subtle">
                                <Phone className="w-5 h-5 text-accent mt-0.5 icon-float" />
                                <a href="tel:+911234567890" className="hover:text-accent transition-colors">
                                    +91 123 456 7890
                                </a>
                            </li>

                            <li className="flex items-start gap-3 text-page-subtle">
                                <MapPin className="w-5 h-5 text-accent mt-0.5 icon-float" />
                                <span>
                                    Kerala , Kottayam , India
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* BOTTOM BAR */}
                <div className="pt-8 mt-14 border-t border-page-border">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">

                        <p className="text-page-subtle text-sm">
                            © {currentYear} <span className="gradient-text font-semibold">{t('appName')}</span>. All rights reserved.
                        </p>

                        <div className="flex items-center gap-2 text-page-subtle text-sm">
                            <span>Made with</span>
                            <Heart className="w-4 h-4 text-red-500 fill-red-500 icon-pulse" />
                            <span>to save lives</span>
                        </div>

                        <div className="flex gap-6 text-sm">
                            <a href="#" className="text-page-subtle hover:text-accent transition-colors">
                                Privacy Policy
                            </a>
                            <a href="#" className="text-page-subtle hover:text-accent transition-colors">
                                Terms of Service
                            </a>
                        </div>

                    </div>
                </div>
            </div>
        </footer>
    );
}
