
import './App.css'
import Header from './componenets/Header'
import ListEmployeeComponent from './componenets/ListEmployeeComponent'
import Footer from './componenets/Footer'
import {BrowserRouter ,Route,Routes,} from 'react-router-dom'
import Employee from './componenets/Employee'
import Dashboard from './componenets/Dashboard'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
function App() {

  return (
    <>
    <BrowserRouter>
  
      <Header/>
      <Routes>
        <Route path='/' element={<ListEmployeeComponent/>}></Route>
        <Route path='/employees' element={<ListEmployeeComponent/>}></Route>
        <Route path='/add-employee' element={<Employee/>}></Route>
        <Route path='/update-employee/:id' element={<Employee/>}></Route>
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      <Footer/>
      <ToastContainer position="top-right" autoClose={2000} theme="colored" />
      
    </BrowserRouter>
      
     
    </>
  )
}

export default App
