import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = ({ user, logout }) => {
  const isAdmins = user && user.roles && user.roles.includes('admin')
  return (
    <div className="nav">
      <ul className="nav__list">
        <Link to='/' className="nav__item">Home</Link>
        <Link to='/todos' className="nav__item">Todos</Link>
        {/* <Link to='/todos/:id' className="nav__item">Todo</Link> */}
        <Link to='/sign' className="nav__item">Sign</Link>
        <Link to='/signup' className="nav__item">Signup</Link>
        <Link to='/users-admin' className="nav__item">Users</Link>
      </ul>
      <div className="menu">
        {user ? (
          <ol className="nav__user">
            <li className="nav__user__item">
              Roles: <strong className="nav__user__role">{user.roles}</strong>
            </li>
            <li className="nav__user__item">
              <h3 className="nav__user__name">{user.username}</h3>
            </li>
           {isAdmins &&  <Link to='/add-admin' className="nav__item admin">Ajouter un Admin</Link>}
            <button onClick={logout} >
              logout
            </button>
          </ol>
        ) : (null)}
      </div>
    </div>
  )
}

export default Navbar
