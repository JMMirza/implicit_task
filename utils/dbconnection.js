const mongoose = require('mongoose')
// const config = require('config')

module.exports = function () {
    mongoose.connect('mongodb://localhost:27017/implicit_task', {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })
        .then(() => console.log("connection established"))
        .catch(err => console.error("connection cannot established", err.message))
}
