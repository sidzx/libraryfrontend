import React from 'react'
import img from '../assets/lib.jpg'
import img1 from '../assets/collge icon.jpg'
import Header from './Header'
import register from '../assets/re.png'
import login from '../assets/register.jpg'
import Button from '@mui/material/Button';
import Login from './Login'
import { Link } from 'react-router-dom'

function Body() {

    return (
        <>
            <div style={{ height: "100vh", width: "100vw", backgroundSize: "cover", backgroundColor: "success", backgroundImage: `url(${img})`, backgroundRepeat: "no-repeat", opacity: "" }}>

                <h1 className='text-center mb-4 pt-4' style={{ fontFamily: "Fantasy", color: "white", textShadow: "2px" }}> UNIVERSITY LIBRARY MANAGEMENT SYSTEM</h1>
                <div className='d-flex justify-content-evenly'>
                    <div className='mx-0' style={{ color: "white", backgroundColor: "white", opacity: "70%", height: "50vh", width: "40vw",borderRadius:"10px" }}>
                        <div style={{ color: "black" }}>
                            <div className='d-flex flex-column justify-content-center align-items-center ' style={{ height: "40vh" }}>
                                <h3 className='text-center mb-4 pt-4' style={{ fontFamily: "Fantasy", color: "black", textShadow: "2px" }}> WELCOME TO UNIVERSITY LIBRARY</h3>


                                <img src={img1} style={{ width: "80px", height: "80px" }} />
                            </div>

                        </div>
                    </div>
                    <div style={{ color: "white" }} className='d-flex justify-content-evenly'>
                        <div style={{ color: "white", backgroundColor: "white", opacity: "70%", height: "50vh", width: "20vw",borderRadius:"10px" }} className='d-flex flex-column justify-content-evenly'>
                            <h3 className='text-center mb-4 pt-4' style={{ fontFamily: "Fantasy", color: "black", textShadow: "2px" }}> Already a user?</h3>
                            <div className='d-flex justify-content-center'>
                                <img src={login} style={{ width: "90px", height: "90px" }} />
                            </div>
                            {/* <div><h5 style={{color:"black"}}>click here to login</h5></div>   */}
                            <div className='d-flex justify-content-center '>
                                <Button type="submit" variant="contained"><Link style={{ textDecoration: 'none', color: 'white' }} to={'/login'}>Log in</Link></Button>
                            </div>

                        </div>
                        <div className='mx-2 d-flex flex-column justify-content-evenly' style={{borderRadius:"10px", color: "white", backgroundColor: "white", opacity: "70%", height: "50vh", width: "20vw" }}>
                            <h3 className='text-center mb-4 pt-4' style={{ fontFamily: "Fantasy", color: "black", textShadow: "2px" }}> New user?</h3>
                            <div className='d-flex justify-content-center'>
                                <img src={register} style={{ width: "80px", height: "80px" }} />
                            </div>
                            <div className='d-flex justify-content-center'>
                                <Button variant="contained"><Link style={{ textDecoration: 'none', color: 'white' }} to={'/reg'}>Register</Link></Button>


                            </div>


                        </div>
                    </div>

                </div>

            </div>
        </>
    )
}

export default Body