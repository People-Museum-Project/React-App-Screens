import React from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import HomePage from './components/HomePage';
import AddPersona from './components/AddPersona';
import AddCollection from './components/AddCollection';
import PersonDetail from './components/PersonDetail';
import CollectionPage from './components/CollectionPage';
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
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/add-persona" element={<AddPersona />} />
          <Route path="/add-collection" element={<AddCollection />} />
          <Route path="/person/:id" element={<PersonDetail />} />
          <Route path="/collection/:id" element={<CollectionPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
