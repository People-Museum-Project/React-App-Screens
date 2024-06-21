import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        background: {
            default: '#282c34',
        },
    },
    components: {
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'white',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'white',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'white',
                    },
                    color: 'white',
                },
                input: {
                    color: 'white',
                },
                notchedOutline: {
                    borderColor: 'white',
                },
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    color: 'white',
                },
            },
        },
    },
});

const CollectionForm = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        collectionName: '',
        description: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <ThemeProvider theme={theme}>
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '100vh', 
                    p: 2,
                }}
            >
                <Typography variant="h4" gutterBottom color="white">
                    Add Collection to Museum
                </Typography>
                <TextField
                    sx={{ marginBottom: 2, width: '300px' }}
                    label="Collection Name"
                    variant="outlined"
                    name="collectionName"
                    value={formData.collectionName}
                    onChange={(e) => setFormData({ ...formData, collectionName: e.target.value })}
                    required
                    InputLabelProps={{ style: { color: 'white' } }}
                />
                <TextField
                    sx={{ marginBottom: 2, width: '300px' }}
                    label="Description"
                    variant="outlined"
                    name="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    multiline
                    rows={4}
                    required
                    InputLabelProps={{ style: { color: 'white' } }}
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{ marginTop: 2, width: '300px' }}
                >
                    Create
                </Button>
            </Box>
        </ThemeProvider>
    );
};

export default CollectionForm;
