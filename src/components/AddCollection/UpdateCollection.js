import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { TextField, Button, Box, Typography, Card, CardMedia } from '@mui/material';
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

const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await axios.post('https://peoplemuseumyeah.uc.r.appspot.com/db', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.data.imageUrl;
    } catch (error) {
        console.error('Error uploading image:', error);
        throw error;
    }
};

const UpdateCollection = () => {
    const { collectionId } = useParams();
    const [collection, setCollection] = useState({
        name: '',
        description: '',
    });
    const [formData, setFormData] = useState({
        pic: null,
        picURL: '',
    });
    const [imagePreview, setImagePreview] = useState(null);

    useEffect(() => {
        const fetchCollection = async () => {
            try {
                const response = await axios.post(
                    'https://peoplemuseumyeah.uc.r.appspot.com/db/getCollection',
                    { collectionId },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                );
                if (response.data && response.data.collection) {
                    const fetchedCollection = response.data.collection;
                    setCollection({
                        name: fetchedCollection.name,
                        description: fetchedCollection.description,
                    });
                    setImagePreview(fetchedCollection.imageLink);
                    setFormData((prevFormData) => ({
                        ...prevFormData,
                        picURL: fetchedCollection.imageLink,
                    }));
                } else {
                    console.log('Collection not found');
                }
            } catch (error) {
                console.error('Error fetching collection:', error);
            }
        };

        fetchCollection();
    }, [collectionId]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData((prevFormData) => ({
            ...prevFormData,
            pic: file,
            picURL: '',
        }));
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
        setFormData((prevFormData) => ({
            ...prevFormData,
            picURL: value,
            pic: null,
        }));
        setImagePreview(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let imageUrl = formData.picURL;

        if (formData.pic) {
            try {
                imageUrl = await uploadImage(formData.pic);
            } catch (error) {
                console.error('Error uploading image:', error);
                return;
            }
        }

        const formDataToSend = {
            collectionId,
            newName: collection.name,
            newImageLink: imageUrl,
            newDescription: collection.description,
        };

        try {
            const response = await axios.put(
                'https://peoplemuseumyeah.uc.r.appspot.com/db/updateCollection',
                formDataToSend,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (response.status === 200) {
                console.log('Update successful:', response.data);
                window.location.href = '/collection-list';
            } else {
                console.error('Update failed:', response.data.message);
            }
        } catch (error) {
            console.error('Error updating collection:', error);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setCollection((prevCollection) => ({
            ...prevCollection,
            [name]: value,
        }));
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
                    Update Collection
                </Typography>
                <TextField
                    sx={{ marginBottom: 2, width: '300px' }}
                    label="Name"
                    variant="outlined"
                    name="name"
                    value={collection.name}
                    onChange={handleChange}
                    required
                    InputLabelProps={{ style: { color: 'white' } }}
                />
                <TextField
                    sx={{ marginBottom: 2, width: '300px' }}
                    label="Description"
                    variant="outlined"
                    name="description"
                    value={collection.description}
                    onChange={handleChange}
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
                        name="imageLink"
                        value={formData.picURL}
                        onChange={handleURLChange}
                        InputLabelProps={{ style: { color: 'white' } }}
                    />
                    <Button variant="contained" component="label" sx={{ marginTop: 1 }}>
                        Upload Image
                        <input type="file" name="pic" hidden onChange={handleFileChange} />
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
                    sx={{ marginTop: 2, width: '300px' }}
                >
                    Update
                </Button>
            </Box>
        </ThemeProvider>
    );
};

export default UpdateCollection;
