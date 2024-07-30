import React, {useEffect} from 'react';
import {CircularProgress, TextField} from '@mui/material';
import './Conversation.css'; 

function Answer({ answer, ansLoading, person}) {

    return (
        <div className="answer-container">
            {ansLoading
                ?
                <div className="circular-progress-container">
                    <>{person.name} is thinking... <CircularProgress size={24} /></>
                </div>
                :
                <TextField
                    variant="outlined"
                    multiline
                    rows={4}
                    fullWidth
                    value={answer}
                    InputLabelProps={{
                        style: { color: '#ffffff' },
                    }}
                    InputProps={{
                        style: {
                            color: '#ffffff',
                            borderColor: '#ffffff'
                        },
                        readOnly: true,
                    }}
                />
            }
        </div>
    );
}

export default Answer;
