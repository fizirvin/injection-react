import React,{useEffect} from 'react'
import { connect } from 'react-redux'
import AddCleaningForm from './AddCleaningForm'
import UpdateCleaningForm from './UpdateCleaningForm'
import { fetchMoldeCleanings, openCleaningForm, closeUpdateForm, selectUpdateCleaning } from './actions'
import './Moldes.css'

const MoldeDetail = ({molde, closeUpdateForm, fetchMoldeCleanings, openCleaningForm,selectUpdateCleaning, isOpen, updateIsOpen, cleanings}) =>{



    const onCleanings = (molde) =>{
        if(cleanings.length === 0){
            return fetchMoldeCleanings(molde)
        } else {
            return 
        }
    }

    const renderUpdateButton = (length, num,cleaning ) =>{
        return length === num ? updateIsOpen? <button onClick={closeUpdateForm}>cancel</button>: <button onClick={()=>selectUpdateCleaning(cleaning)}>Update</button> : null
    }
    
    const renderList = () =>{
        const length = cleanings.length
        return cleanings.map( (cleaning, index) => {
        const {_id, team, shift, date, cycles, counted, comments } = cleaning
        const num = index+1
        return <tbody key={_id}><tr>
            <td rowSpan='2' className='molde-detail-index'>{num}</td>
            <td className='molde-detail-date'>{date}</td>
            <td className='molde-detail-team'>{team}</td>
            <td className='molde-detail-shift'>{shift}</td>
            <td className='molde-detail-cycles'>{cycles}</td>
        <td className='molde-detail-counted'><div className='div_update'>{counted}{renderUpdateButton(length, num, cleaning)}</div></td>
        </tr>
        {comments && <td colSpan='5'>comments: {comments}</td>}
        </tbody> }
      )
    }

    const renderOpenButton = () =>{
        return !updateIsOpen && <button onClick={openCleaningForm}>add Cleaning</button>
    }


    return(
        <div className='molde-detail-container'>
            <table className='molde-detail-table'>
                <thead>
                    <tr>
                        <th>{ molde.moldeNumber} { molde.moldeSerial}</th>
                        <th>{renderOpenButton()}</th>
                        <th><button onClick={()=>onCleanings(molde._id)}>Cleanings</button></th>
                    </tr>
                </thead>
            </table>
            <table className='molde-detail-table'>
                <tbody>
                    <tr>
                        <td className='molde-detail-index'>#</td>
                        <td className='molde-detail-date'>Date</td>
                        <td className='molde-detail-team'>Team</td>
                        <td className='molde-detail-shift'>Shift</td>
                        <td className='molde-detail-cycles'>Cyles</td>
                        <td className='molde-detail-counted'>Counted</td>
                    </tr>
                </tbody>
                    {cleanings && renderList()}
                    {updateIsOpen && <UpdateCleaningForm/>}
                    {isOpen && <AddCleaningForm/>}
            </table>
        </div>
    )
}

const mapStateToProps = state =>({
    molde: state.moldeDetail,
    isOpen: state.cleanFormIsOpen,
    cleanings: state.cleanings,
    message: state.cleaningMessage,
    updateIsOpen: state.cleanUpdateFormIsOpen
})

export default connect(mapStateToProps,{closeUpdateForm, openCleaningForm, fetchMoldeCleanings, selectUpdateCleaning})(MoldeDetail)