import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Paper, List, ListItem, ListItemText, Avatar, IconButton, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import './HomePage.css';
import { getPersonList } from '../../utils';
import { useCollections } from '../../context/CollectionContext';
import { auth } from '../Login/firebase';
import SignInWithGoogle from "../Login/SignInWithGoogle";

const HomePage = () => {
  const [userImageLink, setUserImageLink] = useState('');
  const [people, setPeople] = useState([]);
  const [visibleImages, setVisibleImages] = useState(6);
  const [totalRecords, setTotalRecords] = useState(0);
  const { collections, fetchCollections } = useCollections();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

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

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="homepage">
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleMenuClick}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            People Museum
          </Typography>
          {isLoggedIn ? (
            <Link to="/profile" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Avatar src={userImageLink} alt="Profile" />
            </Link>
          ) : (
            <SignInWithGoogle />
          )}
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
          >
            <MenuItem component={Link} to="/" onClick={handleMenuClose}>My Stuff</MenuItem>
            <MenuItem component={Link} to="/explore" onClick={handleMenuClose}>Explore</MenuItem>
            <MenuItem component={Link} to="/about" onClick={handleMenuClose}>About</MenuItem>
          </Menu>
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
    </div>
  );
}

export default HomePage;
