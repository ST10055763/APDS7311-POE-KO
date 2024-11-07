import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import TransactionPage from './components/TransactionPage.js';
import ThankYou from './components/ThankYou';
import EmployeeDash from './components/EmployeeDash.js'
import SubmitToSwift from './components/SubmitToSwift.js';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/transaction-page" element={<TransactionPage/>}/>
        <Route path="/thank-you" element={<ThankYou/>}/>
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/employee-dash" element={<EmployeeDash/>}/>
        <Route path="submit-to-swift" element={<SubmitToSwift/>}/>
      </Routes>
    </Router>
  );
}

export default App;
