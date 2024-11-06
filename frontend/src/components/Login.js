import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Login.css'; // Import your CSS file

export default function Login() {
    const [form, setForm] = useState({
        name: "",
        accountnumber: "",
        password: "",
    });
    const [error, setError] = useState(""); // State for error message
    const navigate = useNavigate();

    function updateForm(value) {
        return setForm((prev) => {
            return { ...prev, ...value };
        });
    }

    async function onSubmit(e) {
        e.preventDefault();

        const loginData = { ...form };

        const response = await fetch("https://localhost:3001/user/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(loginData),
        });

        const data = await response.json();

        // Check if login was successful
        if (response.ok) { // HTTP 200
            const { code,token, name } = data;
            console.log(name + " " + token);

            localStorage.setItem("jwt", token);
            localStorage.setItem("name", name);
            localStorage.setItem("accountnumber", form.accountnumber);

            // Clear the form
            setForm({ name: "", accountnumber: "", password: "" });
            if (code === 1) {
                // Employee login successful
                navigate("/employee-dash")
            } else if (code === 2) {
                // Customer login successful
                navigate("/dashboard");
            }
            // Navigate to dashboard on successful login
            //navigate("/dashboard");
        } else { // HTTP 401 or other error
            setError(data.message || "Invalid credentials"); // Display error message
        }
    }

    return (
        <div className="login-container">
            <div className="form-container">
                <h3>Login with KO International</h3>
                <p> </p>
                {error && <div className="alert alert-danger">{error}</div>} {/* Error message display */}
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Username</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            value={form.name}
                            onChange={(e) => updateForm({ name: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="accountnumber">Account Number</label>
                        <input
                            type="text"
                            className="form-control"
                            id="accountnumber"
                            value={form.accountnumber}
                            onChange={(e) => updateForm({ accountnumber: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password" // Use 'password' input type for better security
                            className="form-control"
                            id="password"
                            value={form.password}
                            onChange={(e) => updateForm({ password: e.target.value })}
                        />
                    </div>
                    <div className="hero-buttons">
                    <button
    type="submit"
    className="btn btn-primary mt-3"
    style={{ display: "flex", alignItems: "center" }}
>
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className="bi bi-person-bounding-box"
        viewBox="0 0 16 16"
        style={{ marginRight: "8px" }} // Space between icon and text
    >
        <path d="M1.5 1a.5.5 0 0 0-.5.5v3a.5.5 0 0 1-1 0v-3A1.5 1.5 0 0 1 1.5 0h3a.5.5 0 0 1 0 1zM11 .5a.5.5 0 0 1 .5-.5h3A1.5 1.5 0 0 1 16 1.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 1-.5-.5M.5 11a.5.5 0 0 1 .5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 1 0 1h-3A1.5 1.5 0 0 1 0 14.5v-3a.5.5 0 0 1 .5-.5m15 0a.5.5 0 0 1 .5.5v3a1.5 1.5 0 0 1-1.5 1.5h-3a.5.5 0 0 1 0-1h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 1 .5-.5" />
        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
    </svg>
    Login
</button>
</div>
                </form>
            </div>
        </div>
    );
}
