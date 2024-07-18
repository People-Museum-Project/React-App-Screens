import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Card, CardMedia } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate, useParams } from 'react-router-dom';
import { addPersonCollection } from '../../utils'; // Adjust the path as needed

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

const AddToCollection = () => {
    const { collectionId } = useParams(); // Get collectionId from URL params
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        description: '',
        pic: null,
        picURL: '',
    });
    const [imagePreview, setImagePreview] = useState(null);
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData({ ...formData, pic: file, picURL: '' });
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleURLChange = (e) => {
        const { value } = e.target;
        setFormData({ ...formData, picURL: value, pic: null });
        setImagePreview(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Call addPersonCollection from utils
            await addPersonCollection(formData.personId, collectionId);
            navigate(`/collection/${collectionId}`); // Navigate back to the collection page
        } catch (error) {
            console.error('Error adding person to collection:', error.message);
        }
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
                <Typography variant="h5" gutterBottom color="white">
                    Add Person to Collection
                </Typography>
                <TextField
                    sx={{ marginBottom: 2, width: '300px' }}
                    label="First Name"
                    variant="outlined"
                    name="firstName"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    required
                    InputLabelProps={{ style: { color: 'white' } }}
                />
                <TextField
                    sx={{ marginBottom: 2, width: '300px' }}
                    label="Last Name"
                    variant="outlined"
                    name="lastName"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
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
                <Box sx={{ marginBottom: 2, width: '300px' }}>
                    <TextField
                        fullWidth
                        label="Image URL"
                        variant="outlined"
                        name="picURL"
                        value={formData.picURL}
                        onChange={handleURLChange}
                        InputLabelProps={{ style: { color: 'white' } }}
                    />
                    <Button
                        variant="contained"
                        component="label"
                        sx={{ marginTop: 1, color: 'white' }}
                    >
                        Upload Image
                        <input
                            type="file"
                            name="pic"
                            hidden
                            onChange={handleFileChange}
                        />
                    </Button>
                </Box>
                {imagePreview && (
                    <Card sx={{ maxWidth: 300, marginBottom: 2 }}>
                        <CardMedia
                            component="img"
                            height="auto"
                            image={imagePreview}
                            alt="Uploaded Image Preview"
                            sx={{ objectFit: 'contain' }}
                        />
                    </Card>
                )}
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{ marginTop: 2, width: '300px', color: 'white' }}
                >
                    Add
                </Button>
            </Box>
        </ThemeProvider>
    );
};

export default AddToCollection;
