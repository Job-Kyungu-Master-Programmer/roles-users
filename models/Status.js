const mongoose = require('mongoose')
mongoose.set('strictQuery')


const statusSchema = new mongoose.Schema({
    status: {
        type: String,
        enum: ['en attente', 'en cours', 'terminé', 'annulé'],
        default: 'en attente'
    }
})

module.exports = mongoose.model('Status', statusSchema)
