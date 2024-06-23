import React, { useState } from 'react';
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container } from '@mui/material';
import PersonForm from './PersonForm';
import PersonFormScreen from './PersonFormScreen';

const App = () => {
  const [people, setPeople] = useState([]);

  const addPerson = (person) => {
    setPeople([...people, person]);
  };

  return (
    <Router>
      <Container maxWidth="md">
        <Routes>
          <Route path="/" element={<PersonFormScreen people={people} />} />
          <Route path="/add-person" element={<PersonForm addPerson={addPerson} />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
