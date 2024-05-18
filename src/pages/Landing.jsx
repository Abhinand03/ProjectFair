import React, { useEffect, useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import ProjectCard from '../components/ProjectCard'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import { homeproject } from '../services/allApis'

function Landing() {
    const [token,settoken]=useState("")
    const [project,setproject]=useState([])

    useEffect(()=>{
        settoken(sessionStorage.getItem('token'))
        getHomeproject()

    },[])
    const getHomeproject=async()=>{
        const result=await homeproject()
        console.log(result);
        if(result.status==200)
            {
                setproject(result.data)
            }
            else
            {
                console.log(result.response.data);
            }
    }

    console.log(project);



    return (
        
        <>
            <div className='w-100 p-5 d-flex align-items-center text-white' style={{ height: '100vh', backgroundColor: '#053633' }}>
                <Row>
                    <Col className=' d-flex align-items-center'>
                        <div className='text-white'>

                            <h1 className='display-4 mb-2'>Poject-fair 2024</h1>
                            <p style={{ textAlign: 'justify' }}> Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vero sunt magnam atque id pariatur officia blanditiis reprehenderit ipsam quae, minima delectus animi minus molestias autem, necessitatibus maxime numquam nobis ad.</p>
                            {
                                token?
                                <Link className='btn btn-warning p-3 shadow' to={'/dash'}>Mange your Project</Link>:
                                <Link className='btn btn-success' to={'/auth'}>Start To Explore</Link>
                            }
                        </div>
                    </Col>
                    <Col>
                        <img className='img-fluid' src="https://miro.medium.com/v2/resize:fit:679/1*3PntiTzHgX6wEDMOrjMxAg.gif" alt="" />
                    </Col>
                </Row>

            </div>
            <div className='p-5 w-100'>
                <h2 className='text-center mt-4 mb-3'>Project For You...</h2>

            </div>
            <marquee behavior="" direction="">
                <div className='d-flex justify-content-evenly mt-2'>
                   {
                    project.length>0?
                    project.map(item=>(
                        <ProjectCard project={item}/>
                    )):
                    <h5>No projects</h5>
                   }
                </div>


            </marquee>
            <div className='text-center'>
                <Link to={'/projects'}>Click for more...</Link>
            </div>

            <Footer/>


        </>
    )
}


export default Landing