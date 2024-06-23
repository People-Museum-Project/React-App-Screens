import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Alert } from '@mui/material';
import './Login.css';

function Login() {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const [error, setError] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.username === '' || formData.password === '') {
            setError('All fields are required');
        } else {
            setError('');
            setSubmitted(true);
            console.log('Form data submitted:', formData);
        }
    };

    return (
        <Box
            component="div"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                mt: 4,
            }}
        >
            <Typography variant="h4" component="h2" gutterBottom>
                Login
            </Typography>
            {error && <Alert severity="error">{error}</Alert>}
            {submitted && <Alert severity="success">Login successful!</Alert>}
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    width: '300px',
                }}
            >
                <TextField
                    className="white-text-field"
                    label="Username"
                    variant="outlined"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    fullWidth
                />
                <TextField
                    className="white-text-field"
                    label="Password"
                    variant="outlined"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    fullWidth
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                >
                    Login
                </Button>
            </Box>
        </Box>
    );
}

export default Login;
