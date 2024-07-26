import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Container } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        background: {
            default: '#f5f5f5',
        },
        text: {
            primary: '#ffffff',
        },
    },
    components: {
        MuiTextField: {
            styleOverrides: {
                root: {
                    marginBottom: '16px',
                    '& .MuiInputBase-root': {
                        color: '#ffffff',
                    },
                    '& .MuiInputLabel-root': {
                        color: '#ffffff',
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#ffffff',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#ffffff',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#ffffff',
                    },
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    marginTop: '16px',
                },
            },
        },
    },
});

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically handle form submission, such as sending the data to a server
        console.log('Form Data:', formData);
        // Reset form
        setFormData({
            name: '',
            email: '',
            subject: '',
            message: '',
        });
    };

    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
                <Typography variant="h4" gutterBottom color="text.primary">
                    Contact Us
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        backgroundColor: '#000000', // Black background for the form
                        padding: 3,
                        borderRadius: 1,
                        boxShadow: 1,
                    }}
                >
                    <TextField
                        label="Name"
                        variant="outlined"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        label="Email"
                        variant="outlined"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        label="Subject"
                        variant="outlined"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        label="Message"
                        variant="outlined"
                        name="message"
                        multiline
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        required
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                    >
                        Send
                    </Button>
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default ContactUs;
