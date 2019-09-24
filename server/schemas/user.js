const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: String,
    password: String
})

//mongoose will create a user collection in the database
const User = mongoose.model('User', userSchema)

module.exports = User