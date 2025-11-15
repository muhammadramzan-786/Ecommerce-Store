import React from 'react'
import Header from '../Header'
import Footer from '../Footer'
import { Outlet } from 'react-router-dom'

function Layout({header=true,footer=true}) {
  return (
    <>
      {header && <Header/>}
      <main><Outlet/></main>
      {footer && <Footer/>}
    </>
  )
}

export default Layout