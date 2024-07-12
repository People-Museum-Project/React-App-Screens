import React, { useState } from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import HomePage from './components/HomePage/HomePage';
import AddPersona from './components/AddPersona/AddPersona';
import AddCollection from './components/AddCollection/AddCollection';
import AddPersonToCollection from './components/AddPersonToCollection/AddPersonToCollection';
import PersonFormScreen from './components/AddPersonToCollection/PersonFormScreen';
import CollectionPage from './components/CollectionPage/CollectionPage';
import Conversation from './components/Conversation/Conversation';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Create a theme instance
const theme = createTheme({
  palette: {
    mode: 'dark', // Assuming you want a dark theme as previously mentioned
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.2rem',
      fontWeight: 500, // Medium font weight
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 400, // Normal font weight
    }
    // You can define other text styles here
  }
});

const App = () => {
  const [people, setPeople] = useState([]);

  const addPerson = (person) => {
    setPeople([...people, person]);
  };
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/add-persona" element={<AddPersona />} />
          <Route path="/add-collection" element={<AddCollection />} />

          <Route path="/person-collection" element={<PersonFormScreen people={people} />} />
          <Route path="/add-person-collection" element={<AddPersonToCollection addPerson={addPerson} />} />

          <Route path="/collection/:id" element={<CollectionPage />} />
          <Route path="/conversation" element={<Conversation />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
