import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, BookOpen, GraduationCap, Percent, Star, Loader2, Briefcase, Zap, Check } from 'lucide-react';
import axios from 'axios';

const SkillBar = ({ name, level, delay }) => (
    <div className="mb-6">
        <div className="flex justify-between mb-2">
            <span className="text-gray-600 dark:text-gray-300 font-medium">{name}</span>
            <span className="text-primary font-bold">{level}%</span>
        </div>
        <div className="w-full h-2 bg-gray-200 dark:bg-white/5 rounded-full overflow-hidden">
            <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${level}%` }}
                transition={{ duration: 1, delay }}
                className="h-full bg-gradient-to-r from-primary to-secondary"
            />
        </div>
    </div>
);

const About = () => {
    const [settings, setSettings] = useState(null);
    const [skills, setSkills] = useState([]);
    const [experience, setExperience] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [settingsRes, skillsRes, expRes] = await Promise.all([
                    axios.get('/api/portfolio/settings'),
                    axios.get('/api/portfolio/skills'),
                    axios.get('/api/portfolio/experience')
                ]);
                setSettings(settingsRes.data);
                setSkills(skillsRes.data);
                setExperience(expRes.data);
            } catch (err) {
                console.error('Failed to fetch about data');
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    if (isLoading) {
        return (
            <section className="py-20 flex items-center justify-center">
                <Loader2 className="animate-spin text-primary" size={48} />
            </section>
        );
    }

    const education = experience.filter(item => item.type === 'education');

    // Group skills by category
    const skillCategories = skills.reduce((acc, skill) => {
        const cat = skill.category || 'Other';
        if (!acc[cat]) acc[cat] = { title: cat, skills: [] };
        acc[cat].skills.push({ name: skill.name, level: skill.level });
        return acc;
    }, {});

    const categoriesArray = Object.values(skillCategories);

    return (
        <section id="about" className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-6 flex items-center gap-3">
                            <User className="text-primary" /> About <span className="text-primary">Me</span>
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-8">
                            {settings?.aboutDescription || "Motivated B.Tech student in Artificial Intelligence and Data Science with hands-on knowledge of Python and Web Development."}
                        </p>

                        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <BookOpen size={22} className="text-secondary" /> Education
                        </h3>
                        <div className="space-y-4 mb-8">
                            {education.length > 0 ? (
                                education.map((edu, idx) => (
                                    <div key={idx} className="glass p-4 rounded-xl border-white/5 flex items-center gap-4">
                                        <div className="p-2 bg-primary/10 rounded-lg">
                                            <GraduationCap className="text-primary" size={20} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-sm">{edu.title}</h4>
                                            <p className="text-gray-500 text-xs">{edu.company} — <span className="text-secondary font-bold">{edu.period}</span></p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500 italic text-sm">Update your education in the dashboard.</p>
                            )}
                        </div>

                        <div className="flex flex-wrap gap-4">
                            {['Vibe Coding', 'Generative AI', 'Problem Solving'].map((interest, i) => (
                                <div key={i} className="glass px-4 py-2 rounded-full border-white/5 text-xs text-gray-500 dark:text-gray-400 flex items-center gap-2">
                                    <Star size={14} className="text-yellow-500" /> {interest}
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="space-y-12"
                    >
                        {categoriesArray.length > 0 ? (
                            categoriesArray.map((category, idx) => (
                                <div key={idx}>
                                    <h3 className="text-xl font-bold mb-6 uppercase tracking-wider text-primary/80">
                                        {category.title}
                                    </h3>
                                    {category.skills.map((skill, sIdx) => (
                                        <SkillBar
                                            key={sIdx}
                                            name={skill.name}
                                            level={skill.level}
                                            delay={sIdx * 0.1 + idx * 0.2}
                                        />
                                    ))}
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500 italic">Add your skills in the dashboard.</p>
                        )}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
