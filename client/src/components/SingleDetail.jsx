import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router'
import Api from "../api/Api"
import { AppContext } from "../context/AppContext"

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
        <div>
            <h1>Single {single.single_name} Detail</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Single</th>
                        <th>Creator</th>
                        <th>Collection</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{single.single_id}</td>
                        <td>{single.single_name}</td>
                        <td>{single.creator_name}</td>
                        <td>{single.collection_name}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default SingleDetail
