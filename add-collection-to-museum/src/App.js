import React from 'react';
import './App.css';
import { Container } from '@mui/material';
import CollectionForm from './CollectionForm';

const App = () => {
  const handleCollectionSubmit = (formData) => {
    console.log(formData);
  };

  return (
    <Container maxWidth="md">
      <CollectionForm onSubmit={handleCollectionSubmit} />
    </Container>
  );
};

export default App;
