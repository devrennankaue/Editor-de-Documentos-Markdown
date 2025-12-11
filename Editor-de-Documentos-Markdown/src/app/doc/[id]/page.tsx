'use client'; 

import { useEffect, useState, useRef } from 'react';
import { useDocuments } from '@/context/DocumentsContext';
import { useParams, useRouter } from 'next/navigation';
import {
    Box,
    IconButton,
    Tooltip,
    Paper,
    Button,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import { Trash2, Save } from 'lucide-react';
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
    const [mounted, setMounted] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const saveFunctionRef = useRef<(() => void) | null>(null);
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('md'));

    useEffect(() => {
        setMounted(true);
        setIsMobile(matches);
    }, [matches]);

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

    const handleSave = () => {
        if (saveFunctionRef.current) {
            saveFunctionRef.current();
        }
    };

    const handleSaveReady = (saveFn: () => void) => {
        saveFunctionRef.current = saveFn;
    };

    if (!selectedDocument) {
        return (
            <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
                {mounted && !isMobile && (
                    <Sidebar variant="permanent" open={true} onClose={() => {}} />
                )}
                {mounted && isMobile && (
                    <Sidebar 
                        variant="temporary" 
                        open={sidebarOpen} 
                        onClose={() => setSidebarOpen(false)} 
                    />
                )}
                <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <Header onMenuClick={() => mounted && setSidebarOpen(true)} />
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
                {mounted && !isMobile && (
                    <Sidebar variant="permanent" open={true} onClose={() => {}} />
                )}

                {mounted && isMobile && (
                    <Sidebar 
                        variant="temporary" 
                        open={sidebarOpen} 
                        onClose={() => setSidebarOpen(false)} 
                    />
                )}

                <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                <Header onMenuClick={() => mounted && setSidebarOpen(true)} />
                
                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
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
                        
                        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                            <Tooltip title="Salvar Documento">
                                <Button
                                    variant="contained"
                                    startIcon={<Save size={18} />}
                                    onClick={handleSave}
                                    size="small"
                                    sx={{
                                        textTransform: 'none',
                                        borderRadius: 2,
                                    }}
                                >
                                    Salvar
                                </Button>
                            </Tooltip>
                            
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
                        </Box>
                    </Paper>
            
                    <Box sx={{ flex: 1, minHeight: 0, overflow: 'hidden', p: 2 }}>
                        <DocumentEditor 
                            key={selectedDocument.id}
                            documentId={selectedDocument.id} 
                            initialContent={selectedDocument.content}
                            onSaveReady={handleSaveReady}
                        />
                    </Box>
                </Box>
            </Box>
            </Box>
            
            <Footer contactInfo={contactInfo} />
        </Box>
    );
}