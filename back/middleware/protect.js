const jwt = require('jsonwebtoken')
const User = require('../models/User')

const protect = async (req, res, next) => {
    let token = req.cookies?.accessToken

    if(!token){
        console.log('No token found in cookies:', { 
            cookies: req.cookies, 
            headers: req.headers.cookie 
        })
        return res.status(401).json({message: 'no token'})
    }

    try{

        const decoded = jwt.verify(token, process.env.JWT)
        req.user = await User.findById(decoded.id).select('-password')
        
        if (!req.user) {
            console.log('User not found for token:', decoded.id)
            return res.status(401).json({message: 'user not found'})
        }
        
        next()

    }catch(err){
        console.log('Token verification error:', err.message)
        res.status(500).json({message: 'invalid token', error: err.message})
    }
}

module.exports = protect