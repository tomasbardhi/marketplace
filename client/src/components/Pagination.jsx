import React from 'react'

const Paginaton = ({itemsPerPage, totalItems, currentPage, setCurrentPage}) => {

    const pageNumbers = [];

    const paginate = pageNumber => {
        setCurrentPage(pageNumber)
        window.scrollTo(0, 0);
    }

    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
        pageNumbers.push(i)
    }

    return (
        pageNumbers.length === 0
        ?
        <></>
        :
        <div className="paginationBar">
            <div className="pagination">
                <div className={currentPage===1 ? "page selected" : "page" } onClick={() => paginate(1)}>1</div>
                {
                    currentPage > 4
                    ?
                    <div className="intermezzo">
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                    :
                    <></>
                }
                {pageNumbers.filter((pageNumber) => (pageNumber <= currentPage+2) && (pageNumber >= currentPage-2) && (pageNumber > 1) && (pageNumber < pageNumbers.length)).map((pageNumber) => {
                    return (
                        <div key={pageNumber} className={currentPage===pageNumber ? "page selected" : "page" } onClick={() => paginate(pageNumber)}>{pageNumber}</div>
                    )
                })}

                {
                    currentPage < pageNumbers.length-3
                    ?
                    <div className="intermezzo">
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                    :
                    <></>
                }
                {
                    pageNumbers.length > 1
                    ?
                    <div className={currentPage===pageNumbers.length ? "page selected" : "page" } onClick={() => paginate(pageNumbers.length)}>{pageNumbers.length}</div>
                    :
                    <></>
                }
                
            </div>
        </div>
    )
}

export default Paginaton