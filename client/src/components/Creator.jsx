import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import Api from '../api/Api'
import {AppContext} from "../context/AppContext"

function Creator() {

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
            <div>
                <h1>ID: {creator.creator_id}</h1>
                <h1>NAME: {creator.creator_name}</h1>
                <h1>ADDRESS: {creator.creator_address}</h1>
                <h1>PASSWORD: {creator.creator_password}</h1>
                <h1>TOKEN: {creator.creator_token}</h1>
                <h1>AUTHENTICATED: {authenticated.toString()}</h1>
                <h1>TOKEN: {bearerToken}</h1>
            </div>
        :
        <div>No Permission</div>
    )
}

export default Creator
