import React from 'react'
import Header from '../Header'
import Footer from '../Footer'

function index({children,header=true,footer=true}) {
  return (
    <div>
      {header && <Header/>}
      <main>{children}</main>
      {footer && <Footer/>}
    </div>
  )
}

export default index