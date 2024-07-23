
// src/components/AddPersonToCollection/AddPersonToCollection.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPersonList, addPersonCollection } from '../../utils';
import { Button, Card, CardMedia, Typography, Box } from '@mui/material';
import { auth } from '../Login/firebase';

const AddPersonToCollection = () => {
  const { collectionId } = useParams();
  const navigate = useNavigate();
  const [people, setPeople] = useState([]);

  useEffect(() => {
    const fetchPersonList = async () => {
      auth.onAuthStateChanged(async (user) => {
        if (user) {
          try {
            const response = await getPersonList(user.uid);
            if (response && response.data) {
              setPeople(response.data);
            }
          } catch (error) {
            console.error('Error getPersonList:', error);
          }
        } else {
          console.log('user is null');
        }
      });
    };

    fetchPersonList();
  }, []);

  const handleAddPersonToCollection = async (personId) => {
    try {
      await addPersonCollection(personId, collectionId);
      navigate(`/collection/${collectionId}`);
    } catch (error) {
      console.error('Error adding person to collection:', error);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        p: 2,
        color: 'white',
      }}
    >
      <Typography variant="h4" gutterBottom color="white">
        Add Person to Collection
      </Typography>
      <Box sx={{ marginTop: 4, width: '100%', textAlign: 'center' }}>
        <Typography variant="h6" gutterBottom color="white">
          Available People
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
          {people.map((person, index) => (
            <Card key={index} sx={{ maxWidth: 200, margin: 2, backgroundColor: '#3c3f41' }}>
              <CardMedia
                component="img"
                height="200"
                image={person.imageLink}
                alt={person.name}
                sx={{ objectFit: 'cover' }}
              />
              <Typography variant="body1" color="white" sx={{ padding: 1 }}>
                {person.name}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleAddPersonToCollection(person.id)}
                sx={{ margin: 1 }}
              >
                Add to Collection
              </Button>
            </Card>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default AddPersonToCollection;
