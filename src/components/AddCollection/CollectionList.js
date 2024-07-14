import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Grid, Box, Typography, Card, CardContent, CardActions, Button, CardMedia } from '@mui/material';

const CollectionList = () => {
    const userId = '1';
    const [collections, setCollections] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch collections when the component mounts
    useEffect(() => {
        const fetchCollections = async () => {
            try {
                const response = await getCollectionList(userId);

                if (response && response.data && response.data.data) {
                    setCollections(response.data.data);
                } else {
                    console.log('No data returned');
                }
            } catch (error) {
                console.error('Error fetching collections:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCollections();
    }, [userId]);

    // Function to fetch collection list from the backend
    const getCollectionList = async (userId = '1', page = 1, limit = 10, sortBy = 'name', order = 'asc') => {
        const BASE_URL = 'https://peoplemuseumyeah.uc.r.appspot.com/db';

        try {
            const response = await axios.post(
                `${BASE_URL}/getCollectionList`,
                { userId, page, limit, sortBy, order },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            console.log('Status:', response.status);
            console.log('Data:', response.data);
            return response;
        } catch (error) {
            console.error('Error:', error.message);
            if (error.response) {
                console.error('Status:', error.response.status);
                console.error('Data:', error.response.data);
            } else if (error.request) {
                console.error('No response received:', error.request);
            } else {
                console.error('Error setting up request:', error.message);
            }
            throw error;
        }
    };

    // Function to handle the deletion of a collection
    const handleDelete = async (collectionId) => {
        try {
            await deleteCollection(collectionId);
            setCollections(collections.filter((collection) => collection.collectionId !== collectionId));
        } catch (error) {
            console.error('Error deleting collection:', error);
        }
    };

    // Function to delete a collection from the backend
    const deleteCollection = async (collectionId) => {
        const BASE_URL = 'https://peoplemuseumyeah.uc.r.appspot.com/db';

        try {
            const response = await axios.delete(`${BASE_URL}/deleteCollection`, {
                data: { collectionId },
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log('Status:', response.status);
            console.log('Data:', response.data);
            return response;
        } catch (error) {
            console.error('Error:', error.message);
            if (error.response) {
                console.error('Status:', error.response.status);
                console.error('Data:', error.response.data);
            } else if (error.request) {
                console.error('No response received:', error.request);
            } else {
                console.error('Error setting up request:', error.message);
            }
            throw error;
        }
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                Loading...
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                Error: {error}
            </Box>
        );
    }

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                p: 2,
            }}
        >
            <Typography variant="h4" gutterBottom color="primary" sx={{ textAlign: 'center' }}>
                Collection's In My Museum
            </Typography>
            <Button
                component={Link}
                to="/add-collection"
                variant="contained"
                color="primary"
                sx={{ marginBottom: 2 }}
            >
                Add Collection
            </Button>
            <Grid container spacing={2} justifyContent="center">
                {collections.length > 0 ? (
                    collections.map((collection, index) => (
                        <Grid item key={index}>
                            <Card sx={{ maxWidth: 300, marginBottom: 2 }}>
                                <CardMedia
                                    component="img"
                                    height="200"
                                    image={collection.imageLink}
                                    alt={collection.name}
                                    sx={{ objectFit: 'contain' }}
                                />
                                <CardContent>
                                    <Typography variant="h6" gutterBottom color="text.primary">
                                        {collection.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Description: {collection.description}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button
                                        component={Link}
                                        to={`/update-collection/${"5675594515742720"}`} 
                                        variant="outlined"
                                        color="primary"
                                        sx={{ marginRight: 1 }}
                                    >
                                        Update
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        color="secondary"
                                        onClick={() => handleDelete(collection.collectionId)}
                                    >
                                        Delete
                                    </Button>
                                    <Button
                                        component={Link}
                                        to={`/`}
                                        variant="contained"
                                        color="primary"
                                        sx={{ marginLeft: 1 }}
                                    >
                                        View
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))
                ) : (
                    <Typography variant="h6" color="text.secondary" sx={{ textAlign: 'center' }}>
                        No collections found
                    </Typography>
                )}
            </Grid>
        </Box>
    );
};

export default CollectionList;
