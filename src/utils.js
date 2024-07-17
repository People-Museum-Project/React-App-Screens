const baseurl = 'http://127.0.0.1:8080/db/';

const addUser = async (name, imageLink, description) => {
  try {
    const response = await fetch(`${baseurl}addUser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
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

const getUser = async (userId) => {
  try {
    const response = await fetch(`${baseurl}getUser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userId: userId })
    });
    const data = await response.json();
    console.log('Status:', response.status);
    console.log('Data:', data);
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

const getPersonList = async (userId, page = 1, limit = 10, sortBy = 'name', order = 'asc') => {
  try {
    const response = await fetch(`${baseurl}getPersonList`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId: userId,
        page: page,
        limit: limit,
        sortBy: sortBy,
        order: order
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

const getPersonListByCollection = async (collectionId, page = 1, limit = 10, sortBy = 'name', ascending = 'true') => {
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

const getCollectionList = async (userId, page = 1, limit = 10, sortBy = 'name', order = 'asc') => {
  try {
    const response = await fetch(`${baseurl}getCollectionList`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId: userId,
        page: page,
        limit: limit,
        sortBy: sortBy,
        order: order
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
        userId: formData.userId,
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
  const intCollectionId = parseInt(collectionId, 10);
  try {
    const response = await fetch(`${baseurl}getCollection`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ collectionId: intCollectionId })
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
  getPersonListByCollection,
  addCollection,
  addPersonCollection,
  getCollection,
};
