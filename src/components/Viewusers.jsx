import React, { useEffect, useState } from 'react'
import { Container,Row,Col, Table } from 'react-bootstrap'
import Adminsidebar from './Adminsidebar'
import { userlist } from '../services/allapi'

function Viewusers() {

    const [view,setView]=useState([])

    const viewuser=async()=>{
        const result= await userlist()
        console.log(result)
        setView(result.data)
    }

    useEffect(()=>{
        viewuser()
    },[])

    console.log(view)
  return (
    <>
    
    <Container className='mx-0 p-0'>
            <Row className="justify-content-md-center me-0">

                <Col xs="3" md="3" lg="3"><Adminsidebar/></Col>
                <Col xs="9" md="9" lg="9">
                <h2 className='text-center'>Users List</h2>
                <Table striped bordered>
                    <thead>
                        <td>Name</td>
                        <td>DOB</td>
                        <td>Gender</td>
                        <td>Age</td>
                        <td>Address</td>
                    </thead>
                    <tbody>
                        {
                            view?.map((item)=>(
                                <tr>
                                    <td>{item.name}</td>
                                    <td>{item.dob}</td>
                                    <td>{item.gender}</td>
                                    <td>{item.age}</td>
                                    <td>{item.address}</td>
                                </tr>

                            ))
                        }
                    </tbody>
                </Table>
                </Col>
                
            </Row>
        </Container >
    </>
  )
}

export default Viewusers