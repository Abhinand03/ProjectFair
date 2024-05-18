import React, { useContext, useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import { userlogin, userregister } from '../services/allApis';
import { useNavigate } from 'react-router-dom';
import { TokenAuthContext } from '../context/Authcontext';


function Auth() {
    const {authstatus,setauthstatus}=useContext(TokenAuthContext)

    const [status, setstatus] = useState(true)
    const navigate = useNavigate()

    const [data, setdata] = useState({
        username: "", password: "", email: ""
    })
    console.log(data);
    const chnageStatus = () => {
        setstatus(!status)
    }
    const handlergister = async () => {
        const { username, password, email } = data
        if (!username || !password || !email) {
            toast.warning("Fill properly")

        }
        else {
            const result = await userregister(data)
            console.log(result);
            if (result.status == 201) {
                toast.success("user registration sucees")
                setstatus(true)
            }
            else {
                toast.error(result.response.data)
            }

        }


    }
    const handleLogin = async () => {
        const { email, password } = data
        if (!email || !password) {
            toast.warning("Inavalid Details!!")
        }
        else {
            const result = await userlogin({ email, password })
            console.log(result);
            if (result.status == 200) {
                sessionStorage.setItem("token", result.data.token)
                sessionStorage.setItem("username", result.data.user)
                sessionStorage.setItem('userDetails',JSON.stringify(result.data.userDetails))
                toast.success("login success")
                navigate("/")
                setauthstatus(true)

            }
            else{
                toast.error(result.response.data)
            }


        }
    }


    return (
        <>
            <div className='d-flex justify-content-center align-items-center w-100' style={{ height: '100vh' }}>
                <div className='shadow border w-50 p-4'>
                    <Row>
                        <Col sm={12} md={6}>
                            {
                                status ?
                                    <img src="https://img.lovepik.com/photo/45009/7677.jpg_wh860.jpg" className='img-fluid' alt="image" />

                                    :
                                    <img className='img-fluid' src="https://t3.ftcdn.net/jpg/05/56/55/06/360_F_556550658_HdTG42xb5HCJENnAJ9FtanFpITpRvK67.jpg" alt="" />
                            }
                        </Col>
                        <Col sm={12} md={6}>
                            {
                                status ?
                                    <h3>Login</h3>
                                    :
                                    <h3>Register</h3>


                            }
                            <div className='mt-5'>
                                {
                                    !status &&
                                    <FloatingLabel controlId="user" label="username" className="mb-3">
                                        <Form.Control type="text" onChange={(e) => { setdata({ ...data, username: e.target.value }) }} placeholder="Username" />
                                    </FloatingLabel>
                                }
                                <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3">
                                    <Form.Control type="email" onChange={(e) => { setdata({ ...data, email: e.target.value }) }} placeholder="name@example.com" />
                                </FloatingLabel>
                                <FloatingLabel controlId="floatingPassword" label="Password">
                                    <Form.Control type="password" onChange={(e) => { setdata({ ...data, password: e.target.value }) }} placeholder="Password" />
                                </FloatingLabel>

                            </div>
                            <div className='mt-4'>

                                {
                                    status ?
                                        <button className='btn btn-success me-3' type='submit' onClick={handleLogin}>
                                            <span>Login</span>
                                        </button>

                                        :
                                        <button className='btn btn-success me-3' type='submit' onClick={handlergister}>
                                            <span>Register</span>
                                        </button>

                                }
                                <button className='btn btn-link' onClick={chnageStatus}>
                                    {
                                        status ?
                                            <span>Are You New?</span> :
                                            <span>Already a User</span>
                                    }
                                </button>
                            </div>
                        </Col>
                    </Row>

                </div>
            </div>


        </>
    )
}

export default Auth