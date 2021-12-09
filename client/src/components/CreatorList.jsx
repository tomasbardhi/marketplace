import React, { useEffect, useRef, useState, useCallback } from 'react'
import Api from '../api/Api'

function CreatorList(props) {

    const [creator, setCreator] = useState([])
    const [displayed, setDisplayed] = useState([])

    const loadMore = useCallback(() => {
        if (displayed.length === creator.length) {
            return
        }
        let limit;
        if (displayed.length + 30 > creator.length) {
            limit = creator.length
        } else {
            limit = displayed.length + 30
        }
        for (let i = displayed.length; i < limit; i++) {
            setDisplayed(prev => [...prev, creator[i]])
        }
    }, [displayed.length, creator])

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
                const response = await Api.get(`/creator`)
                const data = response.data.data.creator
                setCreator(data)
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
        <div className="creatorList">
            <div className="creatorListGrid">
                {displayed.map((element, id) => {
                    return (
                        <div ref={displayed.length === id + 1 ? lastElementRef : null} className="creator" key={id}>
                            <div className="imgPadding">
                                <div className="imgContainer">
                                    <div className="img"></div>
                                </div>
                            </div>
                            <div className="infoContainer">
                                <div className="infoDetail">
                                    <div className="creatorName"><p>{element.creator_name}</p></div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div >
    )
}

export default CreatorList
