const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const useAuthorization = true;

const verifyToken = (req, res, next) => {
    
    if (useAuthorization == false) {
        next();
    } else {

        const token = req.headers["x-access-token"];
        if (!token) {
            return res.status(403).send({ message: "No token provided!" });
        }

        jwt.verify(token, config.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) {
                return res.status(403).send({ message: "No valid token!" });
            }
            req.user = user;
            // req.tokenUser = user
            next();
            
        });

    }   
};



module.exports = verifyToken;