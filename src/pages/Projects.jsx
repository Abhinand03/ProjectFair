import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import { Row, Col } from 'react-bootstrap'
import ProjectCard from '../components/ProjectCard'
import { allproject } from '../services/allApis'

function Projects() {
  const [search,setsearch]=useState('')
  const [project, setproject] = useState([])
  const [logstatus,setloagstatus]=useState(false)
  useEffect(() => {
    if (sessionStorage.getItem('token')) {
      getdata()
      setloagstatus(true)

    }
    else {
      console.log("login");
      setloagstatus(false)
    }

  }, [search])
  console.log(project);

  const getdata = async () => {
    const header = { "Authorization": `Bearer ${sessionStorage.getItem('token')}` }

    const result = await allproject(header,search)
    // console.log(result);
    if (result.status == 200) {
      setproject(result.data)
    }
    else {
      console.log(result.response.data);
    }
  }
  return (
    <>
      <Header status={true} />
      <div className='p-5'>
        <div className='d-flex justify-content-between my-4'>
        <h1>All Projects</h1>
        <input type="text" name='' onChange={(e)=>{setsearch(e.target.value)}} className='form-control w-25' placeholder='Enter Languages for project Search' />


        </div>
        {
          logstatus?
          <Row>
          {
            project.length > 0 ?
            project.map(item=>(
              <Col>
                <ProjectCard project={item} />
              </Col>

            ))
            
              
              :
              <h1 className='text-center'>No project Availabe</h1>

          }
        </Row>
        :
        <h2 className='text-center text-danger'>Pleace Login First</h2>
        }

        






      </div>
      <Footer />
    </>
  )
}

export default Projects