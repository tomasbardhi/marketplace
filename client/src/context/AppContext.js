import React, { useState, createContext } from 'react'

export const AppContext = createContext()

export const AppContextProvider = props => {

    const [elements, setElements] = useState([])

    return (
        <AppContext.Provider value={{ elements, setElements }}>
            {props.children}
        </AppContext.Provider>
    )
}