// src/App.js

import React from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import HomePage from './components/HomePage/HomePage';
import AddPersona from './components/AddPersona/AddPersona';
import UpdatePerson from './components/AddPersona/UpdatePerson';
import AddCollection from './components/AddCollection/AddCollection';
import AddPersonToCollection from './components/AddPersonToCollection/AddPersonToCollection';
import PersonFormScreen from './components/AddPersonToCollection/PersonFormScreen';
import CollectionPage from './components/CollectionPage/CollectionPage';
import Conversation from './components/Conversation/Conversation';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CollectionProvider } from './context/CollectionContext';

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
  }
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <CollectionProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/add-persona" element={<AddPersona />} />
            <Route path="/update-person/:personId" element={<UpdatePerson />} />
            <Route path="/add-collection" element={<AddCollection />} />
            <Route path="/person-collection" element={<PersonFormScreen />} />
            <Route path="/add-person-collection" element={<AddPersonToCollection />} />
            <Route path="/collection/:id" element={<CollectionPage />} />
            <Route path="/conversation/:personId" element={<Conversation />} />
          </Routes>
        </Router>
      </CollectionProvider>
    </ThemeProvider>
  );
}

export default App;