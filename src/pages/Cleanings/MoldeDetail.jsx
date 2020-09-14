import React, { useState, useEffect } from 'react'
import Spinner from '../../components/Spinner'
import { connect } from 'react-redux'
import AddCleaningForm from './AddCleaningForm'
import UpdateCleaningForm from './UpdateCleaningForm'
import { fetchMoldeCleanings, selectCleaning, unselectCleaning } from './actions'
import './Cleanings.css'

const MoldeDetail = ({cleanings, cyclesCleaning, loadingCleanings, fetchMoldeCleanings, selectCleaning, unselectCleaning}) =>{
    const [updateIsOpen, setUpdateIsOpen ] = useState(false)
    
    const [isOpen, setOpenCleaningForm ] = useState(false)
    const [updateCleaning, setUpdateCleaning ] = useState('')

    useEffect(() =>{
            unselectCleaning()
            fetchMoldeCleanings()
        
    },[unselectCleaning, fetchMoldeCleanings])

    const onUpdate= (cleaning)=>{
        setUpdateIsOpen(true)
        setUpdateCleaning(cleaning)
    }

    const onCancelUpdate= ( )=>{
        setUpdateIsOpen(false)
        setUpdateCleaning('')
    }

    const renderUpdateButton = (length, num,cleaning ) =>{
        return length === num ? updateIsOpen? <button onClick={onCancelUpdate}>cancel</button>: !isOpen && <button onClick={()=>onUpdate(cleaning)}>Update</button> : null
    }

    const to_updated = (length, num) =>{
        return length === num && updateIsOpen ? 'to_updated' : null
    }

    const onCycles = (cleaning) =>{
        selectCleaning(cleaning)
    }
    
    const renderList = () =>{
        const length = cleanings.length
        return cleanings.map( (cleaning, index) => {
        const {_id, molde, team, shift, date, cycles, counted, comments } = cleaning
        const num = index+1
        
        return <tbody key={_id} className={to_updated(length, num)}><tr>
            <td rowSpan='2' className='molde-detail-index'>{num}</td>
            <td className='molde-detail-molde'>{molde.moldeNumber}</td>
            <td className='molde-detail-date'>{date}</td>
            <td className='molde-detail-team'>{team}</td>
            <td className='molde-detail-shift'>{shift}</td>
            <td className='molde-detail-cycles'>{cycles}</td>
            <td className='molde-detail-counted'>{counted}</td>
        <td className='molde-detail-button'>{renderCycButton(cleaning)}{renderUpdateButton(length, num, cleaning)}</td>
        </tr>
        { comments && <tr><td colSpan='8'>{comments}</td></tr>}
        </tbody> }
      )
    }

    const renderOpenButton = () =>{
        return <button onClick={ ()=>setOpenCleaningForm(!isOpen)} disabled={updateIsOpen}>add Cleaning</button>
    }

    const renderCycButton = (cleaning) =>{
        return !cyclesCleaning ? <button onClick={()=>onCycles(cleaning)}>Cyc</button> : cleaning._id === cyclesCleaning._id ? <button onClick={unselectCleaning}>close</button> : <button onClick={()=>onCycles(cleaning)}>Cyc</button> 
    }


    return(
        <div className='molde-detail-container'>
            <table className='molde-detail-table'>
                <thead>
                    <tr>
                        <th>{renderOpenButton()}</th>
                    </tr>
                </thead>
            </table>
            <table className='molde-detail-table'>
                <tbody>
                    <tr>
                        <td className='molde-detail-index'>#</td>
                        <td className='molde-detail-molde'>Molde</td>
                        <td className='molde-detail-date'>Date</td>
                        <td className='molde-detail-team'>Team</td>
                        <td className='molde-detail-shift'>Shift</td>
                        <td className='molde-detail-cycles'>Cyles</td>
                        <td className='molde-detail-counted'>Counted</td>
                        <td className='molde-detail-button'></td>
                    </tr>
                </tbody>
                    { loadingCleanings? <tbody><tr><td colSpan='8'><Spinner/></td></tr></tbody> : cleanings && renderList()}
                    {updateCleaning && <UpdateCleaningForm closeForm={setUpdateIsOpen} cleaning={updateCleaning}/>}
                    {isOpen && <AddCleaningForm closeForm={setOpenCleaningForm}/>}
            </table>
        </div>
    )
}

const mapStateToProps = state =>({
    moldes: state.moldes,
    cleanings: state.cleanings,
    loadingCleanings: state.loadingCleanings,
    cyclesCleaning: state.cleaningSelected
})

export default connect(mapStateToProps,{ fetchMoldeCleanings, selectCleaning, unselectCleaning })(MoldeDetail)