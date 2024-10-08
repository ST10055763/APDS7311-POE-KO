import React, { useState } from "react";
import { useNavigate } from "react-router";
import './Signup.css'; // Make sure to import the CSS file

export default function Signup() {
    const [form, setForm] = useState({
        name: "",
        accountnumber: "",
        idnumber: "",
        password: "",
    });

    const [errors, setErrors] = useState({
        accountnumber: "",
        idnumber: "",
        password: ""
    }); 
    const navigate = useNavigate();

    function updateForm(value) {
        return setForm((prev) => {
            return { ...prev, ...value };
        });
    }

    function validateForm() {
        const newErrors = {
            accountnumber: "",
            idnumber: "",
            password: ""
        };

        const accountRegex = /^\d{8,12}$/;
        if (!accountRegex.test(form.accountnumber)) {
            newErrors.accountnumber = "Account number must be between 8 and 12 digits.";
        }

        const idRegex = /^\d{13}$/;
        if (!idRegex.test(form.idnumber)) {
            newErrors.idnumber = "ID number must be exactly 13 digits.";
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(form.password)) {
            newErrors.password = "Password must meet all the requirements.";
        }

        setErrors(newErrors);
        return !newErrors.accountnumber && !newErrors.idnumber && !newErrors.password;
    }

    // Password validation function
    // function validatePassword(password) {
    //     const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    //     return regex.test(password);
    // }

    // function validateAccountNumber(accountnumber) {
    //     const regex = /^[0-9]{8,12}$/;
    //     return regex.test(accountnumber);
    // }

    // function validateIDNumber(idnumber) {
    //     const regex = /^[0-9]{13}$/;
    //     return regex.test(idnumber);
    // }

    async function onSubmit(e) {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        // Validate the password before proceeding
        // if (!validatePassword(form.password)) {
        //     setErrorMessage("Password must meet all the requirements.");
        //     return;
        // }

        // if (!validateAccountNumber(form.accountnumber)) {
        //     setErrorMessage("Account number must be 8 to 12 digits long and contain only numbers.");
        //     return;
        // }

        // if (!validateIDNumber(form.idnumber)) {
        //     setErrorMessage("ID number must be exactly 13 digits long and contain only numbers.");
        //     return;
        // }

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
        //setErrorMessage(""); // Clear error message
        navigate("/login");
    }

    return (
        <div className="signup-container">
            <div className="form-container">
                <h3 className="text-center">Register with KO International</h3>
                <p> </p>
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name (Username)</label>
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
                        <ul>
                            <li>Please ensure your account number is between 8-12 digits</li>
                            <li>NO LETTERS</li>
                        </ul>
                        {errors.accountnumber && <p className="text-danger">{errors.accountnumber}</p>}
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
                        <ul>
                        <li>Please ensure your ID number is 13 digits</li>
                        <li>NO LETTERS</li>
                        </ul>
                        {errors.idnumber && <p className="text-danger">{errors.idnumber}</p>}
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
                        {errors.password && <p className="text-danger">{errors.password}</p>}
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            value={form.password}
                            onChange={(e) => updateForm({ password: e.target.value })}
                        />
                    </div>

                    {/* Conditionally render the error message if it exists
                    {errorMessage && (
                        <div className="alert alert-danger" role="alert">
                            {errorMessage}
                        </div>
                    )} */}

<div className="hero-buttons">
    <button type="submit" className="btn btn-primary mt-3" style={{ display: "flex", alignItems: "center" }}>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-person-add"
            viewBox="0 0 16 16"
            style={{ marginRight: "8px" }} // Space between icon and text
        >
            <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0m-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0M8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4"/>
            <path d="M8.256 14a4.5 4.5 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10q.39 0 .74.025c.226-.341.496-.65.804-.918Q8.844 9.002 8 9c-5 0-6 3-6 4s1 1 1 1z"/>
        </svg>
        Sign-Up
    </button>
</div>

                </form>
            </div>
        </div>
    );
}
