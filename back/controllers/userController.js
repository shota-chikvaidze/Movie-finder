const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/User')
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.CLIENT_ID)

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

        res.cookie('accessToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 1 * 24 * 60 * 60 * 1000 
        })

        const userSafe = {
            id: createUser._id,
            username: createUser.username,
            email: createUser.email,
        }

        res.status(201).json({message: 'user created successfuly', accessToken: token, user: userSafe})
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

        res.cookie('accessToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 1 * 24 * 60 * 60 * 1000 
        })

        const userSafe = {
            id: findUser._id,
            username: findUser.username,
            email: findUser.email,
        }


        res.status(200).json({message: 'user logged in successfully', user: userSafe, accessToken: token})

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

exports.googleLogin = async (req, res) => {
    try{

        const { token } = req.body
        if(!token){
            return res.status(404).json({message: 'no token'})
        }

        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.CLIENT_ID
        })

        const { email, name, picture } = ticket.getPayload()

        let user = await User.findOne({ email })

        if(!user){
            const dummyPass = await bcrypt.hash('googleuser123!', 10)

            user = await User.create({
                username: name,
                email,
                password: dummyPass,
                avatar: picture,
            })
        }

        const appToken = jwt.sign({ id: user._id }, process.env.JWT, {
            expiresIn: '2d'
        })

        res.status(200).json({message: 'google sign in was successful', token: appToken, user})

    }catch(err){
        res.status(500).json({message: 'google error', error: err.message})
    }
}


exports.logout = async (req, res) => {
    try{

        res.clearCookie('accessToken', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 0
        })

        res.status(200).json({ message: 'Logged out successfully' })
    } catch (err) {
        res.status(500).json({ message: 'server error', error: err.message })
    }
}