import React, { useState, createContext } from 'react'

export const AppContext = createContext()

export const AppContextProvider = props => {

    const [elements, setElements] = useState([])
    const [single, setSingle] = useState([])

    return (
        <AppContext.Provider value={{ elements, setElements, single, setSingle }}>
            {props.children}
        </AppContext.Provider>
    )
}