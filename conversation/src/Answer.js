import React from 'react';

function Answer({ answer }) {
    return (
        <div className="answer-container">
            <p className="answer-text">{answer}</p>
        </div>
    );
}

export default Answer;
