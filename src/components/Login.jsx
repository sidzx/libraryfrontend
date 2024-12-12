import React, { useState } from 'react'
import Header from './Header'
import img from "../assets/lib.jpg"
import img1 from "../assets/bglog.jpg"
import lg from "../assets/register.jpg"
import { TextField } from '@mui/material'
import { Button } from '@mui/material'
import { logStudent } from '../services/allapi'
import { useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify'

function Login() {

  const navigate = useNavigate()
  const [log,setLog]=useState({
    email:"",
    password:""
  })
  const login=async(e)=>{
    e.preventDefault()
    if(!log.email || !log.password){
      toast.warning("enter all values")
  }
  else{
      const result = await logStudent(log)
      console.log(result)
      if(result.status === 200){
          toast.success("logged in ")
          localStorage.setItem("currentUser",JSON.stringify(result.data.existingStudent._id)) 
          localStorage.setItem("role",result.data.role)
          localStorage.setItem("token",result.data.token) 
          navigate(localStorage.getItem("role")==="Admin"?'/admin' : '/student')

          setLog({
              email:'',
              password:''
          })
      }
      else{
          toast.error("invalid")
      }
  }

  }
  return (
    <>
     
   
    <div className='d-flex justify-content-center ' style={{backgroundImage:`url(${img})`,width:"99vw",height:"100vh",}}>
   
      <div className='d-flex flex-column justify-content-center align-items-center mt-3' style={{backgroundColor:"white",backgroundSize:"cover",width:"300px",height:"70vh",borderRadius:"20px"}}>
        <img src={lg} className='mt-0 ' style={{width:"80px"}}/>
        <h3 style={{color:"black",fontFamily:"serif"}} className='text-center mt-3'>LOG IN</h3>
        <div className='d-flex flex-column justify-content-between align-items-center'>
          
          <TextField value={log.email}  onChange={(e)=>{setLog({...log,email:e.target.value})}} className='my-5' label="Email" placeholder="Enter your Email"color="#0F0D0E"  style={{width:"auto",opacity:"30"}} />
          <TextField  value={log.password} type='password' onChange={(e)=>{setLog({...log,password:e.target.value})}} label="Password" placeholder="Enter your Password" color="#FBF4F9"  style={{width:"auto",opacity:"30"}} />
            <span style={{marginLeft:"135px"}} ><a style={{ color: "black" ,textDecoration:"none",fontSize:"10px"}} href='/forgot'>Forgot Password? </a></span>
          <Button  onClick={(e)=>{login(e)}} className='mt-3 mb-2' variant="contained">Log in</Button>
          <a style={{ color: "black" ,textDecoration:"none"}} href='/reg'>New user!!Click here to  Register</a>
          

        </div>

      </div>
    </div>
   
    </>
  )
}

export default Login