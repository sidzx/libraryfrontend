import React, { useEffect, useState } from 'react'
import { Table, Button } from 'react-bootstrap'
import { reserves } from '../services/allapi'
import { approves, increase } from '../services/allapi'
import Adminsidebar from './Adminsidebar'
import { toast } from 'react-toastify'
function Approvebooks() {

    const [booksreserved, setBooksreserved] = useState()

    const [bid, setBid] = useState("")
    const getBooks = async () => {
        const result = await reserves()
        console.log(result)
        setBooksreserved(result.data)

    }

    const approve = async (id) => {
        console.log(id)
//         const idd=JSON.stringify(id)
// console.log(idd)        
        const result = await approves(id)
        console.log(result)
        if (result.status == 200) {
            const result1 = await increase(result.data.bookid)
            console.log(result1)
            toast.success("approved")
            getBooks()
        }
        else {
            toast.error("failed to approve")

        }
    }

    useEffect(() => {
        getBooks()
    }, [])

    return (
        <>


            <div className=' row me-0' >
                <div className="col-3" style={{height:"90vh"}}><Adminsidebar/></div>
                <div className="col-9" style={{overflowX:"scroll"}}>
                <h1 className='text-center' style={{fontStyle:"italic"}}>Approve books</h1>

                <Table striped bordered hover className='table-responsive-sm'>
                    <thead>

                        <tr>
                            <th>#</th>
                            <th>Book Name</th>
                            <th>Book id</th>
                            <th>Student id</th>
                            <th>Student name</th>
                            <th>Booking Date</th>
                            <th>Return Date</th>
                            <th>status</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            booksreserved?.map((item, index) => (
                                <tr>
                                    <td>{index + 1}</td>
                                    <td>{item.bookName}</td>
                                    <td>{item.bookid}</td>
                                    <td>{item.studentid}</td>
                                    <td>{item.studentName}</td>
                                    <td>{item.bookingDate}</td>
                                    <td>{item.returnDate}</td>

                                    <td>
                                        {
                                            item.status === "pending" ?
                                                <Button onClick={() => {
                                                    approve(item._id)

                                                }} variant='primary'>approve </Button>
                                                :
                                                item.status
                                        }
                                    </td>
                                </tr>
                            ))
                        }

                    </tbody>
                </Table>
                </div>

                
            </div>

        </>
    )
}

export default Approvebooks