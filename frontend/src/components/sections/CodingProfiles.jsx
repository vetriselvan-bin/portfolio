import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, ExternalLink, Code2, Award, Zap, Loader2 } from 'lucide-react';
import axios from 'axios';

const ProfileCard = ({ platform, username, description, icon: iconName, color, stats, link }) => {
    const Icon = iconName === 'Github' ? Github :
        iconName === 'Linkedin' ? Linkedin :
            iconName === 'Code2' ? Code2 :
                iconName === 'Award' ? Award : Zap;

    return (
        <motion.div
            whileHover={{ y: -10 }}
            className="glass p-6 rounded-2xl border-white/5 hover:border-primary/50 transition-colors group"
        >
            <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-lg ${color} bg-opacity-20`}>
                    <Icon className={color.replace('bg-', 'text-')} size={24} />
                </div>
                <a href={link} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors">
                    <ExternalLink size={20} />
                </a>
            </div>
            <h3 className="text-xl font-bold mb-1">{platform}</h3>
            <p className="text-primary text-sm font-mono mb-3">@{username}</p>
            <p className="text-gray-400 text-sm mb-6">{description}</p>

            <div className="grid grid-cols-2 gap-4 mb-6">
                {stats.map((stat, i) => (
                    <div key={i}>
                        <p className="text-gray-500 text-xs uppercase tracking-wider">{stat.label}</p>
                        <p className="text-lg font-bold text-gray-200">{stat.value}</p>
                    </div>
                ))}
            </div>

            <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full btn btn-outline py-2 text-sm flex items-center justify-center gap-2"
            >
                Visit Profile
            </a>
        </motion.div>
    );
};

const CodingProfiles = () => {
    const [profiles, setProfiles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProfiles = async () => {
            try {
                const { data } = await axios.get('/api/portfolio/profiles');
                setProfiles(data);
            } catch (err) {
                console.error('Failed to fetch coding profiles');
            } finally {
                setIsLoading(false);
            }
        };
        fetchProfiles();
    }, []);

    if (isLoading) {
        return (
            <section className="py-20 flex items-center justify-center">
                <Loader2 className="animate-spin text-primary" size={48} />
            </section>
        );
    }

    return (
        <section id="profiles" className="py-20 bg-dark-darker/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-3xl md:text-4xl font-bold mb-4"
                    >
                        Competitive Programming & <span className="text-primary">Developer Profiles</span>
                    </motion.h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        My presence across various platforms where I code, compete, and collaborate.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {profiles.map((profile, index) => (
                        <motion.div
                            key={profile._id || index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <ProfileCard {...profile} />
                        </motion.div>
                    ))}
                </div>

                {/* LeetCode Visual Stats (Simplified for now) */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className="mt-12 glass p-8 rounded-3xl border-white/5"
                >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                        <div className="text-center md:text-left">
                            <h3 className="text-2xl font-bold mb-2 flex items-center gap-3">
                                <Zap className="text-yellow-500" /> LeetCode Stats
                            </h3>
                            <p className="text-gray-400">Continuous learning and problem-solving journey.</p>
                        </div>

                        <div className="col-span-2 grid grid-cols-3 gap-4">
                            {[
                                { label: 'Easy', value: 150, color: 'text-green-500', total: 200 },
                                { label: 'Medium', value: 150, color: 'text-yellow-500', total: 250 },
                                { label: 'Hard', value: 50, color: 'text-red-500', total: 100 },
                            ].map((item, i) => (
                                <div key={i} className="text-center">
                                    <p className={`${item.color} font-bold text-xl`}>{item.value}</p>
                                    <p className="text-gray-500 text-sm uppercase">{item.label}</p>
                                    <div className="w-full h-1.5 bg-white/5 rounded-full mt-2 overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: `${(item.value / item.total) * 100}%` }}
                                            transition={{ duration: 1, delay: 0.5 }}
                                            className={`h-full ${item.color.replace('text-', 'bg-')}`}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default CodingProfiles;
