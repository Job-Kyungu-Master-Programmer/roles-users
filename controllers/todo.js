const todoRouter = require('express').Router();
const Todo = require('../models/Todo');
const Status = require('../models/Status'); // Assurez-vous que le chemin est correct
const isAdmin = require('../utils/auth');

todoRouter.get('/', async (request, response) => {
    const todo = await Todo.find({}).populate('statusHistory', {status:1})
    response.json(todo);
});

// Route pour ajouter un nouveau todo avec un statut initial
todoRouter.post('/', async (req, res) => {
    // Créer un statut initial
    const initialStatus = new Status({ status: 'en attente' });
    await initialStatus.save();

    // Créer un nouveau todo avec le statut initial dans l'historique
    const newTodo = new Todo({
        title: req.body.title,
        important: req.body.important,
        statusHistory: [initialStatus._id] // Ajouter le statut initial à l'historique
    });
    const savedTodo = await newTodo.save();
    res.json(savedTodo);
});



// Route pour mettre à jour le statut d'une tâche existante // Pour n'importe quel User
// todoRouter.put('/:id/status', async (req, res) => {
//     const newStatus = new Status({ status: req.body.status });
//     await newStatus.save();

//     const todo = await Todo.findById(req.params.id);
//     todo.statusHistory.push(newStatus._id);
//     await todo.save();

//     res.json(todo);
// });
// Route pour mettre à jour le statut d'une tâche existante , uniquement les ADMINS
todoRouter.put('/:id/status', async (req, res) => {
    const newStatus = req.body.status;
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
        return res.status(404).json({ error: 'Todo not found' });
    }

    // creons un nouveau statut et l'ajouter à l'historique
    const statusUpdate = new Status({ status: newStatus });
    await statusUpdate.save();
    todo.statusHistory.push(statusUpdate._id);

    // Mettre à jour le statut actuel du "todo" pour refléter le dernier statut ajouté
    todo.currentStatus = newStatus; /// le chanps dans mon model

    await todo.save();

    res.json(todo);
});


todoRouter.delete('/:id', async (request, response) => {
    const todo = await Todo.findByIdAndDelete(request.params.id);
    response.json(todo);
});

module.exports = todoRouter;
