require('dotenv').config();
jwt = require('jsonwebtoken');
const userMw = (req, res, next) => {
    
    if( req.method === 'OPTIONS') {
        return next()
    }

    try {
        const token =req.headers.authorization.split(' ')[1];


        if(!token) {
            return res.status(401).json({message: "user not identified"});
        }

        const decodedToken = jwt.verify(token, process.env.JWT_KEY); // if the token is not valid, it will throw an error
        
        req.userData = {user_id: decodedToken.user_id};

        next();
    } catch (err) {
        
        return res.status(401).json({message: "user not identified"});

    }
}

module.exports = userMw;