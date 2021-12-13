import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import Api from '../api/Api'
import {AppContext} from "../context/AppContext"

const Creator = () => {

    const { id } = useParams()
    const [creator, setCreator] = useState([])
    const {authenticated, bearerToken} = useContext(AppContext)

    useEffect(() => {
        const fetch = async () => {
            try {
                const response = await Api.get(`/creator/${id}`)
                setCreator(response.data.data.creator)
            } catch (error) {
                return error
            }
        }
        fetch()
    }, [id])

    return (

        authenticated && bearerToken === creator.creator_token
        ?
            <div className="creator-wrapper">
                <div className="banner"></div>
                <div className="profile-wrapper">
                    <div className="profile-img-wrapper">
                        <div className="profile-img"></div>
                    </div>
                    <div className="profile-info">
                        <div className="profile-name"><p>{creator.creator_name}</p></div>
                        <div className="profile-address"><p>{creator.creator_address}</p></div>
                    </div>
                </div>
            </div>
        :
        <div>No Permission</div>
    )
}

export default Creator
