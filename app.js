const express = require('express')
const app =  express()
const cors = require('cors')
const logger = require('./utils/logger')
const config = require('./utils/config')
const middleware = require('./utils/middleware')
const mongoose = require('mongoose')
const todoRouter = require('./controllers/todo')
const userRouter = require('./controllers/user')
const loginRouter = require('./controllers/login')
const path = require('path')

mongoose.connect(config.MONGODB_URI).then(result => {
    logger.info('Bien connecter')
}).catch(err => {
    logger.error('Erreur serveur !')
})


app.use(cors())
app.use(express.json())
app.use(express.static('build'))
// Redirect all other requests to index.html
app.use(middleware.requestLogger)
app.use('/api/todos', todoRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
})


module.exports = app