import React from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

const About: React.FC = () => {
    return (
        <Container maxWidth="md">
            <Paper elevation={3} sx={{ mt: 4, p: 3 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    About This Project
                </Typography>
                <Typography variant="body1" paragraph>
                    This project is designed as a showcase for an interview for the position of Senior Full Stack Developer at Axion Ray.
                </Typography>
                <Typography variant="body1" paragraph>
                    Crafted by Eli Rosenberg, the application illustrates my capabilities in developing modern web applications using React, TypeScript, and Material-UI. The structure and code standards adopted in this project are aimed at demonstrating best practices, clean code, and effective use of advanced front-end technologies.
                </Typography>
                <Typography variant="body1" paragraph>
                    The purpose of this project is not only to fulfill the technical requirements of the interview but also to reflect my approach to software development which includes attention to detail, a focus on user experience, and a commitment to delivering high-quality and maintainable code.
                </Typography>
                <Box sx={{ mt: 2 }}>
                    <Typography variant="h6" component="h2">
                        Key Aspects:
                    </Typography>
                    <ul>
                        <Typography component="li" variant="body1">Utilizing React with TypeScript for scalable and maintainable code.</Typography>
                        <Typography component="li" variant="body1">Implementing Material-UI for a polished and responsive user interface.</Typography>
                        <Typography component="li" variant="body1">Demonstrating advanced application features like routing and state management.</Typography>
                    </ul>
                </Box>
            </Paper>
        </Container>
    );
};

export default About;