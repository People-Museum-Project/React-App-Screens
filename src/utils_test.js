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
    // const user = await getUser('5639601012080640');
    // console.log('getUser:', user);

    // await updateUser('5639601012080640', 'John Smith', 'http://example.com/xxxxx.jpg', 'An updated user');
    // const updatedUser = await getUser('5639601012080640');
    // console.log('updatedUser:', updatedUser);

    const personList1 = await getPersonList('1');
    // console.log('getPersonList page 1:', personList1);

    // const personList2 = await getPersonList('1', 1, 10);
    // console.log('getPersonList page 1 with limit 10:', personList2);

    // const personListByCollection = await getPersonListByCollection(5675594515742720);
    // console.log('getPersonListByCollection:', personListByCollection);

    //const collectionList = await getCollectionList('1');

    // const collectionListWithPage = await getCollectionList('1', 2);
    // console.log('getCollectionList page 2:', collectionListWithPage);

    // await addPersonCollection(5632139873746944, 5675594515742720);
    // console.log('Added person to collection');
  } catch (error) {
    console.error('Test function error:', error);
  }
}

test();
