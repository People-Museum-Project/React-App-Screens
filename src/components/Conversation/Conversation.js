import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Box, Typography, IconButton } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import EditIcon from '@mui/icons-material/Edit';
import QuestionForm from './QuestionForm';
import QuestionList from './QuestionList';
import { askQuestion } from '../../utils';
import Answer from './Answer';
import './Conversation.css';
import { getPerson, getCollectionListByPerson } from '../../utils'; // Import the functions

const Conversation = () => {
  const { personId } = useParams();
  const [person, setPerson] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState("");
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
  };

  const initializeQuestions = async () => {
    if (person && person.assistantId) {
      try {
        const response = await askQuestion("Generate 2 possible questions people might want to ask you based on current context. \n" +
<<<<<<< HEAD
          "Return the questions in a JavaScript array format without any special characters on the left and right ends, like this: [\"Question 1\", \"Question 2\"]. \n Always return new questions, no previous duplicate questions.", person.assistantId);
=======
            "Return the questions in a JavaScript array format without any special characters on the left and right ends, like this: [\"Question 1\", \"Question 2\"]. \n Always return new questions, no previous duplicate questions.", person.assistantId);
>>>>>>> e74556dc4fea50d93b06df435e4aa03e3e757827
        const questions = response.data.reply.slice(1, -1).split(",");
        setQuestions([questions[0], questions[1]]);
      } catch (error) {
        console.error('Error generating questions:', error);
      }
    }
  }

  useEffect(() => {
    const opening = async () => {
      if (person && person.assistantId && person.name) {
        try {
          const response = await askQuestion(`Generate an opening for this new conversation, greet user ${person.name} in your own way based on your instruction`, person.assistantId);
          const greetings = response.data.reply;
          setAnswer(greetings);
        } catch (error) {
          console.error('Error generating questions:', error);
        }
      }
    }

    if (person && person.assistantId && !answer) {
      opening();
      initializeQuestions();
    }
  }, [person]);

  useEffect(() => {
    const generateAnswer = async (question) => {
      if (!question || !person.assistantId) {
        return;
      }
      try {
        const response = await askQuestion(question, person.assistantId);
        setAnswer(response.data.reply);
      } catch (error) {
        console.error('Error generating answer:', error);
      }
    }

<<<<<<< HEAD
    generateAnswer(selectedQuestion);
    initializeQuestions();
  }, [selectedQuestion]);
=======
    if (selectedQuestion) {
      generateAnswer(selectedQuestion);
      initializeQuestions();
    }
  }, [selectedQuestion])
>>>>>>> e74556dc4fea50d93b06df435e4aa03e3e757827

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
            <Box sx={{ mt: 4, display: 'flex', alignItems: 'center' }}>
              <Typography variant="h6" gutterBottom>
                In Collections:
              </Typography>
              {collections.length > 0 ? (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', ml: 1 }}>
                  {collections.map((collection) => (
                    <Typography key={collection.id} sx={{ mr: 2 }}>
                      {collection.name}
                    </Typography>
                  ))}
                </Box>
              ) : (
                <Typography sx={{ ml: 1 }}>Not in any</Typography>
              )}
            </Box>
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
          {
            questions
              ? <QuestionList questions={questions} onSelectQuestion={handleAskQuestion} />
              : person && person.name
                ? <QuestionList questions={[`${person.name} is thinking...`, `${person.name} is thinking...`]} />
                : <QuestionList questions={["Loading...", "Loading..."]} />
          }
          <QuestionForm onAskQuestion={handleAskQuestion} />
          {<Answer answer={answer} />}
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
