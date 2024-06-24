import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Paper, List, ListItem, ListItemText } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import './HomePage.css';

const HomePage = () => {
  const people = [
    { id: 1, name: 'Person 1', photo: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?crop=faces&fit=crop&w=200&h=200', description: 'Description of Person 1' },
    { id: 2, name: 'Person 2', photo: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?crop=faces&fit=crop&w=200&h=200', description: 'Description of Person 2' },
    { id: 3, name: 'Person 3', photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=faces&fit=crop&w=200&h=200', description: 'Description of Person 3' }
  ];

  const collections = [
    {
      id: 1,
      title: 'Collection 1',
      description: 'Description of Collection 1',
      images: [
        { url: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?crop=faces&fit=crop&w=200&h=200', description: 'Image 1' },
        { url: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?crop=faces&fit=crop&w=200&h=200', description: 'Image 2' }
      ]
    },
    {
      id: 2,
      title: 'Collection 2',
      description: 'Description of Collection 2',
      images: [
        { url: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?crop=faces&fit=crop&w=200&h=200', description: 'Image 3' },
        { url: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?crop=faces&fit=crop&w=200&h=200', description: 'Image 4' }
      ]
    },
    {
      id: 3,
      title: 'Collection 3',
      description: 'Description of Collection 3',
      images: [
        { url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=faces&fit=crop&w=200&h=200', description: 'Image 5' },
        { url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=faces&fit=crop&w=200&h=200', description: 'Image 6' }
      ]
    }
  ];

  return (
    <div className="homepage">
      <h1>People Museum</h1>
      <div className="photo-wall">
        {people.map(person => (
          <div key={person.id} className="person-container">
            <Link to={`/person/${person.id}`}>
              <img src={person.photo} alt={person.name} className="photo" />
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
              <ListItemText primary={collection.title} secondary={collection.description} />
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
