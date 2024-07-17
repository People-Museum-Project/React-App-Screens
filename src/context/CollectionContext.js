import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCollectionList } from '../utils';

const CollectionContext = createContext();

export const useCollections = () => {
  return useContext(CollectionContext);
};

export const CollectionProvider = ({ children }) => {
  const [collections, setCollections] = useState([]);

  const fetchCollections = async () => {
    try {
      const response = await getCollectionList('1');
      if (response && response.data) {
        setCollections(response.data);  // Ensure this data is an array
      }
    } catch (error) {
      console.error('Error fetching collections:', error);
    }
  };

  useEffect(() => {
    fetchCollections();
  }, []);

  return (
    <CollectionContext.Provider value={{ collections, fetchCollections }}>
      {children}
    </CollectionContext.Provider>
  );
};
