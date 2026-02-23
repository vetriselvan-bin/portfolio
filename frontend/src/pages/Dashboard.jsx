import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Mail, Trash2, LogOut, RefreshCw, MessageSquare,
    User, Calendar, Search, Plus, Edit2,
    Briefcase, Code, GraduationCap, Settings,
    ExternalLink, Check, X, Loader2, Zap
} from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('messages');
    const [messages, setMessages] = useState([]);
    const [projects, setProjects] = useState([]);
    const [skills, setSkills] = useState([]);
    const [experience, setExperience] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    const fetchAllData = async () => {
        setIsLoading(true);
        try {
            const token = localStorage.getItem('token');
            const headers = { 'x-auth-token': token };

            const [msgRes, projRes, skillRes, expRes] = await Promise.all([
                axios.get('/api/contact', { headers }),
                axios.get('/api/portfolio/projects'),
                axios.get('/api/portfolio/skills'),
                axios.get('/api/portfolio/experience')
            ]);

            setMessages(msgRes.data);
            setProjects(projRes.data);
            setSkills(skillRes.data);
            setExperience(expRes.data);
        } catch (err) {
            toast.error('Failed to fetch dashboard data');
            if (err.response?.status === 401) {
                localStorage.removeItem('token');
                navigate('/admin/login');
            }
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchAllData();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        toast.success('Logged out');
        navigate('/admin/login');
    };

    // Generic Delete Handler
    const deleteItem = async (type, id) => {
        if (!window.confirm(`Are you sure you want to delete this ${type}?`)) return;
        try {
            const token = localStorage.getItem('token');
            const endpoint = type === 'message' ? `/api/contact/${id}` : `/api/portfolio/${type}s/${id}`;
            await axios.delete(endpoint, { headers: { 'x-auth-token': token } });

            if (type === 'message') setMessages(messages.filter(m => m._id !== id));
            if (type === 'project') setProjects(projects.filter(p => p._id !== id));
            if (type === 'skill') setSkills(skills.filter(s => s._id !== id));
            if (type === 'experience') setExperience(experience.filter(e => e._id !== id));

            toast.success(`${type} deleted`);
        } catch (err) {
            toast.error(`Failed to delete ${type}`);
        }
    };

    const tabs = [
        { id: 'messages', label: 'Inbox', icon: Mail },
        { id: 'projects', label: 'Projects', icon: Briefcase },
        { id: 'skills', label: 'Skills', icon: Code },
        { id: 'experience', label: 'Experience', icon: GraduationCap },
    ];

    return (
        <div className="pt-24 pb-12 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
                    <div>
                        <h1 className="text-3xl font-bold flex items-center gap-3">
                            Admin <span className="text-secondary">Dashboard</span>
                        </h1>
                        <p className="text-gray-400">Welcome back, Vetriselvan.</p>
                    </div>

                    <div className="flex items-center gap-4">
                        <Link
                            to="/admin/portfolio-settings"
                            className="btn btn-outline border-primary/50 text-primary flex items-center gap-2"
                        >
                            <Settings size={18} /> Settings
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="btn btn-outline border-red-500/50 text-red-500 hover:bg-red-500/10 flex items-center gap-2"
                        >
                            <LogOut size={18} /> Logout
                        </button>
                    </div>
                </div>

                {/* Tab Navigation */}
                <div className="flex flex-wrap gap-4 mb-12 bg-white/5 p-2 rounded-2xl border border-white/5 lg:w-fit">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl transition-all ${activeTab === tab.id
                                    ? 'bg-primary text-white shadow-lg shadow-primary/30'
                                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                }`}
                        >
                            <tab.icon size={18} />
                            {tab.label}
                            {tab.id === 'messages' && messages.length > 0 && (
                                <span className="bg-white/20 text-white px-2 py-0.5 rounded-md text-[10px] font-bold">
                                    {messages.length}
                                </span>
                            )}
                        </button>
                    ))}
                </div>

                {/* Dashboard Content */}
                <div className="min-h-[400px]">
                    <AnimatePresence mode="wait">
                        {isLoading ? (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex flex-col items-center justify-center py-20"
                            >
                                <Loader2 className="animate-spin text-primary mb-4" size={48} />
                                <p className="text-gray-500">Loading your data...</p>
                            </motion.div>
                        ) : (
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                            >
                                {activeTab === 'messages' && (
                                    <MessageList
                                        messages={messages}
                                        onDelete={(id) => deleteItem('message', id)}
                                    />
                                )}
                                {activeTab === 'projects' && (
                                    <ProjectManager
                                        projects={projects}
                                        refresh={fetchAllData}
                                        onDelete={(id) => deleteItem('project', id)}
                                    />
                                )}
                                {activeTab === 'skills' && (
                                    <SkillManager
                                        skills={skills}
                                        refresh={fetchAllData}
                                        onDelete={(id) => deleteItem('skill', id)}
                                    />
                                )}
                                {activeTab === 'experience' && (
                                    <ExperienceManager
                                        items={experience}
                                        refresh={fetchAllData}
                                        onDelete={(id) => deleteItem('experience', id)}
                                    />
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

// --- Sub-Components ---

const MessageList = ({ messages, onDelete }) => (
    <div className="space-y-6">
        {messages.length > 0 ? (
            messages.map((msg) => (
                <div key={msg._id} className="glass p-8 rounded-2xl border-white/5 flex flex-col md:flex-row gap-6">
                    <div className="flex-grow">
                        <div className="flex items-center gap-3 mb-4">
                            <h3 className="text-xl font-bold">{msg.subject}</h3>
                            <span className="text-gray-500 text-xs">{new Date(msg.date).toLocaleDateString()}</span>
                        </div>
                        <p className="text-gray-300 mb-4">{msg.name} ({msg.email})</p>
                        <div className="bg-dark-darker/50 p-6 rounded-xl border border-white/5 italic text-gray-400">
                            "{msg.message}"
                        </div>
                    </div>
                    <div className="flex md:flex-col justify-end gap-3">
                        <button onClick={() => onDelete(msg._id)} className="p-3 glass rounded-xl text-red-500 hover:bg-red-500/10">
                            <Trash2 size={20} />
                        </button>
                    </div>
                </div>
            ))
        ) : (
            <div className="text-center py-20 glass rounded-3xl border-white/5 text-gray-500">
                No messages found in your inbox.
            </div>
        )}
    </div>
);

const ProjectManager = ({ projects, refresh, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);
    const [formData, setFormData] = useState({ title: '', description: '', tech: '', github: '', live: '', icon: 'Database' });

    const handleOpenEdit = (project) => {
        setEditId(project._id);
        setFormData({
            title: project.title,
            description: project.description,
            tech: project.tech.join(', '),
            github: project.github || '',
            live: project.live || '',
            icon: project.icon || 'Database'
        });
        setIsEditing(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const projectData = { ...formData, tech: formData.tech.split(',').map(s => s.trim()) };

            if (editId) {
                await axios.put(`/api/portfolio/projects/${editId}`, projectData, { headers: { 'x-auth-token': token } });
                toast.success('Project updated');
            } else {
                await axios.post('/api/portfolio/projects', projectData, { headers: { 'x-auth-token': token } });
                toast.success('Project added');
            }

            handleCancel();
            refresh();
        } catch (err) {
            toast.error('Operation failed');
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        setEditId(null);
        setFormData({ title: '', description: '', tech: '', github: '', live: '', icon: 'Database' });
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Projects</h2>
                {!isEditing && (
                    <button onClick={() => setIsEditing(true)} className="btn btn-primary flex items-center gap-2">
                        <Plus size={18} /> Add Project
                    </button>
                )}
            </div>

            {isEditing && (
                <form onSubmit={handleSubmit} className="glass p-8 rounded-2xl border-primary/20 space-y-6">
                    <h3 className="text-xl font-bold">{editId ? 'Edit Project' : 'Add Project'}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <input className="input-field" placeholder="Title" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} required />
                        <input className="input-field" placeholder="Icon (CloudSun, Calculator, Database)" value={formData.icon} onChange={e => setFormData({ ...formData, icon: e.target.value })} />
                        <input className="input-field" placeholder="Technologies (comma separated)" value={formData.tech} onChange={e => setFormData({ ...formData, tech: e.target.value })} />
                        <input className="input-field" placeholder="GitHub Link" value={formData.github} onChange={e => setFormData({ ...formData, github: e.target.value })} />
                        <input className="input-field" placeholder="Live Demo Link" value={formData.live} onChange={e => setFormData({ ...formData, live: e.target.value })} />
                    </div>
                    <textarea className="input-field w-full h-32" placeholder="Description" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} required />
                    <div className="flex gap-4">
                        <button type="submit" className="btn btn-primary flex-grow">Save Project</button>
                        <button type="button" onClick={handleCancel} className="btn bg-white/5 hover:bg-white/10 px-8">Cancel</button>
                    </div>
                </form>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map(p => (
                    <div key={p._id} className="glass p-6 rounded-2xl border-white/5 relative group">
                        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => handleOpenEdit(p)} className="p-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20">
                                <Edit2 size={16} />
                            </button>
                            <button onClick={() => onDelete(p._id)} className="p-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500/20">
                                <Trash2 size={16} />
                            </button>
                        </div>
                        <h4 className="font-bold text-lg mb-2">{p.title}</h4>
                        <p className="text-gray-400 text-sm mb-4 line-clamp-2">{p.description}</p>
                        <div className="flex flex-wrap gap-2">
                            {p.tech.map((t, i) => (
                                <span key={i} className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded">{t}</span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const SkillManager = ({ skills, refresh, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);
    const [formData, setFormData] = useState({ name: '', level: 80, category: 'Programming' });

    const handleOpenEdit = (skill) => {
        setEditId(skill._id);
        setFormData({ name: skill.name, level: skill.level, category: skill.category });
        setIsEditing(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            if (editId) {
                await axios.put(`/api/portfolio/skills/${editId}`, formData, { headers: { 'x-auth-token': token } });
                toast.success('Skill updated');
            } else {
                await axios.post('/api/portfolio/skills', formData, { headers: { 'x-auth-token': token } });
                toast.success('Skill added');
            }
            handleCancel();
            refresh();
        } catch (err) {
            toast.error('Operation failed');
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        setEditId(null);
        setFormData({ name: '', level: 80, category: 'Programming' });
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Skills</h2>
                {!isEditing && (
                    <button onClick={() => setIsEditing(true)} className="btn btn-primary flex items-center gap-2">
                        <Plus size={18} /> Add Skill
                    </button>
                )}
            </div>

            {isEditing && (
                <form onSubmit={handleSubmit} className="glass p-8 rounded-2xl border-primary/20 flex flex-wrap gap-4 items-end">
                    <div className="flex-grow min-w-[200px]">
                        <label className="block text-gray-500 text-xs mb-1">Skill Name</label>
                        <input className="input-field w-full" placeholder="Python" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required />
                    </div>
                    <div className="w-24">
                        <label className="block text-gray-500 text-xs mb-1">Level %</label>
                        <input className="input-field w-full" type="number" value={formData.level} onChange={e => setFormData({ ...formData, level: parseInt(e.target.value) })} required />
                    </div>
                    <div className="w-40">
                        <label className="block text-gray-500 text-xs mb-1">Category</label>
                        <select className="input-field w-full" value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })}>
                            <option>Programming</option>
                            <option>Web</option>
                            <option>Tools</option>
                            <option>Interests</option>
                        </select>
                    </div>
                    <div className="flex gap-2">
                        <button type="submit" className="btn btn-primary h-[46px] px-6">Save</button>
                        <button type="button" onClick={handleCancel} className="btn bg-white/5 hover:bg-white/10 h-[46px] px-4">Cancel</button>
                    </div>
                </form>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {skills.map(s => (
                    <div key={s._id} className="glass p-4 rounded-xl border-white/5 flex justify-between items-center group">
                        <div>
                            <p className="font-bold">{s.name}</p>
                            <p className="text-secondary text-[10px] uppercase font-bold tracking-wider">{s.category} — {s.level}%</p>
                        </div>
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => handleOpenEdit(s)} className="p-1.5 text-primary hover:bg-primary/10 rounded-lg">
                                <Edit2 size={14} />
                            </button>
                            <button onClick={() => onDelete(s._id)} className="p-1.5 text-red-500 hover:bg-red-500/10 rounded-lg">
                                <Trash2 size={14} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const ExperienceManager = ({ items, refresh, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);
    const [formData, setFormData] = useState({ title: '', company: '', period: '', description: '', type: 'work' });

    const handleOpenEdit = (item) => {
        setEditId(item._id);
        setFormData({
            title: item.title,
            company: item.company || '',
            period: item.period,
            description: item.description || '',
            type: item.type
        });
        setIsEditing(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            if (editId) {
                await axios.put(`/api/portfolio/experience/${editId}`, formData, { headers: { 'x-auth-token': token } });
                toast.success('Item updated');
            } else {
                await axios.post('/api/portfolio/experience', formData, { headers: { 'x-auth-token': token } });
                toast.success('Item added');
            }
            handleCancel();
            refresh();
        } catch (err) {
            toast.error('Operation failed');
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        setEditId(null);
        setFormData({ title: '', company: '', period: '', description: '', type: 'work' });
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Timeline & Experience</h2>
                {!isEditing && (
                    <button onClick={() => setIsEditing(true)} className="btn btn-primary flex items-center gap-2">
                        <Plus size={18} /> Add Item
                    </button>
                )}
            </div>

            {isEditing && (
                <form onSubmit={handleSubmit} className="glass p-8 rounded-2xl border-primary/20 space-y-6">
                    <h3 className="text-xl font-bold">{editId ? 'Edit Item' : 'Add Item'}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <input className="input-field" placeholder="Title/Course" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} required />
                        <input className="input-field" placeholder="Company/Institution" value={formData.company} onChange={e => setFormData({ ...formData, company: e.target.value })} />
                        <input className="input-field" placeholder="Period (e.g. 2022 - 2026)" value={formData.period} onChange={e => setFormData({ ...formData, period: e.target.value })} required />
                        <select className="input-field" value={formData.type} onChange={e => setFormData({ ...formData, type: e.target.value })}>
                            <option value="work">Work Experience</option>
                            <option value="education">Education</option>
                            <option value="hackathon">Hackathon</option>
                            <option value="certification">Certification</option>
                        </select>
                    </div>
                    <textarea className="input-field w-full h-24" placeholder="Brief Description" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} />
                    <div className="flex gap-4">
                        <button type="submit" className="btn btn-primary flex-grow">Save Changes</button>
                        <button type="button" onClick={handleCancel} className="btn bg-white/5 hover:bg-white/10 px-8">Cancel</button>
                    </div>
                </form>
            )}

            <div className="space-y-4">
                {items.map(item => (
                    <div key={item._id} className="glass p-6 rounded-2xl border-white/5 flex justify-between items-center group">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-white/5 rounded-xl">
                                {item.type === 'work' && <Briefcase className="text-primary" size={20} />}
                                {item.type === 'education' && <GraduationCap className="text-secondary" size={20} />}
                                {item.type === 'hackathon' && <Zap className="text-yellow-500" size={20} />}
                                {item.type === 'certification' && <Check className="text-green-500" size={20} />}
                            </div>
                            <div>
                                <h4 className="font-bold">{item.title}</h4>
                                <p className="text-gray-400 text-sm">{item.company} | {item.period}</p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button onClick={() => handleOpenEdit(item)} className="p-2 text-primary hover:bg-primary/10 rounded-lg">
                                <Edit2 size={18} />
                            </button>
                            <button onClick={() => onDelete(item._id)} className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg">
                                <Trash2 size={18} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
