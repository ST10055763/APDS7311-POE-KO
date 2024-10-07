import React from "react";
import { useNavigate } from "react-router-dom";
import './ThankYou.css'; // Link to the new CSS file

function ThankYou() {
    const navigate = useNavigate();
    return (
        <div className="thankyou-container">
            <div className="thankyou-box">
                <h2>Thank you! Your transaction has been received.</h2>
                <p>Please wait for approval.</p>
                <button 
                    onClick={() => navigate("/dashboard")} 
                    className="btn-primary"
                >
                    Go to Dashboard
                </button>
            </div>
        </div>
    );
}

export default ThankYou;
