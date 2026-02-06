'use client';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#3b82f6', // Modern blue
        },
        background: {
            default: '#f8fafc',
        }
    },
    typography: {
        fontFamily: 'var(--font-inter)',
        h1: { fontFamily: 'var(--font-poppins)' },
        h2: { fontFamily: 'var(--font-poppins)' },
        h3: { fontFamily: 'var(--font-poppins)' },
        h4: { fontFamily: 'var(--font-poppins)' },
        h5: { fontFamily: 'var(--font-poppins)' },
        h6: { fontFamily: 'var(--font-poppins)' },
    },
});

export default theme;
