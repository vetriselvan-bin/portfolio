import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle = () => {
    const [isDark, setIsDark] = useState(true);

    useEffect(() => {
        const theme = localStorage.getItem('theme');
        if (theme === 'light') {
            setIsDark(false);
            document.documentElement.classList.remove('dark');
        } else {
            document.documentElement.classList.add('dark');
        }
    }, []);

    const toggleTheme = () => {
        if (isDark) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
            setIsDark(false);
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
            setIsDark(true);
        }
    };

    return (
        <button
            onClick={toggleTheme}
            className="p-2.5 glass rounded-xl text-gray-400 hover:text-primary transition-all duration-300 relative group overflow-hidden"
            aria-label="Toggle Theme"
        >
            <div className="relative z-10">
                {isDark ? (
                    <Sun size={20} className="hover:rotate-45 transition-transform duration-500" />
                ) : (
                    <Moon size={20} className="hover:-rotate-12 transition-transform duration-500 text-secondary" />
                )}
            </div>
            <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </button>
    );
};

export default ThemeToggle;
