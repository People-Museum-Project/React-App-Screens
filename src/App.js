import React, { useState } from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import HomePage from './components/HomePage/HomePage';
import AddPersona from './components/AddPersona/AddPersona';
import PersonList from './components/AddPersona/PersonList';
import UpdatePerson from './components/AddPersona/UpdatePerson';
import AddCollection from './components/AddCollection/AddCollection';
import CollectionList from './components/AddCollection/CollectionList';
import UpdateCollection from './components/AddCollection/UpdateCollection';
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
          <Route path="/person-list" element={<PersonList />} />
          <Route path="/update-person/:personId" element={<UpdatePerson />} />

          <Route path="/add-collection" element={<AddCollection />} />
          <Route path="/collection-list" element={<CollectionList />} />
          <Route path="/update-collection/:collectionId" element={<UpdateCollection />} />

          <Route path="/person-collection" element={<PersonFormScreen people={people} />} />
          <Route path="/add-person-collection" element={<AddPersonToCollection addPerson={addPerson} />} />

          <Route path="/collection/:id" element={<CollectionPage />} />
          <Route path="/conversation/:personId" element={<Conversation />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
