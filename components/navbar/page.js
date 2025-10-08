"use client"
import React from 'react'
import styles from './navbar.module.css'
import Link from 'next/link'

const Navbar = () => {

    const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/signup";
  };

  return (
    <>
    <div className={styles.container}>
     <h2><Link className={styles.logo} href={'/'}>Upass</Link></h2>
     <div className={styles['vault-logout']}>
     <Link  className ={styles.vault} href={'/vault'}>Vault</Link>
     <button onClick={handleLogout} className={styles.logout}>Logout</button>
     </div>
    </div>
    </>
  )
}

export default Navbar;
