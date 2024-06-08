import React, { useContext } from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
import { TokenAuthContext } from '../context/Authcontext';

function Header({status}) {
  const {authstatus,setauthstatus}=useContext(TokenAuthContext)
  const navigate=useNavigate()

  const logout=()=>{
    sessionStorage.clear()
    navigate('/')
    setauthstatus(false)
    
  }
  return (
    <>
    <Navbar className="bg-light">
        <Container>
          <Navbar.Brand href="#home">
          <i className="fa-solid fa-diagram-project fa-xl me-2"></i>
           {' '}
            Project Fair
            
          </Navbar.Brand>
          {
            !status &&
            <div>
            <button onClick={logout} className="btn-outline-danger btn"><i className="fa-solid fa-right-from-bracket me-3"></i>Logout</button>
          </div>

          }
          
        </Container>
      </Navbar>
    
    </>
  )
}

export default Header