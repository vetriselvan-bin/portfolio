import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Github, Linkedin, Mail, ShieldCheck } from 'lucide-react';
import axios from 'axios';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [settings, setSettings] = useState(null);
    const location = useLocation();
    const isDashboard = location.pathname.startsWith('/admin');

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        const fetchSettings = async () => {
            try {
                const { data } = await axios.get('/api/portfolio/settings');
                setSettings(data);
            } catch (err) {
                console.error('Navbar: Failed to fetch settings');
            }
        };
        window.addEventListener('scroll', handleScroll);
        fetchSettings();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'About', href: '#about' },
        { name: 'Projects', href: '#projects' },
        { name: 'Hackathons', href: '#hackathons' },
        { name: 'Certifications', href: '#certifications' },
        { name: 'Contact', href: '#contact' },
    ];

    const isAdmin = !!localStorage.getItem('token');
    const brandName = settings?.name?.split(' ')[0] || 'VETRISELVAN';

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'glass py-3 border-b border-white/5' : 'bg-transparent py-5'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    <Link to="/" className="text-2xl font-bold tracking-tighter flex items-center gap-2">
                        <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent uppercase">
                            {brandName}
                        </span>
                        <div className="w-1.5 h-1.5 bg-secondary rounded-full"></div>
                    </Link>

                    {/* Desktop Menu */}
                    {!isDashboard && (
                        <div className="hidden md:flex items-center space-x-8">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className="text-gray-300 hover:text-primary transition-colors text-sm font-medium uppercase tracking-wider"
                                >
                                    {link.name}
                                </a>
                            ))}
                            {isAdmin && (
                                <Link
                                    to="/admin/dashboard"
                                    className="p-2 transition-colors text-secondary hover:text-white"
                                    title="Go to Dashboard"
                                >
                                    <ShieldCheck size={20} />
                                </Link>
                            )}
                            <ThemeToggle />
                        </div>
                    )}

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center gap-4">
                        <ThemeToggle />
                        {isAdmin && isDashboard && (
                            <Link to="/admin/dashboard" className="text-secondary"><ShieldCheck size={20} /></Link>
                        )}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-300 hover:text-white"
                        >
                            {isOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden glass border-b border-white/5 overflow-hidden"
                    >
                        <div className="px-4 pt-2 pb-6 space-y-4">
                            {!isDashboard ? (
                                navLinks.map((link) => (
                                    <a
                                        key={link.name}
                                        href={link.href}
                                        onClick={() => setIsOpen(false)}
                                        className="block text-gray-300 hover:text-primary transition-colors text-lg font-medium"
                                    >
                                        {link.name}
                                    </a>
                                ))
                            ) : (
                                <Link
                                    to="/"
                                    onClick={() => setIsOpen(false)}
                                    className="block text-gray-300 hover:text-primary transition-colors text-lg font-medium"
                                >
                                    View Site
                                </Link>
                            )}
                            <div className="flex gap-4 pt-4 border-t border-white/5">
                                <a href={settings?.github || "#"} className="text-gray-400 hover:text-white"><Github size={20} /></a>
                                <a href={settings?.linkedin || "#"} className="text-gray-400 hover:text-white"><Linkedin size={20} /></a>
                                <a href={`mailto:${settings?.email}`} className="text-gray-400 hover:text-white"><Mail size={20} /></a>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
