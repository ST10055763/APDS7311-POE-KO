import React, { useState, useEffect } from "react";

function TransactionConfirmation() {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        fetch("https://localhost:3001/transaction")
            .then((response) => response.json())
            .then((data) => setTransactions(data))
            .catch((error) => console.error("Error fetching transactions:", error));
    }, []);

    return (
        <div>
            <h2>Transaction List</h2>
            <table>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>User Account No</th>
                        <th>Amount</th>
                        <th>Currency</th>
                        <th>Provider</th>
                        <th>Payee Name</th>
                        <th>Payee Account No</th>
                        <th>SWIFT Code</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((transaction, index) => (
                        <tr key={index}>
                            <td>{transaction.username}</td>
                            <td>{transaction.useraccountno}</td>
                            <td>{transaction.amountpay}</td>
                            <td>{transaction.paymentcurrency}</td>
                            <td>{transaction.paymentprovider}</td>
                            <td>{transaction.payeename}</td>
                            <td>{transaction.payeeaccountno}</td>
                            <td>{transaction.swiftcode}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TransactionConfirmation;
