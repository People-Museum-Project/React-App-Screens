import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import AddPersona from './components/AddPersona';
import AddCollection from './components/AddCollection';
import PersonDetail from './components/PersonDetail';

const App = () => {
  const people = [
    { id: 1, name: 'Person 1', photo:'https://images.unsplash.com/photo-1599566150163-29194dcaad36?crop=faces&fit=crop&w=200&h=200', description: 'Description of Person 1' },
    { id: 2, name: 'Person 2', photo:'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?crop=faces&fit=crop&w=200&h=200', description: 'Description of Person 2' },
    { id: 2, name: 'Person 2', photo:'https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=faces&fit=crop&w=200&h=200', description: 'Description of Person 3' }
    // 可以添加更多照片URL
  ];
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/add-persona" element={<AddPersona />} />
        <Route path="/add-collection" element={<AddCollection />} />
        <Route path="/person/:id" element={<PersonDetail people={people} />} />
      </Routes>
    </Router>
  );
}

export default App;

