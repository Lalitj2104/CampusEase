import React from 'react'
import { Route, Routes } from "react-router-dom";
import AdminLoginPage from '../../pages/Admin/AdminLoginPage';
import AdminDashboard from '../../pages/Admin/AdminDashboard';


const Admin = () => {
  return (
    <>
      <Routes>
        <Route path="adminlogin" element={<AdminLoginPage/>}/>
        <Route path="admindashboard" element={<AdminDashboard/>}/>
      </Routes>
    </>
  )
}

export default Admin;