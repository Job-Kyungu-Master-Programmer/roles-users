import * as React from 'react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { delet  } from '../api/Base'

const Todos = ({ setTodos, addTodos, todos,title,setTitle }) => {

    // const onDelete = (id) => {
    //     const todoId = todos.filter(t => t.id !== id)
    //     Base.delet(id, todoId).then(result => {
    //         setTodos(todos.map(t => t.id !== id ? t : result))
    //         setTodos(todos.filter(t => t.id !== id))
    //     })
    // }
    const onDelete = (id) => {
        const noteId = todos.filter(note => note.id !== id)
        delet(id, noteId).then(result => {
          setTodos(todos.map(note => note.id !== id ? note : result))
          setTodos(todos.filter(note => note.id !== id))
        }).catch (error => {
            alert('Vous n\'etes pas un admin pour effectuer cette tache')
        })
      }

  return (
    <div className="todos">
        <div className="todos__container">
            <h2 className="todos__title">Vos todos</h2>
            <ul className="todos__list">
                {todos.map(item =>
                <li key={item.id} className="todos__item">
                <h3 className="todos__titles">{item.title} </h3>
                <div className="todos__btns">
                <Button 
                onClick={() => onDelete(item.id)}
                className='todos__btn todos__delete' variant="contained">Delete</Button>
                <Link to={`/todos/${item.id}`}><Button className='todos__btn' variant="contained">Voir</Button></Link>
                </div>
            </li>    
                )}
            </ul>
            <form onSubmit={addTodos}>
                <input type="text" value={title}
                onChange={(e) => setTitle(e.target.value)}
                className='sign__input' placeholder='Ajouter todo' />
                <button className='sign__input'>add ajouter</button>
            </form>
        </div>
    </div>
  )
}

export default Todos
