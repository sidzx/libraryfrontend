import React from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

function Adminsidebar() {


    const logout=async()=>{
      
        localStorage.clear()
    }
  return (
    <>
    <div className='d-flex flex-column justify-content-evenly' style={{height:"90vh",width:"20vw",backgroundImage: "linear-gradient(to right, #f53844, #42378f)"}}>
        <div className='d-flex justify-content-center align-items-center mx-lg-5 mx-  '  style={{height:"8vh",width:"auto",borderRadius:"5px",backgroundImage: "linear-gradient(to right,  #13547a,#80d0c7)",fontStyle:"italic"}}>
            <a style={{color:"white",textDecoration:"none"}} href="/admin">Dashboard</a>
        </div>
        <div className='d-flex justify-content-center align-items-center mx-lg-5'  style={{height:"8vh",borderRadius:"5px",backgroundImage: "linear-gradient(to right,  #13547a,#80d0c7)",fontStyle:"italic",}}>
            <a style={{color:"white",textDecoration:"none"}} href="/editadmin">Edit profile</a>
        </div>
        <div className='d-flex justify-content-center align-items-center mx-lg-5'  style={{height:"8vh",borderRadius:"5px",backgroundImage: "linear-gradient(to right,  #13547a,#80d0c7)",fontStyle:"italic",}}>
            <a style={{color:"white",textDecoration:"none"}} href="/addbooks">Add Books</a>
        </div>
        <div className='d-flex justify-content-center align-items-center mx-lg-5'  style={{height:"8vh",borderRadius:"5px",backgroundImage: "linear-gradient(to right,  #13547a,#80d0c7)",fontStyle:"italic",}}>
            <a style={{color:"white",textDecoration:"none"}} href="/viewbooks">View Books</a>
        </div>
     
        
        <div className='d-flex justify-content-center align-items-center mx-lg-5'  style={{height:"8vh",borderRadius:"5px",backgroundImage: "linear-gradient(to right,  #13547a,#80d0c7)",fontStyle:"italic",}}>
            <a style={{color:"white",textDecoration:"none"}} href="/reserves">Approve Books</a>
        </div>
        <div className='d-flex justify-content-center align-items-center mx-lg-5'  style={{height:"8vh",borderRadius:"5px",backgroundImage: "linear-gradient(to right,  #13547a,#80d0c7)",fontStyle:"italic",}}>
            <a style={{color:"white",textDecoration:"none"}} href="/viewusers"> View Users</a>
        </div>
        <div className='d-flex justify-content-center align-items-center mx-lg-5'  style={{height:"8vh",borderRadius:"5px",backgroundImage: "linear-gradient(to right,  #13547a,#80d0c7)",fontStyle:"italic",}}>
            <a style={{color:"white",textDecoration:"none"}}  href="/login" onClick={()=>{logout()}}> Log Out</a>
        </div>

    </div>
    {/* <div
  className="d-flex flex-column justify-content-evenly"
  style={{
    height: "100vh",
    width: "20vw",
    backgroundColor: "#72412F",
    position: "fixed",
    top: 0,
    left: 0,
    color: "white",
  }}
>
 
  {[
    { href: "/admin", label: "Dashboard" },
    { href: "/editadmin", label: "Edit Profile" },
    { href: "/addbooks", label: "Add Books" },
    { href: "/viewbooks", label: "View Books" },
    { href: "/reserves", label: "Approve Books" },
    { href: "/viewusers", label: "View Users" },
    { href: "/login", label: "Log Out", onClick: logout },
  ].map((link, index) => (
    <div
      key={index}
      className="d-flex justify-content-center align-items-center mx-3 my-2"
      style={{
        height: "60px",
        backgroundColor: "DodgerBlue",
        borderRadius: "5px",
        transition: "background-color 0.3s ease",
        fontStyle: "italic",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#1E90FF")}
      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "DodgerBlue")}
    >
      <a
        href={link.href}
        onClick={link.onClick || null}
        style={{
          color: "white",
          textDecoration: "none",
          fontSize: "1rem",
          fontWeight: "bold",
        }}
      >
        {link.label}
      </a>
    </div>
  ))}
</div> */}

    </>
  )
}

export default Adminsidebar