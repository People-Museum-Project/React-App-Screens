// src/pages/ExplorePage.js

import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Paper, List, ListItem, ListItemText, Avatar, IconButton, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import '../HomePage/HomePage.css';
import { getPersonList, getCollectionList } from '../../utils';
import { auth } from '../Login/firebase';
import SignInWithGoogle from "../Login/SignInWithGoogle";
import Footer from '../HomePage/Footer'; // Import the Footer component

const ExplorePage = () => {
  const [userImageLink, setUserImageLink] = useState('');
  const [people, setPeople] = useState([]);
  const [visibleImages, setVisibleImages] = useState(6);
  const [totalRecords, setTotalRecords] = useState(0);
  const [collections, setCollections] = useState([]);
  const [uid, setUid] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const fetchCollections = useCallback(async (uid) => {
    if (uid) {
      try {
        const response = await getCollectionList(uid);
        if (response && response.data) {
          setCollections(response.data);
        }
      } catch (error) {
        console.error('Error fetching collections:', error);
      }
    } else {
      auth.onAuthStateChanged(async (user) => {
        if (user) {
          try {
            const response = await getCollectionList(user.uid);
            if (response && response.data) {
              setCollections(response.data);
            }
          } catch (error) {
            console.error('Error fetching collections:', error);
          }
        } else {
          console.log('User is null');
        }
      });
    }
  }, []);

  const fetchPeopleData = useCallback(async (uid, page = 1, limit = 6) => {
    if (uid) {
      try {
        const response = await getPersonList(uid, page, limit);
        if (response && response.data) {
          setPeople(prevPeople => [...prevPeople, ...response.data]);
          setTotalRecords(response.total_count);
        }
      } catch (error) {
        console.error('Error fetching people data:', error);
      }
    }
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserImageLink(user.photoURL);
        fetchPeopleData("EXPLORE");
        fetchCollections("EXPLORE");
      } else {
        setIsLoggedIn(false);
        setUserImageLink(null);
        fetchPeopleData("EXPLORE");
        fetchCollections("EXPLORE");
      }
    });

    return () => unsubscribe();
  }, [fetchPeopleData, fetchCollections]);

  const handleLoadMore = () => {
    setVisibleImages(prevVisibleImages => prevVisibleImages + 6);
    const nextPage = Math.ceil(people.length / 6) + 1;
    fetchPeopleData("EXPLORE", nextPage);
  };

  return (
    <div className="homepage">
      <AppBar position="static">
        <Toolbar>
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
            <Button color="inherit" component={Link} to="/">People Museum</Button>
            <Button color="inherit" component={Link} to="/explore">Explore</Button>
            <Button color="inherit" component={Link} to="/about">About</Button>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', flexGrow: 1 }}>
            {isLoggedIn ? (
              <Link to="/profile" style={{ textDecoration: 'none', color: 'inherit' }}>
                <Avatar src={userImageLink} alt="Profile" />
              </Link>
            ) : (
              <div className="google-signin-button">
                <SignInWithGoogle />
              </div>
            )}
          </Box>
        </Toolbar>
      </AppBar>


      <div className="content">
        <Typography variant="h5" className="centered-title">
          Explore Interest Network
        </Typography>

        <div className="header-with-button">
          <Typography variant="h6" className="section-title">
            People
          </Typography>
        </div>

        <div className="photo-wall">
          {people.slice(0, visibleImages).map(person => (
            <div key={person.id} className="person-container">
              <Link to={`/conversation/${person.id}`}>
                <img src={person.imageLink} alt={person.name} className="photo" />
              </Link>
              <p className="photo-name">{person.name}</p>
            </div>
          ))}
        </div>
        {visibleImages < totalRecords && (
          <Button onClick={handleLoadMore} variant="contained" style={{ display: 'block', margin: '20px auto' }}>
            Load More
          </Button>
        )}

        <div className="header-with-button">
          <Typography variant="h6" className="collection-title">
            Collections
          </Typography>
        </div>

        <Paper elevation={3} style={{ margin: '20px auto', padding: '20px', maxWidth: '600px' }}>
          <List>
            {collections && collections.map((collection) => (
              <ListItem key={collection.id} button component={Link} to={`/collection/${collection.id}`}>
                <ListItemText primary={collection.name} />
              </ListItem>
            ))}
          </List>
        </Paper>
      </div>
      <Footer /> {/* Add Footer component */}
    </div>
  );
};

export default ExplorePage;