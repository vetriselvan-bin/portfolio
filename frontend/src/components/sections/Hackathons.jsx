import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Award, Zap, Trophy, Rocket, Loader2 } from 'lucide-react';
import axios from 'axios';

const HackathonCard = ({ title, description, type, delay }) => {
    // Map icons
    const Icon = type === 'hackathon' ? Rocket : Zap;

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay }}
            whileHover={{ scale: 1.02 }}
            className="glass p-6 rounded-2xl border-white/5 hover:border-primary/30 transition-all group"
        >
            <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
                    <Icon className="text-primary" size={24} />
                </div>
                <div>
                    <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{title}</h3>
                    <p className="text-gray-500 text-sm italic">{description}</p>
                </div>
            </div>
        </motion.div>
    );
};

const Hackathons = () => {
    const [hackathons, setHackathons] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchHackathons = async () => {
            try {
                const { data } = await axios.get('/api/portfolio/experience');
                // Filter only hackathons
                setHackathons(data.filter(item => item.type === 'hackathon'));
            } catch (err) {
                console.error('Failed to fetch hackathons');
            } finally {
                setIsLoading(false);
            }
        };
        fetchHackathons();
    }, []);

    if (isLoading) {
        return (
            <section className="py-20 flex items-center justify-center">
                <Loader2 className="animate-spin text-primary" size={48} />
            </section>
        );
    }

    return (
        <section id="hackathons" className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-3xl md:text-4xl font-bold mb-4"
                    >
                        Participated <span className="text-primary">Hackathons</span>
                    </motion.h2>
                    <p className="text-gray-400">Innovation through collaboration and rapid prototyping.</p>
                </div>

                {hackathons.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {hackathons.map((hack, idx) => (
                            <HackathonCard
                                key={hack._id}
                                title={hack.title}
                                description={hack.description}
                                type={hack.type}
                                delay={idx * 0.1}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-10 opacity-50 italic">
                        No hackathons added yet.
                    </div>
                )}
            </div>
        </section>
    );
};

export default Hackathons;
