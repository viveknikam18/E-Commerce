import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

const ProtectedRoute = ({children}) => {

    const isAuthenticated = useSelector((state)=> state.user.isAuthenticated)
    const location = useLocation()

    if(!isAuthenticated){
        return <Navigate to='/' replace state = {{from: location}} />
    }
  return children 
}

export default ProtectedRoute