// src/components/Toolbar.tsx
'use client';

import React, { useState } from 'react';
import {
    Box,
    IconButton,
    Tooltip,
    Divider,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    SelectChangeEvent,
} from '@mui/material';
import { 
    Bold, 
    Italic, 
    Type, 
    List, 
    Link, 
    Image,
    Hash,
    Code,
    Quote,
} from 'lucide-react';

interface ToolbarProps {
    insertMarkdown: (prefix: string, suffix: string) => void;
}

const ToolbarButton: React.FC<{ 
    icon: React.ReactNode; 
    onClick: () => void; 
    label: string;
}> = ({ icon, onClick, label }) => (
    <Tooltip title={label} arrow placement="top">
        <IconButton
            onClick={onClick}
            size="small"
            sx={{
                color: 'text.secondary',
                '&:hover': {
                    backgroundColor: 'action.hover',
                    color: 'text.primary',
                },
            }}
        >
            {icon}
        </IconButton>
    </Tooltip>
);

export const Toolbar: React.FC<ToolbarProps> = ({ insertMarkdown }) => {
    const [headingLevel, setHeadingLevel] = useState('2');

    const handleBold = () => insertMarkdown('**', '**');
    const handleItalic = () => insertMarkdown('_', '_');
    const handleCode = () => insertMarkdown('`', '`');
    const handleQuote = () => insertMarkdown('> ', '');
    const handleList = () => insertMarkdown('- ', '');
    const handleLink = () => insertMarkdown('[Link Text](', ')');
    const handleImage = () => insertMarkdown('![Alt Text](', ')');

    const handleHeadingChange = (event: SelectChangeEvent) => {
        const level = event.target.value;
        setHeadingLevel(level);
        const prefix = '#'.repeat(parseInt(level)) + ' ';
        insertMarkdown(prefix, '');
    };

    const handleHeadingClick = () => {
        const prefix = '#'.repeat(parseInt(headingLevel)) + ' ';
        insertMarkdown(prefix, '');
    };

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                px: 2,
                py: 1,
                flexWrap: 'wrap',
            }}
        >
            {/* Formatação de Texto */}
            <ToolbarButton 
                icon={<Bold size={18} />} 
                onClick={handleBold} 
                label="Negrito (**texto**)" 
            />
            <ToolbarButton 
                icon={<Italic size={18} />} 
                onClick={handleItalic} 
                label="Itálico (*texto*)" 
            />
            <ToolbarButton 
                icon={<Code size={18} />} 
                onClick={handleCode} 
                label="Código Inline (`código`)" 
            />
            <ToolbarButton 
                icon={<Quote size={18} />} 
                onClick={handleQuote} 
                label="Citação (> texto)" 
            />

            <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />

            {/* Títulos */}
            <FormControl size="small" sx={{ minWidth: 100, mr: 0.5 }}>
                <InputLabel id="heading-select-label">Título</InputLabel>
                <Select
                    labelId="heading-select-label"
                    value={headingLevel}
                    label="Título"
                    onChange={handleHeadingChange}
                    sx={{
                        height: 32,
                        fontSize: '0.875rem',
                    }}
                >
                    <MenuItem value="1">
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Hash size={16} />
                            <span>H1</span>
                        </Box>
                    </MenuItem>
                    <MenuItem value="2">
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Hash size={16} />
                            <span>H2</span>
                        </Box>
                    </MenuItem>
                    <MenuItem value="3">
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Hash size={16} />
                            <span>H3</span>
                        </Box>
                    </MenuItem>
                </Select>
            </FormControl>
            
            <Tooltip title={`Inserir Título H${headingLevel}`} arrow placement="top">
                <IconButton
                    onClick={handleHeadingClick}
                    size="small"
                    sx={{
                        color: 'text.secondary',
                        '&:hover': {
                            backgroundColor: 'action.hover',
                            color: 'text.primary',
                        },
                    }}
                >
                    <Type size={18} />
                </IconButton>
            </Tooltip>

            <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />

            {/* Lista */}
            <ToolbarButton 
                icon={<List size={18} />} 
                onClick={handleList} 
                label="Lista Simples (- item)" 
            />

            <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />

            {/* Links e Imagens */}
            <ToolbarButton 
                icon={<Link size={18} />} 
                onClick={handleLink} 
                label="Link ([texto](url))" 
            />
            <ToolbarButton 
                icon={<Image size={18} />} 
                onClick={handleImage} 
                label="Imagem (![alt](url))" 
            />
        </Box>
    );
};