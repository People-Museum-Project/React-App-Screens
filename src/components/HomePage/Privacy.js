import React from 'react';
import { Container, Typography, Box, Link } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Define the theme for Material-UI components
const theme = createTheme({
    palette: {
        background: {
            default: '#f5f5f5',
        },
        text: {
            primary: '#333',
        },
    },
    typography: {
        h1: {
            fontSize: '2rem',
            fontWeight: 'bold',
        },
        h2: {
            fontSize: '1.5rem',
            fontWeight: 'bold',
        },
        body1: {
            fontSize: '1rem',
            lineHeight: '1.5',
        },
    },
});

const PrivacyPolicy = () => {
    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth="md" sx={{ py: 4 }}>
                <Typography variant="h1" gutterBottom>
                    Privacy Policy
                </Typography>
                <Typography variant="body1" paragraph>
                    <strong>Effective Date:</strong> [07/31/2024]
                </Typography>
                <Typography variant="h2" gutterBottom>
                    1. Introduction
                </Typography>
                <Typography variant="body1" paragraph>
                    Welcome to People Museum. We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our application and services.
                </Typography>
                <Typography variant="h2" gutterBottom>
                    2. Information We Collect
                </Typography>
                <Typography variant="body1" paragraph>
                    <strong>Personal Information:</strong> When you use our app, we may collect personal information that you provide directly, such as your name, email address, and any other information you choose to provide.
                </Typography>
                <Typography variant="body1" paragraph>
                    <strong>Usage Data:</strong> We automatically collect certain information about your device and usage of our services.
                </Typography>
                <Typography variant="h2" gutterBottom>
                    3. How We Use Your Information
                </Typography>
                <Typography variant="body1" paragraph>
                    We use your information for the following purposes:
                </Typography>
                <ul>
                    <li>To provide, operate, and maintain our services</li>
                    <li>To improve, personalize, and expand our services</li>
                    <li>To communicate with you, including for customer support and updates</li>
                    <li>To process transactions and manage your orders</li>
                    <li>To detect, prevent, and address technical issues and security breaches</li>
                    <li>To comply with legal obligations and enforce our terms and policies</li>
                </ul>
                <Typography variant="h2" gutterBottom>
                    4. Sharing Your Information
                </Typography>
                <Typography variant="body1" paragraph>
                    We do not sell or rent your personal information. We may share your information with:
                </Typography>
                <ul>
                    <li><strong>Service Providers:</strong> Third parties that perform services on our behalf, such as payment processing and data analysis.</li>
                    <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets.</li>
                    <li><strong>Legal Requirements:</strong> When required by law or to protect our rights and safety.</li>
                </ul>
                <Typography variant="h2" gutterBottom>
                    5. Security
                </Typography>
                <Typography variant="body1" paragraph>
                    We implement security measures to protect your information from unauthorized access, use, or disclosure. However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your information, we cannot guarantee its absolute security.
                </Typography>
                <Typography variant="h2" gutterBottom>
                    6. Your Choices
                </Typography>
                <Typography variant="body1" paragraph>
                    <strong>Access and Update:</strong> You can access, update, or delete your personal information through your account settings or by contacting us directly.
                </Typography>
                <Typography variant="body1" paragraph>
                    <strong>Opt-Out:</strong> You can opt-out of receiving promotional emails by following the instructions in those emails. However, we may still send you non-promotional messages related to your account.
                </Typography>
                <Typography variant="h2" gutterBottom>
                    8. Changes to This Privacy Policy
                </Typography>
                <Typography variant="body1" paragraph>
                    We may update this Privacy Policy from time to time. We will notify you of any significant changes by posting the new Privacy Policy on our website or app. Your continued use of our services after the changes have been made constitutes your acceptance of the updated Privacy Policy.
                </Typography>
                <Typography variant="h2" gutterBottom>
                    9. Contact Us
                </Typography>
                <Typography variant="body1" paragraph>
                    If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at:
                </Typography>
                <Typography variant="body1" paragraph>
                    <strong>Email:</strong> [wolberd@gmail.com] <br />
                </Typography>
            </Container>
        </ThemeProvider>
    );
};

export default PrivacyPolicy;
