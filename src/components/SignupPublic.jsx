import * as React from 'react';
import Button from '@mui/material/Button';

const SignupPublic = ({ addUsers, username, setUsername, password, setPassword }) => {
  return (
    <div className='sign'>
      <h1 className="sign">S'Enregistrer </h1>
      <form onSubmit={addUsers} className="sign__form">
        <input type="text"
        value={username}
         onChange={(e) =>  setUsername(e.target.value)}
        className="sign__input" placeholder='your username' />
        <input type="text" 
          value={password}
          onChange={(e) =>  setPassword(e.target.value)}
         className="sign__input" placeholder='your password' />
        {/* <select name="" id="" className="sign__input" placeholder="Role">
            <option value="user">User</option>
            <option value="Admin">Admin</option>
        </select> */}
        <Button className='sign__btn' type='submit' variant="contained">Sign in</Button>
      </form>
    </div>
  )
}

export default SignupPublic
