import React from 'react'
import SideBar from './SideBar'
import TopNavbar from './TopNavbar'
import { ToastContainer } from 'react-toastify'
import { Outlet } from 'react-router-dom'

const DashBoard = () => {
    const userRole = localStorage.getItem('userRole');
    return (
        <div className="app-layout">
            <div className="app-layout__sidebar">
            <SideBar userRole={userRole} />
            </div>
            <div className="app-layout__body">
                <div className="app-layout__topbar">
                    <TopNavbar />
                </div>
                <div className="app-layout__content">
                    <ToastContainer />
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default DashBoard