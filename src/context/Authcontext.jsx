import React, { createContext, useEffect, useState } from 'react'


export const TokenAuthContext=createContext()



function Authcontext({children}) {
    const [authstatus,setauthstatus]=useState(false)

    useEffect(()=>{
        if(sessionStorage.getItem('token')){
            setauthstatus(true)
        }
        else{
            setauthstatus(false)
        }
    },[])
  return (
  <>
  <TokenAuthContext.Provider value={{authstatus,setauthstatus}}>
    {
        children
    }
  </TokenAuthContext.Provider>
  
  </>
  )
}

export default Authcontext