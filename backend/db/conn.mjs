import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const connectionString = process.env.ATLAS_URI || "";

console.log(connectionString);

// Configure MongoClient options
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  tlsAllowInvalidCertificates: true, // Option to bypass certain SSL/TLS errors
};

const client = new MongoClient(connectionString, options);

let conn;
let db;
try {
  conn = await client.connect();
  console.log("MongoDB is connected :)");
  db = client.db("users");
} catch (e) {
  console.error("Failed to connect to MongoDB:", e);
}

// Export the database connection
export default db;
