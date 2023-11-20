const express = require("express");
const { connectToMongoDB } = require("./connection");
const urlRoute = require("./routes/url");

const app = express();
const PORT = 8001;

connectToMongoDB("mongodb://127.0.0.1:27017/short-url").then(() =>
    console.log("MONGO DB CONNECTED")
);

app.use(express.json());

app.use("/url", urlRoute);

app.listen(PORT, () => console.log(`Server started at ${PORT}`));
