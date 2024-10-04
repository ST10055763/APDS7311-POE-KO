import https from "https";
import fs from "fs";
import express from "express";
import cors from "cors";
import users from "./routes/user.mjs";
import transactions from "./routes/transaction.mjs"

const PORT = 3001;
const app = express();

const options = {
    key: fs.readFileSync('keys/privatekey.pem'),
    cert: fs.readFileSync('keys/certificate.pem')
}

app.use(cors());
app.use(express.json());

app.use((reg,res,next) =>
{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
})

app.use("/user", users);
app.route("/user", users);

app.use("/transaction", transactions);
app.route("/transaction", transactions);

let server = https.createServer(options,app)
console.log(PORT);
server.listen(PORT);