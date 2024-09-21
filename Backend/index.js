// app.js
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import userRoute from "./route/user.route.js";
import bookRoute from "./route/book.route.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;
const URI = process.env.MongoDBURI;

app.use(cors());
app.use(express.json());

try {
    await mongoose.connect(URI);
    console.log("Connected to MongoDB");
} catch (error) {
    console.log("Error: ", error);
}

app.use("/book", bookRoute);
app.use("/user", userRoute);

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});