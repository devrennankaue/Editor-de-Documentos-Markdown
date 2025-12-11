// src/components/header.tsx

'use client'; 
import React from 'react'; 
import { FileText, Moon, Sun, Menu } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { 
    AppBar, 
    Toolbar, 
    IconButton, 
    Box, 
    Typography,
    Tooltip 
} from '@mui/material';

const ThemeToggleButton = () => {
    const { theme, toggleTheme } = useTheme(); 

    const Icon = theme === 'dark' ? Sun : Moon;
    const title = theme === 'dark' ? 'Mudar para Tema Claro' : 'Mudar para Tema Escuro';

    return (
        <Tooltip title={title}>
            <IconButton
                onClick={toggleTheme}
                aria-label={title}
                color="inherit"
                sx={{
                    '&:hover': {
                        backgroundColor: 'action.hover',
                    },
                }}
            >
                <Icon size={20} />
            </IconButton>
        </Tooltip>
    );
};

interface HeaderProps {
    onMenuClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
    return (
        <AppBar 
            position="static" 
            elevation={0}
            sx={{
                backgroundColor: 'background.paper',
                color: 'text.primary',
                borderBottom: 1,
                borderColor: 'divider',
            }}
        >
            <Toolbar sx={{ px: { xs: 2, sm: 3 } }}>
                {onMenuClick && (
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={onMenuClick}
                        sx={{ mr: 2, display: { md: 'none' } }}
                    >
                        <Menu size={24} />
                    </IconButton>
                )}
                
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <FileText size={24} style={{ color: '#2563eb' }} />
                    <Typography
                        variant="h6"
                        component="h1"
                        sx={{
                            fontSize: { xs: '16px', sm: '18px' },
                            fontWeight: 600,
                            color: 'text.primary',
                        }}
                    >
                        ADA Markdown Editor
                    </Typography>
                </Box>

                <Box sx={{ flexGrow: 1 }} />

                <ThemeToggleButton />
            </Toolbar>
        </AppBar>
    );
};

export default Header;