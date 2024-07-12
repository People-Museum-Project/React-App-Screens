import React from 'react';

function QuestionList({ questions, onSelectQuestion }) {
    return (
        <div className="question-list">
            {questions.map((question, index) => (
                <button
                    key={index}
                    onClick={() => onSelectQuestion(question)}
                    className="question-button"
                >
                    {question}
                </button>
            ))}
        </div>
    );
}

export default QuestionList;
