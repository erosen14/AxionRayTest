import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const NavBar: React.FC = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Box sx={{ flexGrow: 1 }}>
                    <Button color="inherit" component={RouterLink} to="/">
                        Home
                    </Button>
                    <Button color="inherit" component={RouterLink} to="/about">
                        About
                    </Button>
                </Box>
                <Typography variant="h6" component="div" >
                    GitHub Repository API
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;
