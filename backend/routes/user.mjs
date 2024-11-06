import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ExpressBrute from "express-brute";

const router = express.Router();

var store = new ExpressBrute.MemoryStore();
var bruteforce = new ExpressBrute(store);

// sign-up
router.post("/signup", async (req, res) => {

    // Generate a custom salt
        const salt = await bcrypt.genSalt(10);

    // Hash the password using the custom salt
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    let newDocument = {
        usertype: "customer",
        name: req.body.name,
        idnumber: req.body.idnumber,
        accountnumber: req.body.accountnumber,
        password: (await hashedPassword).toString()
    };

    let collection = await db.collection("users");
    let result = await collection.insertOne(newDocument);

    console.log("Generated salt:", salt); // Optional: Log the salt for debugging
    console.log("Hashed password:", hashedPassword);

    res.send(result).status(204);
});

// add employee
router.post("/addemployee", async (req, res) => {

    // Generate a custom salt
        const salt = await bcrypt.genSalt(10);

    // Hash the password using the custom salt
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    let newDocument = {
        usertype: "employee",
        name: req.body.name,
        idnumber: req.body.idnumber,
        accountnumber: req.body.accountnumber,
        password: (await hashedPassword).toString()
    };

    let collection = await db.collection("users");
    let result = await collection.insertOne(newDocument);

    console.log("Generated salt:", salt); // Optional: Log the salt for debugging
    console.log("Hashed password:", hashedPassword);
    
    res.send(result).status(204);
});

// login
router.post("/login", bruteforce.prevent, async (req, res) => {
    const { name, accountnumber, password } = req.body;
    console.log(name + " " + accountnumber + " " + password);

    try {
        const collection = await db.collection("users");
        const user = await collection.findOne({ name, accountnumber });

        if (!user) {
            return res.status(401).json({ message: "Authentication failed" });
        }

        // Compare the provided password with the hashed password in the database
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: "Authentication failed" });
        } else {
            // Authentication successful
            const token = jwt.sign(
                { name: req.body.name, accountnumber: req.body.accountnumber, usertype: user.usertype },
                "this_secret_should_be_longer_than_it_is",
                { expiresIn: "1h" }
            );

            // Check user type and return appropriate status codes
            if (user.usertype === "customer") {
                res.status(200).json({
                    code: 2, // Code for successful customer login
                    message: "Customer login successful",
                    token: token,
                    name: req.body.name
                });
            } else if (user.usertype === "employee") {
                res.status(200).json({
                    code: 1, // Code for successful employee login
                    message: "Employee login successful",
                    token: token,
                    name: req.body.name
                });
            }
            console.log("Your new token is", token);
        }
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Login failed" });
    }
});


export default router