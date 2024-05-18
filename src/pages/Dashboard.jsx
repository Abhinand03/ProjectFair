import React, { useContext, useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Row, Col } from 'react-bootstrap'
import Add from '../components/Add'
import Edit from '../components/Edit'
import Profile from '../components/Profile'
import { deleteproject, userproject } from '../services/allApis'
import { addProjectsResponseContext, editprojectResponceContext } from '../context/Contextapi'
import { toast } from 'react-toastify'

function Dashboard() {
  const {addProjectResponce,setaddProjectResponce}=useContext(addProjectsResponseContext)
  const {editprojectResponce,setEditprojectResponce}=useContext(editprojectResponceContext)
  const [project, setproject] = useState([])
  const [user,setuser]=useState('')

  useEffect(() => {
    setuser(sessionStorage.getItem('username'))
    getdata()

  }, [addProjectResponce,editprojectResponce])

  

  const getdata = async () => {
    const header = { "Authorization": `Bearer ${sessionStorage.getItem('token')}` }

    const result = await userproject(header)
    if (result.status == 200) {
      setproject(result.data)
    }
    else {
      console.log(result.response.data);
    }


  }
  console.log(project);

  const handledelt=async(id)=>{
    const token=sessionStorage.getItem('token')
    console.log();
    const header = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`


  }
  const result=await deleteproject(id,header)
  if(result.status==200){
    toast.success("project Delete Success")
    getdata()
  }
  else{
    console.log(result);
    toast.error(result.response.data)
  }

  }

  return (

    <>

      <Header />

      <div>
        <div className='p-3'>
          <h1>Welcome <span className='text-danger'>{user}</span></h1>
        </div>
        <Row className='g-0'>
          <Col sm={12} md={8} className='p-3'>
            <h3>your Project</h3>
            <div className='border border-3 p-4'>
              <Add />
              {
                project.length > 0 ?
                  project.map(iteem => (
                    <div className="d-flex justify-content-between border shadow mb-3 mt-2 p-4 rounded">
                      <h4>{iteem.title}</h4>
                      <div>
                        <a href={iteem.github} className='btn me-3'>
                          <i className='fa-brands fa-github fa-2xl '></i>

                        </a>
                        <Edit project={iteem}/>

                        <button className="btn me-3" onClick={()=>{handledelt(iteem._id)}}>
                          <i className='fa-solid fa-trash fa-2xl'></i>
                        </button>

                      </div>
                    </div>)) :
                  <h3>No Projects Avilable!!</h3>
              }



            </div>

          </Col>
          <Col sm={12} md={4}>
            <Profile />
          </Col>
        </Row>


      </div>
      <Footer />

    </>
  )
}

export default Dashboard