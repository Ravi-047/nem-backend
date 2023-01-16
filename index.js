const express = require("express");
const cors = require("cors");
const { connection } = require("./config/db.config");
const { userRouter } = require("./routes/user.router");
const { useAuth } = require("./middleware/auth.Middleware");
const { postRouter } = require("./routes/post.router");
require("dotenv").config();


const app = express();

app.use(express.json());
app.use(cors({
    origin: "*"
}))

app.get("/", (req, res) => {
    res.send("Welcome to Social Media App");
})

app.use("/users", userRouter);
app.use(useAuth);
app.use("/posts", postRouter);

app.listen(process.env.PORT, async () => {
    try {
        connection;
        console.log("Connection established successfully");
    } catch (error) {
        console.log("Connection error")
        console.log(error);
    }
    console.log(`Listening on http://localhost:${process.env.PORT}`)
})