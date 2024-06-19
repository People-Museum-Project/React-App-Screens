import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import './App.css';

function Signup() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        password: '',
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const validateForm = () => {
        const newErrors = {};
        Object.keys(formData).forEach(key => {
            if (!formData[key]) {
                newErrors[key] = `${key} is required`;
            }
        });
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
        } else {
            console.log('Form data submitted:', formData);
            setErrors({});
        }
    };

    return (
        <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
            <Typography variant="h4" component="h2" gutterBottom>
                Signup
            </Typography>
            <form onSubmit={handleSubmit}>
                {Object.keys(formData).map((key) => (
                    <Box key={key} mb={2}>
                        <TextField
                            fullWidth
                            label={key.charAt(0).toUpperCase() + key.slice(1)}
                            type={key === 'password' ? 'password' : 'text'}
                            name={key}
                            value={formData[key]}
                            onChange={handleChange}
                            error={!!errors[key]}
                            helperText={errors[key]}
                            className="customTextField" // Add a class for custom styling
                        />
                    </Box>
                ))}
                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Create Profile
                </Button>
            </form>
        </Box>
    );
}

export default Signup;
