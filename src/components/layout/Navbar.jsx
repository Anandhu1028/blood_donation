import { Link, useLocation } from 'react-router-dom';
import { Droplet, Menu, X, Globe, User, LogOut, Zap } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useDonor } from '../../contexts/DonorContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/Button';

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [showLangMenu, setShowLangMenu] = useState(false);
    const { language, changeLanguage, t } = useLanguage();
    const { currentDonor, logoutDonor } = useDonor();
    const location = useLocation();

    const navLinks = [
        { path: '/', label: t('home') },
        { path: '/search', label: t('search') },
        { path: '/hospitals', label: t('hospitals') },
        { path: '/about', label: t('about') },
    ];

    const isActive = (path) => location.pathname === path;

    return (
       <nav className="sticky top-0 z-50 bg-[#0A0A0A]/90 backdrop-blur-xl border-b border-white/10">
        <div className="container-custom">
            <div className="flex items-center justify-between h-20 px-4">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-3 group">
                    <motion.div
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                        className="relative"
                    >
                        <div className="p-3 bg-gradient-to-br from-red-500 to-purple-600 rounded-2xl shadow-neon-red">
                            <Droplet className="w-7 h-7 text-white" fill="currentColor" />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-purple-600 rounded-2xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity" />
                    </motion.div>
                    <span className="text-2xl font-display font-black gradient-text">
                        {t('appName')}
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className="relative group"
                        >
                            <span className={`font-semibold transition-all duration-300 uppercase text-sm tracking-wider ${isActive(link.path)
                                ? 'text-red-400'
                                : 'text-gray-400 hover:text-white'
                            }`}>
                                {link.label}
                            </span>
                            {isActive(link.path) && (
                                <motion.div
                                    layoutId="navbar-indicator"
                                    className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-red-500 to-purple-500 rounded-full"
                                />
                            )}
                            <div className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-red-500 to-purple-500 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                        </Link>
                    ))}
                </div>

                {/* Actions */}
                <div className="hidden md:flex items-center gap-4">
                    {/* Language Selector */}
                    <div className="relative">
                        <button
                            onClick={() => setShowLangMenu(!showLangMenu)}
                            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300 hover:border-red-500/30"
                        >
                            <Globe className="w-5 h-5 text-gray-300" />
                        </button>
                        <AnimatePresence>
                            {showLangMenu && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                    className="absolute right-0 mt-2 w-40 glass rounded-2xl border border-white/10 overflow-hidden shadow-2xl"
                                >
                                    <button
                                        onClick={() => {
                                            changeLanguage('en');
                                            setShowLangMenu(false);
                                        }}
                                        className={`w-full px-4 py-3 text-left transition-all ${language === 'en'
                                            ? 'bg-red-500/20 text-red-400 font-semibold'
                                            : 'text-gray-400 hover:bg-white/5'
                                        }`}
                                    >
                                        🇬🇧 English
                                    </button>
                                    <button
                                        onClick={() => {
                                            changeLanguage('hi');
                                            setShowLangMenu(false);
                                        }}
                                        className={`w-full px-4 py-3 text-left transition-all ${language === 'hi'
                                            ? 'bg-red-500/20 text-red-400 font-semibold'
                                            : 'text-gray-400 hover:bg-white/5'
                                        }`}
                                    >
                                        🇮🇳 हिंदी
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* User Menu */}
                    {currentDonor ? (
                        <div className="flex items-center gap-3">
                            <Link to="/dashboard">
                                <button className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-red-500/30 transition-all duration-300 flex items-center gap-2">
                                    <User className="w-4 h-4 text-red-600" />
                                    <span className="text-sm font-semibold text-white">
                                        {currentDonor.name.split(' ')[0]}
                                    </span>
                                </button>
                            </Link>
                            <button
                                onClick={logoutDonor}
                                className="p-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 transition-all duration-300"
                                title="Logout"
                            >
                                <LogOut className="w-5 h-5 text-red-600" />
                            </button>
                        </div>
                    ) : (
                        <Link to="/register">
                            <Button className="group">
                                <Zap className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                                {t('register')}
                            </Button>
                        </Link>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
                >
                    {isOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
                </button>
            </div>
        </div>
</nav>

    );
}
