// import React from 'react'
// import { Container, Row, Col, Button } from 'react-bootstrap'
// import Adminsidebar from './Adminsidebar'
// import { FormLabel } from 'react-bootstrap'
// import { useEffect, useState } from 'react'
// import { editAdmin, updateAdmin } from '../services/allapi'
// import { useNavigate } from 'react-router-dom'
// import { base_url } from '../services/baseurl'

// function EditProfile() {
//     const navigate = useNavigate()

//     const [admin, setAdmin] = useState({

//     })

//     const [editedadmin, setEditedadmin] = useState({})
//     const [preview, setPreview] = useState("")

//     const getUser = async (id) => {
//         const result = await updateAdmin(id)
//         console.log(result.data)
//         const fetchedAdmin = result.data;

//         // Format `dob` if it exists
//         if (fetchedAdmin.dob) {
//             fetchedAdmin.dob = new Date(fetchedAdmin.dob).toISOString().split('T')[0];
//         }
    
//         setAdmin(fetchedAdmin);
//         setEditedadmin(fetchedAdmin);
//         // setAdmin(result.data)
//         // setEditedadmin(result.data)
//         console.log(admin.dob)
//     }


//     useEffect(() => {
//         if (editedadmin.profile != admin.profile) {
//             setPreview(URL.createObjectURL(editedadmin.profile))
//         }
//     }, [editedadmin.profile])

//     const update = async (e) => {
//         e.preventDefault()
//         const adminedit = new FormData()
//         adminedit.append("name", editedadmin.name)
//         adminedit.append("age", editedadmin.age)
//         adminedit.append("gender", editedadmin.gender)
//         adminedit.append("dob", editedadmin.dob)
//         adminedit.append("address", editedadmin.address)
//         adminedit.append("profile", editedadmin.profile)
//         adminedit.append("email", editedadmin.email)
//         adminedit.append("password", editedadmin.password)


//         const Header = {
//             'Content-Type': 'multipart/form-data'
//         }
//         const result = await editAdmin(admin._id, adminedit, Header)
//         console.log(result)
//         if (result.status === 200) {
//             alert("updated succesusfully")
//             navigate("/admin")
//         }
//         else {
//             alert(result.response.data)
//         }
//     }

//     useEffect(() => {
//         const uid = localStorage.getItem("currentUser")
//         const id = JSON.parse(uid)
//         console.log(id)
//         getUser(id)

//     }, [])



//     console.log(preview)
//     console.log(editedadmin)
//     console.log(admin)




//     return (

//        <div className=' row d-flex align-items-center' style={{height:"auto"}}>
//         <div className='col-lg-2 col-sm-2'>
//             <Adminsidebar/>
//         </div>
//          <div  className='container col-lg-10 col-sm-10'>
//                     <form action="">
//                         <div style={{  backgroundColor: "#DAB179",borderRadius:"10px" }} className='row  '>
                            
//                                 <div className='col-lg-4 col' >

//                                     <FormLabel style={{ color: "black", fontStyle: "italic" }}>Profile:
//                                         <br />
//                                         <input onChange={(e) => { setEditedadmin({ ...editedadmin, profile: e.target.files[0] }) }} className="form-control" type='file' name="profile" id="profile" placeholder='upload your image' />
//                                         <img height={'200px'} width={'320px'} src={preview ? preview : `${base_url}/upload/${admin.profile}`} alt="" />
//                                     </FormLabel>

//                                 </div>
//                                 <div className='col-lg-4'>

//                                     <FormLabel style={{ color: "black", fontStyle: "italic" }}>Name:</FormLabel>
//                                     <input defaultValue={admin.name} onChange={(e) => { setEditedadmin({ ...editedadmin, name: e.target.value }) }} type='text' name="name" id="name" placeholder='Enter your name' className='form-control mb-lg-4' />
//                                     <FormLabel style={{ color: "black", fontStyle: "italic" }}>Age:</FormLabel>
//                                     <input defaultValue={admin.age} onChange={(e) => { setEditedadmin({ ...editedadmin, age: e.target.value }) }} type='text' name="age" id="age" placeholder='Enter your name' className='form-control mb-lg-4' />
//                                     <FormLabel style={{ color: "black", fontStyle: "italic" }}>Dob:</FormLabel>
//                                     <input defaultValue={admin.dob}  onChange={(e) => { setEditedadmin({ ...editedadmin, dob: e.target.value }) }} type='date' name="dob" id="dob" placeholder='Enter your dob' className='form-control mb-lg-4' />
//                                     <FormLabel style={{ color: "black", fontStyle: "italic" }}>Gender:</FormLabel>
//                                     <br />
//                                     <FormLabel className='mx-2' style={{ color: "black", fontStyle: "italic" }}>Male:</FormLabel>
//                                     <input checked={admin.gender === "male"} onChange={(e) => { setEditedadmin({ ...editedadmin, gender: e.target.value }) }} type="radio" name="gender" id="male" value="male" className='form-check-input mx-2 mb-lg-4' />
//                                     <FormLabel className='mx-2' style={{ color: "black", fontStyle: "italic" }}>Female:</FormLabel>
//                                     <input checked={admin.gender === "female"} onChange={(e) => { setEditedadmin({ ...editedadmin, gender: e.target.value }) }} type="radio" name="gender" id="female" value="female" className='form-check-input mx-2 mb-lg-4' />


//                                 </div>
//                                 <div className=' col-lg-4 col d-flex flex-column justify-content-center'>

//                                     <FormLabel style={{ color: "black", fontStyle: "italic" }}>Email:</FormLabel>
//                                     <input defaultValue={admin.email} onChange={(e) => { setEditedadmin({ ...editedadmin, email: e.target.value }) }} type="email" name="email" id="email" className='form-control mb-lg-4 ' placeholder='Enter your Email' />
//                                     <FormLabel style={{ color: "black", fontStyle: "italic" }}>Password:</FormLabel>
//                                     <input defaultValue={admin.password} onChange={(e) => { setEditedadmin({ ...editedadmin, password: e.target.value }) }} type="password" name="password" id="password" className='form-control mb-lg-4 ' placeholder='Enter your password' />
//                                     <FormLabel style={{ color: "black", fontStyle: "italic" }}>Address:</FormLabel>
//                                     <br />
//                                     <textarea defaultValue={admin.address} onChange={(e) => { setEditedadmin({ ...editedadmin, address: e.target.value }) }} name='address' className='form-control mb-lg-4' placeholder='Enter your address'></textarea>
//                                     <Button className='mt-4 mb-5' onClick={(e) => update(e)} variant='primary'>Update</Button>

//                                 </div>
                            
//                         </div>
//                         </form>
//                     {/* </div> */}


        
      
//         </div>
//        </div>
//     )
// }

// export default EditProfile

import React from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import Adminsidebar from './Adminsidebar'
import { FormLabel } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import { editAdmin, updateAdmin } from '../services/allapi'
import { useNavigate } from 'react-router-dom'
import { base_url } from '../services/baseurl'
import { toast } from 'react-toastify'

function EditProfile() {
    const navigate = useNavigate()

    const [admin, setAdmin] = useState({

    })

    const [editedadmin, setEditedadmin] = useState({})
    const [preview, setPreview] = useState("")

    const getUser = async (id) => {
        const result = await updateAdmin(id)
        console.log(result.data)
        const fetchedAdmin = result.data;

        // Format `dob` if it exists
        if (fetchedAdmin.dob) {
            fetchedAdmin.dob = new Date(fetchedAdmin.dob).toISOString().split('T')[0];
        }
    
        setAdmin(fetchedAdmin);
        setEditedadmin(fetchedAdmin);
        // setAdmin(result.data)
        // setEditedadmin(result.data)
        console.log(admin.dob)
    }


    useEffect(() => {
        if (editedadmin.profile != admin.profile) {
            setPreview(URL.createObjectURL(editedadmin.profile))
        }
    }, [editedadmin.profile])

    const update = async (e) => {
        e.preventDefault()
        const adminedit = new FormData()
        adminedit.append("name", editedadmin.name)
        adminedit.append("age", editedadmin.age)
        adminedit.append("gender", editedadmin.gender)
        adminedit.append("dob", editedadmin.dob)
        adminedit.append("address", editedadmin.address)
        adminedit.append("profile", editedadmin.profile)
        adminedit.append("email", editedadmin.email)
        adminedit.append("password", editedadmin.password)


        const Header = {
            'Content-Type': 'multipart/form-data'
        }
        const result = await editAdmin(admin._id, adminedit, Header)
        console.log(result)
        if (result.status === 200) {
            toast.success("updated succesusfully")
            navigate("/admin")
        }
        else {
            toast.error(result.response.data)
        }
    }

    useEffect(() => {
        const uid = localStorage.getItem("currentUser")
        const id = JSON.parse(uid)
        console.log(id)
        getUser(id)

    }, [])



    console.log(preview)
    console.log(editedadmin)
    console.log(admin)




    return (
    <div>
        <div className="row">
            <div className='col-sm-3 col-3' style={{height:"90vh"}}>
                    <Adminsidebar/>
            </div>
            <div className="col-sm-9 col-9">
                <h1 className='text-center'><i><strong>Edit profile</strong></i></h1>
            <form action="">
                        <div style={{  backgroundColor: "#DAB179",borderRadius:"10px",marginRight:'0px',marginLeft:'0px' }} className='row  '>
                            
                                <div className='col-lg-4 col' >
                                    

                                    <FormLabel style={{ color: "black", fontStyle: "italic" }}>Profile:
                                        <br />
                                        <input onChange={(e) => { setEditedadmin({ ...editedadmin, profile: e.target.files[0] }) }} className="form-control" type='file' name="profile" id="profile" placeholder='upload your image' />
                                        <img height={'200px'} width={'320px'} src={preview ? preview : `${base_url}/upload/${admin.profile}`} alt="" className='img-fluid'/>
                                    </FormLabel>

                                </div>
                                <div className='col-lg-4'>

                                    <FormLabel style={{ color: "black", fontStyle: "italic" }}>Name:</FormLabel>
                                    <input defaultValue={admin.name} onChange={(e) => { setEditedadmin({ ...editedadmin, name: e.target.value }) }} type='text' name="name" id="name" placeholder='Enter your name' className='form-control mb-lg-4' />
                                    <FormLabel style={{ color: "black", fontStyle: "italic" }}>Age:</FormLabel>
                                    <input defaultValue={admin.age} onChange={(e) => { setEditedadmin({ ...editedadmin, age: e.target.value }) }} type='text' name="age" id="age" placeholder='Enter your name' className='form-control mb-lg-4' />
                                    <FormLabel style={{ color: "black", fontStyle: "italic" }}>Dob:</FormLabel>
                                    <input defaultValue={admin.dob}  onChange={(e) => { setEditedadmin({ ...editedadmin, dob: e.target.value }) }} type='date' name="dob" id="dob" placeholder='Enter your dob' className='form-control mb-lg-4' />
                                    <FormLabel style={{ color: "black", fontStyle: "italic" }}>Gender:</FormLabel>
                                    <br />
                                    <FormLabel className='mx-2' style={{ color: "black", fontStyle: "italic" }}>Male:</FormLabel>
                                    <input checked={admin.gender === "male"} onChange={(e) => { setEditedadmin({ ...editedadmin, gender: e.target.value }) }} type="radio" name="gender" id="male" value="male" className='form-check-input mx-2 mb-lg-4' />
                                    <FormLabel className='mx-2' style={{ color: "black", fontStyle: "italic" }}>Female:</FormLabel>
                                    <input checked={admin.gender === "female"} onChange={(e) => { setEditedadmin({ ...editedadmin, gender: e.target.value }) }} type="radio" name="gender" id="female" value="female" className='form-check-input mx-2 mb-lg-4' />


                                </div>
                                <div className=' col-lg-4 col d-flex flex-column justify-content-center'>

                                    <FormLabel style={{ color: "black", fontStyle: "italic" }}>Email:</FormLabel>
                                    <input defaultValue={admin.email} onChange={(e) => { setEditedadmin({ ...editedadmin, email: e.target.value }) }} type="email" name="email" id="email" className='form-control mb-lg-4 ' placeholder='Enter your Email' />
                                    <FormLabel style={{ color: "black", fontStyle: "italic" }}>Password:</FormLabel>
                                    <input defaultValue={admin.password} onChange={(e) => { setEditedadmin({ ...editedadmin, password: e.target.value }) }} type="password" name="password" id="password" className='form-control mb-lg-4 ' placeholder='Enter your password' />
                                    <FormLabel style={{ color: "black", fontStyle: "italic" }}>Address:</FormLabel>
                                    <br />
                                    <textarea defaultValue={admin.address} onChange={(e) => { setEditedadmin({ ...editedadmin, address: e.target.value }) }} name='address' className='form-control mb-lg-4' placeholder='Enter your address'></textarea>
                                    <Button className='mt-4 mb-5' onClick={(e) => update(e)} variant='primary'>Update</Button>

                                </div>
                            
                        </div>
                        </form>

            </div>
        </div>
    </div>
  )
}

export default EditProfile