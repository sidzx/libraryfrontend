import React, { useEffect, useState } from 'react'
import { FormLabel, Button } from 'react-bootstrap'
import { base_url } from '../services/baseurl'
import { editAdmin, updateAdmin } from '../services/allapi'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'


function EditStudent() {

  const navigate = useNavigate()

  const [preview, setPreview] = useState()

  const [student, setStudent] = useState({})

  const [editedStudent, setEditedStudent] = useState({})

  const getUser = async (id) => {
    const result = await updateAdmin(id)
    console.log(result.data)
    setStudent(result.data)
    setEditedStudent(result.data)

  }
  useEffect(() => {
    if (editedStudent.profile != student.profile) {
      setPreview(URL.createObjectURL(editedStudent.profile))
    }
  }, [editedStudent.profile])

  const update = async (e) => {
    e.preventDefault()
    const studentedit = new FormData()
    studentedit.append("name", editedStudent.name)
    studentedit.append("age", editedStudent.age)
    studentedit.append("dob", editedStudent.dob)
    studentedit.append("gender", editedStudent.gender)
    studentedit.append("address", editedStudent.address)
    studentedit.append("email", editedStudent.email)
    studentedit.append("password", editedStudent.password)
    studentedit.append("profile", editedStudent.profile)

    const Header = {
      'Content-Type': 'multipart/form-data'
    }
    const result = await editAdmin(student._id, studentedit, Header)
    console.log(result)
    if (result.status == 200) {
      toast.success("updated succesuflly")
      navigate("/student")
    }
    else {
      toast.error("updation failed")
    }
  }

  const back=async()=>{
    navigate("/student")
    

  }


  useEffect(() => {
    const uid = localStorage.getItem("currentUser")
    const id = JSON.parse(uid)
    console.log(id)
    getUser(id)
  }, [])

  console.log(student)
  console.log(editedStudent)

  return (
    <>

      <div className="container mt-5">
      <Button
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
      </Button>

        <div className="row justify-content-center">
          <form className="col-12 col-md-10 col-lg-8" action="">
            <div
              className="d-flex flex-wrap justify-content-center align-items-start"
              style={{ backgroundColor: "#DAB179", padding: "20px", borderRadius: "10px" }}
            >
              {/* Profile Picture Section */}
              <div className="me-3 mb-4 text-center">
                <FormLabel style={{ color: "black", fontStyle: "italic" }}>Profile:</FormLabel>
                <br />
                <input
                  style={{ display: "none" }}
                  onChange={(e) => {
                    setEditedStudent({ ...editedStudent, profile: e.target.files[0] });
                  }}
                  className="form-control"
                  type="file"
                  name="profile"
                  id="profile"
                  placeholder="upload your image"
                />
                <img
                  className="img-fluid rounded"
                  style={{ maxHeight: "200px", maxWidth: "320px" }}
                  src={preview ? preview : `${base_url}/upload/${student.profile}`}
                  alt=""
                />
              </div>

              {/* Input Fields Section */}
              <div className="d-flex flex-wrap flex-grow-1">
                <div className="col-12 col-md-6 pe-md-3">
                  <FormLabel style={{ color: "black", fontStyle: "italic" }}>Name:</FormLabel>
                  <input
                    defaultValue={student.name}
                    onChange={(e) => {
                      setEditedStudent({ ...editedStudent, name: e.target.value });
                    }}
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Enter your name"
                    className="form-control mb-3"
                  />
                  <FormLabel style={{ color: "black", fontStyle: "italic" }}>Age:</FormLabel>
                  <input
                    defaultValue={student.age}
                    onChange={(e) => {
                      setEditedStudent({ ...editedStudent, age: e.target.value });
                    }}
                    type="text"
                    name="age"
                    id="age"
                    placeholder="Enter your age"
                    className="form-control mb-3"
                  />
                  <FormLabel style={{ color: "black", fontStyle: "italic" }}>Dob:</FormLabel>
                  <input
                    defaultValue={student.dob}
                    onChange={(e) => {
                      setEditedStudent({ ...editedStudent, dob: e.target.value });
                    }}
                    type="date"
                    name="dob"
                    id="dob"
                    className="form-control mb-3"
                  />
                  <FormLabel style={{ color: "black", fontStyle: "italic" }}>Gender:</FormLabel>
                  <div className="d-flex align-items-center mb-3">
                    <FormLabel className="mx-2" style={{ color: "black", fontStyle: "italic" }}>
                      Male:
                    </FormLabel>
                    <input
                      checked={editedStudent.gender === "male"}
                      onChange={(e) => {
                        setEditedStudent({ ...editedStudent, gender: e.target.value });
                      }}
                      type="radio"
                      name="gender"
                      id="male"
                      value="male"
                      className="form-check-input mx-2"
                    />
                    <FormLabel className="mx-2" style={{ color: "black", fontStyle: "italic" }}>
                      Female:
                    </FormLabel>
                    <input
                      checked={editedStudent.gender === "female"}
                      onChange={(e) => {
                        setEditedStudent({ ...editedStudent, gender: e.target.value });
                      }}
                      type="radio"
                      name="gender"
                      id="female"
                      value="female"
                      className="form-check-input mx-2"
                    />
                  </div>
                </div>

                <div className="col-12 col-md-6">
                  <FormLabel style={{ color: "black", fontStyle: "italic" }}>Email:</FormLabel>
                  <input
                    defaultValue={student.email}
                    onChange={(e) => {
                      setEditedStudent({ ...editedStudent, email: e.target.value });
                    }}
                    type="email"
                    name="email"
                    id="email"
                    className="form-control mb-3"
                    placeholder="Enter your Email"
                  />
                  <FormLabel style={{ color: "black", fontStyle: "italic" }}>Password:</FormLabel>
                  <input
                    defaultValue={student.password}
                    onChange={(e) => {
                      setEditedStudent({ ...editedStudent, password: e.target.value });
                    }}
                    type="password"
                    name="password"
                    id="password"
                    className="form-control mb-3"
                    placeholder="Enter your password"
                  />
                  <FormLabel style={{ color: "black", fontStyle: "italic" }}>Address:</FormLabel>
                  <textarea
                    defaultValue={student.address}
                    onChange={(e) => {
                      setEditedStudent({ ...editedStudent, address: e.target.value });
                    }}
                    name="address"
                    className="form-control mb-3"
                    placeholder="Enter your address"
                  ></textarea>
                  <Button
                    onClick={(e) => {
                      update(e);
                    }}
                    variant="primary"
                    className="w-100"
                  >
                    Update
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>


    </>
  )
}

export default EditStudent