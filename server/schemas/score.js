const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const scoreSchema = new mongoose.Schema({
    userId: ObjectId,
    date: Date(),
    Correct: Number,
    Incorrect: Number
})

const Score = mongoose.model('Score', scoreSchema)

module.exports = Score