import React, { useContext, useEffect, useRef, useState, useCallback } from 'react'
import Api from '../api/Api'
import { AppContext } from "../context/AppContext"
import { useNavigate } from "react-router-dom"

function SingleList(props) {

    const { elements, setElements } = useContext(AppContext)
    const navigate = useNavigate();
    const [displayed, setDisplayed] = useState([])

    const loadMore = useCallback(() => {
        if (displayed.length === elements.length) {
            return
        }
        let limit;
        if (displayed.length + 30 > elements.length) {
            limit = elements.length
        } else {
            limit = displayed.length + 30
        }
        for (let i = displayed.length; i < limit; i++) {
            setDisplayed(prev => [...prev, elements[i]])
        }
    }, [displayed.length, elements])

    const observer = useRef()
    const lastElementRef = useCallback(node => {
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                loadMore()
            }
        })
        if (node) observer.current.observe(node)
    }, [loadMore]);

    const handleView = (id) => {
        navigate(`/single/${id}`)
    }

    useEffect(() => {
        const fetchElements = async () => {
            try {
                const response = await Api.get("/creator_collection_single")
                const data = response.data.data.data
                data.sort((a, b) => {
                    return (a.single_price > b.single_price) ? -1 : 1
                })
                setElements(data)
                let limit;
                if (data.length > 30) {
                    limit = 30
                } else {
                    limit = data.length
                }
                for (let i = 0; i < limit; i++) {
                    setDisplayed(prev => [...prev, data[i]])
                }
                return response
            } catch (error) {
                return error
            }
        }
        fetchElements()
    }, [setElements])

    return (
        <div className="singleList">
            <div className="singleListGrid">
                {displayed.map((element, id) => {
                    return (
                        <div ref={displayed.length === id + 1 ? lastElementRef : null} className="single" key={id} onClick={() => handleView(element.single_id)}>
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
                {/* {elements.map((element, id) => {
                    return (
                        <div className="single" key={id} onClick={() => handleView(element.single_id)}>
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
                                    <p className="price">ADA {element.creator_price}</p>
                                </div>
                            </div>
                        </div>
                    )
                })} */}
            </div>
        </div >
    )
}

export default SingleList
