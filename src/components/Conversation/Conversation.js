import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Box, Typography, IconButton, List, ListItem, ListItemText } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import EditIcon from '@mui/icons-material/Edit';
import QuestionForm from './QuestionForm';
import QuestionList from './QuestionList';
import Answer from './Answer';
import './Conversation.css';
import { getPerson, getCollectionListByPerson } from '../../utils'; // Import the functions

const Conversation = () => {
  const { personId } = useParams();
  const [person, setPerson] = useState(null);
  const [questions] = useState([
    "How did you free yourself and others during the Civil War?",
    "Where did you sail the commandeered ship to in 1862?"
  ]);
  const [selectedQuestion, setSelectedQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [collections, setCollections] = useState([]); // State for collections

  useEffect(() => {
    const fetchData = async () => {
      try {
        const personData = await getPerson(personId);
        if (personData && personData.person) {
          setPerson(personData.person);
        } else {
          console.error('Person data not found');
        }

        const collectionData = await getCollectionListByPerson(personId);
        if (collectionData && collectionData.data) {
          setCollections(collectionData.data); // Extract collections from data
        } else {
          console.error('Collections data not found');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [personId]);

  const handleAskQuestion = (question) => {
    setSelectedQuestion(question);
    generateAnswer(question);
  };

  const generateAnswer = (question) => {
    if (question === "How did you free yourself and others during the Civil War?") {
      setAnswer("I am Robert Smalls, and I am proud to share how I freed myself and others during the Civil War. On that daring night of May 13, 1862, I made a bold decision to seize control of the Confederate transport ship CSS Planter in Charleston harbor...");
    } else if (question === "Where did you sail the commandeered ship to in 1862?") {
      setAnswer("After commandeering the ship, I navigated the CSS Planter past Confederate forts and delivered it to the Union forces blockading Charleston Harbor...");
    } else {
      setAnswer("This is a placeholder answer for the question: " + question);
    }
  };

  return (
    <Container maxWidth="md">
      {person ? (
        <>
          <Box component="header" sx={{ textAlign: 'center', mb: 3, position: 'relative' }}>
            <IconButton
              component={Link}
              to="/"
              color="primary"
              sx={{ position: 'absolute', top: 16, left: 16 }}
            >
              <HomeIcon />
            </IconButton>
            <img src={person.imageLink} alt={person.name} style={{ maxWidth: 300, height: 'auto', borderRadius: 8 }} />
            <Typography variant="h4" component="h2" sx={{ mt: 4, mb: 2 }}>
              Ask {person.name} a Question
            </Typography>
            <Typography variant="body1" sx={{ mb: 4 }}>
              Description: {person.description}
            </Typography>
            <IconButton
              component={Link}
              to={`/update-person/${personId}`}
              variant="outlined"
              color="primary"
              sx={{ position: 'absolute', top: 16, right: 16 }}
            >
              <EditIcon />
            </IconButton>
          </Box>
          <QuestionList questions={questions} onSelectQuestion={handleAskQuestion} />
          <QuestionForm onAskQuestion={handleAskQuestion} />
          {selectedQuestion && <Answer answer={answer} />}
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom>
              In Collections:
            </Typography>
            <List>
              {collections.map((collection) => (
                <ListItem key={collection.id}>
                  <ListItemText
                    primary={collection.name}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        </>
      ) : (
        <Typography variant="h6" sx={{ textAlign: 'center', mt: 4 }}>
          Loading...
        </Typography>
      )}
    </Container>
  );
};

export default Conversation;
