// src/app/doc/[id]/page.tsx
'use client'; 

import { useEffect, useState } from 'react';
import { useDocuments } from '@/context/DocumentsContext';
import { useParams, useRouter } from 'next/navigation';
import {
    Box,
    IconButton,
    Tooltip,
    Paper,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import { Trash2 } from 'lucide-react';
import DocumentEditor from '../../../components/DocumentEditor';
import Header from '../../../components/header';
import { TitleEditor } from '../../../components/TitleEditor';
import Sidebar from '../../../components/Sidebar';
import Footer from '../../../components/Footer';
import { contactInfo } from '../../../config/contactInfo';

export default function DocumentEditorPage() {
    const { id } = useParams<{ id: string }>();
    const { selectedDocument, selectDocument, deleteDocument } = useDocuments();
    const router = useRouter();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    useEffect(() => {
        if (!selectedDocument || selectedDocument.id !== id) {
            selectDocument(id);
        }
    }, [id, selectedDocument, selectDocument]);

    const handleDelete = () => {
        const title = selectedDocument?.title || "este documento";
        
        if (window.confirm(`Tem certeza que deseja excluir o documento "${title}"?`)) {
            deleteDocument(id);
            router.push('/');
        }
    };

    if (!selectedDocument) {
        return (
            <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
                {!isMobile && (
                    <Sidebar variant="permanent" open={true} onClose={() => {}} />
                )}
                {isMobile && (
                    <Sidebar 
                        variant="temporary" 
                        open={sidebarOpen} 
                        onClose={() => setSidebarOpen(false)} 
                    />
                )}
                <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <Header onMenuClick={() => setSidebarOpen(true)} />
                    <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Box sx={{ color: 'text.secondary' }}>
                            Carregando documento ou documento não encontrado...
                        </Box>
                    </Box>
                </Box>
            </Box>
        );
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Box sx={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
                {/* Sidebar - Desktop */}
                {!isMobile && (
                    <Sidebar variant="permanent" open={true} onClose={() => {}} />
                )}

                {/* Sidebar - Mobile */}
                {isMobile && (
                    <Sidebar 
                        variant="temporary" 
                        open={sidebarOpen} 
                        onClose={() => setSidebarOpen(false)} 
                    />
                )}

                {/* Conteúdo Principal */}
                <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                <Header onMenuClick={() => setSidebarOpen(true)} />
                
                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                    {/* Barra de Título */}
                    <Paper
                        elevation={0}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            px: 3,
                            py: 2,
                            borderBottom: 1,
                            borderColor: 'divider',
                            backgroundColor: 'background.paper',
                            flexShrink: 0,
                        }}
                    >
                        <Box sx={{ flexGrow: 1, mr: 2 }}>
                            <TitleEditor
                                documentId={selectedDocument.id}
                                initialTitle={selectedDocument.title}
                            />
                        </Box>
                        
                        <Tooltip title="Excluir Documento">
                            <IconButton
                                onClick={handleDelete}
                                color="error"
                                sx={{
                                    '&:hover': {
                                        backgroundColor: 'error.light',
                                    },
                                }}
                            >
                                <Trash2 size={20} />
                            </IconButton>
                        </Tooltip>
                    </Paper>
            
                    {/* Editor */}
                    <Box sx={{ flex: 1, minHeight: 0, overflow: 'hidden', p: 2 }}>
                        <DocumentEditor 
                            documentId={selectedDocument.id} 
                            initialContent={selectedDocument.content} 
                        />
                    </Box>
                </Box>
            </Box>
            </Box>
            
            <Footer contactInfo={contactInfo} />
        </Box>
    );
}