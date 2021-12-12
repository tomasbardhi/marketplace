import React, { useState, createContext } from 'react'

export const AppContext = createContext()

export const AppContextProvider = props => {

    // const [elements, setElements] = useState([])
    // const [single, setSingle] = useState([])
    // const [activeMenu, setActiveMenu] = useState("")
    const [authenticated, setAuthenticated] = useState(false)
    const [bearerToken, setBearerToken] = useState("")
    const [creator, setCreator] = useState([])

    return (
        <AppContext.Provider value={{ /*elements, setElements, single, setSingle, activeMenu, setActiveMenu,*/ authenticated, setAuthenticated, bearerToken, setBearerToken, creator, setCreator }}>
            {props.children}
        </AppContext.Provider>
    )
}