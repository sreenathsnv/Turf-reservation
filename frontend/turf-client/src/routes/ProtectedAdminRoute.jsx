import React from 'react'
import { useAuth } from '../context/Authcontext'
import { Navigate } from 'react-router-dom'


const ProtectedAdminRoute = ({children}) => {
  
  const {isAuthenticated,user} = useAuth()

  
  if(!isAuthenticated){

    return <Navigate to= '/login' replace/>
  }
  if(!user.is_owner){
    return <Navigate to= '/register' replace/>
  }


    return children
}

export default ProtectedAdminRoute