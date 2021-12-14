import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import Api from "../api/Api"
import {AppContext} from "../context/AppContext"
import CreatorBanner from '../components/Creator'
import Header from '../components/Header'
import Singles from '../components/Singles'
import SortBar from '../components/SortBar'
import Pagination from '../components/Pagination'
import Collections from '../components/Collections'

const CreatorDetailPage = () => {

    const { id } = useParams()
    const [creator, setCreator] = useState([])
    const {authenticated, bearerToken} = useContext(AppContext)
    const [elements, setElements] = useState([])
    const [collections, setCollections] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage] = useState(20)
    const [sort, setSort] = useState("dateDesc")
    const [display, setDisplay] = useState("single")

    const lastItemIndex = currentPage * itemsPerPage
    const firstItemIndex = lastItemIndex - itemsPerPage
    const currentElements = elements.slice(firstItemIndex, lastItemIndex)
    const currentCollections = collections.slice(firstItemIndex, lastItemIndex)

    useEffect(() => {
        const fetch = async () => {
            try {
                const response = await Api.get(`/creator/${id}`)
                setCreator(response.data.data.creator)
                const _elements = await Api.get(`/joined/creator/${id}`)
                const data = _elements.data.data.data
                data.sort((a, b) => {
                    return (a.single_id > b.single_id) ? -1 : 1
                })
                setElements(data)
                const _collections = await Api.get(`/collection/creator/${id}`)
                const _collection_data = _collections.data.data.collection
                _collection_data.sort((a, b) => {
                    return (a.collection_id > b.collection_id) ? -1 : 1
                })
                setCollections(_collection_data)
            } catch (error) {
                return error
            }
        }
        fetch()
    }, [id])

    return (
        authenticated && bearerToken === creator.creator_token
        ?
            <>
                <Header/>
                <CreatorBanner creator={creator}/>
                <div className="container">
                    <div className="typeBar">
                        <div className={display === "single" ? "type activeType" : "type" } onClick={() => {
                            setDisplay("single")
                            setCurrentPage(1)
                            }}>NFTs</div>
                        <div className={display === "collection" ? "type activeType" : "type" } onClick={() => {
                            setDisplay("collection")
                            setCurrentPage(1)
                            }}>Collections</div>
                    </div>
                    {
                        display === "collection"
                        ?
                        <>
                            <Collections currentCollections={currentCollections}/>
                            <Pagination itemsPerPage={itemsPerPage} totalItems={collections.length} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
                        </>
                        :
                        <>
                            <SortBar setElements={setElements} sort={sort} setSort={setSort}/>
                            <Singles currentElements={currentElements}/>
                            <Pagination itemsPerPage={itemsPerPage} totalItems={elements.length} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
                        </>
                    }
                </div>
            </>
        :
        <>
            <Header />
            <div>No Permission</div>
        </>
    )
}

export default CreatorDetailPage
