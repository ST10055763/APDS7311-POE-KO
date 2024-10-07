import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// const name = localStorage.getItem("name");
// const accnum = localStorage.getItem("accountnumber");

// Assuming you have user information stored in localStorage
// const user = {
//     name: localStorage.getItem("name"), // Retrieve first name from local storage
//     accnum: localStorage.getItem("accountnumber")
// };

export default function TransactionPage() {
    const [form, setForm] = useState({
        username: "",
        useraccountno: "",
        amountpay: "",
        paymentcurrency: "",
        paymentprovider: "SWIFT",
        payeename: "",
        payeeaccountno: "",
        swiftcode: ""
    });

    const navigate = useNavigate();

    const currencyOptions = [
        { code: 'USD', name: 'United States Dollar' },
        { code: 'EUR', name: 'Euro' },
        { code: 'GBP', name: 'British Pound' },
        { code: 'JPY', name: 'Japanese Yen' },
        { code: 'AUD', name: 'Australian Dollar' },
        { code: 'ZAR', name: 'South African Rand' },
    ];
    
    const [transactions, setTransactions] = useState([]);

    // Update form values
    function updateForm(value) {
        setForm((prev) => ({
            ...prev,
            ...value,
        }));
    }

    // Fetch user details from localStorage when the component mounts
    useEffect(() => {
        const storedName = localStorage.getItem("name");
        const storedAccountNumber = localStorage.getItem("accountnumber");

        if (storedName && storedAccountNumber) {
            setForm((prev) => ({
                ...prev,
                username: storedName,
                useraccountno: storedAccountNumber,
            }));
        }
    }, []); // Empty dependency array ensures this runs once when the component mounts

    // Fetch existing transactions
    useEffect(() => {
        const fetchTransactions = async () => {
            const response = await fetch("https://localhost:3001/transaction", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("jwt")}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setTransactions(data);
            } else {
                console.error("Failed to fetch transactions");
            }
        };

        fetchTransactions();
    }, []);

    // Handle form submission to create a new transaction
    async function onSubmit(e) {
        e.preventDefault();

        const response = await fetch("https://localhost:3001/transaction/upload", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("jwt")}`, // Include the token
            },
            body: JSON.stringify(form),
        });

        if (response.ok) {
            console.log("Transaction successfully uploaded");
            // Optionally refresh the transaction list after successful submission
            const newTransaction = await response.json();
            setTransactions((prev) => [...prev, newTransaction]);
            setForm({
                username: localStorage.getItem("name"), // Ensure it uses the current user
                useraccountno: localStorage.getItem("accountnumber"),
                amountpay: "",
                paymentcurrency: "",
                paymentprovider: "SWIFT",
                payeename: "",
                payeeaccountno: "",
                swiftcode: ""
            });

            navigate("/thank-you");
            
        } else {
            console.error("Transaction upload failed");
        }
    }

    return (
        <div>
            <h3>Create Transaction</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        className="form-control"
                        id="username"
                        value={form.username}
                        onChange={(e) => updateForm({ username: e.target.value })}
                        disabled
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="useraccountno">User Account Number</label>
                    <input
                        type="text"
                        className="form-control"
                        id="useraccountno"
                        value={form.useraccountno}
                        onChange={(e) => updateForm({ useraccountno: e.target.value })}
                        disabled
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="amountpay">Amount to Pay</label>
                    <input
                        type="number"
                        className="form-control"
                        id="amountpay"
                        value={form.amountpay}
                        onChange={(e) => updateForm({ amountpay: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="paymentcurrency">Payment Currency</label>
                    <select
                        id="paymentcurrency"
                        className="form-control"
                        value={form.paymentcurrency}
                        onChange={(e) => updateForm({ paymentcurrency: e.target.value })}
                    >
                        {currencyOptions.map((currency) => (
                            <option key={currency.code} value={currency.code}>
                                {currency.name} ({currency.code})
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="paymentprovider">Payment Provider</label>
                    <input
                        type="text"
                        className="form-control"
                        id="paymentprovider"
                        value={"SWIFT"}
                        onChange={(e) => updateForm({ paymentprovider: e.target.value })}
                        disabled
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="payeename">Payee Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="payeename"
                        value={form.payeename}
                        onChange={(e) => updateForm({ payeename: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="payeeaccountno">Payee Account Number</label>
                    <input
                        type="text"
                        className="form-control"
                        id="payeeaccountno"
                        value={form.payeeaccountno}
                        onChange={(e) => updateForm({ payeeaccountno: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="swiftcode">SWIFT Code</label>
                    <input
                        type="text"
                        className="form-control"
                        id="swiftcode"
                        value={form.swiftcode}
                        onChange={(e) => updateForm({ swiftcode: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="submit"
                        value="Create Transaction"
                        className="btn btn-primary"
                    />
                </div>
            </form>

          
        </div>
    );
}
