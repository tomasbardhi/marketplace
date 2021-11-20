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
        <div>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Creator</th>
                        <th>Collection</th>
                        <th>View</th>
                    </tr>
                </thead>
                <tbody>
                    {elements.map((element) => {
                        return (
                            <tr key={element.single_id}>
                                <td>{element.single_id}</td>
                                <td>{element.single_name}</td>
                                <td>{element.creator_name}</td>
                                <td>{element.collection_name}</td>
                                <td><button onClick={() => handleView(element.single_id)}>View</button></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div >
    )
}

export default SingleList
