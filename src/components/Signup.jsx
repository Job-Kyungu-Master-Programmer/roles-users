import * as React from 'react';
import Button from '@mui/material/Button';

const Signup = ({ addAdmin, users, setUsers, username, password, 
  setUsername, setPassword, roles, setRoles }) => {

  return (
    <div className='sign'>
      <h1 className="sign">Enregistrer un autre Admin </h1>
      <form onSubmit={addAdmin} className="sign__form">
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="sign__input" placeholder='your username' />
        <input type="text" value={password}
          onChange={(e) => setPassword(e.target.value)}
        className="sign__input" placeholder='your password' />
       <select
            name="roles"
            value={roles}
            onChange={(e) => setRoles(e.target.value)}
            className="sign__input"
            >
            <option value="user">User</option>
            <option value="admin">Admin</option>
            </select>
        <Button type='submit' className='sign__btn' variant="contained">Sign in</Button>
      </form>
    </div>
  )
}

export default Signup
