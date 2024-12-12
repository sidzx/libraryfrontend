import React from 'react'
import img1 from '../assets/collge icon.jpg'

function Header() {

    
  return (
    <>
    
    <nav className='navbar navbar-expand-lg border bg-dark' >
        <div className='navbar container-fluid d-flex justify-content-evenly'>
            <a class=" navbar-brand mx-4 " href="#">
                <img  className="m-0"src={img1} style={{width:"50px",height:"50px"}}/>
                <span style={{alignItems: "center",fontStyle:"italic",color:"white"}}>University
                    
                </span>
            </a>
            <button type="button" style={{color:"white"}}class="navbar-toggler" data-bs-target="#navbarSupportedContent"
                data-bs-toggle="collapse">
                <span  class="navbar-toggler-icon"></span>
            </button>
            <div class="navbar-collapse collapse " id="navbarSupportedContent" >
           

            </div>


        </div>
    </nav>
   
    </>
  )
}

export default Header