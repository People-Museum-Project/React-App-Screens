const axios = require('axios');


async function addUser(name, imageLink, description) {
    try {
      const response = await axios.post('http://127.0.0.1:8080/db/addUser', {
        name: name,
        imageLink: imageLink,
        description: description
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      console.log('Status:', response.status);
      console.log('Data:', response.data);
      return response;
    } catch (error) {
      console.error('Error:', error.message);
      if (error.response) {
        console.error('Status:', error.response.status);
        console.error('Data:', error.response.data);
      }
    }
}

async function getUser(userId) {
    try {
      const response = await axios.post('http://127.0.0.1:8080/getUser', {
          userId: userId,
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      console.log('Status:', response.status);
      console.log('Data:', response.data);
      return response;
    } catch (error) {
      console.error('Error:', error.message);
      if (error.response) {
        console.error('Status:', error.response.status);
        console.error('Data:', error.response.data);
      }
    }
}


async function updateUser(userId, name, imageLink, description) {
    try {
      const response = await axios.put('http://127.0.0.1:8080/updateUser', {
        userId: '5639601012080640',
        name: 'John Smith',
        imageLink: 'http://example.com/xxxxx.jpg',
        description: 'An updated user'
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      console.log('Status:', response.status);
      console.log('Data:', response.data);
      return response;
    } catch (error) {
      console.error('Error:', error.message);
      if (error.response) {
        console.error('Status:', error.response.status);
        console.error('Data:', error.response.data);
      }
    }
}

async function getPersonList(userId) {
    try {
      const response = await axios.post('http://127.0.0.1:8080/getPersonList', {
        userId: '5639601012080640',
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      console.log('Status:', response.status);
      console.log('Data:', response.data);
      return response;
    } catch (error) {
      console.error('Error:', error.message);
      if (error.response) {
        console.error('Status:', error.response.status);
        console.error('Data:', error.response.data);
      }
    }
}

module.exports = { addUser, getUser, updateUser };
