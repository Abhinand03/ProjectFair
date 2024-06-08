import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Row, Col } from 'react-bootstrap'
import { toast } from 'react-toastify';
import { addproject } from '../services/allApis';
import { addProjectsResponseContext } from '../context/Contextapi';

function Add() {

    const { addProjectResponce, setaddProjectResponce } = useContext(addProjectsResponseContext)
    const [preview, setpreview] = useState("")
    const [show, setShow] = useState(false);
    const [imagestatus, setimagestatus] = useState(false)
    const [projectData, setProjectdata] = useState({
        title: "", overview: "", languages: "", github: "", demo: "", projectimage: ""
    })
    useEffect(() => {
        console.log(projectData);

        if (projectData.projectimage.type == "image/jpg" || projectData.projectimage.type == "image/jpeg" || projectData.projectimage.type == "image/png") {
            console.log("image is correct format");
            setimagestatus(false)
            setpreview(URL.createObjectURL(projectData.projectimage))
        }
        else {
            console.log("Invalid file format!! image should be jpg,pngor jpeg");
            setimagestatus(true)
            setpreview("")
        }

    }, [projectData.projectimage])

    const HandleAddproject = async () => {
        const { title, overview, github, demo, projectimage, languages } = projectData
        if (!title || !overview || !github || !demo || !projectimage || !languages) {
            toast.warning("Fill Details Properly")

        }
        else {
            const formData = new FormData()
            formData.append("title", title)
            formData.append("overview", overview)
            formData.append("languges", languages)
            formData.append("github", github)
            formData.append("demo", demo)
            formData.append("image", projectimage)

            const token = sessionStorage.getItem('token')
            const reqHeader = {
                "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${token}`


            }
            const result = await addproject(formData, reqHeader)
            if (result.status == 200) {
                toast.success("project added successfully")
                setProjectdata({
                    title: "", overview: "", languages: "", github: "", demo: "", projectimage: ""
                })
                handleClose()
                setaddProjectResponce(result)
            }
            else {
                toast.error(result.response.data)
            }

        }

    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <button className='btn btn-success' onClick={handleShow}>Add Project</button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Modal title</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <Row>
                            <Col>

                                <label>
                                    <input type="file" name="" onChange={(e) => { setProjectdata({ ...projectData, projectimage: e.target.files[0] }) }} style={{ display: 'none' }} />
                                    <img className='img-fluid' src={preview ? preview : "https://images.vexels.com/media/users/3/144131/isolated/preview/29576a7e0442960346703d3ecd6bac04-picture-doodle-icon.png"} alt="" />
                                </label>
                                {
                                    imagestatus && <p className='text-danger'>Invalid file format!! image should be jpg,pngor jpeg</p>
                                }
                            </Col>
                            <Col>
                                <div>
                                    <FloatingLabel controlId="titleinp" label="Title" className="mb-2" >
                                        <Form.Control type="text" placeholder="Project Name" onChange={(e) => { setProjectdata({ ...projectData, title: e.target.value }) }} />
                                    </FloatingLabel>
                                    <FloatingLabel controlId="overview" label="Overview" className="mb-2">
                                        <Form.Control type="text" placeholder="Brief About Project " onChange={(e) => { setProjectdata({ ...projectData, overview: e.target.value }) }} />
                                    </FloatingLabel>
                                    <FloatingLabel controlId="langinp" label="Languages" className="mb-2">
                                        <Form.Control type="text" placeholder="Languges Used " onChange={(e) => { setProjectdata({ ...projectData, languages: e.target.value }) }} />
                                    </FloatingLabel>
                                    <FloatingLabel controlId="githubinp" label="GitHub url" className="mb-2">
                                        <Form.Control type="text" placeholder="GitHUb url " onChange={(e) => { setProjectdata({ ...projectData, github: e.target.value }) }} />
                                    </FloatingLabel>

                                </div>

                            </Col>
                            <FloatingLabel controlId="demoinp" label="Demo url" className="mb-2">
                                <Form.Control type="text" placeholder="Demo url" onChange={(e) => { setProjectdata({ ...projectData, demo: e.target.value }) }} />
                            </FloatingLabel>
                        </Row>

                    </div>




                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={HandleAddproject}>save</Button>
                </Modal.Footer>
            </Modal>


        </>
    )
}

export default Add