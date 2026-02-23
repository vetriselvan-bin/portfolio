import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Save, ArrowLeft, Loader2, Globe, Linkedin, Github, Code, Layout, User, Mail, FileText } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const PortfolioSettings = () => {
    const [settings, setSettings] = useState({
        name: '',
        title: '',
        bio: '',
        profileImage: '',
        resumeLink: '',
        linkedin: '',
        github: '',
        devpost: '',
        leetcode: '',
        email: '',
        aboutDescription: ''
    });
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const { data } = await axios.get('/api/portfolio/settings');
                if (data && data.name) {
                    setSettings(data);
                }
            } catch (err) {
                toast.error('Failed to fetch portfolio settings');
            } finally {
                setIsLoading(false);
            }
        };
        fetchSettings();
    }, []);

    const handleChange = (e) => {
        setSettings({ ...settings, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            const token = localStorage.getItem('token');
            await axios.put('/api/portfolio/settings', settings, {
                headers: { 'x-auth-token': token }
            });
            toast.success('Portfolio settings updated successfully!');
        } catch (err) {
            toast.error(err.response?.data?.msg || 'Failed to update settings');
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="animate-spin text-primary" size={48} />
            </div>
        );
    }

    return (
        <div className="pt-24 pb-12 min-h-screen">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <button
                            onClick={() => navigate('/admin/dashboard')}
                            className="flex items-center gap-2 text-gray-400 hover:text-white mb-4 transition-colors"
                        >
                            <ArrowLeft size={18} /> Back to Dashboard
                        </button>
                        <h1 className="text-3xl font-bold flex items-center gap-3">
                            Portfolio <span className="text-primary">Settings</span>
                        </h1>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* General Info */}
                    <div className="glass p-8 rounded-2xl border-white/5 space-y-6">
                        <h2 className="text-xl font-bold flex items-center gap-2 border-b border-white/5 pb-4">
                            <User className="text-primary" size={20} /> General Information
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-gray-400 text-sm font-medium mb-2">Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={settings.name}
                                    onChange={handleChange}
                                    className="w-full bg-dark-darker border border-white/10 rounded-xl py-2.5 px-4 text-gray-200 focus:outline-none focus:border-primary/50"
                                    placeholder="VETRISELVAN V"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-400 text-sm font-medium mb-2">Professional Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={settings.title}
                                    onChange={handleChange}
                                    className="w-full bg-dark-darker border border-white/10 rounded-xl py-2.5 px-4 text-gray-200 focus:outline-none focus:border-primary/50"
                                    placeholder="AI & Data Science Student"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-gray-400 text-sm font-medium mb-2">Short Bio (Hero Section)</label>
                            <textarea
                                name="bio"
                                value={settings.bio}
                                onChange={handleChange}
                                rows="3"
                                className="w-full bg-dark-darker border border-white/10 rounded-xl py-2.5 px-4 text-gray-200 focus:outline-none focus:border-primary/50 resize-none"
                                placeholder="A brief tagline for your hero section..."
                            ></textarea>
                        </div>

                        <div>
                            <label className="block text-gray-400 text-sm font-medium mb-2">About Description</label>
                            <textarea
                                name="aboutDescription"
                                value={settings.aboutDescription}
                                onChange={handleChange}
                                rows="5"
                                className="w-full bg-dark-darker border border-white/10 rounded-xl py-2.5 px-4 text-gray-200 focus:outline-none focus:border-primary/50 resize-none"
                                placeholder="Detailed about me description..."
                            ></textarea>
                        </div>
                    </div>

                    {/* Links & Socials */}
                    <div className="glass p-8 rounded-2xl border-white/5 space-y-6">
                        <h2 className="text-xl font-bold flex items-center gap-2 border-b border-white/5 pb-4">
                            <Globe className="text-secondary" size={20} /> Links & Socials
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-gray-400 text-sm font-medium mb-2 flex items-center gap-2">
                                    <Mail size={14} /> Email Address
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={settings.email}
                                    onChange={handleChange}
                                    className="w-full bg-dark-darker border border-white/10 rounded-xl py-2.5 px-4 text-gray-200 focus:outline-none focus:border-primary/50"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-400 text-sm font-medium mb-2 flex items-center gap-2">
                                    <FileText size={14} /> Resume Link
                                </label>
                                <input
                                    type="text"
                                    name="resumeLink"
                                    value={settings.resumeLink}
                                    onChange={handleChange}
                                    className="w-full bg-dark-darker border border-white/10 rounded-xl py-2.5 px-4 text-gray-200 focus:outline-none focus:border-primary/50"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-400 text-sm font-medium mb-2 flex items-center gap-2">
                                    <Linkedin size={14} /> LinkedIn URL
                                </label>
                                <input
                                    type="text"
                                    name="linkedin"
                                    value={settings.linkedin}
                                    onChange={handleChange}
                                    className="w-full bg-dark-darker border border-white/10 rounded-xl py-2.5 px-4 text-gray-200 focus:outline-none focus:border-primary/50"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-400 text-sm font-medium mb-2 flex items-center gap-2">
                                    <Github size={14} /> GitHub URL
                                </label>
                                <input
                                    type="text"
                                    name="github"
                                    value={settings.github}
                                    onChange={handleChange}
                                    className="w-full bg-dark-darker border border-white/10 rounded-xl py-2.5 px-4 text-gray-200 focus:outline-none focus:border-primary/50"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-400 text-sm font-medium mb-2 flex items-center gap-2">
                                    <Code size={14} /> LeetCode URL
                                </label>
                                <input
                                    type="text"
                                    name="leetcode"
                                    value={settings.leetcode}
                                    onChange={handleChange}
                                    className="w-full bg-dark-darker border border-white/10 rounded-xl py-2.5 px-4 text-gray-200 focus:outline-none focus:border-primary/50"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-400 text-sm font-medium mb-2 flex items-center gap-2">
                                    <Layout size={14} /> Profile Image URL
                                </label>
                                <input
                                    type="text"
                                    name="profileImage"
                                    value={settings.profileImage}
                                    onChange={handleChange}
                                    className="w-full bg-dark-darker border border-white/10 rounded-xl py-2.5 px-4 text-gray-200 focus:outline-none focus:border-primary/50"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={isSaving}
                            className="btn btn-primary flex items-center gap-2 py-4 px-12 text-lg"
                        >
                            {isSaving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                            Save All Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PortfolioSettings;
