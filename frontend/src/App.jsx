import React from 'react';
import {Route,Routes} from "react-router-dom";
import HomePage from './pages/Home/HomePage';
import LoginPage from './pages/auth/Login/LoginPage';
import SignUpPage from './pages/auth/SignUp/SignUpPage';
import SideBar from './components/common/SideBar';
import RightPanel from './components/common/RightPannel';
const App = () => {
  return (
    <div className='flex max-w-6xl mx-auto'>
      <SideBar/>
      <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/signup' element={<SignUpPage/>}/>
      </Routes>
      <RightPanel/>
    </div>
    )
}

export default App
