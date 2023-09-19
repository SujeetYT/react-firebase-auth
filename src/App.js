import React from 'react'
import './App.css'
import Login from './components/Login'
import Register from './components/Register'
import User from './components/User'

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Admin from './components/Admin'

const App = () => {
  return (
    <>
    <Router>
      <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/user' element={<User />} />
      <Route path='/admin' element={<Admin />} />
      </Routes>
    </Router>
   
    </>
  )
}

export default App