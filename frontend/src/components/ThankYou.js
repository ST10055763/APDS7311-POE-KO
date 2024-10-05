import React from "react";
import { useNavigate } from "react-router-dom";

function ThankYou() {
    const navigate = useNavigate();

    return (
        <div>
            <h2>Thank you! Your transaction has been received.</h2>
            <p>Please wait for approval.</p>
            <button onClick={() => navigate("/dashboard")} className="btn btn-primary">
                Go to Dashboard
            </button>
        </div>
    );
}

export default ThankYou;
