import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div>
            <h1>Welcome to the App</h1>
            <button onClick={() => navigate('/signup')}>Sign Up</button>
            <button onClick={() => navigate('/login')}>Log In</button>
        </div>
    );
};

export default Home;
