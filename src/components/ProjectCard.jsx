import React from 'react'
import Card from 'react-bootstrap/Card';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Row, Col } from 'react-bootstrap'
import server_url from '../services/server_urls'

function ProjectCard({project}) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    console.log(project);

    return (
        <>
            <Card style={{ width: '18rem' }} className='card1'>
                <Card.Img variant="top" onClick={handleShow} src={project.image?`${server_url}/uploads/${project.image}`:"https://media.geeksforgeeks.org/wp-content/uploads/20231017114110/WEB-DESIGN-copy.webp"} />
                <Card.Body>
                    <Card.Title>{project.title}</Card.Title>
                </Card.Body>
            </Card>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>{project.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col>
                            <img className='img-fluid' src={project.image?`${server_url}/uploads/${project.image}`:"https://media.geeksforgeeks.org/wp-content/uploads/20231017114110/WEB-DESIGN-copy.webp"} alt="" />
                        </Col>
                        <Col>
                            <h4>{project.title}</h4>
                            <p>{project.overview}</p>
                            <h6>{project.languges}</h6>
                            <div>
                                <a href={project.github} className='me-3'><i class="fa-brands fa-github fa-xl"></i></a>
                                <a href={project.demo}><i class="fa-solid fa-link fa-xl"></i></a>


                            </div>
                        </Col>

                    </Row>
                </Modal.Body>

            </Modal>
        </>
    )
}

export default ProjectCard