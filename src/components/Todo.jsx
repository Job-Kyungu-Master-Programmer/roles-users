import React from 'react';
import ms from '../images/ms.avif';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Todo = ({ todos }) => {
 const ids = useParams().id;
 const tod = todos.find(t => t.id === ids);

 // Si le "todo" n'est pas trouvé, retournez un message de chargement ou un composant de chargement
 if (!tod) {
    return <div>Chargement...</div>;
 }

 return (
    <div className="todo">
        <h1 className="todo">{tod.title}</h1>
        <img src={ms} alt="" className="todo__img" />
        <h2>Voir votre Status de todo</h2>
        <Link to={`/todos/${tod.id}/status`} >voir le status</Link>
        <div className="todo__content">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Assumenda, illum. Nesciunt dignissimos ullam nisi eum soluta vitae, corrupti.
        </div>
    </div>
 );
};

export default Todo;
