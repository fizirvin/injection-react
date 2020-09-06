import React from 'react'
import { connect } from 'react-redux'
import AddCleaningForm from './AddCleaningForm'
import { fetchMoldeCleanings, openCleaningForm } from './actions'
import './Moldes.css'

const MoldeDetail = ({molde, fetchMoldeCleanings, openCleaningForm,isOpen, cleanings}) =>{

    const onCleanings = (molde) =>{
        if(cleanings.length === 0){
            return fetchMoldeCleanings(molde)
        } else {
            return 
        }
    }
    
    const renderList = () =>{
        return cleanings.map( cleaning => {
        const {_id, team, shift, date, cycles, counted, comments } = cleaning
        return <tbody key={_id}><tr>
            <td className='molde-detail-date'>{date}</td>
            <td className='molde-detail-team'>{team}</td>
            <td className='molde-detail-shift'>{shift}</td>
            <td className='molde-detail-cycles'>{cycles}</td>
            <td className='molde-detail-counted'>{counted}</td>
        </tr>
        {comments && <td colSpan='5'>comments: {comments}</td>}
        </tbody> }
      )
    }


    return(
        <div className='molde-detail-container'>
            <table className='molde-detail-table'>
                <thead>
                    <tr>
                        <th>{ molde.moldeNumber} { molde.moldeSerial}</th>
                        <th ><button onClick={openCleaningForm}>add Cleaning</button></th>
                        <th><button onClick={()=>onCleanings(molde._id)}>Cleanings</button></th>
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
                    {cleanings && renderList()}
            </table>
        </div>
    )
}

const mapStateToProps = state =>({
    molde: state.moldeDetail,
    isOpen: state.cleanFormIsOpen,
    cleanings: state.cleanings,
    message: state.cleaningMessage
})

export default connect(mapStateToProps,{openCleaningForm, fetchMoldeCleanings})(MoldeDetail)