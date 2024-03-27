const mongoose = require('mongoose')
const validation = require('mongoose-unique-validation')


const userSchema = new mongoose.Schema({
    username: {
        type: String,
    },
    passwordHash: {
        type: String
    },
    roles: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    }
})

userSchema.plugin(validation)

userSchema.set('toJSON', {
    transform: (document, inter) => {
        inter.id = inter._id.toString()
        delete inter._id
        delete inter.__v
        delete inter.passwordHash
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User