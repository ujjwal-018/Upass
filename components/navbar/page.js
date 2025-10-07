"use client"
import React from 'react'
import './navbar.css'
import Link from 'next/link'

const Navbar = () => {

    const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/signup";
  };

  return (
    <>
    <div className='container'>
     <h2><Link className='logo' href={'/'}>Upass</Link></h2>
     <div className='vault-logout'>
     <Link  className ='vault' href={'/vault'}>Vault</Link>
     <button onClick={handleLogout} className='logout'>Logout</button>
     </div>
    </div>
    </>
  )
}

export default Navbar
