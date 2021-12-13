import Header from '../components/Header'
import SortBar from '../components/SortBar'
import Singles from '../components/Singles'
import Pagination from '../components/Pagination'

import React, {useEffect, useState} from 'react'
import Api from '../api/Api'

function SinglesPage() {
    const [elements, setElements] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage] = useState(50)
    const [sort, setSort] = useState("dateDesc")

    const lastItemIndex = currentPage * itemsPerPage
    const firstItemIndex = lastItemIndex - itemsPerPage
    const currentElements = elements.slice(firstItemIndex, lastItemIndex)

    useEffect(() => {
        const fetchElements = async () => {
            try {
                const response = await Api.get("/joined")
                const data = response.data.data.data
                data.sort((a, b) => {
                    return (a.single_id > b.single_id) ? -1 : 1
                })
                setElements(data)
                return response
            } catch (error) {
                return error
            }
        }
        fetchElements()
    }, [setElements])


    return (
        <>
            <Header />
            <div className="container">
                <SortBar setElements={setElements} sort={sort} setSort={setSort}/>
                <Singles currentElements={currentElements}/>
                <Pagination itemsPerPage={itemsPerPage} totalItems={elements.length} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
            </div>
        </>
    )
}

export default SinglesPage
