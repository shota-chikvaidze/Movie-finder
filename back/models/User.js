const express = require('express')
const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: function() { return this.provider === 'local' } },
    avatar: { type: String },
    provider: { type: String, enum: ['local', 'google'], default: 'local' },
    favorite: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }],
    watchList: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }],
})

module.exports = mongoose.model('User', userSchema)