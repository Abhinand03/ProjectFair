
import './App.css'
import './bootstrap.min.css'
import {Routes,Route} from 'react-router-dom'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Reg from './pages/Reg'
import Projects from './pages/Projects'
import Auth from './pages/Auth'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'
import { useContext } from 'react'
import { TokenAuthContext } from './context/Authcontext'

function App() {
  const {authstatus,setauthstatus}=useContext(TokenAuthContext)
  

  return (
    <>
    <Routes>
      <Route path='/' element={<Landing/>}/>
      <Route path='/dash' element={authstatus?<Dashboard/>:<Landing/>}/>
      <Route path='/log' element={<Login/>}/>
      <Route path='/reg' element={<Reg/>}/>
      <Route path='/projects' element={authstatus?<Projects/>:<Landing/>}/>
      <Route path='/auth' element={<Auth/>}/>
      
      
    </Routes>
    <ToastContainer/>
    
     
    </>
  )
}

export default App
