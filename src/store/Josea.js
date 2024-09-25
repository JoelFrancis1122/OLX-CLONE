import React, { createContext, useState } from 'react'
export const Testrr = createContext()

const Josea = ({children}) => {
    const [name,setName] = useState("Im Joel Francis from bce 159")
  return (
    <Testrr.Provider value={{name}}>
        {children}
    </Testrr.Provider>    
  )
}

export default Josea
