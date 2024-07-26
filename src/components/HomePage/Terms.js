import React from 'react';
import { Container, Typography, Box } from '@mui/material';
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

const TermsOfService = () => {
    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth="md" sx={{ py: 4 }}>
                <Typography variant="h1" gutterBottom>
                    Terms of Service
                </Typography>
                <Typography variant="body1" paragraph>
                    <strong>Effective Date:</strong> [07/30/2024]
                </Typography>
                <Typography variant="h2" gutterBottom>
                    1. Acceptance of Terms
                </Typography>
                <Typography variant="body1" paragraph>
                    By accessing or using People Museum, you agree to comply with and be bound by these Terms of Service. If you do not agree to these terms, you should not use our services.
                </Typography>
                <Typography variant="h2" gutterBottom>
                    2. Changes to Terms
                </Typography>
                <Typography variant="body1" paragraph>
                    We reserve the right to modify these Terms of Service at any time. Any changes will be effective when we post the revised terms on our website or app. Your continued use of our services after any changes constitutes your acceptance of the new terms.
                </Typography>
                <Typography variant="h2" gutterBottom>
                    3. User Responsibilities
                </Typography>
                <Typography variant="body1" paragraph>
                    You agree to use our services only for lawful purposes and in accordance with these terms. You are responsible for any content you submit and for maintaining the confidentiality of your account credentials.
                </Typography>
                <Typography variant="h2" gutterBottom>
                    4. Intellectual Property
                </Typography>
                <Typography variant="body1" paragraph>
                    All content and materials provided through our services, including text, graphics, logos, and software, are the property of [People Museum] or its licensors. You may not use, reproduce, or distribute any content without our prior written consent.
                </Typography>
                <Typography variant="h2" gutterBottom>
                    5. Limitation of Liability
                </Typography>
                <Typography variant="body1" paragraph>
                    To the fullest extent permitted by law, [People Museum] shall not be liable for any indirect, incidental, special, or consequential damages arising from or related to your use of our services.
                </Typography>
                <Typography variant="h2" gutterBottom>
                    6. Termination
                </Typography>
                <Typography variant="body1" paragraph>
                    We reserve the right to terminate or suspend your access to our services at our sole discretion, without notice, for any reason, including if we believe you have violated these terms.
                </Typography>
                <Typography variant="h2" gutterBottom>
                    7. Governing Law
                </Typography>
                <Typography variant="body1" paragraph>
                    These Terms of Service shall be governed by and construed in accordance with the laws of [Your Jurisdiction]. Any disputes arising from these terms shall be resolved in the courts of [Your Jurisdiction].
                </Typography>
                <Typography variant="h2" gutterBottom>
                    8. Contact Information
                </Typography>
                <Typography variant="body1" paragraph>
                    If you have any questions or concerns about these Terms of Service, please contact us at:
                </Typography>
                <Typography variant="body1" paragraph>
                    <strong>Email:</strong> [wolberd@gmail.com] <br />
                </Typography>
            </Container>
        </ThemeProvider>
    );
};

export default TermsOfService;
