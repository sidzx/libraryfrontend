import React, { useEffect, useRef } from 'react'
import Adminsidebar from './Adminsidebar'
import { Container, FormLabel } from 'react-bootstrap'
import { Row } from 'react-bootstrap'
import { Col } from 'react-bootstrap'
import { useState } from 'react'
import img1 from '../assets/collge icon.jpg'


import books from '../assets/booksbg.webp'
import upload from '../assets/upload.webp'
import { Button, TextField } from '@mui/material'
import { addbook } from '../services/allapi'
import { toast } from 'react-toastify'


function AddBooks() {

    const [validateid, setValidateid] = useState(true)
    const [validatetitle, setValidatetitle] = useState(true)
    const [validateauthor, setValidateauthor] = useState(true)
    const [validatedescription, setValidatedescription] = useState(true)
    const [validatenumber, setValidatenumber] = useState(true)
    const [validatecategory, setValidatecategory] = useState(true)
    const [validatecover, setValidatecover] = useState(true)

    const [book, setBook] = useState({

    })

    const [preview, setPreview] = useState()

    const [token, setToken] = useState("")

    console.log(book)

    const formRef = useRef(null)

    const check = async (e) => {

        e.preventDefault()
        const { name, value } = e.target
        if (name == "id") {
            if (!!value.match(/^[0-9]{1,}$/)) {
                setValidateid(true)
                setBook({ ...book, id: e.target.value })
            }
            else {
                setValidateid(false)
            }
        }
        else if (name == "title") {
            if (!!value.match(/^[a-zA-Z0-9 ]{1,}$/)) {
                setValidatetitle(true)
                setBook({ ...book, title: e.target.value })
            }
            else {
                setValidatetitle(false)
                console.log("wrong title")
            }
        }
        else if (name == "author") {
            if (!!value.match(/^[a-zA-Z .]{1,}$/)) {
                setValidateauthor(true)
                setBook({ ...book, author: e.target.value })
            }
            else {
                setValidateauthor(false)
                console.log("wrong authro")
            }
        }
        else if (name == "category") {
            if (!!value.match(/^[a-zA-Z ]{1,}$/)) {
                setValidatecategory(true)
                setBook({ ...book, category: e.target.value })

            }
            else {
                setValidatecategory(false)
                console.log("wrong cate")
            }
        }
        else if (name == "description") {
            if (!!value.match(/^[a-zA-Z0-9 .,"]{1,}$/)) {
                setValidatedescription(true)
                setBook({ ...book, description: e.target.value })

            }
            else {
                setValidatedescription(false)
                console.log("wrong des")
            }
        }
        else if (name == "number") {
            if (!!value.match(/^[0-9]{1,}$/)) {
                setValidatenumber(true)
                setBook({ ...book, number: e.target.value })

            }
            else {
                setValidatenumber(false)
                console.log("wrong num")
            }
        }

        else if (name == "cover") {
            if (value) {
                setValidatecover(true)
                setBook({ ...book, cover: e.target.files[0] })
            }

            else {
                setValidatecover(false)
                console.log("wrong cover")
            }
        }
        else {
            console.log("first")
        }
    }



    const add = async (e) => {
        e.preventDefault()
        if (!book.title || !book.author || !book.cover || !book.description || !book.category || !book.number || !book.id) {
            toast.error("Insert all values")
        }
        else {



            if (validateid && validateauthor && validatetitle && validatecategory && validatecover && validatedescription && validatenumber) {
                const bookadd = new FormData()
                bookadd.append("id", book.id)
                bookadd.append("title", book.title)
                bookadd.append("author", book.author)
                bookadd.append("description", book.description)
                bookadd.append("category", book.category)
                bookadd.append("number", book.number)
                bookadd.append("cover", book.cover)
                bookadd.append("userId", book.userId)
                console.log(validateid)
                console.log(validateauthor)
                console.log(validatecategory)
                console.log(validatedescription)
                console.log(validatetitle)
                console.log(validatenumber)
                console.log(validatecover)
                const Header = {
                    'Content-type': 'multipart/form-data', 'Authorization': `Bearer ${token}`
                }
                const result = await addbook(bookadd, Header)
                console.log(result)
                if (result.status === 200) {
                    toast.success("added succesfully")
                    setBook({
                        id: "",
                        title: "",
                        author: "",
                        category: "",
                        cover: "",
                        description: "",
                        number: ""

                    })
                    formRef.current.reset()
                    setPreview(upload)
                }
                else {
                    toast.error("failed")
                }
            }
        }
        // else{
        //     alert("enter valid values")
        // }


    }


    useEffect(() => {
        const uid = localStorage.getItem('currentUser')
        const id = JSON.parse(uid)
        console.log(id)
        setBook({ ...book, userId: id })
        if (localStorage.getItem('token')) {
            setToken(localStorage.getItem('token'))
        }

    }, [])
    useEffect(() => {
        if (book.cover) {
            setPreview(URL.createObjectURL(book.cover))
        }
    }, [book.cover])
    console.log(preview)

    console.log(token)


    return (
        <>


           
                <Row className="justify-content-md-center gx-0">

                    <Col xs="3" sm="3" md="3" lg="3" ><Adminsidebar /></Col>
                    <Col xs="9" sm="9" md="9" lg="9"  style={{margin:"0px"}}>
                        <form style={{width:"50vw"}} action="" ref={formRef}>
                            {/* <div className='d-flex justify-content-center align-items-center' style={{ backgroundImage: `url(${books})`, height: "100vh", width: "50vw", backgroundSize: "cover" }}> */}

                                <div className=' row m-0 d-flex justify-content-center align-items-center' style={{ height: "auto",width:"70vw", borderRadius:"5px",backgroundColor: "white", fontStyle: "italic" }}>
                                    <h1 className='text-center' style={{fontStyle:"italic"}}>Add books</h1>
                                    <div className=' col-lg-3  col-sm-12 d-flex  justify-content-center '>
                                        <FormLabel style={{ color: "black", fontStyle: "italic", width: "20vw" }}>Book's Cover:
                                            <br />
                                            <input onChange={(e) => { check(e) }} style={{ display: "none" }} className="form-control" type='file' name="cover" id="cover" placeholder='upload Books cover photo' />
                                            <img className='h-sm-60px' height={'70%'} width={'50%'} src={preview ? preview : upload} alt="" />

                                        </FormLabel>

                                    </div>

                                    <div  className=' col-sm-12 my-3 col-lg-4 d-flex flex-column justify-content-evenly'>
                                        <TextField onChange={(e) => { check(e) }} className="mt-2" label="Enter book id" name="id" color="secondary" focused />
                                        {
                                            !validateid &&
                                            <span>*invalid</span>
                                        }
                                        <TextField onChange={(e) => { check(e) }} className='mt-2' label="Enter book title" name="title" color="secondary" focused />
                                        {
                                            !validatetitle &&
                                            <span>*invalid</span>
                                        }
                                        <TextField onChange={(e) => { check(e) }} className='mt-2' label="Enter Author's name" name="author" color="secondary" focused />
                                        {
                                            !validateauthor &&
                                            <span>*invalid</span>
                                        }
                                        <TextField onChange={(e) => { check(e) }} className='mt-2' label="Enter book category" name="category" color="secondary" focused />
                                        {
                                            !validatecategory &&
                                            <span>*invalid</span>
                                        }
                                        <TextField onChange={(e) => { check(e) }} className='mt-2' label="Enter book number" name="number" color="secondary" focused />
                                        {
                                            !validatenumber &&
                                            <span>*invalid</span>
                                        }
                                    </div>
                                    <div className='col-lg-5 d-flex col-sm-12 my-2 flex-column justify-content-evenly align-items-center'>
                                        <textarea  onChange={(e) => { check(e) }} name="description" className="form-control " id="description" placeholder="book's description" 
                                        style={{
                                             width: "30vw", 
                                             height: "20vh" ,
                                             border: "1px solid #ced4da",
                                             backgroundColor: "#EF8E96"

                                             }}></textarea>
                                        {
                                            !validatedescription &&
                                            <span>*invalid</span>
                                        }
                                        <Button onClick={(e) => { add(e) }} variant='contained'>ADD</Button>


                                    </div>

                                </div>

                            {/* </div> */}
                        </form>

                    </Col>

                </Row>
          

        </>
    )
}

export default AddBooks