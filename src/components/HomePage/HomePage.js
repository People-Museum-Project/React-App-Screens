// HomePage.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Paper, List, ListItem, ListItemText, Avatar } from '@mui/material';
import './HomePage.css';
import { getUser, getPersonList } from '../../utils';
import { useCollections } from '../../context/CollectionContext';
import AddIcon from '@mui/icons-material/Add';
import { auth } from '../Login/firebase';
import SignInWithGoogle from "../Login/SignInWithGoogle";

const HomePage = () => {
  const [userimageLink, setUserImageLink] = useState('');
  const [people, setPeople] = useState([]);
  const { collections, fetchCollections } = useCollections();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserImageLink(user.photoURL);
        fetchPeopleData(user);
      } else {
        setIsLoggedIn(false);
        setUserImageLink('');
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchPeopleData = async (user) => {
    try {
      if (user) {
        const response_getpersonlist = await getPersonList(user.uid);
        if (response_getpersonlist && response_getpersonlist.data) {
          setPeople(response_getpersonlist.data);
        }
      }
    } catch (error) {
      console.error('Error fetching people data:', error);
    }
  };

  useEffect(() => {
    fetchCollections();
  }, [fetchCollections]);

  return (
    <div className="homepage">
      <div className="profile-user" style={{ position: 'absolute', top: '10px', right: '30px' }}>
        {isLoggedIn ? (
          <Link to="/profile" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="profile-info">
              <Avatar src={userimageLink} alt="Profile" />
            </div>
          </Link>
        ) : (
          <SignInWithGoogle />
        )}
      </div>
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
}

export default HomePage;
