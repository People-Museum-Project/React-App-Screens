import React from 'react';
import { TextField } from '@mui/material';
import './App.css'; 

function Answer({ answer }) {
    return (
        <div className="answer-container">
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
        </div>
    );
}

export default Answer;
