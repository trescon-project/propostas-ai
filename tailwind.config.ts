import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['var(--font-inter)'],
                poppins: ['var(--font-poppins)'],
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                scaleIn: {
                    '0%': { transform: 'scale(1.1)', opacity: '0' },
                    '100%': { transform: 'scale(1)', opacity: '1' },
                },
                slideDown: {
                    '0%': { transform: 'translateY(-20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                growRight: {
                    '0%': { transform: 'scaleX(0)', opacity: '0' },
                    '100%': { transform: 'scaleX(1)', opacity: '1' },
                },
                popIn: {
                    '0%': { transform: 'scale(0.9) translateY(20px)', opacity: '0' },
                    '100%': { transform: 'scale(1) translateY(0)', opacity: '1' },
                }
            },
            animation: {
                fadeIn: 'fadeIn 1s ease-out forwards',
                slideUp: 'slideUp 0.8s ease-out forwards',
                slideUpDelay: 'slideUp 0.8s ease-out 0.2s forwards',
                scaleIn: 'scaleIn 1.5s ease-out forwards',
                slideDown: 'slideDown 0.8s ease-out forwards',
                growRight: 'growRight 1.2s ease-out forwards',
                popIn: 'popIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
            },
        },
    },
    plugins: [],
};
export default config;
