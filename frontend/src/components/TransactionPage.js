import React, { useEffect, useState } from "react";

export default function TransactionPage() {
    const [form, setForm] = useState({
        username: "",
        useraccountno: "",
        amountpay: "",
        paymentcurrency: "",
        paymentprovider: "",
        payeename: "",
        payeeaccountno: "",
        swiftcode: ""
    });
    
    const [transactions, setTransactions] = useState([]);

    // Update form values
    function updateForm(value) {
        setForm((prev) => ({
            ...prev,
            ...value,
        }));
    }

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
                username: "",
                useraccountno: "",
                amountpay: "",
                paymentcurrency: "",
                paymentprovider: "",
                payeename: "",
                payeeaccountno: "",
                swiftcode: ""
            });
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
                    <input
                        type="text"
                        className="form-control"
                        id="paymentcurrency"
                        value={form.paymentcurrency}
                        onChange={(e) => updateForm({ paymentcurrency: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="paymentprovider">Payment Provider</label>
                    <input
                        type="text"
                        className="form-control"
                        id="paymentprovider"
                        value={form.paymentprovider}
                        onChange={(e) => updateForm({ paymentprovider: e.target.value })}
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

            <h3>Transaction List</h3>
            <ul>
                {transactions.map((transaction) => (
                    <li key={transaction._id}>
                        {transaction.username} - {transaction.amountpay} {transaction.paymentcurrency}
                    </li>
                ))}
            </ul>
        </div>
    );
}
