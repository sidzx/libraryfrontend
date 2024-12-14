import React, { useEffect, useState } from 'react'
import { decreaseCount, returnB, viewbook } from '../services/allapi'
import { base_url } from '../services/baseurl'

import { Navbar, Form, Row, Col, Button, InputGroup } from 'react-bootstrap'
import { Card, ListGroup } from 'react-bootstrap'
import { reservebook } from '../services/allapi'
import { getDetails } from '../services/allapi'
import { Modal } from 'react-bootstrap'
import { Table, Container, Nav, NavDropdown } from 'react-bootstrap'
import { getbookHistory } from '../services/allapi'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

function Student() {
  

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate()

  const [book, setBook] = useState([])
  const [bookReserve, setBookReserve] = useState({
    studentid: JSON.parse(localStorage.getItem("currentUser"))
  })

  const [history, setHistory] = useState([])
  const [sid, setSid] = useState()
  const [bookreturn, setBookreturn] = useState({

  })
  const [search,setSearch]=useState("")

  const viewbooks = async (e) => {
    const result = await viewbook(e)

    if (result.status == 200) {

      setBook(result.data)
    }
    else {
      console.log("fetching failed")
    }
  }

  const getStudent = async (id) => {
    const result = await getDetails(id)
    // console.log(result.data)
    setBookReserve({ ...bookReserve, studentName: result.data.name })
  }

  const setDate = async () => {
    const sdate = new Date()
    const day = sdate.getDate()
    // console.log(day)
    let month = sdate.getMonth()
    month = month + 1
    // console.log(month)
    const year = sdate.getFullYear()
    // console.log(year)
    const date = `${day}/${month}/${year}`
    // console.log(date)
    setBookReserve({ ...bookReserve, bookingDate: date })


  }

  const reserve = async (e) => {


    const sdate = new Date()
    const day = sdate.getDate()
    // console.log(day)
    let month = sdate.getMonth()
    month = month + 1
    // console.log(month)
    const year = sdate.getFullYear()
    // console.log(year)
    const date = `${day}/${month}/${year}`

    const datatosend = { bookid: e._id, studentid: bookReserve.studentid, bookingDate: date, bookName: e.title, studentName: bookReserve.studentName }
    console.log(datatosend)

    const result = await reservebook(datatosend)
    console.log(result)
    if (result.status == 200) {
      const result2 = await decreaseCount(result.data.bookid)
      console.log(result2)
      if (result2.status == 200) {
        toast.success("reserved succesfully")
        bookHistory(result.data.studentid)

      }
      else {
        toast.error("reservation failed")
      }
    }
    else {
      toast.warning('already taken')
    }
  }

  const bookHistory = async (id) => {
    const result = await getbookHistory(id)
    console.log(result.data)
    if (result.status == 200) {
      setHistory(result.data)
    }

  }
  const returnBook = async (item) => {

    console.log(bookreturn)
    console.log(item._id)
    const result = await returnB(item._id, bookreturn)
    console.log(result)
    if (result.status == 200) {
      toast.success("returned succesully")
      bookHistory(result.data.studentid)
     
     

    }
    else {
      toast.error("reservation failed")
    }

  }
  const logout = async () => {

    navigate("/login")
    localStorage.clear()

  }

  // const back=async()=>{
  //   navigate("/login")
  //   localStorage.clear()

  // }

  const editStudent = async () => {
    navigate("/editstudent")
  }

  useEffect(() => {
    const uid = localStorage.getItem("currentUser")
    const id = JSON.parse(uid)
    const sdate = new Date()
    const day = sdate.getDate()
    // console.log(day)
    let month = sdate.getMonth()
    month = month + 1
    // console.log(month)
    const year = sdate.getFullYear()
    // console.log(year)
    const date = `${day}/${month}/${year}`
    console.log(date)
    setBookreturn({ ...bookreturn, returnDate: date })
    // console.log(id)
    getStudent(id)
    // viewbooks()
    bookHistory(id)


  }, [])

  useEffect(()=>{
    viewbooks(search)

  },[search])

  console.log(history)

  console.log(bookReserve)

  console.log(bookreturn)
  console.log(search)

  return (
    <>


      <Modal className='modal-lg mx-0 'style={{ margin: "0", padding: "0" }} show={show} onHide={handleClose} >
        <Modal.Header style={{ margin: "0", padding: "0" }} closeButton>
          <Modal.Title >Issue/Return Register</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ margin: "0", padding: "2px" }}>

          <Table striped bordered hover>
            <thead>

              <tr>
                <th>#</th>
                <th>Book Name</th>
                <th>Booking Date</th>
                <th>Return Date</th>
                <th>Return</th>
              </tr>
            </thead>
            <tbody>
              {
                history?.map((item, index) => (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{item.bookName}</td>
                    <td>{item.bookingDate}</td>
                    <td>{item.returnDate}</td>
                    {
                      item.status==="pending" || item.status==="Approved" ?
                      <td>returned</td>
                      :
                    <td><Button variant='primary' onClick={() => { returnBook(item) }}>Return </Button></td>
                    }
                  </tr>
                ))
              }

            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {/* <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button> */}
        </Modal.Footer>
      </Modal>


      <Navbar style={{ backgroundColor: "#EFC3CA" }} expand="lg" className="">
        <Container>
          <Navbar.Brand href="#home" className="fw-bold" style={{ fontStyle: "italic" }}>Library</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between">
            <Nav className="mx-auto d-flex justify-content-around w-100">
              <Nav.Link href="" onClick={() => { editStudent() }} className="text-primary fw-semibold">
                Edit Profile
              </Nav.Link>
              <Nav.Link onClick={handleShow} href="" className="text-primary fw-semibold">
                View History
              </Nav.Link>
              <Nav.Link href="" onClick={() => { logout() }} className="text-danger fw-semibold">
                Log Out
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* <Button
        onClick={()=>{back()}}
        type="submit"
        style={{
          backgroundColor: '#000000',
          borderColor: '#FFFFFF',
          borderRadius: '20px',
          padding: '0.5rem 1rem',
          color: "#FFFFFF",
          display: "inline"
        }}
      >

        <i class="fa-solid fa-arrow-left"></i>
      </Button> */}
      <div
        className=' container d-flex justify-content-center '
        style={{

          alignItems:"center"
        }}
      >


        <Form className="d-flex bg-light mt-2 rounded shadow-sm"
        >

          <Form.Control
            type="text"
            placeholder="Search Books"
            className="me-2"
            style={{
              width: '30vw',
              borderRadius: '20px',
            }}
            onChange={(e)=>{setSearch(e.target.value)}}
          />

          <Button
            type="submit"
            style={{
              backgroundColor: '#000000',
              borderColor: '#FFFFFF',
              borderRadius: '20px',
              padding: '0.5rem 1rem',
              color: "#FFFFFF"
            }}
          >
            Submit
          </Button>
        </Form>
      </div>

      <div className=' mt-5 '>
        <div className='row ms-0 me-0 '>
          {
            book?.map((item) => (

              <div className='col-lg-3 col-sm-6 col-md-4 d-flex justify-content-center '>
                <Card style={{
                  width: '16rem',
                  // margin: '1rem',
                  borderRadius: '15px',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                  overflow: 'hidden',
                  transition: 'transform 0.3s',
                }}
                  className="hover-shadow mx-2 my-2 ">
                  <Card.Img style={{
                    height: '200px',
                    objectFit: 'contain',
                  }} variant="top" src={`${base_url}/upload/${item.cover}`} alt=" book,s cover" />
                  <Card.Body>
                    <Card.Title style={{
                      fontSize: '1.25rem',
                      fontWeight: 'bold',
                      color: '#343a40',
                      textAlign: 'center',
                      marginBottom: '0.75rem',
                    }}>{item.title}</Card.Title>
                    <Card.Text style={{ fontSize: '1rem', textAlign: 'center', color: '#6c757d' }}>
                      <strong>Author:</strong>{item.author}
                    </Card.Text>
                    <Card.Text style={{ fontSize: '1rem', textAlign: 'center', color: '#6c757d' }}>
                      <strong>Category:</strong>{item.category}
                    </Card.Text>
                    <Card.Text
                      style={{
                        fontSize: '0.95rem',
                        color: '#495057',
                        textAlign: 'center',
                        maxHeight: '100px',
                        overflowY: 'auto',
                      }}>
                      <strong>Description:</strong>{item.description}
                    </Card.Text>
                    <Card.Text >
                      <div style={{ textAlign: "center" }}>

                        <Button style={{
                          padding: '0.5rem 1.5rem',
                          fontSize: '1rem',
                          textAlign: 'center',
                          borderRadius: '20px',
                        }} variant='primary' onClick={() => { reserve(item) }}>Reserve</Button>
                      </div>
                    </Card.Text>


                  </Card.Body>


                </Card>
              </div>
            ))
          }
        </div>

      </div>

    </>
  )
}

export default Student