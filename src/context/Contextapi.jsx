import React, { createContext, useState } from 'react'
import App from '../App'

export const addProjectsResponseContext = createContext()
export const editprojectResponceContext = createContext()


function Contextapi({ children }) {
  const [addProjectResponce, setaddProjectResponce] = useState('')
  const [editprojectResponce,setEditprojectResponce]=useState('')
  return (
    <>
      <addProjectsResponseContext.Provider value={{ addProjectResponce, setaddProjectResponce }}>
        <editprojectResponceContext.Provider value={{editprojectResponce,setEditprojectResponce}}>

          {children}
        </editprojectResponceContext.Provider>

      </addProjectsResponseContext.Provider>

    </>
  )
}

export default Contextapi