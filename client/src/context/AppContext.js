import React, { useState, createContext } from 'react'

export const AppContext = createContext()

export const AppContextProvider = props => {

    // const [elements, setElements] = useState([])
    // const [single, setSingle] = useState([])
    // const [activeMenu, setActiveMenu] = useState("")
    const [authenticated, setAuthenticated] = useState(false)
    const [bearerToken, setBearerToken] = useState("")

    return (
        <AppContext.Provider value={{ /*elements, setElements, single, setSingle, activeMenu, setActiveMenu,*/ authenticated, setAuthenticated, bearerToken, setBearerToken }}>
            {props.children}
        </AppContext.Provider>
    )
}