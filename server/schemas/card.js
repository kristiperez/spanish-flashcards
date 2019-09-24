const mongoose = require('mongoose')

const cardSchema = new mongoose.Schema({
    spanish: String,
    english: String,
    imageUrl: String
})

// mongoose will create a card collection in the database
const Card = mongoose.model('Card', cardSchema)

module.exports = Card