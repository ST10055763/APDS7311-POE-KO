import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="container text-center mt-5">
            <h1 className="display-4">Welcome to the KO International Money Trade Zone!</h1>
            <div className="mt-4">
                <button 
                    className="btn btn-primary btn-lg mx-2" 
                    onClick={() => navigate('/signup')}
                >
                    Sign Up
                </button>
                <button 
                    className="btn btn-secondary btn-lg mx-2" 
                    onClick={() => navigate('/login')}
                >
                    Log In
                </button>
            </div>
        </div>
    );
};

export default Home;
