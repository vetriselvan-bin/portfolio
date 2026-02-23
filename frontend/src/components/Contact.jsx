import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, User, MessageSquare, Phone, MapPin, Globe, Loader2 } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const Contact = () => {
    const [settings, setSettings] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const { data } = await axios.get('/api/portfolio/settings');
                setSettings(data);
            } catch (err) {
                console.error('Contact: Failed to fetch settings');
            } finally {
                setIsLoading(false);
            }
        };
        fetchSettings();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await axios.post('/api/contact', formData);
            toast.success('Message sent successfully!');
            setFormData({ name: '', email: '', subject: '', message: '' });
        } catch (err) {
            toast.error(err.response?.data?.msg || 'Failed to send message.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const contactInfo = [
        {
            icon: Mail,
            label: 'Email',
            value: settings?.email || 'vetriselvanv2008@gmail.com',
            href: `mailto:${settings?.email || 'vetriselvanv2008@gmail.com'}`
        },
        {
            icon: Phone,
            label: 'Phone',
            value: settings?.phone || '+91 9597780488',
            href: `tel:${settings?.phone || '+919597780488'}`
        },
        {
            icon: MapPin,
            label: 'Institution',
            value: settings?.bio || 'SNS College of Technology',
            href: '#'
        },
        {
            icon: Globe,
            label: 'Location',
            value: 'Tamil Nadu, India',
            href: '#'
        }
    ];

    return (
        <section id="contact" className="py-20 bg-gray-100/50 dark:bg-dark-darker/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-3xl md:text-4xl font-bold mb-4"
                    >
                        Get In <span className="text-primary">Touch</span>
                    </motion.h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Have a project in mind or just want to say hello? Feel free to reach out to me!
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="space-y-8"
                    >
                        <div className="glass p-8 rounded-2xl border-white/5 h-full">
                            <h3 className="text-2xl font-bold mb-8">Contact Information</h3>

                            {isLoading ? (
                                <div className="flex justify-center py-10">
                                    <Loader2 className="animate-spin text-primary" size={32} />
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    {contactInfo.map((item, i) => (
                                        <div key={i} className="flex items-center gap-4">
                                            <div className="p-3 bg-primary/10 rounded-lg">
                                                <item.icon className="text-primary" size={24} />
                                            </div>
                                            <div>
                                                <p className="text-gray-500 text-sm">{item.label}</p>
                                                <a href={item.href} className="text-gray-200 font-medium hover:text-primary transition-colors italic">
                                                    {item.value}
                                                </a>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <div className="mt-12 pt-8 border-t border-white/10">
                                <h4 className="text-lg font-bold mb-4">Why Collaborate?</h4>
                                <p className="text-gray-400 text-sm leading-relaxed">
                                    {settings?.title || "AI & Data Science Student"} passionate about GenAI, LLMs, and building logical solutions. Looking for opportunities to apply my skills in real-world environments.
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                    >
                        <form onSubmit={handleSubmit} className="glass p-8 rounded-2xl border-white/5 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-gray-400 text-sm font-medium mb-2">Your Name</label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-3 text-gray-500" size={18} />
                                        <input
                                            type="text"
                                            name="name"
                                            required
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="John Doe"
                                            className="w-full bg-dark-darker border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-gray-200 focus:outline-none focus:border-primary/50 transition-colors"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-gray-400 text-sm font-medium mb-2">Email Address</label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-3 text-gray-500" size={18} />
                                        <input
                                            type="email"
                                            name="email"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="john@example.com"
                                            className="w-full bg-dark-darker border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-gray-200 focus:outline-none focus:border-primary/50 transition-colors"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-gray-400 text-sm font-medium mb-2">Subject</label>
                                <div className="relative">
                                    <Globe className="absolute left-3 top-3 text-gray-500" size={18} />
                                    <input
                                        type="text"
                                        name="subject"
                                        required
                                        value={formData.subject}
                                        onChange={handleChange}
                                        placeholder="Project Inquiry"
                                        className="w-full bg-dark-darker border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-gray-200 focus:outline-none focus:border-primary/50 transition-colors"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-gray-400 text-sm font-medium mb-2">Message</label>
                                <div className="relative">
                                    <MessageSquare className="absolute left-3 top-3 text-gray-500" size={18} />
                                    <textarea
                                        name="message"
                                        required
                                        rows="4"
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="Tell me more about your project..."
                                        className="w-full bg-dark-darker border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-gray-200 focus:outline-none focus:border-primary/50 transition-colors resize-none"
                                    ></textarea>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full btn btn-primary flex items-center justify-center gap-3 disabled:opacity-50"
                            >
                                {isSubmitting ? 'Sending...' : 'Send Message'}
                                <Send size={18} />
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
