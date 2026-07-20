import React from 'react'
import NavBar from './components/NavBar/NavBar.jsx'
import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <div className="min-h-screen flex bg-[#1c1c1b]">
      <NavBar />
      
      <main className="flex-1 h-screen overflow-y-hidden">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;