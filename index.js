const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const { connectToMongoDB } = require("./connection");
const { checkForAuthentication, restrictTo } = require("./middlewares/auth");

const urlRoute = require("./routes/url");
const userRoute = require("./routes/user");
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
app.use(cookieParser());
app.use(checkForAuthentication);

app.use("/url", restrictTo(["NORMAL"]), urlRoute);
app.use("/user", userRoute);
app.use("/", staticRoutes);

app.listen(PORT, () => console.log(`Server started at ${PORT}`));
