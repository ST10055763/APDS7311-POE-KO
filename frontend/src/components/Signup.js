import React, { useState } from "react";
import { useNavigate } from "react-router";

export default function Signup() {
    const [form, setForm] = useState({
        name: "",
        accountnumber: "",
        idnumber: "",
        password: ""
    });

    const [errorMessage, setErrorMessage] = useState(""); // Error message for password validation
    const navigate = useNavigate();

    function updateForm(value) {
        return setForm((prev) => {
            return { ...prev, ...value };
        });
    }

    // Password validation function
    function validatePassword(password) {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return regex.test(password);
    }

    async function onSubmit(e) {
        e.preventDefault();

        // Validate the password before proceeding
        if (!validatePassword(form.password)) {
            setErrorMessage("Password must meet all the requirements.");
            return;
        }

        const newPerson = { ...form };

        await fetch("https://localhost:3001/user/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newPerson),
        })
            .catch((error) => {
                window.alert(error);
                return;
            });

        // Clear form and error message
        setForm({ name: "", accountnumber: "", idnumber: "", password: "" });
        setErrorMessage(""); // Clear error message
        navigate("/login");
    }

    return (
        <div className="container mt-5">
            <h3 className="text-center">Register</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
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
                    <label htmlFor="idnumber">ID Number</label>
                    <input
                        type="text"
                        className="form-control"
                        id="idnumber"
                        value={form.idnumber}
                        onChange={(e) => updateForm({ idnumber: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">
                        Password:
                        <ul>
                            <li>At least 8 letters long</li>
                            <li>At least one uppercase</li>
                            <li>At least one lowercase</li>
                            <li>At least one digit</li>
                            <li>At least one special character</li>
                        </ul>
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={form.password}
                        onChange={(e) => updateForm({ password: e.target.value })}
                    />
                </div>

               
                {errorMessage && (
                    <div className="alert alert-danger" role="alert">
                        {errorMessage}
                    </div>
                )}

                <div className="form-group text-center">
                    <input
                        type="submit"
                        value="Create Person"
                        className="btn btn-primary mt-3"
                    />
                </div>
            </form>
        </div>
    );
}
