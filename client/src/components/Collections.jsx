import React from 'react'

const Collections = ({currentCollections}) => {

    return (
        <div className="collectionList">
            <div className="collectionListGrid">
                {currentCollections.map((collection, id) => {
                    return (
                        <div className="collection" key={id}>
                            <div className="imgPadding">
                                <div className="imgContainer">
                                    <div className="img"></div>
                                </div>
                            </div>
                            <div className="infoContainer">
                                <div className="infoDetail">
                                    <div className="collectionName"><p>{collection.collection_name}</p></div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div >
    )
}

export default Collections