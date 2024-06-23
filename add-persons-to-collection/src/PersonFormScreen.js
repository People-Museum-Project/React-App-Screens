import React from 'react';
import { Button, Box, Card, CardMedia, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const PersonFormScreen = ({ people }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                p: 2,
                backgroundColor: '#282c34',
                color: 'white',
            }}
        >
            <Typography variant="h4" gutterBottom color="white">
                Add Person to Collection
            </Typography>
            <Button
                variant="contained"
                component={Link}
                to="/add-person"
                sx={{ marginBottom: 2, width: '300px', color: 'white' }}
            >
                Add New Person
            </Button>
            <Box sx={{ marginTop: 4, width: '100%', textAlign: 'center' }}>
                <Typography variant="h6" gutterBottom color="white">
                    Added People
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                    {people.map((person, index) => (
                        <Card key={index} sx={{ maxWidth: 200, margin: 2, backgroundColor: '#3c3f41' }}>
                            <CardMedia
                                component="img"
                                height="200"
                                image={person.pic}
                                alt={`${person.firstName} ${person.lastName}`}
                                sx={{ objectFit: 'cover' }}
                            />
                            <Typography variant="body1" color="white" sx={{ padding: 1 }}>
                                {person.firstName} {person.lastName}
                            </Typography>
                        </Card>
                    ))}
                </Box>
            </Box>
        </Box>
    );
};

export default PersonFormScreen;
