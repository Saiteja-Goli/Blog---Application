const jwt = require("jsonwebtoken");
require("dotenv").config();

const authentication = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).json({ message: "Authorization header missing" });
    }

    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Token missing" });
    }

    jwt.verify(token, process.env.TOKEN_SECRET, function (err, decoded) {
        if (err) {
            return res.status(401).json({ message: "Invalid token" });
        }
        req.userId = decoded.userId; // Set userId on req object
        next();
    });
};

module.exports = { authentication };
