import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
    const navigate = useNavigate();
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    // Assuming you have user information stored in localStorage
    const user = {
        firstName: localStorage.getItem("name"),
        username: localStorage.getItem("name"), // Adjusted if username is the same as name
        useraccountno: localStorage.getItem("accountnumber"),
    };

    useEffect(() => {
        const fetchTransactions = async () => {
            if (user.username && user.useraccountno) {
                const token = localStorage.getItem("jwt"); // Get the JWT from localStorage
                try {
                    const response = await fetch(
                        `https://localhost:3001/transaction/transactions?username=${encodeURIComponent(user.username)}&useraccountno=${user.useraccountno}`,
                        {
                            method: "GET",
                            headers: {
                                "Authorization": `Bearer ${token}`, // Include Bearer token in the headers
                            },
                        }
                    );

                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }

                    const data = await response.json();
                    console.log("Fetched transactions:", data);
                    setTransactions(data);
                } catch (error) {
                    console.error("Error fetching transactions:", error);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchTransactions();
    }, [user.username, user.useraccountno]);

    return (
        <div className="container mt-5">
            <div className="text-center">
                <h2>Welcome, {user.firstName}!</h2>
                <button 
                    onClick={() => navigate("/transaction-page")} 
                    className="btn btn-primary mt-3"
                >
                    Go to Transaction Page
                </button>
            </div>

            {loading ? (
                <p>Loading transactions...</p>
            ) : transactions.length === 0 ? (
                <p>No transactions found for your account.</p>
            ) : (
                <table className="table mt-4">
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Account Number</th>
                            <th>Amount Pay</th>
                            <th>Currency</th>
                            <th>Provider</th>
                            <th>Payee Name</th>
                            <th>Payee Account No</th>
                            <th>SWIFT Code</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map(transaction => (
                            <tr key={transaction._id}>
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
            )}
        </div>
    );
}

export default Dashboard;
