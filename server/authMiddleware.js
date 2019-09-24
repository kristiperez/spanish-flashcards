require('dotenv').config()
const User = require('./schemas/user')
const jwt = require('jsonwebtoken')
// do i need promise??
function authenticate(req,res,next) {
    console.log('middleware called...')
    next()
    return
    let headers = req.headers['authorization']

    if(headers) {
        const token = headers.split(' ')[1] //separates bearer from token and takes index 1
        var decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if(decoded) {
            const username = decoded.username
            // check in the database if the user exists
            const persistedUser = User.findOne({
                username: username 
            })
            if(persistedUser) {
                next()
            } else {
                res.json({error: 'Invalid credentials'})
            }
        } else {
            res.json({error: 'Unauthorized access'})
        }
    } else {
        res.json({error: 'Authorization header not found'})
    }
}

module.exports = authenticate