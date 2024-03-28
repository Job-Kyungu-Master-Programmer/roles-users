const jwt = require('jsonwebtoken')
const User = require('../models/User')


// Nous implementons une Funct* reutilisable qui va verifier le TOKEN 
//d'un user, si celui-ci est user simple, il va alors creer un user SIMPLE aussi
//Mais si son TOKEN montre qu'il est un admin et qu'il veut creer un autre ADMIN
// alors la funct* va lui laisser faire.
// Ici l'idee est de reinstrendre l'acces aux user SIMPLE pour creer les ADMIN
// SEUL L'ADMIN POURRA CREER UN AUTRE ADMIN


const isAdmin = async (request) => {
    const token = request.get('authorization');
    if(!token || !token.startsWith('Bearer ')) {
        return false;
    }   

    try {
        const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.SECRET_JWT)
        const userId = await User.findById(decoded.id);
        return userId.roles === 'admin'
    } catch (err) {
        return false
    }
}


module.exports = isAdmin