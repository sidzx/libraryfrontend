import React, { useState } from 'react'
import img from '../assets/lib.jpg'
import { FormLabel } from 'react-bootstrap'
import { Input } from '@mui/material'
import {TextField} from '@mui/material'

import { verifyMail } from '../services/allapi'

import { useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import { toast } from 'react-toastify'
function ForgotPassword() {
    const navigate = useNavigate()

    const [fog,setFog]=useState({
        email:""
    })
    const fun=async(e)=>{
        e.preventDefault()
        if(!fog.email){
            toast.warning("enter email")
        }
        else{
            const result=await verifyMail(fog)
            console.log(result)
            if (result.status==200){
                toast.success("email verified successfully")
                navigate('/reset')
                sessionStorage.setItem("currentuser",JSON.stringify(result.data._id))
            }
            else{
                toast.error("email not registered")
                navigate('/login')
            }

        }

    }
    console.log(fog)
  return (
    <>
    <div className='d-flex justify-content-center ' style={{backgroundImage:`url(${img})`,width:"99vw",height:"100vh",}}>
    <div className='d-flex flex-column justify-content-center align-items-center mt-3' style={{backgroundColor:"white",backgroundSize:"cover",width:"400px",height:"50vh",borderRadius:"20px"}}>

        
    <h4>Enter your Email Address:</h4>
    <br />
    <form>
        <input style={{width:"350px"}} onChange={(e)=>{setFog({...fog,email:e.target.value})}} className='form-control' placeholder='Enter you email'></input>
        {/* <TextField></TextField> */}
        <div className='d-flex justify-content-center mt-3'>
        <Button  onClick={(e)=>fun(e)} variant="primary">Submit</Button>
        </div>
    </form>
      
        </div>
    </div>

    </>
  )
}

export default ForgotPassword