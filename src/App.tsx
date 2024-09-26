import React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route
} from 'react-router-dom';

import NavBar from './components/NavBar';
import About from "./features/About/About";
import GitHubRepos from "./features/GitHubRepos/GitHubRepos";


function App() {
   return (
        <Router>
            <NavBar />
            <Routes>
                <Route path="/" element={<GitHubRepos />} />
                <Route path="/about" element={<About />} />
            </Routes>
        </Router>
    );
}

export default App;
