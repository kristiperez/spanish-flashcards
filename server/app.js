const express = require('express')
const app = express()
require('dotenv').config()
const mongoose = require('mongoose')
const cors = require('cors')
const Card = require('./schemas/card')
const User = require('./schemas/user')
var bcrypt = require('bcryptjs')
const SALT_ROUNDS = 10
var jwt = require('jsonwebtoken')
const authenticate = require('./authMiddleware')
const PORT = process.env.PORT || 8080

app.use(cors())
app.use(express.json())
app.use('/api/*', authenticate)
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

app.get('/api/flashcards', async (req,res) => {
    try {
        const flashcard = await Card.aggregate( [ {$sample: { size: 1 } } ])

        flashcard[0].imageUrl = `http://localhost:3002/${flashcard[0].imageUrl}`

        console.log(flashcard)
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

app.post('/login', async (req,res) => {
    const username = req.body.username
    const password = req.body.password

    let persistedUser = await User.findOne({
        username: username 
    })

    if(persistedUser != null) {
        bcrypt.compare(password, persistedUser.password, (error,result) => {
            if (result) { //credentials are valid
                var token = jwt.sign({username: username}, process.env.JWT_SECRET_KEY);
                res.json({token: token})

            } else {
                // credentials are not valid
                res.status(401).json({error: 'Invalid credentials'})
            }
        })
    } else {
        res.status(401).json({error: 'Invalid credendtials'})
    }

})

app.listen(PORT,() => {
    console.log('Server is running...')
})