'use client';

import React, { useState, useEffect, useCallback, useRef, ImgHTMLAttributes } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkBreaks from 'remark-breaks';
import { useDocuments } from '@/context/DocumentsContext'; 
import { Toolbar } from './Toolbar';
import { useDebounce } from '../hooks/useDebouce';
import { Box, Paper, Typography } from '@mui/material';

interface DocumentEditorProps {
    documentId: string;
    initialContent: string;
    onSaveReady?: (saveFn: () => void) => void;
}

const SafeImage: React.FC<ImgHTMLAttributes<HTMLImageElement>> = ({ src, alt, ...props }) => {
    if (!src) {
      return (
        <Typography component="span" sx={{ color: 'error.main' }}>
          [Erro de Imagem: URL ausente para "{alt}"]
        </Typography>
      );
    }
    return <img src={src} alt={alt} {...props} style={{ maxWidth: '100%', height: 'auto' }} />;
};


const DocumentEditor = ({ documentId, initialContent, onSaveReady }: DocumentEditorProps) => { 
    const [markdownInput, setMarkdownInput] = useState(initialContent);
    const { updateDocument } = useDocuments();
    const textareaRef = useRef<HTMLTextAreaElement>(null); 
    const documentIdRef = useRef(documentId);
    const markdownInputRef = useRef(markdownInput);
    
    useEffect(() => {
        documentIdRef.current = documentId;
    }, [documentId]);

    useEffect(() => {
        markdownInputRef.current = markdownInput;
    }, [markdownInput]);
    
    const debouncedContent = useDebounce(markdownInput, 800); 

    const saveContent = useCallback((newContent: string, docId?: string) => {
        const idToUse = docId || documentIdRef.current;
        updateDocument(idToUse, { content: newContent });
    }, [updateDocument]);

    const handleManualSave = useCallback(() => {
        const textarea = textareaRef.current;
        const currentDocId = documentIdRef.current;
        
        if (!textarea) {
            return;
        }
        
        const currentContent = textarea.value || '';
        
        setMarkdownInput(currentContent);
        markdownInputRef.current = currentContent;
        
        updateDocument(currentDocId, { content: currentContent });
    }, [updateDocument]);

    useEffect(() => {
        if (onSaveReady) {
            requestAnimationFrame(() => {
                if (onSaveReady) {
                    onSaveReady(handleManualSave);
                }
            });
        }
    }, [onSaveReady, handleManualSave, documentId]);

    useEffect(() => {
        if (debouncedContent !== initialContent) { 
            saveContent(debouncedContent); 
        }
    }, [debouncedContent, saveContent, initialContent]);

    useEffect(() => {
        if (documentIdRef.current !== documentId) {
            documentIdRef.current = documentId;
            const newContent = initialContent || '';
            setMarkdownInput(newContent);
            markdownInputRef.current = newContent;
            
            if (textareaRef.current) {
                textareaRef.current.value = newContent;
            }
        }
    }, [documentId, initialContent]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMarkdownInput(e.target.value); 
    };
    
    const insertMarkdown = useCallback((prefix: string, suffix: string) => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const currentText = textarea.value;
        const selectedText = currentText.substring(start, end);

        let finalPrefix = prefix;

        if (prefix.includes('#') || prefix.includes('-') || prefix.includes('`')) {
             if (start > 0 && currentText[start - 1] !== '\n') {
                 finalPrefix = '\n' + prefix;
             }
        }
        
        const newText = currentText.substring(0, start) + finalPrefix + selectedText + suffix + currentText.substring(end);
        
        setMarkdownInput(newText);
        
        requestAnimationFrame(() => {
            textarea.focus();
            const prefixLength = finalPrefix.length; 
            const newCursorPos = start + prefixLength;
          
            if (selectedText.length === 0) {
                textarea.selectionStart = newCursorPos;
                textarea.selectionEnd = newCursorPos;
            } else {
                textarea.selectionStart = newCursorPos;
                textarea.selectionEnd = newCursorPos + selectedText.length;
            }
        });
    }, []);


    return (
        <Paper 
            elevation={2}
            sx={{
                height: '100%',
                display: 'flex',
                overflow: 'hidden',
                borderRadius: 2,
            }}
        >
            <Box sx={{ display: 'flex', width: '100%', height: '100%' }}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '50%',
                        height: '100%',
                        borderRight: 1,
                        borderColor: 'divider',
                        backgroundColor: 'background.paper',
                    }}
                >
                    <Box
                        sx={{
                            px: 2,
                            py: 1.5,
                            borderBottom: 1,
                            borderColor: 'divider',
                            backgroundColor: 'action.hover',
                        }}
                    >
                        <Typography
                            variant="overline"
                            sx={{
                                fontWeight: 600,
                                fontSize: '0.75rem',
                                textTransform: 'uppercase',
                                letterSpacing: 1,
                                color: 'text.secondary',
                            }}
                        >
                            Markdown
                        </Typography>
                    </Box>
                    
                    <Box
                        sx={{
                            borderBottom: 1,
                            borderColor: 'divider',
                            backgroundColor: 'action.hover',
                        }}
                    >
                        <Toolbar insertMarkdown={insertMarkdown} />
                    </Box>
                    
                    <Box
                        sx={{
                            flex: 1,
                            minHeight: 0,
                            overflow: 'hidden',
                            display: 'flex',
                        }}
                    >
                        <Box
                            component="textarea"
                            ref={textareaRef}
                            value={markdownInput}
                            onChange={handleChange}
                            placeholder="Comece a escrever em Markdown..."
                            sx={{
                                width: '100%',
                                height: '100%',
                                p: 2,
                                resize: 'none',
                                overflowY: 'auto',
                                fontFamily: 'monospace',
                                fontSize: '0.875rem',
                                lineHeight: 1.6,
                                backgroundColor: 'transparent',
                                color: 'text.primary',
                                border: 'none',
                                outline: 'none',
                                '&::placeholder': {
                                    color: 'text.secondary',
                                    opacity: 0.6,
                                },
                            }}
                        />
                    </Box>
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '50%',
                        height: '100%',
                        backgroundColor: 'action.hover',
                    }}
                >
                    <Box
                        sx={{
                            px: 2,
                            py: 1.5,
                            borderBottom: 1,
                            borderColor: 'divider',
                            backgroundColor: 'action.hover',
                        }}
                    >
                        <Typography
                            variant="overline"
                            sx={{
                                fontWeight: 600,
                                fontSize: '0.75rem',
                                textTransform: 'uppercase',
                                letterSpacing: 1,
                                color: 'text.secondary',
                            }}
                        >
                            Preview
                        </Typography>
                    </Box>

                    <Box
                        sx={{
                            flex: 1,
                            minHeight: 0,
                            overflowY: 'auto',
                            p: 3,
                        }}
                    >
                        <Box
                            sx={{
                                '& .prose': {
                                    maxWidth: 'none',
                                },
                                '& p': {
                                    marginBottom: 1,
                                },
                                '& h1, & h2, & h3, & h4, & h5, & h6': {
                                    marginTop: 2,
                                    marginBottom: 1,
                                    fontWeight: 600,
                                },
                                '& ul, & ol': {
                                    paddingLeft: 3,
                                    marginBottom: 1,
                                },
                                '& code': {
                                    backgroundColor: 'action.hover',
                                    padding: '2px 4px',
                                    borderRadius: 1,
                                    fontFamily: 'monospace',
                                    fontSize: '0.875em',
                                },
                                '& pre': {
                                    backgroundColor: 'action.hover',
                                    padding: 2,
                                    borderRadius: 1,
                                    overflow: 'auto',
                                },
                                '& blockquote': {
                                    borderLeft: 3,
                                    borderColor: 'primary.main',
                                    paddingLeft: 2,
                                    marginLeft: 0,
                                    fontStyle: 'italic',
                                },
                            }}
                        >
                            <ReactMarkdown 
                                remarkPlugins={[remarkBreaks]}
                                components={{ img: SafeImage }}
                            >
                                {markdownInput || '*Comece a escrever para ver a preview...*'}
                            </ReactMarkdown>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Paper>
    );
};

export default DocumentEditor;