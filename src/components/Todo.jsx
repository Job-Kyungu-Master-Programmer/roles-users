import React from 'react'
import ms from '../images/ms.avif'
import { useParams } from 'react-router-dom'

const Todo = ({ todos }) => {
  const ids = useParams().id
  const tod = todos.find(t => t.id === ids)

  if(!tod) {
    return <div>Chargement...</div>
  }

  return (
    <div className="todo">
        <h1 className="todo">{tod.title}</h1>
        <img src={ms} alt="" className="todo__img" />
        <div className="todo__content">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente cupiditate aspernatur maxime magni consectetur praesentium assumenda velit rerum impedit eos beatae similique, repellat architecto quis debitis cum soluta. Earum magnam rerum libero ullam voluptatibus voluptatem temporibus dolorem nulla soluta iure, ipsam commodi dolores optio maiores dolore, beatae qui. Esse adipisci aliquid voluptatibus natus sapiente cum rerum voluptas aut fuga. Deleniti maiores non rem quo voluptatem doloremque labore molestiae totam repellat distinctio suscipit eos nemo minus incidunt, error reprehenderit quam, aut officiis voluptate! Eius sunt dicta, tempore fuga eaque earum? Necessitatibus hic ex ducimus distinctio perferendis officiis neque, quisquam harum animi!
        </div>
    </div>
  )
}

export default Todo
