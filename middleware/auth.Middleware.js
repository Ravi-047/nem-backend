const jwt = require("jsonwebtoken");
require("dotenv").config();


const useAuth = (req, res, next) => {
    const token = req.headers.authorization;

    if (token) {
        const decode = jwt.verify(token, process.env.KEY);
        if (decode) {
            const userID = decode.userID;
            req.body.userID = userID;
            next();
        }
        else {
            res.send("Please Login First");
        }
    }
    else {
        res.send("Please Login First");
    }
}

module.exports = { useAuth };