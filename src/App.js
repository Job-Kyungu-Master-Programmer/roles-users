import { Routes,Route, useNavigate } from 'react-router-dom'
import Todos from "./components/Todos"
import Home from "./components/Home"
import Todo from "./components/Todo"
import Navbar from './components/Navbar'
import React,{ useEffect, useState } from 'react'
import Sign from './components/Sign'
import Signup from './components/Signup'
import SignupPublic from './components/SignupPublic'
import { getAll, create, getUser, createUser, delUser, setToken  } from './api/Base'
import UsersAdmin from './components/UsersAdmin'
import auth from './api/auth'
import ProtectedRoute from './api/ProtectedRoutes/ProtectedRoute'
import Track from './components/Track'
import TodoStatus from './components/TodoStatus'
import TodosStatusList from './components/TodosStatusList'


const App = () => {
  const [todos, setTodos] = useState([])
  const [title, setTitle] = useState('title')

  // for user
  const [user, setUser] = useState(null)

  const [users, setUsers] = useState([])
  const [username, setUsername] = useState('username')
  const [password, setPassword] = useState('password')
  const [roles, setRoles] = useState('')

  const navigate = useNavigate()

  useEffect(() => {
    getAll().then(result => {
      setTodos(result)
    })
  },[])

  useEffect(() => {
    getUser().then(result => {
      setUsers(result)
    })
  },[])

  // Pour localStorage
  useEffect(() => {
    const logged = window.localStorage.getItem('userIn')
    if(logged) {
      const user = JSON.parse(logged)
      setUser(user)
      setToken(user.token)
    }
  },[])

  const addTodos = (e) => {
    e.preventDefault()
    const todoSend = {
       title: title
    }
    create(todoSend).then(result => {
       setTodos(todos.concat(result))
       setTitle('')
    })
    .catch(err => {
       alert('Error a eu lieu')
    })
  }

  // User Simple
  const addUser = (e) => {
     e.preventDefault()
     const userSend = {
        username: username,
        password: password,
        roles: roles,
     }
     createUser(userSend).then(result => {
        setUsers(users.concat(result))
        setUsername('')
        setPassword('')
        console.log('Utilisation de addUser')
     })
  }

  // Login Connexion
  const handleLogin = async e => {
      e.preventDefault()
      try {
        const user = await auth.login({ username, password, roles})
        window.localStorage.setItem('userIn', JSON.stringify(user))
        setUser(user)
        setToken(user.token);
        navigate('/')
      } catch (error) {
          alert('Password or login incorrect!')
      }
  }

  console.log(user)

  // logout
  const logout = () => {
     window.localStorage.removeItem('userIn')
     setUser(null)
     setToken(user.token)
  }

  return (
     <div className="app">
      <h1>Labo Math for Student</h1>
      <Navbar
      logout={logout}
      user={user}
      />
      <div className="app__container">
          <Routes>
          <Route  path='/' element={<Home />} />
          <Route  path='/todos' element={<Todos
           addTodos={addTodos} title={title} setTitle={setTitle}
            todos={todos} setTodos={setTodos} />}
          />
          <Route  path='/todos/:id' element={<Todo todos={todos} />} />
          <Route path="/todos/:id/status" element={<TodoStatus todos={todos}  />} />
          <Route  path='/sign' element={<Sign
            addLogin={handleLogin} username={username} password={password}
            setUsername={setUsername} setPassword={setPassword}
          />} />
          <Route  path='/signup' element={<SignupPublic
            username={username} addUsers={addUser} password={password}
            setPassword={setPassword} setUsername={setUsername}
          />} />
            <Route  path='/users-admin' element={<UsersAdmin setUsers={setUsers} users={users} />} />
            <Route  path='/status' element={<Track />} />
          <Route  
          path='/add-admin' 
          element={
          <ProtectedRoute>
          <Signup
          addAdmin={addUser} username={username} setUsername={setUsername}
          password={password} setPassword={setPassword} roles={roles}
          setRoles={setRoles}
          />
          </ProtectedRoute>
           }
          />
           <Route path="/admin/todos-status" element={<TodosStatusList setTodos={setTodos} todos={todos} />} />
          </Routes>
      </div>
     </div>
  )
}

export default App