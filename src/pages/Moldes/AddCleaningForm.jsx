import React, {useState }from 'react'
import { connect } from 'react-redux'

const AddCleaningForm = ({tCycles}) =>{
    const [ cycles, setCycles] = useState(tCycles)
    const [ date, setDate] = useState('')
    const [ shift, setShift ] = useState('')
    const [ team, setTeam ] = useState('')

    const onInput = (e) =>{
        const name =e.target.name
        const value =e.target.value
        switch (name){
            case 'date':
                return setDate(value)
            case 'cycles':
                return setCycles(value)
            case 'shift':
                return setShift(value)
            case 'team':
                return setTeam(value)
            default:
                return value
        }
    }


    return(
        <tbody>
            <tr>
                <td><input type='date' onChange={onInput} value={date} name='date' className='molde-detail-input'></input></td>
                <td>
                    <select name='team' onChange={onInput} value={team}>
                        <option disabled value=''>select</option>
                        <option value='varias'>RVarias</option>
                        <option value='amealco'>Amealco</option>
                    </select>
                </td>
                <td>
                    <select name='shift' onChange={onInput} value={shift}>
                        <option disabled value=''>select</option>
                        <option value='1'>1</option>
                        <option value='2'>2</option>
                    </select>
                </td>
                <td><input type='number' name='cycles' onChange={onInput} value={cycles} className='model-detail-number'></input></td>
                <td><button>Send</button></td>
            </tr>
            <tr>
                <td colSpan='5'> Comments: <input type='text' className='comments-input'></input></td>
            </tr>
        </tbody>
    )
}

const mapStateToProps = state =>({
    tCycles: state.tCycles
})

export default connect(mapStateToProps)(AddCleaningForm)