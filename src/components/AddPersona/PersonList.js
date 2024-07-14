import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Grid, Box, Typography, Card, CardContent, CardMedia, Button } from '@mui/material';

// Function to get a list of persons
const getPersonList = async (userId) => {
    const BASE_URL = 'https://peoplemuseumyeah.uc.r.appspot.com/db';

    try {
        const response = await axios.post(`${BASE_URL}/getPersonList`, { userId }, {
            headers: { 'Content-Type': 'application/json' },
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

// Function to delete a person
const deletePerson = async (personId) => {
    const BASE_URL = 'https://peoplemuseumyeah.uc.r.appspot.com/db';

    try {
        const response = await axios.delete(`${BASE_URL}/deletePerson`, {
            data: { personId },
            headers: { 'Content-Type': 'application/json' },
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

const PersonList = () => {
    const userId = '1';
    const [people, setPeople] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPeople = async () => {
            try {
                const response = await getPersonList(userId);

                if (response && response.data && response.data.data) {
                    setPeople(response.data.data);
                } else {
                    console.log('No data returned');
                }
            } catch (error) {
                console.error('Error fetching people:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPeople();
    }, [userId]);

    const handleDelete = async (personId) => {
        try {
            await deletePerson(personId);
            setPeople(people.filter((person) => person.personId !== personId));
        } catch (error) {
            console.error('Error deleting person:', error);
        }
    };

    if (loading) {
        return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>Loading...</Box>;
    }

    if (error) {
        return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>Error: {error}</Box>;
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 2 }}>
            <Typography variant="h4" gutterBottom color="primary" sx={{ textAlign: 'center' }}>
                People In My Museum
            </Typography>
            <Grid container spacing={2} justifyContent="center">
                {people.length > 0 ? (
                    people.map((person, index) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                            <Card>
                                <CardMedia
                                    component="img"
                                    height="300"
                                    image={person.imageLink}
                                    alt={person.name}
                                    sx={{ objectFit: 'contain' }}
                                />
                                <CardContent>
                                    <Typography variant="h6" component="div" sx={{ textAlign: 'center' }}>
                                        {person.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
                                        Description: {person.description}
                                    </Typography>
                                    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
                                        <Button
                                            component={Link}
                                            to={`/update-person/${'5088723339313152'}`}
                                            variant="outlined"
                                            color="primary"
                                            sx={{ marginRight: 1 }}
                                        >
                                            Update
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            color="secondary"
                                            onClick={() => handleDelete(person.personId)}
                                        >
                                            Delete
                                        </Button>
                                        <Button
                                            component={Link}
                                            to={`/conversation/${'5088723339313152'}`}
                                            variant="contained"
                                            color="primary"
                                            sx={{ marginLeft: 1 }}
                                        >
                                            Chat
                                        </Button>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))
                ) : (
                    <Typography variant="h6" color="text.secondary" sx={{ textAlign: 'center' }}>
                        No people found
                    </Typography>
                )}
            </Grid>
            <Button
                component={Link}
                to="/add-persona"
                variant="contained"
                color="primary"
                sx={{ marginBottom: 2 }}
            >
                Add Person
            </Button>
        </Box>
    );
};

export default PersonList;
