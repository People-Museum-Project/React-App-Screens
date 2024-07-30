import React from 'react';
import { Button, CircularProgress } from "@mui/material";

function QuestionList({ questions, onSelectQuestion, quesLoading, person}) {
    return (
        <div className="question-list">
            <Button onClick={() => onSelectQuestion(questions[0])} disabled={quesLoading} className="question-button">
                {quesLoading ? <>{person.name} is thinking... <CircularProgress size={24} /> </>: questions[0]}
            </Button>

            <Button onClick={() => onSelectQuestion(questions[1])} disabled={quesLoading} className="question-button">
                {quesLoading ? <>{person.name} is thinking... <CircularProgress size={24} /> </>: questions[1]}
            </Button>
        </div>
    );
}

export default QuestionList;
