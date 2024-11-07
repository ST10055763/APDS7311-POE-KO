import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './SubmitToSwift.css'; // Import the CSS file

function SubmitToSwift() {
    const navigate = useNavigate();
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    const user = {
        //firstName: localStorage.getItem("name"),
        username: localStorage.getItem("name"),
        //useraccountno: localStorage.getItem("accountnumber"),
    };

    useEffect(() => {
        // Fetch all transactions from the backend
        const fetchTransactions = async () => {
            try {
                // Log the JWT token to ensure it's correctly fetched from localStorage
                console.log("JWT token:", localStorage.getItem("jwt"));
    
                // Set up headers with authorization
                const headers = {
                    "Authorization": `Bearer ${localStorage.getItem("jwt")}`,
                    "Content-Type": "application/json"
                };
    
                const response = await fetch('https://localhost:3001/transaction/getapprovedtransactions', {
                    method: "GET", // Assuming this is a GET request
                    headers: headers, // Add authorization headers
                });
    
                if (response.ok) {
                    const data = await response.json();
                    console.log("Fetched transactions:", data); // Log the fetched data to the console
                    setTransactions(data); // Set the transactions state
                } else {
                    console.error("Failed to fetch transactions");
                }
            } catch (error) {
                console.error("Error fetching transactions", error);
            } finally {
                setLoading(false); // Ensure loading is set to false in all cases
            }
        };
    
        fetchTransactions();
    }, []);
    
    const handleLogout =() =>{
        localStorage.removeItem("name");
        localStorage.removeItem("jwt");

        navigate("/login");
    }

    return (
        <div className="dashboard-container">
            <div className="text-center">
                <h2>Welcome back Employee, {user.firstName} of KO International Banking!</h2>
                <h3>Let's Submit All Approvals to SWIFT for Processing!</h3>
                <div className="button-group">
                <button 
    onClick={() => navigate("/employee-dash")} 
    className="btn-orange"
>
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-house-lock" viewBox="0 0 16 16">
  <path d="M7.293 1.5a1 1 0 0 1 1.414 0L11 3.793V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v3.293l2.354 2.353a.5.5 0 0 1-.708.708L8 2.207l-5 5V13.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 2 13.5V8.207l-.646.647a.5.5 0 1 1-.708-.708z"/>
  <path d="M10 13a1 1 0 0 1 1-1v-1a2 2 0 0 1 4 0v1a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1zm3-3a1 1 0 0 0-1 1v1h2v-1a1 1 0 0 0-1-1"/>
</svg>
    Return to Dashboard
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
                    <p>No approved transactions waiting to send to SWIFT found</p>
                ) : (
                    <>
                        <h3 className="transaction-history-header">Approved Transactions</h3>
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
                                    <th>Request Status</th>
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
                                        <td>{transaction.requeststatus}</td>
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
export default SubmitToSwift;