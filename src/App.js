// src/App.js
import React, { useEffect, useState } from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import HomePage from './components/HomePage/HomePage';
import ExplorePage from './components/ExplorePage/ExplorePage';
import PrivacyPolicy from './components/HomePage/Privacy';
import TermsOfService from './components/HomePage/Terms';
import ContactUs from './components/HomePage/Contact';
import AddPersona from './components/AddPersona/AddPersona';
import UpdatePerson from './components/AddPersona/UpdatePerson';
import AddCollection from './components/AddCollection/AddCollection';
import UpdateCollection from './components/AddCollection/UpdateCollection';
import AddPersonToCollection from './components/AddPersonToCollection/AddPersonToCollection';
import UpdatePersonCollection from './components/AddPersonToCollection/UpdatePersonCollection';
import CollectionPage from './components/CollectionPage/CollectionPage';
import Conversation from './components/Conversation/Conversation';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Profile from './components/Login/profile';
import { auth } from './components/Login/firebase';
import './App.css';

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.2rem',
      fontWeight: 500,
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
    }
  }
});

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoggedIn(!!user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
        <Router>
          <Routes>
            <Route path="/" element={isLoggedIn ? <HomePage /> : <ExplorePage />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/add-persona" element={<AddPersona />} />
            <Route path="/update-person/:personId" element={<UpdatePerson />} />
            <Route path="/update-collection/:collectionId" element={<UpdateCollection />} />
            <Route path="/update-person-collection/:personId" element={<UpdatePersonCollection />} />
            <Route path="/add-collection" element={<AddCollection />} />
            <Route path="/collection/:id" element={<CollectionPage />} />
            <Route path="/conversation/:personId" element={<Conversation />} />
            <Route path="/add-person-collection/:collectionId" element={<AddPersonToCollection />} />
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </Router>
    </ThemeProvider>
  );
}

export default App;
