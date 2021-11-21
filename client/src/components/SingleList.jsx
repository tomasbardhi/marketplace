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

    const testElements = [
        {
            single_id: 1,
            single_name: "name1",
            single_creator_name: "creator1",
            single_collection_name: "collection1"
        },
        {
            single_id: 1,
            single_name: "name1",
            single_creator_name: "creator1",
            single_collection_name: "collection1"
        },
        {
            single_id: 1,
            single_name: "name1",
            single_creator_name: "creator1",
            single_collection_name: "collection1"
        },
        {
            single_id: 1,
            single_name: "name1",
            single_creator_name: "creator1",
            single_collection_name: "collection1"
        },
        {
            single_id: 1,
            single_name: "name1",
            single_creator_name: "creator1",
            single_collection_name: "collection1"
        }
    ]

    return (
        <div className="singleList">
            <div className="singleListGrid">
                {testElements.map((element) => {
                    return (
                        <div className="single" key={element.single_id} onClick={() => handleView(element.single_id)}>
                            <div className="img"></div>
                            <div className="detail">
                                <div>{element.single_id}</div>
                                <div>{element.single_name}</div>
                                <div>{element.creator_name}</div>
                                <div>{element.collection_name}</div>
                            </div>
                            <div className="action">
                                <div className="detailBtn"><p>View</p></div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div >
    )
}

export default SingleList
