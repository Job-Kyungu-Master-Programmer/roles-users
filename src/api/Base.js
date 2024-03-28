import axios from 'axios';

// Uncomment these if you're not using a proxy or server setup that resolves relative paths
// const urlUser = 'http://localhost:3001/users';
// const urlTodo = 'http://localhost:3001/todos';

const urlUser = '/api/users';
const urlTodo = '/api/todos';

let token = null;
const setToken = newToken => {
    token = `Bearer ${newToken}`;
};

const getAll = () => {
    const request = axios.get(urlTodo);
    return request.then(response => response.data);
};

const create = object => {
    const request = axios.post(urlTodo, object);
    return request.then(response => response.data);
};

// Adjusted to remove the unused parameter
const delet = id => {
    const request = axios.delete(`${urlTodo}/${id}`);
    return request.then(response => response.data);
};




// User 

const getUser = () => {
    const request = axios.get(urlUser);
    return request.then(response => response.data);
};

const createUser = async (objects) => {
    try {
        const config = {
            headers: { Authorization: token }
        };
        const response = await axios.post(urlUser, objects, config);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la création de l\'utilisateur:', error);
        throw error; // Propagation de l'erreur pour une gestion plus globale
    }
};

const delUser = async (object, id) => {
    try {
        const config = {
            headers: { Authorization: token }
        };
        const response = await axios.delete(`${urlUser}/${id}`,object, config);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la suppression de l\'utilisateur:', error);
        throw error; // Propagation de l'erreur pour une gestion plus globale
    }
};

export { getAll, create, delet, getUser, createUser, delUser, setToken };
