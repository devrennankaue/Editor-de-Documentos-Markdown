'use client';

import React, { useState } from 'react';
import {
    Box,
    Container,
    Typography,
    IconButton,
    Divider,
    Stack,
    Tooltip,
    Collapse,
    Fab,
} from '@mui/material';
import {
    Github,
    Linkedin,
    MapPin,
    User,
    ChevronUp,
    Info,
} from 'lucide-react';

interface ContactInfo {
    name?: string;
    github?: string;
    linkedin?: string;
    location?: string;
}

interface FooterProps {
    contactInfo?: ContactInfo;
}

const Footer: React.FC<FooterProps> = ({ 
    contactInfo = {
        name: '',
        github: '',
        linkedin: '',
        location: '',
    }
}) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleFooter = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <Fab
                color="primary"
                aria-label="mostrar informações"
                onClick={toggleFooter}
                sx={{
                    position: 'fixed',
                    bottom: 16,
                    right: 16,
                    zIndex: 1000,
                }}
            >
                {isOpen ? <ChevronUp size={24} /> : <Info size={24} />}
            </Fab>

            <Collapse in={isOpen}>
                <Box
                    component="footer"
                    sx={{
                        mt: 'auto',
                        backgroundColor: 'background.paper',
                        borderTop: 1,
                        borderColor: 'divider',
                        py: 3,
                    }}
                >
            <Container maxWidth="lg">
                <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={{ xs: 2, sm: 4 }}
                    justifyContent="space-between"
                    alignItems={{ xs: 'flex-start', sm: 'center' }}
                >
                    <Box>
                        <Typography
                            variant="h6"
                            component="h3"
                            sx={{
                                fontSize: '0.875rem',
                                fontWeight: 600,
                                mb: 1.5,
                                color: 'text.primary',
                            }}
                        >
                            Informações
                        </Typography>
                        <Stack spacing={1}>
                            {contactInfo.name && (
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 1,
                                        color: 'text.primary',
                                        fontSize: '0.875rem',
                                        fontWeight: 500,
                                    }}
                                >
                                    <User size={16} />
                                    {contactInfo.name}
                                </Box>
                            )}
                            {contactInfo.location && (
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 1,
                                        color: 'text.secondary',
                                        fontSize: '0.875rem',
                                    }}
                                >
                                    <MapPin size={16} />
                                    {contactInfo.location}
                                </Box>
                            )}
                        </Stack>
                    </Box>

                    <Divider orientation="vertical" flexItem sx={{ display: { xs: 'none', sm: 'block' } }} />

                    <Box>
                        <Typography
                            variant="h6"
                            component="h3"
                            sx={{
                                fontSize: '0.875rem',
                                fontWeight: 600,
                                mb: 1.5,
                                color: 'text.primary',
                            }}
                        >
                            Redes Sociais
                        </Typography>
                        <Stack direction="row" spacing={1}>
                            {contactInfo.github && (
                                <Tooltip title="GitHub">
                                    <IconButton
                                        component="a"
                                        href={contactInfo.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        size="small"
                                        sx={{
                                            color: 'text.secondary',
                                            '&:hover': {
                                                color: 'primary.main',
                                                backgroundColor: 'action.hover',
                                            },
                                        }}
                                    >
                                        <Github size={20} />
                                    </IconButton>
                                </Tooltip>
                            )}
                            {contactInfo.linkedin && (
                                <Tooltip title="LinkedIn">
                                    <IconButton
                                        component="a"
                                        href={contactInfo.linkedin}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        size="small"
                                        sx={{
                                            color: 'text.secondary',
                                            '&:hover': {
                                                color: 'primary.main',
                                                backgroundColor: 'action.hover',
                                            },
                                        }}
                                    >
                                        <Linkedin size={20} />
                                    </IconButton>
                                </Tooltip>
                            )}
                        </Stack>
                    </Box>
                </Stack>

                <Divider sx={{ my: 2 }} />

                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ fontSize: '0.75rem' }}
                    >
                        © {new Date().getFullYear()} ADA Markdown Editor
                    </Typography>
                </Box>
            </Container>
        </Box>
            </Collapse>
        </>
    );
};

export default Footer;

