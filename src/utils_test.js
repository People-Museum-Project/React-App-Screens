const { 
  addUser, 
  getUser, 
  updateUser, 
  getPersonList, 
  getCollectionList, 
  getPersonListByCollection, 
  addPersonCollection, 
  getCollection 
} = require('./utils');

async function test() {
  try {
    // await addUser('John Doe', 'http://example.com/johndoe.jpg', 'A new user');
    // await getUser('5651294463197184');
    // await updateUser('5651294463197184', 'John Smith', 'http://example.com/xxxxx.jpg', 'An updated user');

    // await getPersonList('5651294463197184');

    // await getPersonList(5651294463197184, 1, 10);

    // await getPersonListByCollection(5675594515742720);

    // await getCollectionList('1');

    // await getCollectionList('1', 2);

    await addPersonCollection(5632139873746944, 5675594515742720);
  } catch (error) {
    console.error('Test function error:', error);
  }
}

test();
