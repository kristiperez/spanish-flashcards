const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
PORT = 3002
const Card = require('./schemas/card')
const User = require('./schemas/user')
var bcrypt = require('bcryptjs')
const SALT_ROUNDS = 10

app.use(cors())
app.use(express.json())
app.use(express.static('images'))

//connecting to the MongoDB database
mongoose.connect('mongodb://localhost/flashdb', {useNewUrlParser: true},(error) => {
    if(!error) {
        console.log('Successfully connected to MongoDB database!')
    }
})

app.get('/all-cards', async (req,res) => {
    try {
        const cards = await Card.find({})
        res.json(cards)
    } catch(error) {
        res.json({error: 'Unable to get all cards'})
    }
    
})

app.get('/flashcards', async (req,res) => {
    try {
        const flashcard = await Card.aggregate( [ {$sample: { size: 1 } } ])
        res.json(flashcard)
    } catch(error) {
        res.json({error: 'Unable to get card'})
    }
    
})

app.post('/register',async (req,res) => {
    const username = req.body.username
    const password = req.body.password

    let persistedUser = await User.findOne({
        username: username 
    })

    if (persistedUser == null) {

        const hash = await bcrypt.hash(password, SALT_ROUNDS)
        if(hash) {
           
            const user = new User({
                username: username,
                password: hash
            })
            let savedUser = await user.save()
            if (savedUser != null) {
                res.json({success: true})
            } else {
                res.json({error: 'unable to save'})
            }
        } else {
            //bcrypt error
            res.json({error: error}) 
        }
    } else {
        res.json({error: 'user already exists'})
    }
})

app.listen(PORT,() => {
    console.log('Server is running...')
})