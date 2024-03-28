import * as React from 'react';
import Button from '@mui/material/Button';
import {  delUser  }  from '../api/Base';

const UsersAdmin = ({ users, setUsers }) => {
    const OnDelete = (id) => {
        const userId = users.filter(u => u.id !== id)
        delUser(userId, id).then(result => {
            setUsers(users.map(u => u.id !== id ? u : result))
            setUsers(users.filter(u => u.id !== id))
        }).catch(error => {
          alert('Vous n\'etes pas autoriser a effectuer cettte tache')
        })
    }
  return (
    <div>
      <div className="users">
         <h1 className="todos__title">Users</h1>
         <h2 className="li">Listes des utilisateurs</h2>
         <ul>
            {users.map(item => 
             <li key={item.id}>
                <h2>Name: {item.username}</h2>
                <Button className='sign__btn todos__delete'
                 onClick={() =>  OnDelete(item.id)}
                type='submit' variant="contained">Delete</Button>
             </li>    
            )}
         </ul>
      </div>
    </div>
  )
}

export default UsersAdmin
