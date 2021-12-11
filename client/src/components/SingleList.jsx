import React, {useEffect, useState, useContext } from 'react'
import Api from '../api/Api'
import { useNavigate } from "react-router-dom"
import Pagination from './Pagination'
import { AppContext } from '../context/AppContext'

function SingleList(props) {

    
    const { authenticated } = useContext(AppContext)
    const [elements, setElements] = useState([])
    const navigate = useNavigate();
    const [sort, setSort] = useState("dateDesc")
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage] = useState(50)

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


    const lastItemIndex = currentPage * itemsPerPage
    const firstItemIndex = lastItemIndex - itemsPerPage
    const currentItems = elements.slice(firstItemIndex, lastItemIndex)

    const paginate = pageNumber => {
        setCurrentPage(pageNumber)
        window.scrollTo(0, 0);
    }

    const handleView = (id) => {
        navigate(`/single/${id}`)
    }

    const sortByPriceAsc = () => {
        setSort("priceAsc")
        setElements(prev => prev.sort((a, b) => {
            return (a.single_price < b.single_price) ? -1 : 1
        }))
    }

    const sortByPriceDesc = () => {
        setSort("priceDesc")
        setElements(prev => prev.sort((a, b) => {
            return (a.single_price > b.single_price) ? -1 : 1
        }))
    }

    const sortByDateAsc = () => {
        setSort("dateAsc")
        setElements(prev => prev.sort((a, b) => {
            return (a.single_id < b.single_id) ? -1 : 1
        }))
    }

    const sortByDateDesc = () => {
        setSort("dateDesc")
        setElements(prev => prev.sort((a, b) => {
            return (a.single_id > b.single_id) ? -1 : 1
        }))

    }

    const scrollToTop = (() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    })

    return (    
        authenticated
        ?
        <div className="singleList">
            <div className="sortBar">
                <div className={sort === "dateAsc" ? "sort activeSort" : "sort"} onClick={() => sortByDateAsc()}>Oldest</div>
                <div className={sort === "dateDesc" ? "sort activeSort" : "sort"} onClick={() => sortByDateDesc()}>Newest</div>
                <div className={sort === "priceAsc" ? "sort activeSort" : "sort"} onClick={() => sortByPriceAsc()} >Price: Low to High</div>
                <div className={sort === "priceDesc" ? "sort activeSort" : "sort"} onClick={() => sortByPriceDesc()}>Price: High to Low</div>
                <div className="moveUp" onClick={() => scrollToTop()} data-tooltip="Move to top"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z" /></svg></div>
            </div>
            <div className="singleListGrid">
                {currentItems.map((element, id) => {
                    return (
                        <div /*ref={displayed.length === id + 1 ? lastElementRef : null}*/ className="single" key={id} onClick={() => handleView(element.single_id)}>
                            <div className="imgPadding">
                                <div className="imgContainer">
                                    <div className="img"></div>
                                </div>
                            </div>
                            <div className="infoContainer">
                                <div className="infoDetail">
                                    <div className="collectionName"><p>{element.collection_name}</p></div>
                                    <div className="singleName"><p>{element.single_name}</p></div>
                                    <div className="creatorName"><p>By {element.creator_name}</p></div>
                                </div>
                                <div className="priceDetail">
                                    <p className="buyBtn">Buy Now</p>
                                    <p className="price">ADA {element.single_price}</p>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
            <Pagination itemsPerPage={itemsPerPage} totalItems={elements.length} paginate={paginate} currentPage={currentPage} />
        </div >
        :
        <></>
    )
}

export default SingleList
