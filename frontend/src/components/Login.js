import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
            const { token, name } = data;
            console.log(name + " " + token);

            localStorage.setItem("jwt", token);
            localStorage.setItem("name", name);
            localStorage.setItem("accountnumber", form.accountnumber);

            // Clear the form
            setForm({ name: "", accountnumber: "", password: "" });

            // Navigate to dashboard on successful login
            navigate("/dashboard");
        } else { // HTTP 401 or other error
            setError(data.message || "Invalid credentials"); // Display error message
        }
    }

    return (
        <div className="container mt-5">
            <h3 className="text-center">Login</h3>
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
                <div className="form-group text-center">
                    <input
                        type="submit"
                        value="Login"
                        className="btn btn-primary mt-3"
                    />
                </div>
            </form>
        </div>
    );
}
