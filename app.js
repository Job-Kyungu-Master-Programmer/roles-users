const express = require('express')
const app =  express()
const cors = require('cors')
const logger = require('./utils/logger')
const config = require('./utils/config')
const middleware = require('./utils/middleware')
const mongoose = require('mongoose')
const todoRouter = require('./controllers/todo')
const userRouter = require('./controllers/user')

mongoose.connect(config.MONGODB_URI).then(result => {
    logger.info('Bien connecter')
}).catch(err => {
    logger.error('Erreur serveur !')
})


app.use(express.json())
app.use(cors())
app.use(middleware.requestLogger)
app.use('/api/todos', todoRouter)
app.use('/api/users', userRouter)


module.exports = app