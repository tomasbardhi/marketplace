import React, { useState, createContext } from 'react'

export const AppContext = createContext()

export const AppContextProvider = props => {

    const [authenticated, setAuthenticated] = useState(false)
    const [bearerToken, setBearerToken] = useState("")
    const [creator, setCreator] = useState([])

    return (
        <AppContext.Provider value={{authenticated, setAuthenticated, bearerToken, setBearerToken, creator, setCreator }}>
            {props.children}
        </AppContext.Provider>
    )
}