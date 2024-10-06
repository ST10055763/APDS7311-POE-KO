import React from "react";
import { useNavigate } from "react-router-dom";
import TransactionPage from "./TransactionPage.js";

function Dashboard() {
    const navigate = useNavigate();

    // Assuming you have user information stored in localStorage
    const user = {
        firstName: localStorage.getItem("name"), // Retrieve first name from local storage
      
    };

    return (
        <div>
            <h2>Welcome, {user.name}!</h2>
            <button onClick={() => navigate("/transaction-page")} className="btn btn-primary">
                Go to Transaction Page
            </button>
        </div>
    );
}

export default Dashboard;
