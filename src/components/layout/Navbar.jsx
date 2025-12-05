import { Link, useLocation } from 'react-router-dom';
import { Droplet, Menu, X, Globe, User, LogOut, Zap, Sun, Moon } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTheme } from '../../contexts/ThemeContext';
import { useDonor } from '../../contexts/DonorContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/Button';

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [showLangMenu, setShowLangMenu] = useState(false);
    const { language, changeLanguage, t } = useLanguage();
    const { theme, toggleTheme } = useTheme();
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
        <nav className="sticky top-0 z-50 bg-page/90 backdrop-blur-xl border-b border-page-border transition-colors duration-300">
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
                                    ? 'text-accent'
                                    : 'text-page-subtle hover:text-page'
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
                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-page-border transition-all duration-300 hover:border-accent/30"
                            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                        >
                            {theme === 'dark' ? (
                                <Sun className="w-5 h-5 text-page-subtle hover:text-yellow-400 transition-colors" />
                            ) : (
                                <Moon className="w-5 h-5 text-page-subtle hover:text-blue-400 transition-colors" />
                            )}
                        </button>

                        {/* Language Selector */}
                        <div className="relative">
                            <button
                                onClick={() => setShowLangMenu(!showLangMenu)}
                                className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-page-border transition-all duration-300 hover:border-accent/30"
                            >
                                <Globe className="w-5 h-5 text-page-subtle" />
                            </button>
                            <AnimatePresence>
                                {showLangMenu && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                        className="absolute right-0 mt-2 w-40 bg-card border border-page-border overflow-hidden shadow-2xl rounded-2xl"
                                    >
                                        <button
                                            onClick={() => {
                                                changeLanguage('en');
                                                setShowLangMenu(false);
                                            }}
                                            className={`w-full px-4 py-3 text-left transition-all ${language === 'en'
                                                ? 'bg-accent/10 text-accent font-semibold'
                                                : 'text-page-subtle hover:bg-page-border/50'
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
                                                ? 'bg-accent/10 text-accent font-semibold'
                                                : 'text-page-subtle hover:bg-page-border/50'
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
                                    <button className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-page-border hover:border-accent/30 transition-all duration-300 flex items-center gap-2">
                                        <User className="w-4 h-4 text-accent" />
                                        <span className="text-sm font-semibold text-page">
                                            {currentDonor.name.split(' ')[0]}
                                        </span>
                                    </button>
                                </Link>
                                <button
                                    onClick={logoutDonor}
                                    className="p-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 transition-all duration-300"
                                    title="Logout"
                                >
                                    <LogOut className="w-5 h-5 text-accent" />
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-3">
                                <Link to="/login">
                                    <Button variant="ghost" className="text-page-subtle hover:text-page hover:bg-page-border/50">
                                        Login
                                    </Button>
                                </Link>
                                <Link to="/register">
                                    <Button className="group">
                                        <Zap className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                                        {t('register')}
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-page-border transition-all"
                    >
                        {isOpen ? <X className="w-6 h-6 text-page" /> : <Menu className="w-6 h-6 text-page" />}
                    </button>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="md:hidden border-t border-page-border overflow-hidden"
                        >
                            <div className="px-4 py-6 space-y-4">
                                {/* Mobile Navigation Links */}
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.path}
                                        to={link.path}
                                        onClick={() => setIsOpen(false)}
                                        className={`block px-4 py-3 rounded-xl transition-all ${isActive(link.path)
                                                ? 'bg-accent/10 text-accent border border-accent/30'
                                                : 'bg-white/5 text-page-subtle hover:bg-white/10 hover:text-page border border-page-border'
                                            }`}
                                    >
                                        <span className="font-semibold uppercase text-sm tracking-wider">
                                            {link.label}
                                        </span>
                                    </Link>
                                ))}

                                {/* Mobile Theme Toggle */}
                                <button
                                    onClick={toggleTheme}
                                    className="w-full px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-page-border transition-all flex items-center justify-between"
                                >
                                    <span className="font-semibold text-sm text-page-subtle">Theme</span>
                                    {theme === 'dark' ? (
                                        <Sun className="w-5 h-5 text-yellow-400" />
                                    ) : (
                                        <Moon className="w-5 h-5 text-blue-400" />
                                    )}
                                </button>

                                {/* Mobile Language Selector */}
                                <div className="space-y-2">
                                    <div className="px-4 py-2 text-sm font-semibold text-page-subtle">Language</div>
                                    <div className="grid grid-cols-2 gap-2">
                                        {['en', 'es', 'fr', 'hi'].map((lang) => (
                                            <button
                                                key={lang}
                                                onClick={() => {
                                                    changeLanguage(lang);
                                                    setShowLangMenu(false);
                                                }}
                                                className={`px-4 py-2 rounded-xl transition-all text-sm font-medium ${language === lang
                                                        ? 'bg-accent/10 text-accent border border-accent/30'
                                                        : 'bg-white/5 text-page-subtle hover:bg-white/10 border border-page-border'
                                                    }`}
                                            >
                                                {lang.toUpperCase()}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Mobile User Actions */}
                                <div className="pt-4 border-t border-page-border space-y-3">
                                    {currentDonor ? (
                                        <>
                                            <Link to="/dashboard" onClick={() => setIsOpen(false)}>
                                                <button className="w-full px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-page-border transition-all flex items-center gap-3">
                                                    <User className="w-5 h-5 text-accent" />
                                                    <span className="font-semibold text-page">
                                                        {currentDonor.name}
                                                    </span>
                                                </button>
                                            </Link>
                                            <button
                                                onClick={() => {
                                                    logoutDonor();
                                                    setIsOpen(false);
                                                }}
                                                className="w-full px-4 py-3 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 transition-all flex items-center justify-center gap-2"
                                            >
                                                <LogOut className="w-5 h-5 text-accent" />
                                                <span className="font-semibold text-accent">Logout</span>
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <Link to="/login" onClick={() => setIsOpen(false)}>
                                                <Button variant="ghost" className="w-full">
                                                    Login
                                                </Button>
                                            </Link>
                                            <Link to="/register" onClick={() => setIsOpen(false)}>
                                                <Button className="w-full">
                                                    <Zap className="w-4 h-4" />
                                                    {t('register')}
                                                </Button>
                                            </Link>
                                        </>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </nav>

    );
}
