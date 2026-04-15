import React from 'react'
import { BrowserRouter , Route , Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import SignUp from './pages/auth/SignUp'
import login from './pages/auth/login'
 const App = () => {
  return (
   <BrowserRouter>
   <Routes>
    <Route path='/' exact element={<Home />}></Route>
    <Route path='/login' exact element={<login/>}></Route>
    <Route path='/Sign-up' exact element={<SignUp />}></Route>
   </Routes>
   </BrowserRouter>
   
   
   
  )
}

export default App
