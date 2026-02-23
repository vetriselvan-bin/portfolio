/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                primary: {
                    light: '#60a5fa',
                    DEFAULT: '#3b82f6',
                    dark: '#1e40af',
                },
                secondary: {
                    light: '#c084fc',
                    DEFAULT: '#a855f7',
                    dark: '#7e22ce',
                },
                dark: {
                    lighter: '#1f2937',
                    DEFAULT: '#111827',
                    darker: '#030712',
                }
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
                'portfolio-bg': 'linear-gradient(to bottom right, #030712, #111827, #1e1b4b)',
            },
        },
    },
    plugins: [],
}
