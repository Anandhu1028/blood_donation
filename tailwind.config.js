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
                    50: '#fef2f2',
                    100: '#fee2e2',
                    200: '#fecaca',
                    300: '#fca5a5',
                    400: '#f87171',
                    500: '#ef4444',
                    600: '#dc2626',
                    700: '#b91c1c',
                    800: '#991b1b',
                    900: '#7f1d1d',
                },
                blood: {
                    light: '#ff6b6b',
                    DEFAULT: '#e63946',
                    dark: '#c1121f',
                },
                accent: {
                    light: '#4ecdc4',
                    DEFAULT: '#2a9d8f',
                    dark: '#1d7a6f',
                },
                neon: {
                    red: '#EF4444',
                    purple: '#8B5CF6',
                    blue: '#3B82F6',
                    teal: '#2A9D8F',
                    orange: '#F97316',
                }
            },
            fontFamily: {
                sans: ['Space Grotesk', 'system-ui', 'sans-serif'],
                display: ['Sora', 'sans-serif'],
            },
            animation: {
                'gradient-shift': 'gradient-shift 8s ease infinite',
                'border-glow': 'border-glow 2s linear infinite',
                'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
                'float': 'float 6s ease-in-out infinite',
                'float-particle': 'float-particle 20s linear infinite',
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
            boxShadow: {
                'neon-red': '0 0 30px rgba(239, 68, 68, 0.5)',
                'neon-purple': '0 0 30px rgba(139, 92, 246, 0.5)',
                'neon-blue': '0 0 30px rgba(59, 130, 246, 0.5)',
                'neon-teal': '0 0 30px rgba(42, 157, 143, 0.5)',
            },
        },
    },
    plugins: [],
}
