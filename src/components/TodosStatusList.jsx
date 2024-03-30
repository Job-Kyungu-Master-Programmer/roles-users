import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ChangeStatusForm from './ChangeStatusForm';
import { updateStatus } from '../api/Base';

const TodosStatusList = ({ setTodos, todos }) => {
 const [showChangeStatusForm, setShowChangeStatusForm] = useState(false);
 const [selectedTodo, setSelectedTodo] = useState(null);

 const handleChangeStatusClick = (todo) => {
    setSelectedTodo(todo);
    setShowChangeStatusForm(true);
 };

 const handleCloseForm = () => {
    setShowChangeStatusForm(false);
    setSelectedTodo(null);
 };

 const handleChangeStatus = async (newStatus) => {
    if (selectedTodo) {
        console.log(`Changing status of ${selectedTodo.title} to ${newStatus}`);
        try {
            await updateStatus(selectedTodo.id, newStatus);
            // Mettre à jour l'état local des tâches
            setTodos(todos.map(todo =>
                todo.id === selectedTodo.id ? { ...todo, statusHistory: [...todo.statusHistory, { status: newStatus }] } : todo
            ));
        } catch (error) {
            console.error('Failed to update status:', error);
        }
        handleCloseForm();
    } else {
        console.log('No todo selected');
    }
};

console.log(todos)

 return (
    <div>
      <h2>Statuts des Todos</h2>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <h3>
              <Link to={`/todos/${todo.id}/status`}>{todo.title}</Link>
            </h3>
            <p>Statut: {todo.statusHistory.length > 0 ? todo.statusHistory[todo.statusHistory.length - 1].status : 'Non défini'}</p>
            <button onClick={() => handleChangeStatusClick(todo)}>Changer le statut</button>
            {showChangeStatusForm && selectedTodo && selectedTodo.id === todo.id && (
             <ChangeStatusForm todoId={selectedTodo.id} onChangeStatus={handleChangeStatus} onClose={handleCloseForm} />
            )}
          </li>
        ))}
      </ul>
    </div>
 );
};

export default TodosStatusList;
