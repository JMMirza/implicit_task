const express = require('express')
const app = express()
require('dotenv').config();
// const config = require('config')
require('./utils/dbconnection')()


app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// routes
app.use('/api', require('./routes/routes.js'));

if (!process.env.jwtPrivateKey) {
    console.error('FATAL ERROR: jwtPrivateKey is not defined.');
    process.exit(1)
}

const port = process.env.PORT || 3000
module.exports = app.listen(port, () => {
    console.log(`Listening at port ${port}`);
})
