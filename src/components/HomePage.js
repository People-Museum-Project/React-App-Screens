import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import './HomePage.css';

const HomePage = () => {
  // 照片URL数组
  const people = [
    { id: 1, name: 'Person 1', photo:'https://images.unsplash.com/photo-1599566150163-29194dcaad36?crop=faces&fit=crop&w=200&h=200', description: 'Description of Person 1' },
    { id: 2, name: 'Person 2', photo:'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?crop=faces&fit=crop&w=200&h=200', description: 'Description of Person 2' },
    { id: 2, name: 'Person 2', photo:'https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=faces&fit=crop&w=200&h=200', description: 'Description of Person 3' }
    // 可以添加更多照片URL
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
      </div>
      <div className="buttons">
        <Link to="/add-persona">
          <Button variant="contained" color="primary">Add Persona</Button>
        </Link>
        <Link to="/add-collection">
          <Button variant="contained" color="primary">Add Collection</Button>
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
