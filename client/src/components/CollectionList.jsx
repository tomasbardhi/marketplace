import React, { useEffect, useRef, useState, useCallback } from 'react'
import Api from '../api/Api'

function CollectionList(props) {

    const [collection, setCollection] = useState([])
    const [displayed, setDisplayed] = useState([])

    const loadMore = useCallback(() => {
        if (displayed.length === collection.length) {
            return
        }
        let limit;
        if (displayed.length + 30 > collection.length) {
            limit = collection.length
        } else {
            limit = displayed.length + 30
        }
        for (let i = displayed.length; i < limit; i++) {
            setDisplayed(prev => [...prev, collection[i]])
        }
    }, [displayed.length, collection])

    const observer = useRef()
    const lastElementRef = useCallback(node => {
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                loadMore()
            }
        })
        if (node) observer.current.observe(node)
    }, [loadMore]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await Api.get(`/collection`)
                const data = response.data.data.collection
                setCollection(data)
                let limit;
                if (data.length > 30) {
                    limit = 30
                } else {
                    limit = data.length
                }
                for (let i = 0; i < limit; i++) {
                    setDisplayed(prev => [...prev, data[i]])
                }
                return response
            } catch (error) {
                return error
            }
        }
        fetchData()
    }, [])

    return (
        <div className="collectionList">
            <div className="collectionListGrid">
                {displayed.map((element, id) => {
                    return (
                        <div ref={displayed.length === id + 1 ? lastElementRef : null} className="collection" key={id}>
                            <div className="imgPadding">
                                <div className="imgContainer">
                                    <div className="img"></div>
                                </div>
                            </div>
                            <div className="infoContainer">
                                <div className="infoDetail">
                                    <div className="collectionName"><p>{element.collection_name}</p></div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div >
    )
}

export default CollectionList
