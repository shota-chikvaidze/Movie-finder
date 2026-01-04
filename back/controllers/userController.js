const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/User')

exports.register = async (req, res) => {
    try{

        const { username, email, password } = req.body

        const findUser = await User.findOne({ $or: [{username}, {email}] })
        if(findUser){
            return res.status(400).json({message: 'user already exists'})
        }

        if(!username || !email || !password){
            return res.status(400).json({message: 'all fields required'})
        }         

        const hashed = await bcrypt.hash(password, 10)

        const createUser = await User.create({
            username,
            email,
            password: hashed
        })

        const token = jwt.sign({ id: createUser._id }, process.env.JWT, {
            expiresIn: '1d'
        })

        const cookieOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            maxAge: 1 * 24 * 60 * 60 * 1000,
            path: '/'
        }
        
        res.cookie('accessToken', token, cookieOptions)
        
        // Additional header for debugging
        res.header('X-Auth-Token-Set', 'true')
        
        console.log('✅ User registered:', email, 'Cookie set with options:', cookieOptions)

        const userSafe = {
            id: createUser._id,
            username: createUser.username,
            email: createUser.email,
        }

        res.status(201).json({message: 'user created successfuly', user: userSafe, cookieSet: true})
    }catch(err){
        res.status(500).json({message: 'register error', error: err.message})
    }
}

exports.login = async (req, res) => {
    try{

        const { email, password } = req.body

        const findUser = await User.findOne({ email })
        if(!findUser){
            return res.status(404).json({message: 'user not found'})
        }

        const checkPass = await bcrypt.compare(password, findUser.password)
        if(!checkPass){
            return res.status(400).json({message: 'invalid password'})
        }

        const token = jwt.sign({ id: findUser._id }, process.env.JWT, {
            expiresIn: '1d'
        })

        const cookieOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            maxAge: 1 * 24 * 60 * 60 * 1000,
            path: '/'
        }
        
        res.cookie('accessToken', token, cookieOptions)
        
        // Additional header for debugging
        res.header('X-Auth-Token-Set', 'true')
        
        console.log('✅ User logged in:', email, 'Cookie set with options:', cookieOptions)

        const userSafe = {
            id: findUser._id,
            username: findUser.username,
            email: findUser.email,
        }


        res.status(200).json({message: 'user logged in successfully', user: userSafe, cookieSet: true})

    }catch(err){
        res.status(500).json({message: 'login error', error: err.message})
    }
}

exports.getUser = async (req, res) => {
    try{
        
        if (!req.user) {
            return res.status(401).json({ user: null, message: 'not authenticated' })
        }

        const user = await User.findById(req.user.id).select('-password')

        const userSafe = {
            id: user._id,
            username: user.username,
            email: user.email,
        }
        
        res.status(200).json({user: userSafe})

    }catch(err){
        res.status(500).json({message: 'error getting user', error: err.message})
    }
}


exports.logout = async (req, res) => {
    try{

        res.clearCookie('accessToken', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            path: '/'
        })

        res.status(200).json({ message: 'Logged out successfully' })
    } catch (err) {
        res.status(500).json({ message: 'server error', error: err.message })
    }
}

exports.googleCallback = async (req, res) => {
  try {
    const user = req.user

    if (!user) {
      return res.redirect(`${process.env.CLIENT_URL}/login?error=no-user`)
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT, {
      expiresIn: '1d'
    })

    res.cookie('accessToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      maxAge: 24 * 60 * 60 * 1000,
      path: '/',
    })

    return res.redirect(`${process.env.CLIENT_URL}/auth/success`)
  } catch (err) {
    console.error('Google callback error:', err)
    return res.redirect(`${process.env.CLIENT_URL}/login?error=google`)
  }
}