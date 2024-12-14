import React, { useRef, useState } from 'react'
import bg from '../assets/lib.jpg'
import Header from './Header'
import { FormLabel } from 'react-bootstrap'
import { Button } from '@mui/material'
import { studentRegister } from '../services/allapi'
import { toast } from 'react-toastify'


function Registration() {

    const [student, setStudent] = useState({
        name: "",
        age: "",
        dob: "",
        gender: "",
        email: "",
        password: "",
        profile: "",
        address: ""

    })

    const formRef = useRef(null)

    const [validatename, setValidatename] = useState(true)
    const [validateage, setValidateage] = useState(true)
    const [validatedob, setValidatedob] = useState(true)
    const [validategender, setValidategender] = useState(true)
    const [validateemail, setValidateemail] = useState(true)
    const [validatepassword, setValidatepassword] = useState(true)
    const [validateaddress, setValidateaddress] = useState(true)
    const [validateprofile, setValidateprofile] = useState(true)

    const reg = (e) => {
        const { name, value } = e.target
        if (name == "name") {
            if (!!value.match(/^[a-z A-Z]{1,}$/)) {
                setStudent({ ...student, [name]: value })
                setValidatename(true)


            }
            else {
                setValidatename(false)

            }
        }
        else if (name == "age") {
            if (!!value.match(/^[0-9]{1,}$/)) {
                setStudent({ ...student, [name]: value })
                setValidateage(true)


            }
            else {
                setValidateage(false)

            }
        }
        else if (name == "dob") {
            if (!!value.match(/^[0-9-/]{6,}$/)) {
                setStudent({ ...student, [name]: value })
                setValidatedob(true)


            }
            else {
                setValidatedob(false)

            }
        }
        else if (name == "gender") {
            if (!!value.match(/^[a-z]{4,}$/)) {
                setStudent({ ...student, [name]: value })
                setValidategender(true)


            }
            else {
                setValidategender(false)

            }
        }
        else if (name == "address") {
            if (!!value.match(/^[a-z, A-Z ]{4,}$/)) {
                setStudent({ ...student, [name]: value })
                setValidateaddress(true)


            }
            else {
                setValidateaddress(false)

            }
        }
        else if (name == "email") {
            if (!!value.match(/^[a-z0-9._]+@[a-z0-9]+.[a-z]{2,}$/)) {
                setStudent({ ...student, [name]: value })
                setValidateemail(true)


            }
            else {
                setValidateemail(false)

            }
        }
        else if (name == "profile") {

            setStudent({ ...student, [name]: e.target.files[0] })
            setValidateprofile(true)
        }

        else {
            if (!!value.match(/^[a-zA-Z0-9@#$.]{4,}$/)) {
                setStudent({ ...student, [name]: value })
                setValidatepassword(true)


            }
            else {
                setValidatepassword(false)

            }
        }

    }
    console.log(student)

    const register = async (e) => {
        e.preventDefault()
        if (validatename && validatedob && validateage && validateaddress && validateemail && validategender && validateprofile && validatepassword) {
            console.log("hii")
            const students = new FormData()
            students.append("name", student.name)
            students.append("dob", student.dob)
            students.append("address", student.address)
            students.append("age", student.age)
            students.append("gender", student.gender)
            students.append("profile", student.profile)
            students.append("email", student.email)
            students.append("password", student.password)
            console.log(students)
            const reqHeader = {
                'Content-Type': 'multipart/form-data'
            }
            console.log(reqHeader)
            const result = await studentRegister(students, reqHeader)
            console.log(result)
            if (result.status === 200) {
                toast.success("Registered successfully")

                setStudent({
                    name: "",
                    age: "",
                    dob: "",
                    gender: "",
                    email: "",
                    password: "",
                    profile: "",
                    address: ""
                })
                formRef.current.reset()

            }
            else {
                toast.error(result.response.data)
            }
        }
        else {
            toast.error("enter valid values")
        }
    }


    return (

        <>

            <div style={{ backgroundImage: `url(${bg})`, height: "95vh", width: "100vw", backgroundSize: "cover" }}>
                <h1 className='text-center mb-4 pt-4' style={{ fontFamily: "Fantasy", color: "white", textShadow: "2px", fontStyle: "italic" }}> REGISTER</h1>
                <div className=' mx-1 d-flex justify-content-center align-items-center'>
                    <form action="" onSubmit={((e) => { register(e) })} ref={formRef}>
                        <div className='row ' >
                            <div className=" col-6" >
                                <FormLabel style={{ color: "white", fontStyle: "italic" }}>Name:</FormLabel>
                                <input onChange={(e) => { reg(e) }} type='text' name="name" id="name" placeholder='Enter your name' value={student.name} className='form-control mb-lg-4' />
                                {
                                    !validatename &&
                                    <div style={{ color: "white" }}>* invalid Name</div>
                                }
                                <FormLabel style={{ color: "white", fontStyle: "italic" }}>Age:</FormLabel>
                                <input onChange={(e) => { reg(e) }} type='text' name='age' id='age' placeholder='Enter your age' value={student.age} className='form-control mb-lg-4' />
                                {
                                    !validateage &&
                                    <div style={{ color: "white" }}>* invalid age</div>
                                }
                                <FormLabel style={{ color: "white", fontStyle: "italic" }}>Dob:</FormLabel>
                                <input onChange={(e) => { reg(e) }} type='date' name="dob" id="age" placeholder='Enter your dob' value={student.dob} className='form-control mb-lg-4' />
                                {
                                    !validatedob &&
                                    <div style={{ color: "white" }}>* invalid dob</div>
                                }


                            </div>
                            <div className=" col-6" >
                                <FormLabel style={{ color: "white", fontStyle: "italic" }}>Email:</FormLabel>
                                <input onChange={(e) => { reg(e) }} type="email" name="email" id="email" className='form-control mb-lg-4 ' placeholder='Enter your Email' />
                                {
                                    !validateemail &&
                                    <div style={{ color: "white" }}>* invalid email</div>
                                }
                                <FormLabel style={{ color: "white", fontStyle: "italic" }}>Password:</FormLabel>
                                <input onChange={(e) => { reg(e) }} type="password" name="password" id="password" className='form-control mb-lg-4 ' placeholder='Enter your password' />
                                {
                                    !validatepassword &&
                                    <div style={{ color: "white" }}>* invalid password</div>
                                }
                                <FormLabel style={{ color: "white", fontStyle: "italic" }}>Gender:</FormLabel>
                                <br />
                                <FormLabel  style={{ color: "white", fontStyle: "italic" }}>Male:</FormLabel>
                                <input onChange={(e) => { reg(e) }} type="radio" name="gender" id="male" value="male" className='form-check-input mb-lg-4' />
                                <FormLabel  style={{ color: "white", fontStyle: "italic" }}>Female:</FormLabel>
                                <input onChange={(e) => { reg(e) }} type="radio" name="gender" id="female" value="female" className='form-check-input mb-lg-4' />



                            </div>
                        </div>
                        <div>
                            <FormLabel style={{ color: "white", fontStyle: "italic" }}>Address:</FormLabel>
                            <br />
                            <textarea name='address' onChange={(e) => { reg(e) }} className='form-control mb-lg-4' placeholder='Enter your address'></textarea>
                            {
                                !validateaddress &&
                                <div style={{ color: "white" }}>* invalid Address</div>
                            }

                            <FormLabel style={{ color: "white", fontStyle: "italic" }}>Profile:</FormLabel>
                            <br />
                            <input onChange={(e) => { reg(e) }} className="form-control" type='file' name="profile" id="profile" placeholder='upload your image' />

                            <div className='d-flex justify-content-center'><Button type='submit' className='mt-5' variant="contained">Register</Button></div>
                            <div className='d-flex justify-content-center mt-4'><a style={{ color: "white", textDecoration: "none" }} href='/login'>Already a user!!Click here to Log in</a></div>
                        </div>


                    </form>
                </div>


            </div>


        </>
    )
}

export default Registration