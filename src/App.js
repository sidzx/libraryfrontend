import Header from './components/Header';
import './App.css';
import { Routes,Route, useLocation } from 'react-router-dom';
import Body from './components/Body';
import Login from './components/Login';
import Registration from './components/Registration'
import Admin from './components/Admin';
import Student from './components/Student';
import ForgotPassword from './components/ForgotPassword';
import Reset from './components/Reset';
import EditProfile from './components/EditProfile';
import AddBooks from './components/AddBooks';
import Viewusers from './components/Viewusers';
import Viewbooks from './components/Viewbooks';
import EditStudent from './components/EditStudent';
import Approvebooks from './components/Approvebooks';
import { ToastContainer } from 'react-toastify';

function App() {

  const locate=useLocation()
  return (
    <div className="App">

      {/* {
        locate.pathname != '/addbooks' && <Header />
      } */}
     <Header />
     <ToastContainer/>
  
      <Routes>

      <Route path='/' element={<Body/>}/>
      <Route path='/login' element={<Login/>}/>  
      <Route path='/reg' element={<Registration/>}></Route>
      <Route path='/admin' element={<Admin/>}></Route>
      <Route path='/student' element={<Student/>}></Route>
      <Route path='/forgot' element={<ForgotPassword/>}></Route>
      <Route path='/reset' element={<Reset/>}></Route>
      <Route path='/editadmin' element={<EditProfile/>}></Route>
      <Route path="/addbooks" element={<AddBooks/>}></Route>
      <Route path="/viewusers" element={<Viewusers/>}></Route>
      <Route path="/viewbooks" element={<Viewbooks/>}></Route>
      <Route path='/editstudent' element={<EditStudent/>}></Route>
      <Route path="/reserves" element={<Approvebooks/>}></Route>
      
      </Routes>
    
     
    </div>
  );
}

export default App;
