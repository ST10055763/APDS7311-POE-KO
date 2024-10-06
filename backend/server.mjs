import https from "https";
import fs from "fs";
import express from "express";
import cors from "cors";
import users from "./routes/user.mjs";
import transactions from "./routes/transaction.mjs";
import authenticateToken from "./middleware/auth.js"; // Import the JWT authentication middleware

const PORT = 3001;
const app = express();

const options = {
    key: fs.readFileSync('keys/privatekey.pem'),
    cert: fs.readFileSync('keys/certificate.pem')
};

// Configure CORS to allow only frontend origin
app.use(cors({
    origin: 'http://localhost:3000', // Allow only the frontend origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
    credentials: true
}));

app.use(express.json());
app.options('*', cors());

// Removed duplicate CORS headers, using cors() middleware instead

// User routes (Sign-up, login, etc. - no authentication required)
app.use("/user", users);

// Transaction routes (Protected - authentication required)
app.use("/transaction", authenticateToken, transactions); // Protect the transaction route

// HTTPS server creation
let server = https.createServer(options, app);
console.log(`Server running on port ${PORT}`);
server.listen(PORT);
