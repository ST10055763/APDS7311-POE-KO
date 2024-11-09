import https from "https";
import fs from "fs";
import express from "express";
import rateLimit from "express-rate-limit"; // Import express-rate-limit
import cors from "cors";
import helmet from "helmet"; // Import helmet for security
import users from "./routes/user.mjs";
import transactions from "./routes/transaction.mjs";
import authenticateToken from "./middleware/auth.mjs"; // Import the JWT authentication middleware

const PORT = 3001;
const app = express();

const options = {
    key: fs.readFileSync('keys/privatekey.pem'),
    cert: fs.readFileSync('keys/certificate.pem')
};

// Set up rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: "Too many requests from this IP, please try again later."
});

// Apply rate limiting to all requests
app.use(limiter);

// Use helmet to enhance security with HTTP headers
app.use(helmet());

// Configure CORS to allow only frontend origin
app.use(cors({
    origin: 'https://localhost:3000',  // Frontend URL
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'PUT'],  // Allow PATCH method
    allowedHeaders: ['Content-Type', 'Authorization'],  // Headers needed for requests
    credentials: true  // Allow cookies or other credentials
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
