import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCollections } from '../../context/CollectionContext';
import { getPersonListByCollection } from '../../utils';
import { List, ListItem, ListItemAvatar, Avatar, ListItemText, Typography, Paper, Button } from '@mui/material';

const CollectionPage = () => {
  const { id } = useParams();
  const { collections } = useCollections();
  const collectionId = parseInt(id, 10);
  const collection = Array.isArray(collections) ? collections.find(collection => collection.id === collectionId) : null; // Ensure collections is an array
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    const fetchPersons = async () => {
      try {
        const response = await getPersonListByCollection(id);
        if (response && response.data) {
          setPersons(response.data);
        }
      } catch (error) {
        console.error('Error fetching persons data:', error);
      }
    };

    fetchPersons();
  }, [id]);

  if (!collection) {
    return <div>Collection not found</div>;
  }

  return (
    <div>
      <h1>{collection.name}</h1>
      <p>{collection.description}</p>
      {collection.imageLink && <img src={collection.imageLink} alt={collection.name} style={{ maxWidth: '100%' }} />}
      <Link to={`/add-person-collection/${collectionId}`}>
        <Button variant="contained" color="primary" style={{ marginTop: '20px' }}>
          Add Persona To Collection
        </Button>
      </Link>
      <Paper elevation={3} style={{ marginTop: '20px', padding: '20px' }}>
        <Typography variant="h6" gutterBottom>Persons in this Collection:</Typography>
        <List>
          {persons.map(person => (
            <ListItem key={person.id} button component={Link} to={`/conversation/${person.id}`}>
              <ListItemAvatar>
                <Avatar src={person.imageLink} alt={person.name} />
              </ListItemAvatar>
              <ListItemText
                primary={person.name}
                secondary={person.description}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </div>
  );
};

export default CollectionPage;
