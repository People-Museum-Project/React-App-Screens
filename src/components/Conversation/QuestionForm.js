import React, { useState } from 'react';
import './Conversation.css';
import AudioRecorder from './AudioRecorder';

function QuestionForm({ onAskQuestion, onSetSelectedQuestion}) {
    const [question, setQuestion] = useState('');

    const handleChange = (e) => {
        setQuestion(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onAskQuestion(question);
        setQuestion('');
    };

    return (
        <form onSubmit={handleSubmit} className="question-form">
            <input
                type="text"
                value={question}
                onChange={handleChange}
                placeholder="Ask a question"
                className="question-input"
            />
            <button type="submit" className="ask-button">Ask</button>
            <AudioRecorder onSetSelectedQuestion={onSetSelectedQuestion} />
        </form>
    );
}

export default QuestionForm;
