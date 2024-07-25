const { 
  addUser, 
  getUser, 
  updateUser,
  getPerson,
  getPersonList, 
  getCollectionList, 
  getPersonListByCollection, 
  addPersonCollection, 
  getCollection,
  addCollection,
  generateText,
  askQuestion,
  generateSamplePrompts,
  generateFollowups 
} = require('./utils');

const formData = {
  userId: '7s6fzzlWcifsb7iS7Q8TdTOHoW72', // Example user ID
  collectionName: 'sss',
  description: 'sss',
  imageLink: 'sss',
  isPublic: true,
};

async function test() {
  try {
    // Uncomment the function you want to test
    // await addUser('John Doe', 'http://example.com/johndoe.jpg', 'A new user', 'favourite', 'googleUserId', 'gmail');
    // await getUser('5639601012080640');
    // await updateUser('5651294463197184', 'John Smith', 'http://example.com/xxxxx.jpg', 'An updated user');

    // const response = await getPerson(5659211052613632);
    // console.log(response.person.name)

    // await getPersonList('7s6fzzlWcifsb7iS7Q8TdTOHoW72');

    // await getPersonList(5651294463197184, 1, 10);

    // await getPersonListByCollection(5675594515742720);

    // await getCollectionList('7s6fzzlWcifsb7iS7Q8TdTOHoW72');

    // await getCollectionList('1', 2);

    // await addPersonCollection(5632139873746944, 5675594515742720);
    // await getCollection(5739062455435264);
    // await addCollection(formData);
    
    const response = await generateText('What is the capital of France?', 'gpt-3.5-turbo');
    console.log(response.data)
    // const response = await generateSamplePrompts("If you are me, How do you ask an interesting question to know better about a person.", 2, 50, "asst_ubKwp4KW8cDePhDv7Gf6adf9");
    // console.log(response.data)

  } catch (error) {
    console.error('Test function error:', error);
  }
}

// Call the test function
test();
