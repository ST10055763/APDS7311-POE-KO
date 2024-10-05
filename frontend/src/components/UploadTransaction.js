import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext'; // Adjust the import path as needed

const UploadTransaction = () => {
    const { user, token } = useAuth(); // Assume the token is provided from AuthContext
    const [amountPay, setAmountPay] = useState('');
    const [paymentCurrency, setPaymentCurrency] = useState('');
    const [payeeName, setPayeeName] = useState('');
    const [payeeAccountNo, setPayeeAccountNo] = useState('');
    const [swiftCode, setSwiftCode] = useState('');
    const [usernameInput, setUsernameInput] = useState(''); // For re-entering the username
    const [error, setError] = useState(null); // State to hold error messages

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if user is logged in
        if (!user || !token) {
            setError("User is not logged in or token is missing.");
            console.error("User or token is missing.");
            return; // Exit if the user is not logged in
        }

        // Verify re-entered username
        if (usernameInput !== user.username) {
            setError("Username does not match.");
            console.error("Username does not match.");
            return; // Exit if the usernames don't match
        }

        const data = {
            username: user.username,
            useraccountno: user.accountNo,
            amountpay: amountPay,
            paymentcurrency: paymentCurrency,
            payeename: payeeName,
            payeeaccountno: payeeAccountNo,
            swiftcode: swiftCode,
        };

        try {
            const response = await fetch('YOUR_API_ENDPOINT_HERE', { // Replace with your API endpoint
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Use the token here
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Failed to upload transaction');
            }

            const result = await response.json();
            console.log('Transaction uploaded successfully:', result);

        } catch (error) {
            setError(error.message); // Set the error message
            console.error('Error uploading transaction:', error);
        }
    };

    return (
        <div>
            <h2>Upload Transaction</h2>
            {error && <p className="error">{error}</p>} {/* Display error message */}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Re-enter Username:</label>
                    <input
                        type="text"
                        value={usernameInput}
                        onChange={(e) => setUsernameInput(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Amount to Pay:</label>
                    <input
                        type="number"
                        value={amountPay}
                        onChange={(e) => setAmountPay(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Payment Currency:</label>
                    <input
                        type="text"
                        value={paymentCurrency}
                        onChange={(e) => setPaymentCurrency(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Payee Name:</label>
                    <input
                        type="text"
                        value={payeeName}
                        onChange={(e) => setPayeeName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Payee Account No:</label>
                    <input
                        type="text"
                        value={payeeAccountNo}
                        onChange={(e) => setPayeeAccountNo(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>SWIFT Code:</label>
                    <input
                        type="text"
                        value={swiftCode}
                        onChange={(e) => setSwiftCode(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Submit Transaction</button>
            </form>
        </div>
    );
};

export default UploadTransaction;
