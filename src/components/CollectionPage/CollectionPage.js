import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCollection, getPersonListByCollection } from '../../utils';
import { List, ListItem, ListItemAvatar, Avatar, ListItemText, Typography, Paper, Button, IconButton, Box, Container } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import EditIcon from '@mui/icons-material/Edit';

const CollectionPage = () => {
  const { id } = useParams();
  const collectionId = parseInt(id, 10);
  const [collection, setCollection] = useState(null);
  const [persons, setPersons] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCollectionData = async () => {
      try {
        const fetchedCollection = await getCollection(collectionId);
        if (fetchedCollection) {
          setCollection(fetchedCollection);
        } else {
          setError('Collection not found');
        }
      } catch (error) {
        setError('Error fetching collection');
        console.error('Error fetching collection data:', error);
      }
    };

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

    fetchCollectionData();
    fetchPersons();
  }, [collectionId, id]);

  if (error) {
    return (
      <Container maxWidth="sm">
        <Typography variant="h6" color="error" align="center">
          {error}
        </Typography>
      </Container>
    );
  }

  if (!collection) {
    return (
      <Container maxWidth="sm">
        <Typography variant="h6" align="center">Loading...</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
        <Typography variant="h4" component="h1" sx={{ flexGrow: 1 }}>
          {collection.name}
        </Typography>
        <IconButton
          component={Link}
          to="/"
          color="primary"
          sx={{ marginRight: 1 }}
        >
          <HomeIcon />
        </IconButton>
        <IconButton
          component={Link}
          to={`/update-collection/${collectionId}`}
          color="primary"
        >
          <EditIcon />
        </IconButton>
      </Box>
      <Typography variant="body1" paragraph>
        {collection.description}
      </Typography>
      {collection.imageLink && (
        <Box sx={{ textAlign: 'center', marginBottom: 2 }}>
          <img
            src={collection.imageLink}
            alt={collection.name}
            style={{
              maxWidth: '100%',
              height: 'auto',
              maxHeight: '250px', // Adjust as needed
              borderRadius: 8,
            }}
          />
        </Box>
      )}
      <Link to={`/add-person-collection/${collectionId}`}>
        <Button variant="contained" color="primary" sx={{ marginBottom: 2 }}>
          Add Person To Collection
        </Button>
      </Link>
      <Paper elevation={3} sx={{ padding: 2 }}>
        <Typography variant="h6" gutterBottom>
          Persons in this Collection:
        </Typography>
        <List>
          {persons.map(person => (
            <ListItem key={person.id} button component={Link} to={`/conversation/${person.id}`} state={{ collectionId }}>
              <ListItemAvatar>
                <Avatar src={person.imageLink} alt={person.name} />
              </ListItemAvatar>
              <ListItemText
                primary={person.name}
                secondary={person.description}
                sx={{ flex: 1 }}
              />
              <IconButton
                edge="end"
                aria-label="edit"
                component={Link}
                to={`/update-person-collection/${person.id}`}
                state={{ collectionId }}
              >
                <EditIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
};

export default CollectionPage;
