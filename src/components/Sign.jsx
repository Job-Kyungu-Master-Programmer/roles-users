import * as React from 'react';
import Button from '@mui/material/Button';

const Sign = ({ addLogin, users, setUsers, username, password, 
  setUsername, setPassword}) => {
  return (
    <div className='sign'>
      <h1 className="sign">Sign </h1>
      <form onSubmit={addLogin} className="sign__form">
        <input type="text"
        value={username} onChange={(e) => setUsername(e.target.value)}
         className="sign__input" placeholder='your username' />
        <input type="text"
        value={password} 
        onChange={(e) => setPassword(e.target.value)} className="sign__input" placeholder='your password' />
        <Button type='submit' className='sign__btn' variant="contained">Sign in</Button>
      </form>
    </div>
  )
}

export default Sign
