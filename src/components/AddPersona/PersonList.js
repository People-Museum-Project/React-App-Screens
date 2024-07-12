import React, { useEffect, useState } from 'react';
import axios from 'axios';


// Function to get a list of persons
const getPersonList = async (userId) => {
    const BASE_URL = 'http://127.0.0.1:8080/db';


    try {
        const response = await axios.post(`${BASE_URL}/getPersonList`, {
            userId,
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


const PersonList = () => {
    const userId = '1'; // Hardcoded userId
    const [people, setPeople] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchPeople = async () => {
            try {
                const response = await getPersonList(userId);


                if (response.data && response.data.data) {
                    setPeople(response.data.data);
                } else {
                    console.log('No data returned');
                }
            } catch (error) {
                console.error('Error fetching people:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };


        fetchPeople();
    }, [userId]);


    if (loading) {
        return <div>Loading...</div>;
    }


    if (error) {
        return <div>Error: {error}</div>;
    }


    return (
        <div>
            {people.length > 0 ? (
                people.map((person, index) => (
                    <div key={index} className="person">
                        <img src={person.imageLink} alt={person.name} />
                        <h3>{person.name}</h3>
                        <p>{person.description}</p>
                    </div>
                ))
            ) : (
                <div>No people found</div>
            )}
        </div>
    );
};


export default PersonList;
