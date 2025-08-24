import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import PrivateRouter from './PrivateRouter'
import AuthRouter from './AuthRouter'

function MainRoute() {
    const token=localStorage.getItem('token')
  return (
    <BrowserRouter>
    {token? <PrivateRouter/> : <AuthRouter/> }
    </BrowserRouter>
  )
}

export default MainRoute