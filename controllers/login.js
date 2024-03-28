const loginRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/User')


loginRouter.post('/', async (request, response) => {
    try {
    const { username, password, roles } = request.body

    const user = await User.findOne({ username })
    const passwordCorrect = user === null
    ? false 
    : await bcrypt.compare(password, user.passwordHash)

    if(!passwordCorrect) {
        return response.status(401).json({error: 'Invalid your password'})
    }

    const userToken = {
        username: user.username,
        roles: user.roles,
        id: user._id
    }

    const token = jwt.sign(userToken, process.env.SECRET_JWT)
    response.status(200).send({
        token,
        username: user.username,
        roles: user.roles,
        id: user._id
    })
  } catch(error) {
    // Nous envoyons une reponse d'erreur et terminons la requete!
    return response.status(401).json({error: 'Invalid your password au niveau Catch'})
  }
}) 

module.exports = loginRouter