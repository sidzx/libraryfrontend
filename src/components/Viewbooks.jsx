import React from 'react'
import { useState,useEffect } from 'react'
import { Col,Row,Container } from 'react-bootstrap'
import {Table} from 'react-bootstrap'
import Adminsidebar from './Adminsidebar'
import { booklist, editbook } from '../services/allapi'
import { base_url } from '../services/baseurl'
import {Button} from 'react-bootstrap'
import { deletebook } from '../services/allapi'
import { Modal } from 'react-bootstrap'
import {FormLabel} from 'react-bootstrap'
import { toast } from 'react-toastify'



function Viewbooks() {
    const [view,setView]=useState([])//contains list of books
    const [items,setItems]=useState({})//book to edit
    const [token,setToken]=useState()
    const [update,setUpdate]=useState({})//first assigning book to edit.then changing it on onchange
    const [preview,setPreview]=useState("")

    const viewbook=async()=>{
        const result= await booklist()
        console.log(result)
        setView(result.data)
    }
    // delete function
    const del=async(id)=>{
        const Header={
            'Content-type':'multipart/form-data','Authorization': `Bearer ${token}`
        }
        const result=await deletebook(id,Header) 
        console.log(result)
        if(result.status===200){
            toast.success("deleted succesfully")
            viewbook()
        }
        else{
            toast.error("deletion  failed")
        }
    }
//edit function 
    const edit=async(update)=>{
        console.log(update)
        const edited =new FormData()
        edited.append("id",update.id)
        edited.append("title",update.title)
        edited.append("author",update.author)
        edited.append("category",update.category)
        edited.append("description",update.description)
        edited.append("cover",update.cover)
        edited.append("number",update.number)
        edited.append("userId",update._id)
       
        console.log(edited)
        if(update.cover!=items.cover){
            const Header={
                'Content-Type':'multipart/form-data','Authorization':`Bearer ${token}`
            }
    
            const result =await editbook(update._id,edited,Header)
            console.log(result)
            console.log(edited)
            console.log("with file")
            if(result.status==200){
                toast.success("edited succesfully")
               
                viewbook()
                handleClose()
                setPreview("")
                // console.log(preview)
             
            }
            else{
                toast.error("editing failed")
            }
           

        }
        else{
            const Header={
                'Content-Type':'application/json','Authorization':`Bearer ${token}`
            }
    
            const result =await editbook(update._id,edited,Header)
            console.log(result)
           
            console.log("without file")
            if(result.status==200){
                toast.success("edited succesfully")
                viewbook()
                setPreview("")
            
               
                // setPreview(items.cover)
                // console.log(preview)
            }
            else{
                toast.error("editing failed")
            }

        }

       
    }

    
    const [show,setShow]=useState(false);
    const handleClose=()=>setShow(false);

    const handleShow=(item)=>{
        setShow(true)
        console.log(item)
        setItems(item) // setting clicked book
        console.log(item.cover)
        setUpdate(item)
    }
    
    
    console.log(items)

    useEffect(()=>{
        viewbook()
         if(localStorage.getItem('token')){
            setToken(localStorage.getItem('token'))
        }
        
    },[])


    useEffect(()=>{
        if(update.cover!=items.cover){
            setPreview(URL.createObjectURL(update.cover))
        }
    },[update.cover])

    console.log(update)
    console.log(preview)
    console.log(view)

  return (
    <>
    <Modal className='modal-lg' show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Edit book details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <form>

                <div className="row">
                    <div className='col-6'>
                          <FormLabel>
                <input  onChange={(e)=>setUpdate({...update,cover:e.target.files[0]})} type='file' style={{display:"none"}} className='form-control'/>
                <img  className="img-fluid" src={preview?preview:`${base_url}/upload/${items.cover}`}/>
                </FormLabel>
                    </div>
                    <div className='col-6'>
                    <FormLabel style={{fontFamily:"Copperplate",fontStyle:"italic"}}>Id:</FormLabel>
                <input onChange={(e)=>setUpdate({...update,id:e.target.value})} defaultValue={items.id} className='form-control'/>
                <FormLabel style={{fontFamily:"Copperplate",fontStyle:"italic"}}>Author:</FormLabel>
                <input onChange={(e)=>setUpdate({...update,author:e.target.value})} defaultValue={items.author} className='form-control'/>
                <FormLabel style={{fontFamily:"Copperplate",fontStyle:"italic"}}>title:</FormLabel>
                <input onChange={(e)=>setUpdate({...update,title:e.target.value})} defaultValue={items.title} className='form-control'/>
              
                <FormLabel style={{fontFamily:"Copperplate",fontStyle:"italic"}}>Number:</FormLabel>
                <input onChange={(e)=>setUpdate({...update,number:e.target.value})}defaultValue={items.number} className='form-control'/>
                <FormLabel style={{fontFamily:"Copperplate",fontStyle:"italic"}}>category</FormLabel>
                <input onChange={(e)=>setUpdate({...update,category:e.target.value})} defaultValue={items.category} className='form-control'/>
                <FormLabel style={{fontFamily:"Copperplate",fontStyle:"italic"}}>description</FormLabel>
                <input onChange={(e)=>setUpdate({...update,description:e.target.value})}   type="" className='form-control' defaultValue={items.description} />
                </div>
                </div>
                
            </form>
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={handleClose} variant='primary'>close</Button>
            <Button onClick={(e)=>{edit(update)}} variant='primary'>update</Button>

        </Modal.Footer>

    </Modal>
     <Container className='mx-0 p-0'>
            <Row className="justify-content-md-center">

                <Col xs="3" md="3" lg="3" style={{height:"90vh"}}><Adminsidebar/></Col>
                <Col xs="9" md="9" lg="9" style={{height:"90vh",overflowX:"scroll"}}>
                
                <h2 className='text-center 'style={{color:"#1A8A24"}}>Book's List</h2>
                <Table  bordered style={{borderColor:"#C57B13",backgroundColor:"#F9D29C"}}>
                    <thead style={{borderRight:"3px"}} >
                        <td>Name</td>
                        <td>Author</td>
                        <td>cover</td>
                        <td>Number</td>
                        <td>Edit</td>
                        <td>Delete</td>
                       
                    </thead>
                    <tbody >
                        {
                            view?.map((item)=>(
                                <tr style={{backgroundColor:"#E0DBB5"}}>
                                    <td>{item.title}</td>
                                    <td>{item.author}</td>
                                    <td style={{alignItems:"center"}}><img src={`${base_url}/upload/${item.cover}`} alt="" height={'100px'} width={'150px'} /></td>
                                    <td>{item.number}</td>
                                    <td><Button onClick={()=>{handleShow(item)}} variant='none' ><i className="fa-solid fa-pen-to-square fa-lg"></i></Button></td>
                                    <td><Button onClick={(e)=>{del(item._id)}} variant='none'><i className="fa-solid fa-trash fa-lg"></i></Button></td>
                                    
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

export default Viewbooks