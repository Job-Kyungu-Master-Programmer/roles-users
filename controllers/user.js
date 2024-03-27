const userRouter = require('express').Router() 
const brcypt = require('bcrypt')
const User = require('../models/User')

//user register
userRouter.post('/', async (request, response) => {
    const { username, password, role} = request.body

    const saltRounds = 10
    const passwordHash = await brcypt.hash(password, saltRounds)

    const validRoles = ['admin', 'user'];
    if (!validRoles.includes(role)) {
        return response.status(400).json({ error: 'Invalid role' });
    }


    const sendUser = new User({
        username,
        passwordHash,
        roles: role
    })
    const savedUser = await sendUser.save()
    response.status(200).json(savedUser)
})


userRouter.get('/', async (request, response) => {
    const user = await User.find({})
    response.json(user)
})

module.exports = userRouter