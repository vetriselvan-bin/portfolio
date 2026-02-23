import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BadgeCheck, Cpu, Database, Lightbulb, Loader2 } from 'lucide-react';
import axios from 'axios';

const CertificationGroup = ({ issuer, certs, delay }) => {
    // Determine icon based on issuer
    const Icon = issuer.toLowerCase().includes('aws') ? Cpu :
        issuer.toLowerCase().includes('ibm') ? Lightbulb : Database;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
            className="glass p-8 rounded-3xl border-white/5 h-full"
        >
            <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-secondary/10 rounded-2xl">
                    <Icon className="text-secondary" size={28} />
                </div>
                <h3 className="text-2xl font-bold">{issuer}</h3>
            </div>
            <ul className="space-y-4">
                {certs.map((cert, i) => (
                    <li key={i} className="flex items-start gap-3 group">
                        <BadgeCheck className="text-primary mt-1 flex-shrink-0 group-hover:scale-110 transition-transform" size={18} />
                        <span className="text-gray-600 dark:text-gray-300 group-hover:text-primary transition-colors">{cert.title}</span>
                    </li>
                ))}
            </ul>
        </motion.div>
    );
};

const Certifications = () => {
    const [certs, setCerts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchCerts = async () => {
            try {
                const { data } = await axios.get('/api/portfolio/experience');
                setCerts(data.filter(item => item.type === 'certification'));
            } catch (err) {
                console.error('Failed to fetch certifications');
            } finally {
                setIsLoading(false);
            }
        };
        fetchCerts();
    }, []);

    if (isLoading) {
        return (
            <section className="py-20 flex items-center justify-center">
                <Loader2 className="animate-spin text-primary" size={48} />
            </section>
        );
    }

    // Group certs by company/issuer
    const groupedCerts = certs.reduce((acc, cert) => {
        const issuer = cert.company || 'Other';
        if (!acc[issuer]) acc[issuer] = [];
        acc[issuer].push(cert);
        return acc;
    }, {});

    const issuers = Object.keys(groupedCerts);

    return (
        <section id="certifications" className="py-20 bg-gray-100/50 dark:bg-dark-darker/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="text-3xl md:text-4xl font-bold mb-4"
                    >
                        Professional <span className="text-secondary">Certifications</span>
                    </motion.h2>
                    <p className="text-gray-400">Validated expertise through industry-recognized programs.</p>
                </div>

                {issuers.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {issuers.map((issuer, idx) => (
                            <CertificationGroup
                                key={issuer}
                                issuer={issuer}
                                certs={groupedCerts[issuer]}
                                delay={idx * 0.1}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-10 italic text-gray-500">
                        No certifications listed yet.
                    </div>
                )}
            </div>
        </section>
    );
};

export default Certifications;
