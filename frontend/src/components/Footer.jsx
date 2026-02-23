import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Phone, ShieldCheck, Code, Layout } from 'lucide-react';
import axios from 'axios';

const Footer = () => {
    const [settings, setSettings] = useState(null);
    const currentYear = new Date().getFullYear();

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const { data } = await axios.get('/api/portfolio/settings');
                setSettings(data);
            } catch (err) {
                console.error('Footer: Failed to fetch settings');
            }
        };
        fetchSettings();
    }, []);

    const name = settings?.name || 'VETRISELVAN V';
    const socialLinks = [
        { icon: <Linkedin size={20} />, href: settings?.linkedin || '#', label: 'LinkedIn' },
        { icon: <Github size={20} />, href: settings?.github || '#', label: 'GitHub' },
        { icon: <Mail size={20} />, href: `mailto:${settings?.email}`, label: 'Email' },
    ];

    if (settings?.devpost) socialLinks.push({ icon: <Layout size={20} />, href: settings.devpost, label: 'Devpost' });
    if (settings?.leetcode) socialLinks.push({ icon: <Code size={20} />, href: settings.leetcode, label: 'LeetCode' });

    const navLinks = [
        { name: 'About', href: '#about' },
        { name: 'Projects', href: '#projects' },
        { name: 'Hackathons', href: '#hackathons' },
        { name: 'Certifications', href: '#certifications' },
        { name: 'Contact', href: '#contact' },
    ];

    return (
        <footer className="bg-dark pt-16 pb-8 border-t border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                    {/* Brand Section */}
                    <div className="space-y-4">
                        <Link to="/" className="text-2xl font-bold tracking-tighter flex items-center gap-2">
                            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent uppercase">
                                {name.split(' ')[0]}
                            </span>
                            <div className="w-1.5 h-1.5 bg-secondary rounded-full"></div>
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                            {settings?.title || "AI & Data Science Student"}
                        </p>
                        <div className="flex space-x-4">
                            {socialLinks.map((social, idx) => (
                                <a
                                    key={idx}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 glass rounded-lg text-gray-400 hover:text-primary transition-colors"
                                    aria-label={social.label}
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Navigation Links */}
                    <div>
                        <h4 className="text-lg font-bold mb-6">Quick Links</h4>
                        <ul className="space-y-3">
                            {navLinks.map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={link.href}
                                        className="text-gray-400 hover:text-primary transition-colors text-sm"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Admin/Legal Section */}
                    <div className="flex flex-col items-start md:items-end md:text-right">
                        <h4 className="text-lg font-bold mb-6">Administration</h4>
                        <Link
                            to="/admin/login"
                            className="flex items-center gap-2 text-gray-500 hover:text-secondary transition-colors text-sm mb-4"
                        >
                            <ShieldCheck size={16} /> Admin Login
                        </Link>
                        <p className="text-gray-500 text-xs">
                            Built with MERN Stack, Vite & Tailwind CSS
                        </p>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-500 text-xs">
                        &copy; {currentYear} {name}. All rights reserved.
                    </p>
                    <div className="flex items-center gap-2 text-gray-500 text-xs">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                        Available for Collaboration
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
