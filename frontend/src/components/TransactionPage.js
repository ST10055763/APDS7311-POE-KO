import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './TransactionPage.css'; // Import your CSS file

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

    const [errors, setErrors] = useState({});
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

    function generateSWIFTCode() {
        return Math.floor(1000000000 + Math.random() * 9000000000).toString();
    }
    useEffect(() => {
        const storedName = localStorage.getItem("name");
        const storedAccountNumber = localStorage.getItem("accountnumber");
        const swiftCode = generateSWIFTCode();

        if (storedName && storedAccountNumber) {
            setForm((prev) => ({
                ...prev,
                username: storedName,
                useraccountno: storedAccountNumber,
                swiftcode: swiftCode
            }));
        }
    }, []); 

  

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

      //added validation for payee acc num
      function validatePayeeAccountNumber(accountNumber) {
        return /^\d{8,12}$/.test(accountNumber);
    }

    // Handle form submission to create a new transaction
    async function onSubmit(e) {
        e.preventDefault();

        const newErrors = {};

        if (!form.amountpay) newErrors.amountpay = "Amount to Pay is required";
        if (!form.paymentcurrency) newErrors.paymentcurrency = "Payment Currency is required";
        if (!form.payeename) newErrors.payeename = "Payee Name is required";
        if (!validatePayeeAccountNumber(form.payeeaccountno)) {
            setErrors("Payee account number must be between 8 and 12 digits.");
            return;
        }

        setErrors(newErrors); 

        if (Object.keys(newErrors).length > 0) return;

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
                swiftcode: generateSWIFTCode()
            });

            navigate("/thank-you");
            
        } else {
            console.error("Transaction upload failed");
        }
    }

    return (
        <div className="transaction-container">
            <div className="form-container">
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
                       {errors.amountpay && <p className="error-message">{String(errors.amountpay)}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="paymentcurrency">Payment Currency (Select from Dropdown)</label>
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
                        {errors.paymentcurrency && <p className="error-message">{String(errors.paymentcurrency)}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="paymentprovider">Payment Provider</label>
                        <input
                            type="text"
                            className="form-control"
                            id="paymentprovider"
                            value={"SWIFT"}
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
                         {errors.payeename && <p className="error-message">{String(errors.payeename)}</p>}
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
                          {errors.payeeaccountno && <p className="error-message">{String(errors.payeeaccountno)}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="swiftcode">SWIFT Code</label>
                        <input
                            type="text"
                            className="form-control"
                            id="swiftcode"
                            value={form.swiftcode}
                            disabled
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="submit"
                            value="Create Transaction"
                            className="btn btn-primary"
                            //disabled={Object.keys(errors).length > 0}
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}
