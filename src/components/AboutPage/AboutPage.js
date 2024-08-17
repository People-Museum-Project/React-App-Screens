import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Box, Paper, Container, Button, Avatar, List, ListItem, ListItemText, Link as MuiLink } from '@mui/material';
import { Link } from 'react-router-dom';
import './AboutPage.css';
import { auth } from '../Login/firebase';
import Footer from '../HomePage/Footer';
import SignInWithGoogle from "../Login/SignInWithGoogle";

const AboutPage = () => {
    const [userImageLink, setUserImageLink] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
          if (user) {
            setIsLoggedIn(true);
            setUserImageLink(user.photoURL);
          } else {
            setIsLoggedIn(false);
            setUserImageLink(null);
          }
        });
    
        return () => unsubscribe();
      }, []);

    const teamMembers = [
    {
        name: "Alusi",
        email: "alusi.shar@gmail.com",
        github: "https://github.com/Alas129",
        linkedin: "https://www.linkedin.com/in/fnu-alusi"
    },
    {
        name: "Junsheng Ye (YJ)",
        email: "overdosedizzy@gmail.com",
        github: "https://github.com/YJ-Junsheng-Ye",
        linkedin: "https://www.linkedin.com/in/junsheng-ye-a02841289/"
    },
    {
        name: "Kayvan Zahiri",
        email: "kzahiri@dons.usfca.edu",
        github: "https://github.com/kzahiri1",
        linkedin: "https://www.linkedin.com/in/kayvan-zahiri-932763179/"
    },
    {
        name: "Bian Yi",
        email: "ybian4@dons.usfca.edu ",
        github: "https://github.com/BianYi10",
        linkedin: ""
    }
    ];

    return (
    <div className="about-page">
        <AppBar position="static">
            <Toolbar>
            <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
                <Button color="inherit" component={Link} to="/">People Museum</Button>
                <Button color="inherit" component={Link} to="/explore">Explore</Button>
                <Button color="inherit" component={Link} to="/about">About</Button>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', flexGrow: 1 }}>
                {isLoggedIn ? (
                <Link to="/profile" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Avatar src={userImageLink} alt="Profile" />
                </Link>
                ) : (
                <div className="google-signin-button">
                    <SignInWithGoogle />
                </div>
                )}
            </Box>
            </Toolbar>
        </AppBar>

        <Container>
        <Paper elevation={3} className="about-content">
            <Typography variant="h4" align="center" gutterBottom>
            About People Museum
            </Typography>
            <Typography variant="body1" paragraph>
            People Museum is an innovative platform that connects individuals through their stories and shared interests.
            This app allows users to explore unique personas and collections, fostering a community of connection and discovery.
            </Typography>
            <Typography variant="h6" gutterBottom>
            Developed by a passionate team of creators:
            </Typography>
            <List>
                {teamMembers.map((member, index) => (
                    <ListItem key={index} className="team-member">
                        <ListItemText
                            primary={member.name}
                            secondary={
                                <>
                                <Typography variant="body2">Email: {member.email}</Typography>
                                <MuiLink href={member.github} target="_blank" rel="noopener">Github</MuiLink> |{' '}
                                <MuiLink href={member.linkedin} target="_blank" rel="noopener">LinkedIn</MuiLink>
                                </>
                            }
                        />
                    </ListItem>
                ))}
            </List>
            
            <Typography variant="body1" paragraph>
            Whether you are here to explore, share, or build connections, we hope you enjoy your journey through the People Museum.
            </Typography>
        </Paper>
        </Container>

        <Footer />
    </div>
    );
};

export default AboutPage;