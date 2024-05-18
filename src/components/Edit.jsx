import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Row, Col } from 'react-bootstrap';
import base_url from '../services/server_urls';
import { toast } from 'react-toastify';
import { editproject } from '../services/allApis';
import { editprojectResponceContext } from '../context/Contextapi';

function Edit({ project }) {
    const {editprojectresponce,setEditprojectResponce}=useContext(editprojectResponceContext)

    const [projectdata, setprojectdat] = useState({
        id: project._id, title: project.title, overview: project.overview, language: project.languges, github: project.github, demo: project.demo, projectimage: ""
    })
    const [show, setShow] = useState(false);
    const [imagestatus, setimagestatus] = useState(false)
    const [preview, setpreview] = useState("")
    useEffect(() => {
        if (projectdata.projectimage.type == "image/jpg" || projectdata.projectimage.type == "image/jpeg" || projectdata.projectimage.type == "image/png") {
            setimagestatus(false)
            setpreview(URL.createObjectURL(projectdata.projectimage))
        }
        else {
            setimagestatus(true)
            setpreview('')

        }

    },[projectdata.projectimage])

    const handleupload = async () => {
        const { title, demo, overview, language, github,projectimage } = projectdata
        if (!title || !demo || !overview || !language || !github) {
            toast.error("enter valid details")
        }
        else {
            const formData = new FormData()
            formData.append("title", title)
            formData.append("overview", overview)
            formData.append("languges", language)
            formData.append("github", github)
            formData.append("demo", demo)
            preview ? formData.append("image", projectdata.projectimage) : formData.append("image", project.projectimage)

            const token = sessionStorage.getItem('token')

            if (preview) {
                const reqHeader = {
                    "Content-Type": "multipart/form-data",
                    "Authorization":`Bearer ${token}`


                }
                const result = await editproject(projectdata.id,formData,reqHeader)
                if(result.status==200)
                    {
                        toast.success( `project ${projectdata.title} updtated successfully`)
                        handleClose()
                        setEditprojectResponce(result)
                        
                    }
                    else{
                        toast.warning(result.response.data)
                    }



            }
            else {
                const reqHeader = {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`


                }
                const result = await editproject(projectdata.id,formData,reqHeader)
                console.log(result);

                if(result.status==200)
                    
                    {
                        toast.success( `project ${projectdata.title} updatated successfully`)
                        handleClose()
                        seteditprojectresponcet(result)
                        
                    }
                    else{
                        toast.warning(result.response.data)
                    }

            }

        }

    }

    console.log(projectdata);

    const handleClose = () => {
        setShow(false)
        setpreview("")
        setprojectdat({
            id: project._id, title: project.title, overview: project.overview, language: project.languges, github: project.github, demo: project.demo, projectimage: ""
    
        })
    }
   
        ;
    const handleShow = () => setShow(true);
    return (
        <>
            <button className="btn me-3" onClick={handleShow}>
                <i className='fa-solid fa-pen-to-square fa-2xl'></i>
            </button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Project Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <Row>
                            <Col>
                                <label>
                                    <input type="file" name="" onChange={(e) => { setprojectdat({ ...projectdata, projectimage: e.target.files[0] }) }} id="in" style={{ display: 'none' }} />
                                    <img className='img-fluid' src={preview ? preview : `${base_url}/uploads/${project.image}`} alt="" />
                                    {
                                        imagestatus &&
                                        <p className='text-danger'>Image in ivalid format</p>
                                    }
                                </label>
                            </Col>
                            <Col>
                                <div>
                                    <FloatingLabel controlId="titleinp" label="Title" className="mb-2" >
                                        <Form.Control type="text" onChange={(e) => { setprojectdat({ ...projectdata, title: e.target.value }) }} value={projectdata.title} placeholder="Project Name" />
                                    </FloatingLabel>
                                    <FloatingLabel controlId="overview" label="Overview" className="mb-2">
                                        <Form.Control type="text" onChange={(e) => { setprojectdat({ ...projectdata, overview: e.target.value }) }} value={projectdata.overview} placeholder="Brief About Project " />
                                    </FloatingLabel>
                                    <FloatingLabel controlId="langinp" label="Languages" className="mb-2">
                                        <Form.Control type="text" onChange={(e) => { setprojectdat({ ...projectdata, language: e.target.value }) }} value={projectdata.language} placeholder="Languges Used " />
                                    </FloatingLabel>
                                    <FloatingLabel controlId="githubinp" label="GitHub url" className="mb-2">
                                        <Form.Control type="text" onChange={(e) => { setprojectdat({ ...projectdata, github: e.target.value }) }} value={projectdata.github} placeholder="GitHUb url " />
                                    </FloatingLabel>

                                </div>

                            </Col>
                            <FloatingLabel controlId="demoinp" label="Demo url" className="mb-2">
                                <Form.Control type="text" onChange={(e) => { setprojectdat({ ...projectdata, demo: e.target.value }) }} value={projectdata.demo} placeholder="Demo url" />
                            </FloatingLabel>
                        </Row>

                    </div>




                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleupload}>Save</Button>
                </Modal.Footer>
            </Modal>


        </>
    )
}

export default Edit