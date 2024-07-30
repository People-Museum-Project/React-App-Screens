const { 
  addUser, 
  getUser, 
  updateUser, 
  getPersonList, 
  getCollectionList, 
  getPersonListByCollection, 
  addPersonCollection, 
  getCollection,
  addCollection,
  deletePersonFromCollection, askQuestion
} = require('./utils');

const formData = {
  userId: 'EXPLORE', // Example user ID
  collectionName: 'Singer',
  description: 'A singer is an artist of emotion, painting the canvas of silence with the colors of their soul.',
  imageLink: 'https://www.careersinmusic.com/wp-content/uploads/2014/11/background-singer.jpg',
  isPublic: true,
};

async function test() {
  try {
    // Uncomment the function you want to test
    // await addUser('John Doe', 'http://example.com/johndoe.jpg', 'A new user', 'favourite', 'googleUserId', 'gmail');
    // await getUser('5639601012080640');
    // await updateUser('5651294463197184', 'John Smith', 'http://example.com/xxxxx.jpg', 'An updated user');

    // await getPersonList('7s6fzzlWcifsb7iS7Q8TdTOHoW72');

    // await getPersonList(5651294463197184, 1, 10);

    // await getPersonListByCollection(5675594515742720);

    // await getCollectionList('7s6fzzlWcifsb7iS7Q8TdTOHoW72');

    // await getCollectionList('1', 2);

    await addPersonCollection(5183941422088192, 5749761688731648);
    // await getCollection(5739062455435264);
    // await addCollection(formData);
    // await deletePersonFromCollection("5708300221939712","5751095477403648");
    // await askQuestion("wtf are you", 'asst_fLT3rXcpVtflqqN2KwWe1NJ2')

  } catch (error) {
    console.error('Test function error:', error);
  }
}

// Call the test function
test();
