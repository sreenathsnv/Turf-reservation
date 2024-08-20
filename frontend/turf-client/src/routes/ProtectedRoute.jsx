import React from 'react'
import { useAuth } from '../context/Authcontext'
import { Navigate } from 'react-router-dom'


const ProtectedRoute = ({children}) => {
  
  const {isAuthenticated} = useAuth()

  if(!isAuthenticated){

    return <Navigate to= '/login' replace/>
  }


    return children
}

export default ProtectedRoute