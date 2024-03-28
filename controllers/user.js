const userRouter = require('express').Router() 
const bcrypt = require('bcrypt')
const User = require('../models/User')
const isAdmin = require('../utils/auth')


//user register
userRouter.post('/', async (request, response) => {
    try {
        const { username, password, roles } = request.body;

    // verification si l'utilisateur qui effectue l'inscription est un admin
    const isUserAdmin = await isAdmin(request);
    // Si l'utilisateur n'est pas un admin, ignorons le rôle fourni et attribuons "user" par défaut
    const userRole = isUserAdmin ? roles : 'user';

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const sendUser = new User({
        username,
        passwordHash,
        roles: userRole // Nous utilisons le rôle vérifié
    });
    const savedUser = await sendUser.save();
    response.status(200).json(savedUser);
    } catch (err) {
        return response.status(401).json({error: 'Non authoriser'})
    }
});


userRouter.delete('/:id', async (request, response) => {
    try {  
        const user = await User.findById(request.params.id);

        if (!user) {
            return response.status(404).json({ error: 'User not found!' });
        }

        const userAdmin = await isAdmin(request);
        if (userAdmin && user.roles === 'admin') {
            await User.findByIdAndDelete(request.params.id);
            return response.status(200).json({ message: 'Admin user deleted successfully' });
        } else if (!userAdmin) {
            return response.status(403).json({ error: 'You do not have permission to delete this user' });
        } else {            
            await User.findByIdAndDelete(request.params.id);
            return response.status(200).json({ message: 'User deleted successfully' });
        }
            
    } catch (error) {
        console.error(error);
        return response.status(500).json({ error: 'An error occurred while deleting the user' });
    }
});



userRouter.get('/', async (request, response) => {
    const user = await User.find({})
    response.json(user)
})

module.exports = userRouter