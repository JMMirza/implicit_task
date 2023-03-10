const jwt = require('jsonwebtoken')
require('dotenv').config();
// const config = require('config')

module.exports = function (req, res, next) {
    const token = req.header('x-auth-token')
    if (!token) return res.status(401).send('access denied')
    try {
        const decoded = jwt.verify(token, process.env.jwtPrivateKey)
        req.user = decoded
        next();
    } catch (ex) {
        res.status(400).send({ message: "invalid user", error: ex.message })
    }
}
