import React, {useEffect, useState } from 'react'
import { useParams } from 'react-router'
import Api from "../api/Api"
import { useNavigate } from "react-router-dom"

const SingleDetail = () => {

    const { id } = useParams()
    const [single, setSingle] = useState([])
    const dollarPrice = 272.09
    const navigate = useNavigate()

    useEffect(() => {
        window.scrollTo({
            top: 0
        })
        const fetchData = async () => {
            try {
                const response = await Api.get(`/joined/single/${id}`)
                setSingle(response.data.data.data)
                return response
            } catch (error) {
                return error
            }
        }
        fetchData()
    }, [setSingle, id])

    return (
        <div className="SingleDetail">
            <div className="SingleDetailNFT">
                <div className="SingleDetail-imgContainer">
                    <div className="SingleDetail-img"></div>
                </div>
            </div>
            <div className="SingleDetailPrimaryInfo">
                <p className="collectionName">{single.collection_name}</p>
                <p className="singleName">{single.single_name}</p>
                <p className="creatorName" onClick={(e) => {
                        e.stopPropagation()
                        navigate(`/creator/${single.creator_id}`)
                        }}>Created by {single.creator_name}</p>
                <div className="priceBox">
                    <p>Current price</p>
                    <div className="singlePrice">
                        <div className="svgContainer">
                            <svg version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 190 190">
                                <g>
                                    <path d="M167.3,109.9c-0.2-3.8-3.6-6.7-7.5-6.7h-21.2l0,0l-5.8-14.7l0,0h13.1c3.8,0,7.3-2.8,7.5-6.7c0.2-4-3-7.3-6.9-7.3h-19.2l0,0   l-24-60.5c-1-2.6-3.6-4.4-6.5-4.4c-2.8,0-5.4,1.8-6.5,4.4L67.3,74.4l0,0H48.5c-3.8,0-7.3,2.8-7.5,6.7c-0.2,4,3,7.3,6.9,7.3h13.7   l0,0L56,103l0,0H35c-3.8,0-7.3,2.8-7.5,6.7c-0.2,4,3,7.3,6.9,7.3h16.1l0,0l-18.8,48.8c-1.4,3.6,0.4,7.7,4,9.1   c0.8,0.4,1.6,0.4,2.4,0.4c2.8,0,5.4-1.6,6.5-4.4l20.8-53.8l0,0h63.3l0,0l21.6,54.4c1,2.8,3.6,4.4,6.5,4.4c0.8,0,1.8-0.2,2.6-0.4   c3.6-1.4,5.2-5.4,3.8-9.1l-19.6-49.2l0,0h15.9C164.2,117.1,167.5,113.9,167.3,109.9z M97.1,36.1l15.1,38.3l0,0H82.4l0,0L97.1,36.1   C96.9,36.1,97.1,36.1,97.1,36.1z M71.1,103.2l5.6-14.7l0,0h40.7l0,0l5.8,14.7l0,0H71.1L71.1,103.2z" />
                                </g>
                            </svg>
                        </div>
                        <p><span className="price">{single.single_price}</span> <span className="convertedPrice">(${dollarPrice})</span></p>
                    </div>
                    <div className="action">
                        <div className="actionBtn">Buy now</div>
                        <div className="actionBtn">Make offer</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SingleDetail
