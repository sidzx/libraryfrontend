import React, { useEffect, useState } from 'react'
import img from '../assets/lib.jpg'
import { TextField } from '@mui/material'
import { Button } from 'react-bootstrap'
import { resetPW } from '../services/allapi'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

function Reset() {
  const navigate=useNavigate()
  const [password,setPassword]=useState("")
  const [cpassword,setCpassword]=useState("")
  
  console.log(password)

  console.log(cpassword)

  const fun=async(e)=>{
    e.preventDefault()
    if(password === cpassword){ 
      const id = sessionStorage.getItem('currentuser');
      console.log(id)
      const sid=JSON.parse(id)
    console.log(sid)
 
    const result =await resetPW(sid,{password})
    console.log(result)
    if(result.status===200){
      toast.success("password changed successfully")
      sessionStorage.clear()
      navigate('/login')
      
    }else{
      toast.error("something went wrong")
    }
  }
    else{
      toast.error("Passwords dont match")
    }
  }
 
 
   
  return (
    <>
     <div className='d-flex justify-content-center ' style={{backgroundImage:`url(${img})`,width:"99vw",height:"100vh",}}>
    <div className='d-flex flex-column justify-content-center align-items-center mt-3' style={{backgroundColor:"white",backgroundSize:"cover",width:"400px",height:"50vh",borderRadius:"20px"}}>

        
    <h4>Enter New Password:</h4>
    <br />
    <form>
        <input type='password' style={{width:"350px"}}  onChange={(e) => setPassword(e.target.value)} value={password} className='form-control my-3' placeholder='Enter new password' />
        <input type='password' style={{width:"350px"}}  onChange={(e) => setCpassword(e.target.value)} value={cpassword} className='form-control mt-5' placeholder='confirm passsword' />
        
        <div className='d-flex justify-content-center mt-3'>
        <Button onClick={(e)=>fun(e)}  variant="primary">Submit</Button>
        </div>
    </form>
      
        </div>
    </div>

    </>
  )
}

export default Reset