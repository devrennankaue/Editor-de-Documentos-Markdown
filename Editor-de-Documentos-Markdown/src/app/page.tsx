// src/app/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useDocuments } from '../context/DocumentsContext';
import { useRouter } from 'next/navigation';
import {
    Box,
    Container,
    Typography,
    Button,
    Paper,
    List,
    ListItem,
    ListItemText,
    ListItemButton,
    IconButton,
    Tooltip,
    Divider,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import { Plus, Edit, Trash2 } from 'lucide-react';
import Header from '../components/header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import { contactInfo } from '../config/contactInfo';

export default function DocumentListPage() {
  const { documents, createDocument, deleteDocument } = useDocuments();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleCreateNew = () => {
    const newId = createDocument();
    router.push(`/doc/${newId}`);
  };

  const handleSelectDocument = (id: string) => {
    router.push(`/doc/${id}`);
  };

  const handleDelete = (e: React.MouseEvent, id: string, title: string) => {
    e.stopPropagation();
    if (window.confirm(`Tem certeza que deseja excluir o documento "${title}"?`)) {
      deleteDocument(id);
    }
  };
  
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
          
          <Box sx={{ flexGrow: 1, overflow: 'auto', backgroundColor: 'background.default' }}>
          <Container maxWidth="lg" sx={{ py: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
              <Typography variant="h4" component="h1" sx={{ fontWeight: 600, color: 'text.primary' }}>
                Meus Documentos
              </Typography>
              
              <Button
                variant="contained"
                startIcon={<Plus size={20} />}
                onClick={handleCreateNew}
                sx={{
                  borderRadius: 3,
                  textTransform: 'none',
                  fontWeight: 500,
                  px: 3,
                }}
              >
                Criar Novo Documento
              </Button>
            </Box>

            <Paper elevation={2} sx={{ borderRadius: 2, overflow: 'hidden' }}>
              {!mounted ? (
                <Box sx={{ p: 4, textAlign: 'center' }}>
                  <Typography color="text.secondary">Carregando...</Typography>
                </Box>
              ) : documents.length === 0 ? (
                <Box sx={{ p: 6, textAlign: 'center' }}>
                  <Typography color="text.secondary" sx={{ mb: 2 }}>
                    Nenhum documento encontrado.
                  </Typography>
                  <Button
                    variant="outlined"
                    startIcon={<Plus size={20} />}
                    onClick={handleCreateNew}
                    sx={{ textTransform: 'none' }}
                  >
                    Criar Novo Documento
                  </Button>
                </Box>
              ) : (
                <List sx={{ p: 0 }}>
                  {documents.map((doc, index) => (
                    <React.Fragment key={doc.id}>
                      <ListItem
                        disablePadding
                        secondaryAction={
                          <Box sx={{ display: 'flex', gap: 1, mr: 2 }}>
                            <Tooltip title={`Editar "${doc.title}"`}>
                              <IconButton
                                edge="end"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleSelectDocument(doc.id);
                                }}
                                sx={{ color: 'primary.main' }}
                              >
                                <Edit size={18} />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title={`Excluir "${doc.title}"`}>
                              <IconButton
                                edge="end"
                                onClick={(e) => handleDelete(e, doc.id, doc.title)}
                                sx={{ color: 'error.main' }}
                              >
                                <Trash2 size={18} />
                              </IconButton>
                            </Tooltip>
                          </Box>
                        }
                      >
                        <ListItemButton
                          onClick={() => handleSelectDocument(doc.id)}
                          sx={{
                            py: 2,
                            px: 3,
                            '&:hover': {
                              backgroundColor: 'action.hover',
                            },
                          }}
                        >
                          <ListItemText
                            primary={doc.title}
                            secondary={`Última Atualização: ${new Date(doc.updatedAt).toLocaleDateString('pt-BR', {
                              day: '2-digit',
                              month: '2-digit',
                              year: 'numeric',
                            })}`}
                            primaryTypographyProps={{
                              fontWeight: 500,
                              noWrap: true,
                            }}
                            secondaryTypographyProps={{
                              variant: 'caption',
                            }}
                          />
                        </ListItemButton>
                      </ListItem>
                      {index < documents.length - 1 && <Divider />}
                    </React.Fragment>
                  ))}
                </List>
              )}
            </Paper>
          </Container>
          </Box>
        </Box>
      </Box>
      
      <Footer contactInfo={contactInfo} />
    </Box>
  );
}
