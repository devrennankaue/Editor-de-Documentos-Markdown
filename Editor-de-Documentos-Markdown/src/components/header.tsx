// src/components/header.tsx

'use client'; 
import React from 'react'; 
import { FileText, Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { IconButton, Box, Typography } from '@mui/material';

const ThemeToggleButton = () => {
    const { theme, toggleTheme } = useTheme(); 

    const Icon = theme === 'dark' ? Sun : Moon;
    const title = theme === 'dark' ? 'Mudar para Tema Claro' : 'Mudar para Tema Escuro';

    return (
        <IconButton
            onClick={toggleTheme}
            title={title}
            aria-label={title}
            sx={{
                color: 'text.primary',
                '&:hover': {
                    backgroundColor: 'action.hover',
                },
            }}
        >
            <Icon size={20} />
        </IconButton>
    );
};


const Header = () => {
    return (
        <Box
            component="header"
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 16px',
                borderBottom: 1,
                borderColor: 'divider',
                backgroundColor: 'background.paper',
                boxShadow: 1,
                flexShrink: 0,
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <FileText size={20} style={{ color: '#2563eb' }} />
                <Typography
                    variant="h6"
                    component="h1"
                    sx={{
                        fontSize: '18px',
                        fontWeight: 'bold',
                        color: 'text.primary',
                    }}
                >
                    ADA Markdown Editor
                </Typography>
            </Box>

            <ThemeToggleButton />
        </Box>
    );
};

export default Header;