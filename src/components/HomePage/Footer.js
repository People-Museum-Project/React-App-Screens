// Footer.js
import React from 'react';
import { Box, Typography, Link } from '@mui/material';
import './Footer.css';

const Footer = () => {
    return (
        <Box className="footer" sx={{ color: 'white', padding: '20px', textAlign: 'center' }}>
            <Typography variant="h6">People Museum</Typography>
            <Typography variant="body2">
                &copy; {new Date().getFullYear()} All Rights Reserved. | Designed with ...
            </Typography>
            <Box sx={{ marginTop: '10px' }}>
                <Link href="#" color="inherit" sx={{ margin: '0 10px' }}>Privacy Policy</Link>
                <Link href="#" color="inherit" sx={{ margin: '0 10px' }}>Terms of Service</Link>
                <Link href="#" color="inherit" sx={{ margin: '0 10px' }}>Contact Us</Link>
            </Box>
        </Box>
    );
};

export default Footer;
