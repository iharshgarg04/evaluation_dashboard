import React, { useState } from 'react'
import './dashboard.css'
import Sidebar from '../../components/Sidebar'
import { Outlet } from 'react-router'
// export const myContext = createContext();
const DashBoard = () => {
  return (
      <div className='main-container' >
          <Sidebar/>
          <Outlet/>
      </div>
  )
}

export default DashBoard