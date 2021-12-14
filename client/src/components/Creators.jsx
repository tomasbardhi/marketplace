import React from 'react'

const Creators = ({currentCreators}) => {

    return (
        <div className="creatorList">
            <div className="creatorListGrid">
                {currentCreators.map((creator, id) => {
                    return (
                        <div className="creator" key={id}>
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
