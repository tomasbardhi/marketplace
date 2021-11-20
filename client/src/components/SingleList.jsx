import React, { useContext, useEffect } from 'react'
import Api from '../api/Api'
import { AppContext } from "../context/AppContext"

function SingleList(props) {

    const { elements, setElements } = useContext(AppContext)

    useEffect(() => {
        const fetchElements = async () => {
            try {
                const response = await Api.get("/creator_collection_single")
                setElements(response.data.data.data)
                return response
            } catch (error) {
                return error
            }
        }
        fetchElements()
    }, [])

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Creator</th>
                        <th>Collection</th>
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
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default SingleList
