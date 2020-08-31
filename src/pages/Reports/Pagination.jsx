import React from 'react'
import { connect } from 'react-redux'
import { fetchReports } from './actions.js'
import '../../styles/pagination.css'

const Pagination = ({page, reports, totalReports, fetchReports}) =>{
    
    const lastPage = Math.ceil(totalReports / 100)
    const items= reports.length
    return(
        <div className='pagination'>
            <div>Items: {items} / {totalReports}</div>
            <div>
                { page < lastPage && (
                    <button onClick={()=>fetchReports(page)}>
                        Next
                    </button>
                )}
            </div>
        </div>
    )
}

const mapStateToProps = state =>({
    reports: state.reports,
    page: state.page,
    totalReports: state.totalReports
})

export default connect(mapStateToProps, { fetchReports })(Pagination)