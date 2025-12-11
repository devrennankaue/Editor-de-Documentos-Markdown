// src/components/Sidebar.tsx
'use client';

import React from 'react';
import {
    Drawer,
    Box,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    Divider,
    IconButton,
    Tooltip,
} from '@mui/material';
import { 
    FileText, 
    Plus, 
    Edit, 
    Trash2, 
    X,
    Home 
} from 'lucide-react';
import { useDocuments } from '../context/DocumentsContext';
import { useRouter, usePathname } from 'next/navigation';

interface SidebarProps {
    open: boolean;
    onClose: () => void;
    variant?: 'permanent' | 'persistent' | 'temporary';
}

const Sidebar: React.FC<SidebarProps> = ({ 
    open, 
    onClose, 
    variant = 'temporary' 
}) => {
    const { documents, createDocument, deleteDocument } = useDocuments();
    const router = useRouter();
    const pathname = usePathname();

    const drawerWidth = 320;

    const handleCreateNew = () => {
        const newId = createDocument();
        router.push(`/doc/${newId}`);
        if (variant === 'temporary') {
            onClose();
        }
    };

    const handleSelectDocument = (id: string) => {
        router.push(`/doc/${id}`);
        if (variant === 'temporary') {
            onClose();
        }
    };

    const handleGoHome = () => {
        router.push('/');
        if (variant === 'temporary') {
            onClose();
        }
    };

    const handleDelete = (e: React.MouseEvent, id: string, title: string) => {
        e.stopPropagation();
        if (window.confirm(`Tem certeza que deseja excluir o documento "${title}"?`)) {
            deleteDocument(id);
            if (pathname === `/doc/${id}`) {
                router.push('/');
            }
        }
    };

    const drawerContent = (
        <Box sx={{ width: drawerWidth, height: '100%', display: 'flex', flexDirection: 'column' }}>
            {/* Header do Drawer */}
            <Box
                sx={{
                    p: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderBottom: 1,
                    borderColor: 'divider',
                }}
            >
                <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary' }}>
                    Documentos
                </Typography>
                {variant === 'temporary' && (
                    <IconButton
                        onClick={onClose}
                        size="small"
                        sx={{ color: 'text.secondary' }}
                    >
                        <X size={20} />
                    </IconButton>
                )}
            </Box>

            {/* Botão Criar Novo */}
            <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
                <Tooltip title="Criar novo documento">
                    <ListItemButton
                        onClick={handleCreateNew}
                        sx={{
                            borderRadius: 2,
                            backgroundColor: 'primary.main',
                            color: 'primary.contrastText',
                            '&:hover': {
                                backgroundColor: 'primary.dark',
                            },
                        }}
                    >
                        <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
                            <Plus size={20} />
                        </ListItemIcon>
                        <ListItemText 
                            primary="Criar Novo Documento"
                            primaryTypographyProps={{
                                fontWeight: 500,
                            }}
                        />
                    </ListItemButton>
                </Tooltip>
            </Box>

            {/* Lista de Documentos */}
            <Box sx={{ flex: 1, overflow: 'auto' }}>
                <List sx={{ p: 1 }}>
                    <ListItem disablePadding>
                        <ListItemButton
                            onClick={handleGoHome}
                            selected={pathname === '/'}
                            sx={{
                                borderRadius: 2,
                                mb: 0.5,
                                '&.Mui-selected': {
                                    backgroundColor: 'action.selected',
                                    '&:hover': {
                                        backgroundColor: 'action.selected',
                                    },
                                },
                            }}
                        >
                            <ListItemIcon sx={{ minWidth: 40 }}>
                                <Home size={20} />
                            </ListItemIcon>
                            <ListItemText primary="Início" />
                        </ListItemButton>
                    </ListItem>
                    <Divider sx={{ my: 1 }} />
                    
                    {documents.length === 0 ? (
                        <Box sx={{ p: 3, textAlign: 'center' }}>
                            <Typography variant="body2" color="text.secondary">
                                Nenhum documento encontrado
                            </Typography>
                        </Box>
                    ) : (
                        documents.map((doc) => (
                            <ListItem key={doc.id} disablePadding sx={{ mb: 0.5 }}>
                                <ListItemButton
                                    onClick={() => handleSelectDocument(doc.id)}
                                    selected={pathname === `/doc/${doc.id}`}
                                    sx={{
                                        borderRadius: 2,
                                        '&.Mui-selected': {
                                            backgroundColor: 'action.selected',
                                            '&:hover': {
                                                backgroundColor: 'action.selected',
                                            },
                                        },
                                    }}
                                >
                                    <ListItemIcon sx={{ minWidth: 40 }}>
                                        <FileText size={20} />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={doc.title}
                                        secondary={new Date(doc.updatedAt).toLocaleDateString('pt-BR', {
                                            day: '2-digit',
                                            month: '2-digit',
                                            year: 'numeric',
                                        })}
                                        primaryTypographyProps={{
                                            noWrap: true,
                                            fontWeight: pathname === `/doc/${doc.id}` ? 500 : 400,
                                        }}
                                        secondaryTypographyProps={{
                                            variant: 'caption',
                                        }}
                                    />
                                    <IconButton
                                        edge="end"
                                        size="small"
                                        onClick={(e) => handleDelete(e, doc.id, doc.title)}
                                        sx={{
                                            ml: 1,
                                            color: 'error.main',
                                            '&:hover': {
                                                backgroundColor: 'error.light',
                                                color: 'error.dark',
                                            },
                                        }}
                                    >
                                        <Trash2 size={16} />
                                    </IconButton>
                                </ListItemButton>
                            </ListItem>
                        ))
                    )}
                </List>
            </Box>
        </Box>
    );

    if (variant === 'permanent') {
        return (
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        borderRight: 1,
                        borderColor: 'divider',
                    },
                }}
            >
                {drawerContent}
            </Drawer>
        );
    }

    return (
        <Drawer
            variant={variant}
            open={open}
            onClose={onClose}
            ModalProps={{
                keepMounted: true, // Melhor performance em mobile
            }}
            sx={{
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                },
            }}
        >
            {drawerContent}
        </Drawer>
    );
};

export default Sidebar;

