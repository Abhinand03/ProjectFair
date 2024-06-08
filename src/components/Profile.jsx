import React, { useEffect, useState } from 'react'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import bse_url from '../services/server_urls'
import base_url from '../services/server_urls';
import { toast } from 'react-toastify';
import { profileUpdate } from '../services/allApis';

function Profile() {

    const [user, setuser] = useState({
        id: "", email: "", password: "", username: "", github: "", linkedin: "", profile: ""
    })
    const [existingprofile, setexistingprofile] = useState("")
    const [preview, setpreview] = useState("")
    const [open, setopen] = useState(false)
    useEffect(() => {
        if (sessionStorage.getItem('token')) {
            const userDetails = JSON.parse(sessionStorage.getItem('userDetails'))
            setuser({ id: userDetails._id, username: userDetails.username, email: userDetails.email, github: userDetails.github, linkedin: userDetails.linkedin, password: userDetails.password, profile: "" })
            setexistingprofile(userDetails.profile)


        }

    }, [open])


    useEffect(() => {
        if (user.profile) {
            setpreview(URL.createObjectURL(user.profile))
        }
        else {
            setpreview("")
        }
    })
    const handleupdate = async() => {
        console.log(user);
        const {username,password,email,github,linkedin,profile}=user
        if(!username||!password||!email||!github||!linkedin)
            {
                toast.warning("enter valid inputs")
            }
            else{
                const formdata=new FormData()
                formdata.append("username",username)
                formdata.append("password",password)
                formdata.append("email",email)
                formdata.append("github",github)
                formdata.append("linkedin",linkedin)
                preview?formdata.append("profile",profile):formdata.append("profile",existingprofile)

                const header={
                    "Authorization":`Bearer ${sessionStorage.getItem('token')}`,
                    "Content-Type":preview? "multipart/form-data":"application/json"

                }
                const result= await profileUpdate(header,formdata)
                {
                    if(result.status==200){
                        console.log(result.data);
                        toast.success("profile successfully Updated")
                        sessionStorage.setItem("userDetails",JSON.stringify(result.data))
                        setopen(!open)
                    }
                    else{
                        toast.error(result.responce.data)
                    }
                }


            }
        
    }


    console.log(user);
    return (
        <>
            <div className='p-5 border shadow border-3 m-3'>
                <div className='d-flex justify-content-between'>
                    <h4>Profile</h4>
                    <button className='btn shadow p-3' onClick={() => { setopen(!open) }}>
                        <i className='fa-solid fa-down-long fa-xl' style={{ color: 'green' }}></i>
                    </button>
                </div>
                {
                    open &&
                    <div>
                        <label>
                            <input type="file" name="" id="in" onChange={(e) => setuser({ ...user, profile: e.target.files[0] })} style={{ display: 'none' }} />
                            {
                                existingprofile == "" ?
                                    <img className='img-fluid' style={{ width: '180px' }} src={preview ? preview : "  https://static.vecteezy.com/system/resources/previews/022/123/337/original/user-icon-profile-icon-account-icon-login-sign-line-vector.jpg"} alt="" />
                                    :
                                    <img className='img-fluid' style={{ width: '180px' }} src={preview ? preview : `${base_url}/uploads/${existingprofile}`} alt="" />


                            }
                            
                        </label>
                        <FloatingLabel controlId="username" label="UserName" className="mb-2" >
                            <Form.Control type="text" value={user.username} onChange={(e) => setuser({ ...user, username: e.target.value })} placeholder="User name" />
                        </FloatingLabel>
                        <FloatingLabel controlId="github" label="GitHub url" className="mb-2">
                            <Form.Control type="text" value={user.github} onChange={(e) => setuser({ ...user, github: e.target.value })} placeholder="GitHub url" />
                        </FloatingLabel>
                        <FloatingLabel controlId="linkedin" label="Linked In url" className="mb-2">
                            <Form.Control type="text" value={user.linkedin} onChange={(e) => setuser({ ...user, linkedin: e.target.value })} placeholder="LinkedIn url " />
                        </FloatingLabel>
                        <div className='d-grid mt-3'>
                            <button className='btn btn-block btn-warning' onClick={handleupdate}>Update</button>
                        </div>
                    </div>

                }


            </div>
        </>
    )
}

export default Profile