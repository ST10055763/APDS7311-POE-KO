import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";
import checkauth from "../check-auth.mjs";

const router = express.Router();

// get all the records (testing)
router.get("/", async (req, res ) => {
    let collection = await db.collection("transactions");
    let results = await collection.find({}).toArray();
    res.send(results).status(200);
})

// create a new record (user specific upload)
router.post("/upload", checkauth, async (req, res) => {
    let newDocument = {
        username: req.body.username,
        useraccountno: req.body.useraccountno,
        amountpay: req.body.amountpay,
        paymentcurrency: req.body.paymentcurrency,
        paymentprovider: req.body.paymentprovider,
        payeename: req.body.payeename,
        payeeaccountno: req.body.payeeaccountno,
        swiftcode: req.body.swiftcode,
        requeststatus: "Pending"
    };
    let collection = await db.collection("transactions");
    let result = await collection.insertOne(newDocument);
    res.send(result).status(204);
});

// Get transactions by username and user account number
router.get("/transactions", async (req, res) => {
    try {
        const { username, useraccountno } = req.query; // Expecting these as query parameters

        // Validate if the required fields are provided
        if (!username || !useraccountno) {
            return res.status(400).send("Username and Account Number are required.");
        }

        // Access your MongoDB collection (e.g., 'transactions')
        let collection = await db.collection("transactions");

        // Create the query to match both username and account number
        let query = {
            username: username,
            useraccountno: useraccountno
        };

        // Find matching transactions
        let result = await collection.find(query).toArray(); // Assuming you want all matching records

        // If no records are found
        if (result.length === 0) {
            return res.status(404).send("No matching transactions found.");
        }

        // Send the matching transactions as the response
        res.status(200).send(result);
    } catch (error) {
        console.error("Error fetching transactions:", error);
        res.status(500).send("Internal Server Error");
    }
});

// endpoint for employeedash (pending transactions only)
router.get("/getpendingtransactions", async(req, res) => {
    try{
        // Access your MongoDB collection (e.g., 'transactions')
        let collection = await db.collection("transactions");

        // Create the query to find pending transactions
        let query = {
            requeststatus: "Pending",
        };

        // Find matching transactions
        let result = await collection.find(query).toArray(); // Assuming you want all matching records

        // If no records are found
        if (result.length === 0) {
            return res.status(404).send("No matching transactions found.");
        }

        // Send the matching transactions as the response
        res.status(200).send(result);

    } catch (error) {
        console.error("Error fetching transactions:", error);
        res.status(500).send("Internal Server Error");
    }
});

// endpoint for employeeswift (approved transactions only)
router.get("/getapprovedtransactions", async(req, res) => {
    try{
        // Access your MongoDB collection (e.g., 'transactions')
        let collection = await db.collection("transactions");

        // Create the query to find pending transactions
        let query = {
            requeststatus: "Approved (Verified)",
        };

        // Find matching transactions
        let result = await collection.find(query).toArray(); // Assuming you want all matching records

        // If no records are found
        if (result.length === 0) {
            return res.status(404).send("No matching transactions found.");
        }

        // Send the matching transactions as the response
        res.status(200).send(result);

    } catch (error) {
        console.error("Error fetching transactions:", error);
        res.status(500).send("Internal Server Error");
    }
});

// endpoint for setting a trabsaction to approved
router.patch("/updatetoapproved/:id", async (req, res) => {
    const query = {_id: new ObjectId(req.params.id)};
    const updates = {
        $set: {
            requeststatus: "Approved (Verified)"
        }
    };

    let collection = await db.collection("transactions");
    let result = await collection.updateOne(query, updates);

    res.send(result).status(200);
})

// endpoint for setting a transaction to Rejected
router.patch("/updatetorejected/:id", async (req, res) => {
    const query = {_id: new ObjectId(req.params.id)};
    const updates = {
        $set: {
            requeststatus: "Rejected"
        }
    };

    let collection = await db.collection("transactions");
    let result = await collection.updateOne(query, updates);

    res.send(result).status(200);
})

// endpoint for sending a transaction to SWIFT for processing
router.patch("/updatetosubmittedtoswift/:id", async (req, res) => {
    const query = {_id: new ObjectId(req.params.id)};
    const updates = {
        $set: {
            requeststatus: "Forwarded to SWIFT for Payment"
        }
    };

    let collection = await db.collection("transactions");
    let result = await collection.updateOne(query, updates);

    res.send(result).status(200);
})


export default router;