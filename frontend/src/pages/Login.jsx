import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, LogIn, ArrowLeft } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const Login = () => {
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const { data } = await axios.post('/api/auth/login', { password });
            localStorage.setItem('token', data.token);
            toast.success('Login Successful');
            navigate('/admin/dashboard');
        } catch (err) {
            toast.error(err.response?.data?.msg || 'Invalid Credentials');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-12">
            <div className="max-w-md w-full">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass p-8 rounded-3xl border-white/5 text-center"
                >
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Lock className="text-primary" size={32} />
                    </div>

                    <h2 className="text-3xl font-bold mb-2">Admin Login</h2>
                    <p className="text-gray-400 mb-8">Enter your secure password to access the dashboard.</p>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <input
                                type="password"
                                name="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter password..."
                                className="w-full bg-dark-darker border border-white/10 rounded-xl py-3 px-4 text-center text-gray-200 focus:outline-none focus:border-primary/50 transition-colors"
                                autoFocus
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full btn btn-primary flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                            {isLoading ? 'Verifying...' : 'Access Dashboard'}
                            <LogIn size={20} />
                        </button>
                    </form>

                    <div className="mt-8 pt-8 border-t border-white/5">
                        <button
                            onClick={() => navigate('/')}
                            className="text-gray-500 hover:text-white flex items-center gap-2 mx-auto transition-colors"
                        >
                            <ArrowLeft size={16} /> Back to Portfolio
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Login;
