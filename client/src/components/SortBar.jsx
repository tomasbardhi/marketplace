import React from 'react'

const SortBar = ({setElements, sort, setSort}) => {

    const sortByPriceAsc = () => {
        setSort("priceAsc")
        setElements(prev => prev.sort((a, b) => {
            return (a.single_price < b.single_price) ? -1 : 1
        }))
    }

    const sortByPriceDesc = () => {
        setSort("priceDesc")
        setElements(prev => prev.sort((a, b) => {
            return (a.single_price > b.single_price) ? -1 : 1
        }))
    }

    const sortByDateAsc = () => {
        setSort("dateAsc")
        setElements(prev => prev.sort((a, b) => {
            return (a.single_id < b.single_id) ? -1 : 1
        }))
    }

    const sortByDateDesc = () => {
        setSort("dateDesc")
        setElements(prev => prev.sort((a, b) => {
            return (a.single_id > b.single_id) ? -1 : 1
        }))

    }

    const scrollToTop = (() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    })

    return (    
        <div className="sortBar">
            <div className={sort === "dateAsc" ? "sort activeSort" : "sort"} onClick={() => sortByDateAsc()}>Oldest</div>
            <div className={sort === "dateDesc" ? "sort activeSort" : "sort"} onClick={() => sortByDateDesc()}>Newest</div>
            <div className={sort === "priceAsc" ? "sort activeSort" : "sort"} onClick={() => sortByPriceAsc()} >Price: Low to High</div>
            <div className={sort === "priceDesc" ? "sort activeSort" : "sort"} onClick={() => sortByPriceDesc()}>Price: High to Low</div>
            <div className="moveUp" onClick={() => scrollToTop()} data-tooltip="Move to top"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z" /></svg></div>
        </div>
    )
    
}

export default SortBar
