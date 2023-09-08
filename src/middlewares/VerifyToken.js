const jwt = require("jsonwebtoken");
verifyToken = (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization'];

    if (!token) {
        return res.status(403).send({ error: true, message: "Token not provided" });
    }
    token = token.replace(/^Bearer\s+/, "");
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send({ error: true, message: "Access Deny" });
        }
        req.email = decoded.email;
        next();
    }); 
};
module.exports = verifyToken;