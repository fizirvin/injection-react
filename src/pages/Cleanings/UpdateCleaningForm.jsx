import React, {useState }from 'react'
import { connect } from 'react-redux'
import { updateCleaning } from './actions'

const UpdateCleaningForm = ({ updateCleaning, molde, cleaning }) =>{
    const [ cycles, setCycles] = useState(cleaning.cycles)
    const [ date, setDate] = useState(cleaning.date)
    const [ shift, setShift ] = useState(cleaning.shift)
    const [ team, setTeam ] = useState(cleaning.team)
    const [ comments, setComments ] = useState(cleaning.comments || '')
    const [ errorMessage, setErrorMessage ] = useState('')

    const onSend = () =>{
        if(!cycles | !date | !shift | !team ){ return setErrorMessage('check form') }
        const input = {
                molde: molde._id,
                cycles, 
                date, 
                shift, 
                team,
                comments
            }
        return updateCleaning(cleaning._id, input)
    }   

    

    const onInput = (e) =>{
        const name =e.target.name
        const value =e.target.value
        switch (name){
            case 'date':
                return setDate(value)
            case 'cycles':
                const cyc = onNumChange(value)
                return setCycles(cyc)
            case 'shift':
                return setShift(value)
            case 'team':
                return setTeam(value)
                case 'comments':
                return setComments(value)
            default:
                return value
        }
    }

    const onNumChange = (num) => {
        const value = parseInt(num)
        if( isNaN(value) ){ return '' }
        else if( value === 0 ){ return '' }
        else { 
          return value
        }
      }; 


    return(
        <tbody>
            <tr>
                <td>#</td>
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
                <td><button onClick={onSend}>Send</button></td>
            </tr>
            <tr>
                <td colSpan='6'> Comments: <input type='text' maxLength='54' name='comments' onChange={onInput} value={comments} className='comments-input'></input></td>
            </tr>
                {errorMessage && <tr><td colSpan='6'>{errorMessage}</td></tr>}
        </tbody>
    )
}

const mapStateToProps = state =>({
    tCycles: state.tCycles,
    molde: state.moldeDetail,
    cleaning: state.cleaningSelected,
})

export default connect(mapStateToProps, {updateCleaning })(UpdateCleaningForm)