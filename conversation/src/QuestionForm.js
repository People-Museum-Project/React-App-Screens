import React, { useState } from 'react';

function QuestionForm({ onAskQuestion }) {
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
                placeholder="Ask Robert Smalls a question"
                className="question-input"
            />
            <button type="submit" className="ask-button">Ask</button>
        </form>
    );
}

export default QuestionForm;
