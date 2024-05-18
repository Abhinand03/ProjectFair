import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <>
     <div>
      <div className='d-flex justify-content-between  text-light p-5' style={{ backgroundColor: '#053633'}}>
        <div className="w-25 ">
          <h3>Project Fair 2024</h3>
          <p style={{textAlign:'justify'}}>Rotary's project fairs connect clubs that are seeking international service projects with those that are interested in collaborating with global partners. Project fairs typically last two to three days and may include visits to service projects or opportunities to experience the local culture.</p>
        </div>
        <div className="w-25 ">
          <h3>Links</h3>
          <Link to={'/'} className="d-block mb-3 mt-3 text-primary">Landing</Link>
          <Link to={'/auth'} className=' d-block mb-3 ' >Login</Link>
          {/* <Link to={'/reg'} className='' >Register</Link> */}
        </div>
        <div className="w-25 ">
          <h3>Refrences</h3>
          <a href="https://react-bootstrap.netlify.app/" target='_blank' className='d-block mt-3 mb-3 '>React Bootstrap</a>
          <a href="https://react.dev/" target='_blank' className='d-block mb-3 '>React</a>
        </div>
      

      </div>
      <p className='text-center'>Project Fair 2024 &copy; All Rights Riserved</p>
    </div>
    </>
  )
}

export default Footer