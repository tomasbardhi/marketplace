import React, {useState, useEffect} from 'react'
import Header from '../components/Header'
import Creators from '../components/Creators'
import Api from "../api/Api"
import Pagination from '../components/Pagination'

function CreatorsPage() {

    const [creators, setCreators] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage] = useState(10)

    const lastItemIndex = currentPage * itemsPerPage
    const firstItemIndex = lastItemIndex - itemsPerPage
    const currentCreators = creators.slice(firstItemIndex, lastItemIndex)

    useEffect(() => {
        const fetch = async () => {
            try {
                const response = await Api.get(`/creator`)                
                const data = response.data.data.creator
                data.sort((a, b) => {
                    return (a.creator_id < b.creator_id) ? -1 : 1
                })
                setCreators(data)
            } catch (error) {
                return error
            }
        }
        fetch()
    }, [])

    return (
        <>
            <Header />
            <Creators currentCreators={currentCreators}/>
            <Pagination itemsPerPage={itemsPerPage} totalItems={creators.length} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
        </>
    )
}

export default CreatorsPage
