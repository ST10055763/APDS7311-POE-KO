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
        swiftcode: req.body.swiftcode
    };
    let collection = await db.collection("transactions");
    let result = await collection.insertOne(newDocument);
    res.send(result).status(204);
});

export default router;