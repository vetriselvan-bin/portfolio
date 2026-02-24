import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, CloudSun, Calculator, Database, Loader2, Code } from 'lucide-react';
import axios from 'axios';

const ProjectCard = ({ project, index }) => {
    // Standardize icon parsing
    const iconName = project.icon || 'Code';
    const Icon = iconName === 'CloudSun' ? CloudSun :
        iconName === 'Calculator' ? Calculator :
            iconName === 'Database' ? Database : Code;

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group glass rounded-2xl border-white/5 overflow-hidden flex flex-col h-full"
        >
            <div className="relative aspect-video flex items-center justify-center bg-dark-lighter/50 dark:bg-dark-darker/50 overflow-hidden">
                <Icon className="w-20 h-20 text-primary opacity-20 group-hover:scale-120 group-hover:opacity-40 transition-all duration-500" />

                <div className="absolute inset-0 bg-dark-darker/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                    {project.github && (
                        <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-primary transition-colors"
                        >
                            <Github size={24} />
                        </a>
                    )}
                    {project.live && (
                        <a
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-secondary transition-colors"
                        >
                            <ExternalLink size={24} />
                        </a>
                    )}
                </div>
            </div>

            <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors uppercase tracking-tight">
                    {project.title}
                </h3>
                <p className="text-gray-400 text-sm mb-6 flex-grow">
                    {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech?.map((t, i) => (
                        <span key={i} className="text-[10px] uppercase font-bold text-primary/60 bg-primary/5 px-2 py-0.5 rounded">
                            {t}
                        </span>
                    ))}
                </div>

                <div className="flex justify-between items-center mt-auto border-t border-white/5 pt-4">
                    <span className="text-[10px] uppercase tracking-wider font-bold text-gray-500">
                        Dynamic Project
                    </span>
                    <a
                        href={project.live || "#"}
                        className="text-primary hover:text-primary-light flex items-center gap-1 text-sm font-bold"
                    >
                        View Demo <ExternalLink size={16} />
                    </a>
                </div>
            </div>
        </motion.div>
    );
};

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const { data } = await axios.get('/api/portfolio/projects');
                setProjects(data);
            } catch (err) {
                console.error('Failed to fetch projects');
            } finally {
                setIsLoading(false);
            }
        };
        fetchProjects();
    }, []);

    if (isLoading) {
        return (
            <section className="py-20 flex items-center justify-center">
                <Loader2 className="animate-spin text-primary" size={48} />
            </section>
        );
    }

    return (
        <section id="projects" className="py-20 bg-gray-100/50 dark:bg-dark-darker/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-3xl md:text-4xl font-bold mb-4"
                    >
                        Success <span className="text-secondary">Portfolio</span>
                    </motion.h2>
                    <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-6 rounded-full"></div>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        A showcase of my recent work, research, and technical implementations.
                    </p>
                </div>

                {projects.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {projects.map((project, index) => (
                            <ProjectCard key={project._id} project={project} index={index} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white/5 rounded-3xl border border-dashed border-white/10">
                        <p className="text-gray-500">No projects added yet. Check back soon!</p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Projects;
