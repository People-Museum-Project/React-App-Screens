import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Paper, List, ListItem, ListItemText, Avatar, Pagination, IconButton, Menu, MenuItem } from '@mui/material';
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
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { collections, fetchCollections } = useCollections();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const limit = 3; // Number of items per page

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserImageLink(user.photoURL);
        fetchPeopleData(user, page, limit);
      } else {
        setIsLoggedIn(false);
        setUserImageLink('');
      }
    });

    return () => unsubscribe();
  }, [page]);

  const fetchPeopleData = async (user, page, limit) => {
    try {
      if (user) {
        const response = await getPersonList(user.uid, page, limit);
        if (response && response.data) {
          setPeople(response.data);
          const totalRecords = 10; // Replace with actual total records
          setTotalPages(Math.ceil(totalRecords / limit));
        }
      }
    } catch (error) {
      console.error('Error fetching people data:', error);
    }
  };

  useEffect(() => {
    fetchCollections();
  }, [fetchCollections]);

  const handlePageChange = (event, value) => {
    setPage(value);
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
        <Typography variant="h5" className="section-title custom-title">
          My Interest Network
        </Typography>
        <div className="photo-wall">
          {people && people.map(person => (
            <div key={person.id} className="person-container">
              <Link to={`/conversation/${person.id}`}>
                <img src={person.imageLink} alt={person.name} className="photo" />
              </Link>
              <p className="photo-name">{person.name}</p>
            </div>
          ))}
          <div className="person-container">
            <Link to="/add-persona" className="add-persona">
              <div className="photo add-photo">
                <AddIcon />
              </div>
            </Link>
            <p className="photo-name">Add New Persona</p>
          </div>
        </div>
        <Pagination count={totalPages} page={page} onChange={handlePageChange} style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', marginBottom: '30px' }} />
        <Typography variant="h6" className="collection-title">
          My Collection's
        </Typography>
        <Paper elevation={3} style={{ margin: '20px auto', padding: '20px', maxWidth: '600px' }}>
          <List>
            {collections && collections.map((collection) => (
              <ListItem key={collection.id} button component={Link} to={`/collection/${collection.id}`}>
                <ListItemText primary={collection.name} />
              </ListItem>
            ))}
          </List>
        </Paper>
        <div className="buttons">
          <Link to="/add-collection">
            <Button variant="contained" style={{ backgroundColor: '#fff', color: '#000' }} startIcon={<AddIcon />}>Add Collection</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
