import React from 'react'

const CreatorBanner = ({creator}) => {

    return (
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
    )
}

export default CreatorBanner
