import React from 'react'
import Adminsidebar from './Adminsidebar'

import { Container, Row,Col } from 'react-bootstrap'
function Admin() {
  return (
    
    
    <>
   <div >
   <Container  className='mx-0 p-0'>
      <Row  className="justify-content-md-center">
       
        <Col  xs="3"md="3" lg="3"><Adminsidebar/></Col>
        <Col xs="9"md="9" lg="9">
        <div className='d-flex justify-content-center'>
        <h1 className="text-center"style={{color:"black",fontFamily:"fantasy"}}>Welcome Admin</h1>
       
        </div>
        </Col>
      </Row>
    </Container>
   </div>
    
  

    
   
    
    
    </>
  )
}

export default Admin