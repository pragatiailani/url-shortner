const express = require("express");
const path = require("path");
const { connectToMongoDB } = require("./connection");
const urlRoute = require("./routes/url");
const staticRoutes = require("./routes/staticRoutes");

const app = express();
const PORT = 8001;

connectToMongoDB("mongodb://127.0.0.1:27017/short-url").then(() =>
    console.log("MONGO DB CONNECTED")
);

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/url", urlRoute);

app.use("/", staticRoutes);

app.listen(PORT, () => console.log(`Server started at ${PORT}`));
