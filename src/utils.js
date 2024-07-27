//src/utils.js
const baseurl = 'http://127.0.0.1:8080/db/';
const aiBaseurl = 'http://127.0.0.1:8080/ai/';


const addUser = async (name, imageLink, description, favourite, googleUserId, gmail) => {
  try {
    const response = await fetch(`${baseurl}addUser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        imageLink: imageLink,
        googleUserId: googleUserId,
        favourite: favourite,
        description: description,
        gmail: gmail
      })
    });
    const data = await response.json();
    console.log('Status:', response.status);
    console.log('Data:', data);
    return data;
  } catch (error) {
    console.error('Error:', error.message);
  }
};

const getUser = async (googleUserId) => {
  try {
    const response = await fetch(`${baseurl}getUser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ googleUserId: googleUserId })
    });
    const data = await response.json();
    console.log('Status:', response.status);
    console.log('Data:', data);
    if (response.status === 404) {
      return null;
    }
    return data;
  } catch (error) {
    console.error('Error:', error.message);
  }
};

const updateUser = async (userId, name, imageLink, description) => {
  try {
    const response = await fetch(`${baseurl}updateUser`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId: userId,
        name: name,
        imageLink: imageLink,
        description: description
      })
    });
    const data = await response.json();
    console.log('Status:', response.status);
    console.log('Data:', data);
    return data;
  } catch (error) {
    console.error('Error:', error.message);
  }
};

const getPerson = async (personId) => {
  try {
    const response = await fetch(`${baseurl}getPerson`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ personId: personId })
    });
    const data = await response.json();
    console.log('Status:', response.status);
    console.log('Data:', data);
    return data;
  } catch (error) {
    console.error('Error:', error.message);
  }
};

const addPerson = async (formDataToSend) => {
  try {
    const response = await fetch(`${baseurl}addPerson`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formDataToSend),
    });
    const data = await response.json();
    console.log('Status:', response.status);
    console.log('Data:', data);
    return data;
  } catch (error) {
    console.error('Error:', error.message);
  }
};

const updatePerson = async (personId, newName, newImageLink, newDescription, newContext, newPublic) => {
  try {
    const response = await fetch(`${baseurl}updatePerson`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ personId, newName, newImageLink, newDescription, newContext, newPublic }),
    });
    const data = await response.json();
    console.log('Status:', response.status);
    console.log('Data:', data);
    return data;
  } catch (error) {
    console.error('Error:', error.message);
  }
};

const deletePerson = async (personId) => {
  try {
    const response = await fetch(`${baseurl}deletePerson`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ personId: personId })
    });
    const data = await response.json();
    console.log('Status:', response.status);
    console.log('Data:', data);
    return data;
  } catch (error) {
    console.error('Error:', error.message);
  }
};

const getPersonList = async (googleUserId, page = 1, limit = 10, sortBy = 'date', ascending = 'true') => {
  try {
    const response = await fetch(`${baseurl}getPersonList`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        googleUserId: googleUserId,
        sortBy: sortBy,
        ascending: ascending,
        limit: limit,
        page: page
      })
    });
    const data = await response.json();
    console.log('Status:', response.status);
    console.log('Data:', data);
    return data;
  } catch (error) {
    console.error('Error:', error.message);
  }
};

const getPersonListByCollection = async (collectionId, page = 1, limit = 10, sortBy = 'date', ascending = 'true') => {
  const intCollectionId = parseInt(collectionId, 10);
  try {
    const response = await fetch(`${baseurl}getPersonListByCollection`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        collectionId: intCollectionId,
        page: page,
        limit: limit,
        sortBy: sortBy,
        ascending: ascending
      })
    });
    const data = await response.json();
    console.log('Status:', response.status);
    console.log('Data:', data);
    return data;
  } catch (error) {
    console.error('Error:', error.message);
  }
};

const getCollectionList = async (googleUserId, page = 1, limit = 10, sortBy = 'date', ascending = 'true') => {
  try {
    const response = await fetch(`${baseurl}getCollectionList`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        googleUserId: googleUserId,
        page: page,
        limit: limit,
        sortBy: sortBy,
        ascending: ascending
      })
    });
    const data = await response.json();
    console.log('Status:', response.status);
    console.log('Data:', data);
    return data;
  } catch (error) {
    console.error('Error:', error.message);
  }
};

const getCollectionListByPerson = async (personId, page = 1, limit = 10, sortBy = 'name', ascending = 'true') => {
  const intPersonId = parseInt(personId, 10);
  try {
    const response = await fetch(`${baseurl}getCollectionListByPerson`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        personId: intPersonId,
        page: page,
        limit: limit,
        sortBy: sortBy,
        ascending: ascending
      })
    });
    const data = await response.json();
    console.log('Status:', response.status);
    console.log('Data:', data);
    return data;
  } catch (error) {
    console.error('Error:', error.message);
  }
};

const addCollection = async (formData) => {
  try {
    const response = await fetch(`${baseurl}addCollection`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        googleUserId: formData.userId,
        name: formData.collectionName,
        imageLink: formData.imageLink,
        description: formData.description,
        isPublic: formData.isPublic,
      }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error adding collection:', error.message);
    throw error;
  }
};

const addPersonCollection = async (personId, collectionId) => {
  const intPersonId = parseInt(personId, 10);
  const intCollectionId = parseInt(collectionId, 10);
  try {
    const response = await fetch(`${baseurl}addPersonCollection`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        personId: intPersonId,
        collectionId: intCollectionId
      })
    });
    const data = await response.json();
    console.log('Status:', response.status);
    console.log('Data:', data);
    return data;
  } catch (error) {
    console.error('Error:', error.message);
  }
};


const getCollection = async (collectionId) => {
  try {
    const response = await fetch(`${baseurl}getCollection`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ collectionId })
    });

    if (!response.ok) {
      throw new Error('Failed to fetch collection');
    }

    const data = await response.json();
    if (data && data.data) {
      return data.data;
    } else {
      throw new Error('Collection not found');
    }
  } catch (error) {
    console.error('Error fetching collection:', error);
    throw error;
  }
};

const updateCollection = async (collectionId, newName, newImageLink, newDescription, newIsPublic) => {
  try {
    const response = await fetch(`${baseurl}updateCollection`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        collectionId: parseInt(collectionId, 10),
        newName: newName,
        newImageLink: newImageLink,
        newDescription: newDescription,
        newIsPublic: newIsPublic,
      }),
    });
    const data = await response.json();
    console.log('Status:', response.status);
    console.log('Data:', data);
    return data;
  } catch (error) {
    console.error('Error:', error.message);
  }
};

const deleteCollection = async (collectionId) => {
  try {
    const response = await fetch(`${baseurl}deleteCollection`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ collectionId: collectionId })
    });
    const data = await response.json();
    console.log('Status:', response.status);
    console.log('Data:', data);
    return data;
  } catch (error) {
    console.error('Error:', error.message);
    throw error;
  }
};

const deletePersonFromCollection = async (personId, collectionId) => {
  const intPersonId = parseInt(personId, 10);
  const intCollectionId = parseInt(collectionId, 10);
  try {
    const response = await fetch(`${baseurl}deletePersonFromCollection`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ personId: intPersonId, collectionId: intCollectionId })
    });
    const data = await response.json();
    console.log('Status:', response.status);
    console.log('Data:', data);
    return data;
  } catch (error) {
    console.error('Error:', error.message);
  }
};

// AI-related functions
const generateText = async (prompt, model) => {
  try {
    const response = await fetch(`${aiBaseurl}generateText`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({"prompt": prompt, "model": model })
    });
    const data = await response.json();
    console.log('Status:', response.status);
    console.log('Data:', data);
    return data;
  } catch (error) {
    console.error('Error:', error.message);
  }
};

const askQuestion = async (question) => {
  try {
    const response = await fetch(`${aiBaseurl}askQuestion`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ question })
    });
    const data = await response.json();
    console.log('Status:', response.status);
    console.log('Data:', data);
    return data;
  } catch (error) {
    console.error('Error:', error.message);
  }
};

const generateSamplePrompts = async (context, num_samples, max_words, assistant_id, followups) => {
  try {
    const response = await fetch(`${aiBaseurl}generateSamplePrompts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "context": context,
        "num_samples": num_samples,
        "max_words": max_words,
        "assistant_id": assistant_id,
        "followups": followups
      })
    });
    const data = await response.json();
    console.log('Status:', response.status);
    console.log('Data:', data);
    return data;
  } catch (error) {
    console.error('Error:', error.message);
  }
};

const generateFollowups = async (context) => {
  try {
    const response = await fetch(`${aiBaseurl}generateFollowups`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ context })
    });
    const data = await response.json();
    console.log('Status:', response.status);
    console.log('Data:', data);
    return data;
  } catch (error) {
    console.error('Error:', error.message);
  }
};

module.exports = {
  addUser,
  getUser,
  updateUser,
  getPerson,
  addPerson,
  updatePerson,
  deletePerson,
  getPersonList,
  getCollectionList,
  getCollectionListByPerson,
  getPersonListByCollection,
  addCollection,
  addPersonCollection,
  getCollection,
  updateCollection,
  deleteCollection,
  deletePersonFromCollection,
  generateText,
  askQuestion,
  generateSamplePrompts,
  generateFollowups
};