const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

const todoChema = new mongoose.Schema({
    title: String,
    important: Boolean,
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    statusHistory: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Status'
    }],
    currentStatus: String // Ajout d'un champ pour stocker le statut actuel
});

todoChema.set('toJSON', {
    transform: (document, inter) => {
        inter.id = inter._id.toString()
        delete inter._id
        delete inter.__v
    }
})

module.exports = mongoose.model('Todo', todoChema)