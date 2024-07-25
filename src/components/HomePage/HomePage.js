import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Paper, List, ListItem, ListItemText, Avatar, IconButton, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import './HomePage.css';
import { getPersonList } from '../../utils';
import { useCollections } from '../../context/CollectionContext';
import { auth } from '../Login/firebase';
import SignInWithGoogle from "../Login/SignInWithGoogle";
import Footer from './Footer'; // Import the Footer component

const HomePage = () => {
  const [userImageLink, setUserImageLink] = useState('');
  const [people, setPeople] = useState([]);
  const [visibleImages, setVisibleImages] = useState(6);
  const [totalRecords, setTotalRecords] = useState(0);
  const { collections, fetchCollections, clearCollections } = useCollections();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserImageLink(user.photoURL);
        fetchPeopleData(user);
        fetchCollections(); // Fetch collections when user is logged in
      } else {
        setIsLoggedIn(false);
        setUserImageLink('');
        clearCollections(); // Clear collections when user logs out
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchPeopleData = async (user) => {
    try {
      if (user) {
        const response = await getPersonList(user.uid);
        if (response && response.data) {
          setPeople(response.data);
          setTotalRecords(response.total || 10); // Replace with actual total records
        }
      }
    } catch (error) {
      console.error('Error fetching people data:', error);
    }
  };

  const handleLoadMore = () => {
    setVisibleImages(prevVisibleImages => prevVisibleImages + 6);
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
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {isLoggedIn ? (
              <Link to="/profile" style={{ textDecoration: 'none', color: 'inherit' }}>
                <Avatar src={userImageLink} alt="Profile" />
              </Link>
            ) : (
              <SignInWithGoogle />
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <div className="content">
        <div className="header-with-button">
          <Typography variant="h5" className="section-title custom-title">
            My Interest Network
          </Typography>
          <Link to="/add-persona" className="add-persona">
            <IconButton color="primary" aria-label="add new persona">
              <AddIcon />
            </IconButton>
          </Link>
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
            My Collections
          </Typography>
          <Link to="/add-collection" className="add-collection">
            <IconButton color="primary" aria-label="add new collection">
              <AddIcon />
            </IconButton>
          </Link>
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

export default HomePage;
