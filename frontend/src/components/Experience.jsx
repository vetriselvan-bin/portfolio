import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Award, Calendar, Zap, User, Loader2 } from 'lucide-react';
import axios from 'axios';

const TimelineItem = ({ title, company, period, description, icon: iconName, isLast }) => {
    const Icon = iconName === 'Briefcase' ? Briefcase :
        iconName === 'GraduationCap' ? GraduationCap :
            iconName === 'Award' ? Award : Zap;

    return (
        <div className="relative pl-8 pb-12">
            {!isLast && (
                <div className="absolute left-[15px] top-8 bottom-0 w-0.5 bg-white/10"></div>
            )}
            <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-dark-lighter border-2 border-primary flex items-center justify-center z-10">
                <Icon size={14} className="text-primary" />
            </div>

            <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="glass p-6 rounded-2xl border-white/5 hover:border-white/10 transition-colors"
            >
                <div className="flex flex-wrap justify-between items-center gap-2 mb-4">
                    <div>
                        <h3 className="text-xl font-bold">{title}</h3>
                        <p className="text-primary font-medium">{company}</p>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500 text-sm bg-white/5 px-3 py-1 rounded-full">
                        <Calendar size={14} />
                        {period}
                    </div>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
            </motion.div>
        </div>
    );
};

const Experience = () => {
    const [experiences, setExperiences] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchExperience = async () => {
            try {
                const { data } = await axios.get('/api/portfolio/experience');
                setExperiences(data);
            } catch (err) {
                console.error('Failed to fetch experience data');
            } finally {
                setIsLoading(false);
            }
        };
        fetchExperience();
    }, []);

    if (isLoading) {
        return (
            <section className="py-20 flex items-center justify-center">
                <Loader2 className="animate-spin text-primary" size={48} />
            </section>
        );
    }

    // Map types to icons if icon field is not explicitly stored
    const getIcon = (item) => {
        if (item.icon) return item.icon;
        switch (item.type) {
            case 'education': return 'GraduationCap';
            case 'hackathon': return 'Award';
            case 'certification': return 'Award';
            default: return 'Briefcase';
        }
    };

    return (
        <section id="experience" className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="text-3xl md:text-4xl font-bold mb-4"
                    >
                        Experience & <span className="text-primary">Achievements</span>
                    </motion.h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        My professional journey, academic background, and notable milestones in the tech industry.
                    </p>
                </div>

                <div className="max-w-3xl mx-auto">
                    {experiences.length > 0 ? (
                        experiences.map((exp, index) => (
                            <TimelineItem
                                key={exp._id || index}
                                {...exp}
                                icon={getIcon(exp)}
                                isLast={index === experiences.length - 1}
                            />
                        ))
                    ) : (
                        <div className="text-center py-10 glass rounded-2xl border-white/5">
                            <p className="text-gray-500 italic">Add your experience in the dashboard.</p>
                        </div>
                    )}
                </div>

                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        { label: "Certifications", value: "AWS Cloud, IBM AI & Data Science", icon: Award },
                        { label: "Hackathons", value: "NASA Space App, HACKNEXT'25 Participant", icon: Zap },
                        { label: "Community", value: "Member of SNS College of Tech clubs", icon: User }
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ y: -5 }}
                            className="glass p-6 rounded-2xl border-white/5 text-center"
                        >
                            <item.icon className="mx-auto mb-4 text-secondary" size={32} />
                            <h4 className="font-bold text-lg mb-2">{item.label}</h4>
                            <p className="text-gray-400 text-sm">{item.value}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;
