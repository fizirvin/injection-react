import React, { useState } from 'react'
import { connect } from 'react-redux'
import { updateCleaning } from './actions'


const UpdateCleaningForm = ({ updateCleaning, cleaning, moldes, closeForm }) => {
    const [date, setDate] = useState(cleaning.date)
    const [shift, setShift] = useState(cleaning.shift)
    const [comments, setComments] = useState(cleaning.comments || '')
    const [errorMessage, setErrorMessage] = useState('')
    const [molde, setMolde] = useState(cleaning.molde._id)

    const onSend = () => {
        if (!molde | !date | !shift) { return setErrorMessage('check form') }
        const input = {
            molde,
            date,
            shift,
            comments
        }
        closeForm()
        return updateCleaning(cleaning._id, input)
    }

    const onMolde = (e) => {
        const value = e.target.value
        return setMolde(value)
    }


    const onInput = (e) => {
        const name = e.target.name
        const value = e.target.value
        switch (name) {
            case 'date':
                return setDate(value)
            case 'shift':
                return setShift(value)
            case 'comments':
                return setComments(value)
            default:
                return value
        }
    }


    const renderMoldes = () => {
        return moldes.map(({ _id, moldeNumber }) => {
            return <option key={_id} value={_id}>{moldeNumber}</option>
        })
    }



    return (
        <tbody>
            <tr>
                <td className='molde-detail-index'>#</td>
                <td className='molde-detail-molde'>
                    <select name='molde' onChange={onMolde} value={molde}>
                        <option disabled value=''>select</option>
                        {renderMoldes()}
                    </select>
                </td>
                <td className='molde-detail-date'><input type='date' onChange={onInput} value={date} name='date' className='molde-detail-input'></input></td>
                <td className='molde-detail-shift'>
                    <select name='shift' onChange={onInput} value={shift}>
                        <option disabled value=''>select</option>
                        <option value='1'>1</option>
                        <option value='2'>2</option>
                    </select>
                </td>
                <td className='molde-detail-date'></td>
                <td className='molde-detail-shift'></td>
                <td className='molde-detail-cycles'></td>
                <td className='molde-detail-button'><button onClick={onSend}>Send</button><button onClick={closeForm}>close</button></td>
            </tr>
            <tr>
                <td></td>
                <td colSpan='7'> Comments: <input type='text' maxLength='60' name='comments' onChange={onInput} value={comments} className='comments-input'></input></td>
            </tr>
            {errorMessage && <tr><td colSpan='6'>{errorMessage}</td></tr>}
        </tbody>
    )
}

const mapStateToProps = state => ({
    moldes: state.moldes,
    cycles: state.cycles,
})

export default connect(mapStateToProps, { updateCleaning })(UpdateCleaningForm)