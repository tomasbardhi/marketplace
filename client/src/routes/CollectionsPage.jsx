import React, {useState, useEffect} from 'react'
import Header from '../components/Header'
import Collections from '../components/Collections'
import Pagination from '../components/Pagination'
import Api from "../api/Api"

function CollectionsPage() {
    const [collections, setCollections] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage] = useState(10)

    const lastItemIndex = currentPage * itemsPerPage
    const firstItemIndex = lastItemIndex - itemsPerPage
    const currentCollections = collections.slice(firstItemIndex, lastItemIndex)

    useEffect(() => {
        const fetch = async () => {
            try {
                const response = await Api.get(`/collection`)                
                const data = response.data.data.collection
                data.sort((a, b) => {
                    return (a.collection_id < b.collection_id) ? -1 : 1
                })
                setCollections(data)
            } catch (error) {
                return error
            }
        }
        fetch()
    }, [])

    return (
        <>
            <Header />
            <Collections currentCollections={currentCollections}/>
            <Pagination itemsPerPage={itemsPerPage} totalItems={collections.length} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
        </>
    )
}

export default CollectionsPage
