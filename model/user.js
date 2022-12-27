const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
require('dotenv').config();
// const config = require('config')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        lowercase: true
    },
    contact: {
        type: Number,
    },
    dob: {
        type: String,
    },
    password: {
        type: String,
        trim: true,
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    secretKey: {
        type: String,
        default: null
    }
})
userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.jwtPrivateKey, { expiresIn: "1d" })
    return token
}
userSchema.methods.generateTempAuthToken = function () {
    const token = jwt.sign({ email: this.email, contact: this.contact }, process.env.jwtPrivateKey, { expiresIn: "300s" })
    return token
}

const User = mongoose.model('User', userSchema)

module.exports.User = User
