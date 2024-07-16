import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Box, Typography } from '@mui/material';
import QuestionForm from './QuestionForm';
import QuestionList from './QuestionList';
import Answer from './Answer';
import './Conversation.css';

const Conversation = () => {
  const { personId } = useParams();
  const [person, setPerson] = useState(null);
  const [questions] = useState([
    "How did you free yourself and others during the Civil War?",
    "Where did you sail the commandeered ship to in 1862?"
  ]);
  const [selectedQuestion, setSelectedQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  useEffect(() => {
    fetchPersonData(personId);
  }, [personId]);

  const fetchPersonData = async (id) => {
    try {
      const response = await fetch('https://peoplemuseumyeah.uc.r.appspot.com/db/getPerson', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ personId: id }),
      });
      const data = await response.json();
      if (response.ok) {
        setPerson(data.person);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error('Error fetching person data:', error);
    }
  };

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
          <Box component="header" sx={{ textAlign: 'center', mb: 3 }}>
            <img src={person.imageLink} alt={person.name} style={{ maxWidth: 300, height: 'auto', borderRadius: 8 }} />
            <Typography variant="h4" component="h2" sx={{ mt: 4, mb: 2 }}>
              Ask {person.name} a Question
            </Typography>
            <Typography variant="body1" sx={{ mb: 4 }}>
              Description: {person.description}
            </Typography>
          </Box>
          <QuestionList questions={questions} onSelectQuestion={handleAskQuestion} />
          <QuestionForm onAskQuestion={handleAskQuestion} />
          {selectedQuestion && <Answer answer={answer} />}
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
