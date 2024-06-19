import React, { useState } from 'react';
import { Container, Box, Typography } from '@mui/material';
import QuestionForm from './QuestionForm';
import QuestionList from './QuestionList';
import Answer from './Answer';
import './App.css';

function App() {
  const [questions] = useState([
    "How did you free yourself and others during the Civil War?",
    "Where did you sail the commandeered ship to in 1862?"
  ]);

  const [selectedQuestion, setSelectedQuestion] = useState('');
  const [answer, setAnswer] = useState('');

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
    <Container maxWidth="md" sx={{ bgcolor: '#282c34', color: '#ffffff', borderRadius: 2, p: 3, mt: 5 }}>
      <Box component="header" sx={{ textAlign: 'center', mb: 3 }}>
        <img src="https://cdn.theatlantic.com/media/mt/tanehisicoates/Smalls.jpg" alt="Robert Smalls" style={{ maxWidth: 300, height: 'auto', borderRadius: 8 }} />
        <Typography variant="h4" component="h2">
          Ask Robert Smalls a Question
        </Typography>
      </Box>
      <QuestionList questions={questions} onSelectQuestion={handleAskQuestion} />
      <QuestionForm onAskQuestion={handleAskQuestion} />
      {selectedQuestion && <Answer answer={answer} />}
    </Container>
  );
}

export default App;
