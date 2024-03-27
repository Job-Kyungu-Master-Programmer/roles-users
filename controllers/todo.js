const todoRouter = require('express').Router()
const Todo = require('../models/Todo')

todoRouter.get('/', async (request, response) => {
    const todo = await Todo.find({})
    response.json(todo)
})

todoRouter.post('/', async (request, response) => {
    const body = request.body
    const sendTodo = new Todo({
        title: body.title,
        important: body.important
    })
    const savedTodo = await sendTodo.save()
    response.json(savedTodo)
})

module.exports = todoRouter