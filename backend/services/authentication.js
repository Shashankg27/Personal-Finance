const JWT = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

function createToken(user){
    const payload = {
        _id: user._id,
        name: user.name,
        email: user.email,
        username: user.username
    };

    const token = JWT.sign(payload, secret);
    return token;
}

function validateToken(token){
    const payload = JWT.verify(token, secret);
    return payload;
}

module.exports = { createToken, validateToken };