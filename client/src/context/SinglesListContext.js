import React, { useState, createContext } from 'react'

export const SingleListContext = createContext()

export const SingleListContextProvider = props => {

    const [elements, setElements] = useState([])     
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage] = useState(50)


    return (
        <SingleListContext.Provider value={{ elements, setElements, currentPage, setCurrentPage, itemsPerPage}}>
            {props.children}
        </SingleListContext.Provider>
    )
}