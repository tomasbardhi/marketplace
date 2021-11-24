import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router'
import Api from "../api/Api"
import { AppContext } from "../context/AppContext"
import SingleDetailNFT from "./SingleDetailComponents/SingleDetailNFT"
import SingleDetailPrimaryInfo from "./SingleDetailComponents/SingleDetailPrimaryInfo"

function SingleDetail() {

    const { id } = useParams()
    const { single, setSingle } = useContext(AppContext)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await Api.get(`/creator_collection_single/${id}`)
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
            <SingleDetailNFT />
            <SingleDetailPrimaryInfo />
        </div>
    )
}

export default SingleDetail
