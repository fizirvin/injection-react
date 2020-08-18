import React from 'react'
import '../../pages/styles/pagination.css'

const Pagination = ({currentPage, lastPage, items, totalReports, onNext}) =>{

    return(
        <div className='pagination'>
            <div>Items: {items} / {totalReports}</div>
            <div>
                {currentPage < lastPage && (
                    <button onClick={onNext}>
                        Next
                    </button>
                )}
            </div>
        </div>
    )
}

export default Pagination