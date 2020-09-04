import React from 'react'
import { connect } from 'react-redux'
import AddCleaningForm from './AddCleaningForm'
import { fetchMoldes, opeanCleaningForm } from './actions'
import './Moldes.css'

const MoldeDetail = ({molde, opeanCleaningForm,isOpen}) =>{
    return(
        <div className='molde-detail-container'>
            <table className='molde-detail-table'>
                <thead>
                    <tr>
                        <th colSpan='4'>{ molde.moldeNumber} { molde.moldeSerial}</th>
                        <th><button onClick={opeanCleaningForm}>add Cleaning</button></th>
                        <th><button >Cleanings</button></th>
                    </tr>
                </thead>
            </table>
            <table className='molde-detail-table'>
                <tbody>
                    <tr>
                        <td className='molde-detail-row'>Date</td>
                        <td>Team</td>
                        <td>Worker</td>
                        <td>Tcyles</td>
                        <td>Cyc Past</td>
                        <td>Comments</td>
                    </tr>
                </tbody>
                {isOpen && <AddCleaningForm/>}
            </table>
        </div>
    )
}

const mapStateToProps = state =>({
    molde: state.molde,
    isOpen: state.cleanFormIsOpen
})

export default connect(mapStateToProps,{opeanCleaningForm})(MoldeDetail)