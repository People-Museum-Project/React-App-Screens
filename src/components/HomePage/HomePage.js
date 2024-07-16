// src/components/HomePage/HomePage.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Paper, List, ListItem, ListItemText, Box, Avatar, Typography } from '@mui/material';
import './HomePage.css';
import { getUser, getPersonList } from '../../utils';
import { useCollections } from '../../context/CollectionContext';
import AddIcon from '@mui/icons-material/Add';

const HomePage = () => {
  const [username, setUserName] = useState('');
  const [userimageLink, setUserImageLink] = useState('');
  const [people, setPeople] = useState([]);
  const { collections, fetchCollections } = useCollections();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response_getuser = await getUser('5639601012080640');
        if (response_getuser && response_getuser.data) {
          setUserName(response_getuser.data.name);
          setUserImageLink(response_getuser.data.imageLink);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchPeopleData = async () => {
      try {
        const response_getpersonlist = await getPersonList('1');
        if (response_getpersonlist && response_getpersonlist.data) {
          setPeople(response_getpersonlist.data);
        }
      } catch (error) {
        console.error('Error fetching people data:', error);
      }
    };

    fetchPeopleData();
  }, []);

  useEffect(() => {
    fetchCollections();
  }, []);

  return (
    <div className="homepage">
      <Box display="flex" alignItems="center" p={2}>
        <Avatar src={userimageLink} alt="User" sx={{ width: 50, height: 50 }} />
        <Typography variant="body1" sx={{ ml: 2 }}>
          Username: {username}
        </Typography>
      </Box>
      <h1>People Museum</h1>
      <div className="photo-wall">
        {people.map(person => (
          <div key={person.id} className="person-container">
            <Link to={`/conversation/${person.id}`}>
              <img src={person.imageLink} alt={person.name} className="photo" />
            </Link>
            <p className="photo-name">{person.name}</p>
          </div>
        ))}
        <div className="person-container">
          <Link to="/add-persona">
            <AddIcon className="photo add-photo" style={{ fontSize: '150px', color: '#fff' }} />
          </Link>
          <p className="photo-name">Add New Persona</p>
        </div>
      </div>
      <Paper elevation={3} style={{ margin: '20px auto', padding: '20px', maxWidth: '600px' }}>
        <List>
          {collections.map((collection) => (
            <ListItem key={collection.id} button component={Link} to={`/collection/${collection.id}`}>
              <ListItemText primary={collection.name} />
            </ListItem>
          ))}
        </List>
      </Paper>
      <div className="buttons" style={{ marginTop: '20px' }}>
        <Link to="/add-collection">
          <Button variant="contained" style={{ backgroundColor: '#fff', color: '#000' }}>Add Collection</Button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
