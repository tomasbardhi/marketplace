import React, { useContext, useEffect } from 'react'
import Api from '../api/Api'
import { AppContext } from "../context/AppContext"
import { useNavigate } from "react-router-dom"

function SingleList(props) {

    const { elements, setElements } = useContext(AppContext)
    const navigate = useNavigate();

    const handleView = (id) => {
        navigate(`/single/${id}`)
    }

    useEffect(() => {
        const fetchElements = async () => {
            try {
                const response = await Api.get("/creator_collection_single")
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
        <div className="singleList">
            <div className="singleListGrid">
                {elements.map((element) => {
                    return (
                        <div className="single" key={element.single_id} onClick={() => handleView(element.single_id)}>
                            <div className="imgPadding">
                                <div className="imgContainer">
                                    <div className="img"></div>
                                </div>
                            </div>
                            <div className="infoContainer">
                                <div className="infoDetail">
                                    {/* <div>{element.single_id}</div> */}
                                    <div className="collectionName"><p>{element.collection_name}</p></div>
                                    <div className="singleName"><p>{element.single_name}</p></div>
                                    <div className="creatorName"><p>By {element.creator_name}</p></div>
                                </div>
                                <div className="priceDetail">
                                    <p className="buyBtn">Buy Now</p>
                                    <p className="price">ETH 0.43</p>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div >
    )
}

export default SingleList
