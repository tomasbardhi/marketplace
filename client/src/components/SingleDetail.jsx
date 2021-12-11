import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import Api from "../api/Api"
import SingleDetailNFT from "./SingleDetailComponents/SingleDetailNFT"
import SingleDetailPrimaryInfo from "./SingleDetailComponents/SingleDetailPrimaryInfo"

function SingleDetail() {

    const { id } = useParams()
    const [single, setSingle] = useState([])

    useEffect(() => {
        window.scrollTo({
            top: 0
        })
        const fetchData = async () => {
            try {
                const response = await Api.get(`/joined/${id}`)
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
            <SingleDetailPrimaryInfo single={single}/>
        </div>
    )
}

export default SingleDetail
