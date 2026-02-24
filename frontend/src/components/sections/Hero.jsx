import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ExternalLink, Phone, Loader2, Code } from 'lucide-react';
import axios from 'axios';

const Hero = () => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get('/api/portfolio/settings');
                setData(data);
            } catch (err) {
                console.error('Failed to fetch hero data');
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    if (isLoading) {
        return (
            <section className="min-h-screen flex items-center justify-center">
                <Loader2 className="animate-spin text-primary" size={48} />
            </section>
        );
    }

    const name = data?.name || 'VETRISELVAN V';
    const title = data?.title || 'AI & Data Science Student';
    const bio = data?.bio || 'SNS College of Technology';
    const socialLinks = [
        { icon: <Linkedin />, name: 'LinkedIn', href: data?.linkedin || '#' },
        { icon: <Github />, name: 'GitHub', href: data?.github || '#' },
        { icon: <Phone />, name: 'Phone', href: `tel:${data?.email}` || '#' }, // Assuming phone might be in bio or separate, but email is provided
        { icon: <Mail />, name: 'Email', href: `mailto:${data?.email}` || '#' },
    ];

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full -z-10">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px] animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[100px] animate-pulse delay-700"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
                        className="inline-block p-1 rounded-full bg-gradient-to-r from-primary to-secondary mb-6"
                    >
                        <div className="bg-dark-darker rounded-full p-1 overflow-hidden">
                            <img
                                src={data?.profileImage || `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`}
                                alt={name}
                                className="w-32 h-32 rounded-full object-cover"
                            />
                        </div>
                    </motion.div>

                    <h2 className="text-gray-400 text-lg md:text-xl font-medium mb-2 uppercase tracking-[0.2em]">Hello, I'm</h2>
                    <h1 className="text-5xl md:text-7xl font-extrabold mb-4">
                        <span className="bg-gradient-to-r from-primary via-blue-400 to-secondary bg-clip-text text-transparent uppercase tracking-tight">
                            {name}
                        </span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 font-medium mb-4">
                        {title}
                    </p>
                    <p className="max-w-2xl mx-auto text-gray-500 dark:text-gray-400 text-lg mb-8 uppercase tracking-widest font-light">
                        {bio}
                    </p>

                    <div className="flex flex-wrap justify-center gap-4 mb-12">
                        <a href="#projects" className="btn btn-primary flex items-center gap-2">
                            View Projects <ExternalLink size={18} />
                        </a>
                        <a href={data?.resumeLink || "#"} target="_blank" className="btn btn-outline flex items-center gap-2">
                            Download Resume <Code size={18} />
                        </a>
                    </div>

                    <div className="flex justify-center items-center space-x-6 text-gray-400">
                        {socialLinks.map((social, index) => (
                            <motion.a
                                key={index}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ y: -5, color: '#3b82f6' }}
                                title={social.name}
                                className="transition-colors"
                            >
                                {social.icon}
                            </motion.a>
                        ))}
                    </div>
                </motion.div>
            </div>

            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-500 cursor-pointer"
                onClick={() => document.getElementById('about').scrollIntoView()}
            >
                <div className="w-6 h-10 border-2 border-gray-500 rounded-full flex justify-center p-1">
                    <div className="w-1 h-2 bg-gray-500 rounded-full"></div>
                </div>
            </motion.div>
        </section>
    );
};

export default Hero;
