import React from 'react'
import { connect } from 'react-redux'
import AddCleaningForm from './AddCleaningForm'
import { fetchMoldes, openCleaningForm } from './actions'
import './Moldes.css'

const MoldeDetail = ({molde, openCleaningForm,isOpen}) =>{
    return(
        <div className='molde-detail-container'>
            <table className='molde-detail-table'>
                <thead>
                    <tr>
                        <th>{ molde.moldeNumber} { molde.moldeSerial}</th>
                        <th ><button onClick={openCleaningForm}>add Cleaning</button></th>
                        <th><button >Cleanings</button></th>
                    </tr>
                </thead>
            </table>
            <table className='molde-detail-table'>
                <tbody>
                    <tr>
                        <td className='molde-detail-date'>Date</td>
                        <td className='molde-detail-team'>Team</td>
                        <td className='molde-detail-shift'>Shift</td>
                        <td className='molde-detail-cycles'>Cyles</td>
                        <td className='molde-detail-counted'>Counted</td>
                    </tr>
                </tbody>
                {isOpen && <AddCleaningForm/>}
            </table>
        </div>
    )
}

const mapStateToProps = state =>({
    molde: state.moldeDetail,
    isOpen: state.cleanFormIsOpen
})

export default connect(mapStateToProps,{openCleaningForm})(MoldeDetail)