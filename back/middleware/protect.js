const jwt = require('jsonwebtoken')
const User = require('../models/User')

const protect = async (req, res, next) => {
    let token = req.cookies?.accessToken

    if(!token){
        console.log('❌ No token found')
        console.log('Cookies:', req.cookies)
        console.log('Headers:', {
            cookie: req.headers.cookie,
            origin: req.headers.origin,
            referer: req.headers.referer,
            userAgent: req.headers['user-agent']
        })
        return res.status(401).json({
            message: 'no token',
            debug: {
                hasCookies: !!req.cookies,
                cookieHeader: !!req.headers.cookie
            }
        })
    }

    try{

        const decoded = jwt.verify(token, process.env.JWT)
        req.user = await User.findById(decoded.id).select('-password')
        
        if (!req.user) {
            console.log('❌ User not found for token:', decoded.id)
            return res.status(401).json({message: 'user not found'})
        }
        
        console.log('✅ User authenticated:', req.user.email)
        next()

    }catch(err){
        console.log('❌ Token verification error:', err.message)
        res.status(500).json({message: 'invalid token', error: err.message})
    }
}

module.exports = protect