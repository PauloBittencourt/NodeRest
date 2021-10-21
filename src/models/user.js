const mongoose = require('../database')
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
    name: {
        type: 'string',
        required: true,
    },
    email: { 
        type: 'string',         
        required: true,
        unique: true,
        lowercase: true,
     },
    password: { 
        type: 'string', 
        required: true,
        selected: true
    },
    created_at: { 
        type: Date,
        default: Date.now
    }
})

UserSchema.pre('save', async function (next) {
    const hash = await bcrypt.hash(this.password, 10)
    this.password = hash

    next()
})

const User = mongoose.model('User', UserSchema)
module.exports = User