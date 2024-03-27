const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

const todoChema = new mongoose.Schema({
    title: String,
    important: Boolean
})

todoChema.set('toJSON', {
    transform: (document, inter) => {
        inter.id = inter._id.toString()
        delete inter._id
        delete inter.__v
    }
})

module.exports = mongoose.model('Todo', todoChema)