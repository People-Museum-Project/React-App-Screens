//src/context/CollectionContext.js
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getCollectionList } from '../utils';
import { auth } from '../components/Login/firebase';

const CollectionContext = createContext();

export const useCollections = () => {
  return useContext(CollectionContext);
};

export const CollectionProvider = ({ children }) => {
  const [collections, setCollections] = useState([]);

  const fetchCollections = useCallback(async () => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const response = await getCollectionList(user.uid);
          if (response && response.data) {
            setCollections(response.data);
          }
        } catch (error) {
          console.error('Error fetching collections:', error);
        }
      } else {
        console.log('user is null');
      }
    });
  }, []);

  useEffect(() => {
    fetchCollections();
  }, [fetchCollections]);

  return (
    <CollectionContext.Provider value={{ collections, fetchCollections }}>
      {children}
    </CollectionContext.Provider>
  );
};
