const jwt = require('jsonwebtoken')
const User = require('../models/User')

const protect = async (req, res, next) => {
    let token = req.cookies?.accessToken

    if(!token){
        return res.status(404).json({message: 'no token'})
    }

    try{

        const decoded = jwt.verify(token, process.env.JWT)
        req.user = await User.findById(decoded.id).select('-password')
        next()

    }catch(err){
        res.status(500).json({message: 'invalid token', error: err.message})
    }
}

module.exports = protect