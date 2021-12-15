import React from 'react'
import { useNavigate } from "react-router-dom"

const Singles = ({currentElements}) => {
    const navigate = useNavigate();

    return (
        <div className="singleListGrid">
            {currentElements.map((element, id) => {
                return (
                    <div className="single" key={id} onClick={(e) => {
                        e.stopPropagation()
                        navigate(`/single/${element.single_id}`)
                        }}>
                        <div className="imgPadding">
                            <div className="imgContainer">
                                <div className="img"></div>
                            </div>
                        </div>
                        <div className="infoContainer">
                            <div className="infoDetail">
                                <div className="collectionName"><p>{element.collection_name}</p></div>
                                <div className="singleName"><p>{element.single_name}</p></div>
                                <div className="creatorName" onClick={(e) => {
                                    e.stopPropagation()
                                    navigate(`/creator/${element.creator_id}`)
                                }}><p>By {element.creator_name}</p></div>
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
    )
}

export default Singles