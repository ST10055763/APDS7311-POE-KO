import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './Dashboard.css'; // Import the CSS file

function Dashboard() {
    const navigate = useNavigate();
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    const user = {
        firstName: localStorage.getItem("name"),
        username: localStorage.getItem("name"),
        useraccountno: localStorage.getItem("accountnumber"),
    };

    useEffect(() => {
        const fetchTransactions = async () => {
            if (user.username && user.useraccountno) {
                const token = localStorage.getItem("jwt");
                try {
                    const response = await fetch(
                        `https://localhost:3001/transaction/transactions?username=${encodeURIComponent(user.username)}&useraccountno=${user.useraccountno}`,
                        {
                            method: "GET",
                            headers: {
                                "Authorization": `Bearer ${token}`,
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

    const handleLogout =() =>{
        localStorage.removeItem("name");
        localStorage.removeItem("jwt");

        navigate("/login");
    }

    return (
        <div className="dashboard-container">
            <div className="text-center">
                <h2>Welcome to KO International Banking, {user.firstName}!</h2>
                <div className="button-group">
                <button 
    onClick={() => navigate("/transaction-page")} 
    className="btn-orange"
>
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cash-coin" viewBox="0 0 16 16">
        <path fillRule="evenodd" d="M11 15a4 4 0 1 0 0-8 4 4 0 0 0 0 8m5-4a5 5 0 1 1-10 0 5 5 0 0 1 10 0"/>
        <path d="M9.438 11.944c.047.596.518 1.06 1.363 1.116v.44h.375v-.443c.875-.061 1.386-.529 1.386-1.207 0-.618-.39-.936-1.09-1.1l-.296-.07v-1.2c.376.043.614.248.671.532h.658c-.047-.575-.54-1.024-1.329-1.073V8.5h-.375v.45c-.747.073-1.255.522-1.255 1.158 0 .562.378.92 1.007 1.066l.248.061v1.272c-.384-.058-.639-.27-.696-.563h-.668zm1.36-1.354c-.369-.085-.569-.26-.569-.522 0-.294.216-.514.572-.578v1.1zm.432.746c.449.104.655.272.655.569 0 .339-.257.571-.709.614v-1.195z"/>
        <path d="M1 0a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h4.083q.088-.517.258-1H3a2 2 0 0 0-2-2V3a2 2 0 0 0 2-2h10a2 2 0 0 0 2 2v3.528c.38.34.717.728 1 1.154V1a1 1 0 0 0-1-1z"/>
        <path d="M9.998 5.083 10 5a2 2 0 1 0-3.132 1.65 6 6 0 0 1 3.13-1.567"/>
    </svg>
    Go to Transaction Page
</button>


<button
    onClick={handleLogout}
    className="btn btn-danger"
>
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-door-closed-fill" viewBox="0 0 16 16">
        <path d="M12 1a1 1 0 0 1 1 1v13h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3V2a1 1 0 0 1 1-1zm-2 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2"/>
    </svg>
    Logout
</button>

</div>

                
            </div>

            <div className="table-container mt-4">
                {loading ? (
                    <p>Loading transactions...</p>
                ) : transactions.length === 0 ? (
                    <p>No transactions found for your account.</p>
                ) : (
                    <>
                        <h3 className="transaction-history-header">Transaction History</h3>
                        <table className="table">
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
                    </>
                )}
            </div>
        </div>
    );
}

export default Dashboard;
