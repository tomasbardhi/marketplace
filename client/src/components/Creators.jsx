import React from 'react'
import { useNavigate } from "react-router-dom"

const Creators = ({currentCreators}) => {
    const navigate = useNavigate()

    return (
        <div className="creatorList">
            <div className="creatorListGrid">
                {currentCreators.map((creator, id) => {
                    return (
                        <div className="creator" key={id} onClick={() => navigate(`/creator/${creator.creator_id}`)}>
                            <div className="imgPadding">
                                <div className="imgContainer">
                                    <div className="img"></div>
                                </div>
                            </div>
                            <div className="infoContainer">
                                <div className="infoDetail">
                                    <div className="creatorName"><p>{creator.creator_name}</p></div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div >
    )
}

export default Creators
