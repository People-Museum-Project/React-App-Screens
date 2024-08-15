import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Container, Box, Typography, IconButton } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import EditIcon from '@mui/icons-material/Edit';
import QuestionForm from './QuestionForm';
import QuestionList from './QuestionList';
import { askQuestion } from '../../utils';
import Answer from './Answer';
import './Conversation.css';
import { getPerson, getCollectionListByPerson } from '../../utils';
import { auth } from '../Login/firebase';
import AudioPlayer from "./AudioPlayer";
import AudioRecorder from "./AudioRecorder";

const Conversation = () => {
  const { personId } = useParams();
  const navigate = useNavigate();
  const [person, setPerson] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState("");
  const [answer, setAnswer] = useState('');
  const [collections, setCollections] = useState([]);
  const [quesLoading, setQuesLoading] = useState(false);
  const [ansLoading, setAnsLoading] = useState(false);
  const [audioLoading, setAudioLoading] = useState(false);
  const [greetingsGenerated, setGreetingsGenerated] = useState(false);


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
          setCollections(collectionData.data);
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
      setQuesLoading(true);
      try {
        const response = await askQuestion(
          "Generate 2 possible questions people might want to ask you based on current context. \n" +
          "Return the questions in a JavaScript array format without any special characters on the left and right ends, like this: [\"Question 1\", \"Question 2\"]. \n Always return new questions, no previous duplicate questions.",
          person.assistantId
        );
        const questions = response.data.reply.slice(1, -1).split(",");
        setQuestions([questions[0], questions[1]]);
      } catch (error) {
        console.error('Error generating questions:', error);
      } finally {
        setQuesLoading(false);
      }
    }
  };

  useEffect(() => {
    const opening = async () => {
      if (person && person.assistantId) {
        try {
          let greetingPrompt;
          if (auth.currentUser && auth.currentUser.displayName) {
            greetingPrompt = `Generate an opening for this new conversation, greet user by calling his name "${auth.currentUser.displayName}" in your own way based on your instruction`;
          } else {
            greetingPrompt = `Generate an opening for this new conversation, greet user by calling him "my dear friend" in your own way based on your instruction`;
          }
          const response = await askQuestion(greetingPrompt, person.assistantId);
          const greetings = response.data.reply;
          setAnswer(greetings);
          setGreetingsGenerated(true);
        } catch (error) {
          console.error('Error generating greetings:', error);
        }
      }
    };

    if (person && person.assistantId && person.name && !greetingsGenerated) {
      opening();
    }
  }, [person, greetingsGenerated]);


  useEffect(() => {
    if (person && person.assistantId && questions.length === 0) {
      initializeQuestions();
    }
  }, [person, questions]);

  useEffect(() => {
    const generateAnswer = async (question) => {
      if (!question || !person.assistantId) {
        return;
      }
      setAnsLoading(true);
      try {
        const response = await askQuestion(question, person.assistantId);
        setAnswer(response.data.reply);
      } catch (error) {
        console.error('Error generating answer:', error);
      } finally {
        setAnsLoading(false);
      }
    };

    if (selectedQuestion) {
      generateAnswer(selectedQuestion);
      initializeQuestions();
    }
  }, [selectedQuestion]);




  return (
    <Container maxWidth="md">
      {person ? (
        <>
          <Box component="header" sx={{ textAlign: 'center', mb: 3, position: 'relative' }}>
            <IconButton
              component={Link}
              onClick={() => navigate(-1)}
              color="primary"
              sx={{ position: 'absolute', top: 16, left: 16 }}
            >
              <HomeIcon />
            </IconButton>
            <img src={person.imageLink} alt={person.name} style={{ maxWidth: 300, height: 'auto', borderRadius: 8 }} />
            <AudioPlayer text={answer} audioLoading={audioLoading} person={person}/>

            <Box sx={{ mt: 4, display: 'flex', alignItems: 'center' }}>
              <Typography variant="h6" gutterBottom>
                In Collections:
              </Typography>
              {collections.length > 0 ? (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', ml: 1 }}>
                  {collections.map((collection) => (
                    <Typography key={collection.id} variant="h7" gutterBottom sx={{ mr: 2 }}>
                        <Link to={`/collection/${collection.id}`}>
                          <img src={collection.imageLink} alt={collection.name} className="collection-image" />
                        </Link>
                    </Typography>
                  ))}
                </Box>
              ) : (
                <Typography variant="h7" gutterBottom sx={{ ml: 1 }}>Not in any</Typography>
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

          <QuestionList questions={questions} onSelectQuestion={handleAskQuestion} quesLoading={quesLoading} person={person}/>
          <div className="container">
            <QuestionForm onAskQuestion={handleAskQuestion} onSetSelectedQuestion={setSelectedQuestion} />
          </div>
          <>
            {<Answer answer={answer} ansLoading={ansLoading} person={person}/>}
          </>

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
