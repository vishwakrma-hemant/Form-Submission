import React from 'react'
import Navbar from './navbar'

const NavLayout = ({children}) => {
  return (
    <>
    <Navbar/>
    {children}
    </>
  )
}

export default NavLayout