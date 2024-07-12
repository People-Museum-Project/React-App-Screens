import React, { useEffect, useState } from 'react';
import axios from 'axios';


// Function to get a list of collections
const getCollectionList = async (userId, page = 1, limit = 10, sortBy = 'name', order = 'asc') => {
    const BASE_URL = 'http://127.0.0.1:8080/db';


    try {
        const response = await axios.post(`${BASE_URL}/getCollectionList`, {
            userId,
            page,
            limit,
            sortBy,
            order,
        }, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log('Status:', response.status);
        console.log('Data:', response.data);
        return response;
    } catch (error) {
        console.error('Error:', error.message);
        if (error.response) {
            console.error('Status:', error.response.status);
            console.error('Data:', error.response.data);
        } else if (error.request) {
            console.error('No response received:', error.request);
        } else {
            console.error('Error setting up request:', error.message);
        }
    }
};


const CollectionList = () => {
    const userId = '1'; // Hardcoded userId as a string
    const [collections, setCollections] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchCollections = async () => {
            try {
                const response = await getCollectionList(userId);


                if (response && response.data && response.data.data) {
                    setCollections(response.data.data);
                } else {
                    console.log('No data returned');
                }
            } catch (error) {
                console.error('Error fetching collections:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };


        fetchCollections();
    }, []);


    if (loading) {
        return <div>Loading...</div>;
    }


    if (error) {
        return <div>Error: {error}</div>;
    }


    return (
        <div>
            {collections.length > 0 ? (
                collections.map((collection, index) => (
                    <div key={index} className="collection">
                        <h3>{collection.name}</h3>
                        <p>{collection.description}</p>
                    </div>
                ))
            ) : (
                <div>No collections found</div>
            )}
        </div>
    );
};


export default CollectionList;
