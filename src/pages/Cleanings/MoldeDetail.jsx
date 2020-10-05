import React, { useState, useEffect } from 'react'
import Spinner from '../../components/Spinner'
import { connect } from 'react-redux'
import AddCleaningForm from './AddCleaningForm'
import UpdateCleaningForm from './UpdateCleaningForm'
import { fetchMoldeCleanings, selectCleaning, unselectCleaning } from './actions'
import './Cleanings.css'

const MoldeDetail = ({ cleanings, cyclesCleaning, loadingCleanings, fetchMoldeCleanings, selectCleaning, unselectCleaning }) => {
    const [updateIsOpen, setUpdateIsOpen] = useState(false)

    const [isOpen, setOpenCleaningForm] = useState(false)
    const [updateCleaning, setUpdateCleaning] = useState('')

    useEffect(() => {
        unselectCleaning()
        if (cleanings.length === 0) { fetchMoldeCleanings() }

    }, [unselectCleaning, fetchMoldeCleanings])

    const onUpdate = (cleaning) => {
        setUpdateIsOpen(true)
        setUpdateCleaning(cleaning)
    }

    const onCancelUpdate = () => {
        setUpdateIsOpen(false)
        setUpdateCleaning('')
    }

    const renderUpdateButton = (active, cleaning) => {
        return active && !isOpen && !updateCleaning ? <button onClick={() => onUpdate(cleaning)}>Up</button> : null
    }

    const to_updated = (_id) => {
        return updateIsOpen && _id === updateCleaning._id ? 'to_updated' : null
    }

    const onCycles = (cleaning) => {
        selectCleaning(cleaning)
    }

    const renderList = () => {
        const length = cleanings.length
        return cleanings.map((cleaning, index) => {
            const { _id, molde, shift, date, comments, end, shiftEnd, quantity, active } = cleaning
            const num = index + 1

            return <tbody key={_id} className={to_updated(_id)}><tr>
                <td rowSpan='2' className='molde-detail-index'>{num}</td>
                <td className='molde-detail-molde'>{molde.moldeNumber}</td>
                <td className='molde-detail-date'>{date}</td>
                <td className='molde-detail-shift'>{shift}</td>
                <td className='molde-detail-date'>{end}</td>
                <td className='molde-detail-shift'>{shiftEnd}</td>
                <td className='molde-detail-cycles'>{quantity}</td>
                <td className='molde-detail-button'>{renderCycButton(cleaning)}{renderUpdateButton(active, cleaning)}</td>
            </tr>
                {comments && <tr><td colSpan='8'>{comments}</td></tr>}
            </tbody>
        }
        )
    }

    const renderOpenButton = () => {
        return <button onClick={() => setOpenCleaningForm(!isOpen)} disabled={updateIsOpen}>add Shot</button>
    }

    const renderCycButton = (cleaning) => {
        return !cyclesCleaning ? <button onClick={() => onCycles(cleaning)}>Cyc</button> : cleaning._id === cyclesCleaning._id ? <button onClick={unselectCleaning}>Clo</button> : <button onClick={() => onCycles(cleaning)}>Cyc</button>
    }


    return (
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
                        <td className='molde-detail-date'>Date Start</td>
                        <td className='molde-detail-shift'>Shift</td>
                        <td className='molde-detail-date'>Date End</td>
                        <td className='molde-detail-shift'>Shift</td>
                        <td className='molde-detail-cycles'>Quantity</td>
                        <td className='molde-detail-button'></td>
                    </tr>
                </tbody>
                {loadingCleanings ? <tbody><tr><td colSpan='8'><Spinner /></td></tr></tbody> : cleanings && renderList()}
                {updateCleaning && <UpdateCleaningForm closeForm={onCancelUpdate} cleaning={updateCleaning} />}
                {isOpen && <AddCleaningForm closeForm={setOpenCleaningForm} />}
            </table>
        </div>
    )
}

const mapStateToProps = state => ({
    moldes: state.moldes,
    cleanings: state.cleanings,
    loadingCleanings: state.loadingCleanings,
    cyclesCleaning: state.cleaningSelected
})

export default connect(mapStateToProps, { fetchMoldeCleanings, selectCleaning, unselectCleaning })(MoldeDetail)