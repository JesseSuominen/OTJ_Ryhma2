const jwt = require("jsonwebtoken")

const verifyToken = (req, res, next) => {

    if( req.method === 'OPTIONS') {
        return next()
    }

    try {
        const token =req.headers.authorization.split(' ')[1];

        if(!token) {
            return res.status(401).json({message: "user not identified"});
        }

        const decodedToken = jwt.verify(token, process.env.JWT_KEY);

        req.userData = {userId: decodedToken.id};

        next();
    } catch (err) {
        return res.status(401).json({message: "user not identified"});
    }
}

module.exports = verifyToken;