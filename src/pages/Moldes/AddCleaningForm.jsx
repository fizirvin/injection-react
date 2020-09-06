import React, {useState, useEffect }from 'react'
import { connect } from 'react-redux'
import { addCleaning  } from './actions'

const AddCleaningForm = ({tCycles, addCleaning, molde}) =>{
    const [ cycles, setCycles] = useState('')
    const [ date, setDate] = useState('')
    const [ shift, setShift ] = useState('')
    const [ team, setTeam ] = useState('')
    const [ comments, setComments ] = useState('')
    const [ errorMessage, setErrorMessage ] = useState('')

    useEffect(() =>{
        setCycles(tCycles)
    },[tCycles])

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
        return addCleaning(input)
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
                <td colSpan='5'> Comments: <input type='text' name='comments' onChange={onInput} value={comments} className='comments-input'></input></td>
            </tr>
                {errorMessage && <tr><td colSpan='5'>{errorMessage}</td></tr>}
        </tbody>
    )
}

const mapStateToProps = state =>({
    tCycles: state.tCycles,
    molde: state.moldeDetail,
})

export default connect(mapStateToProps, {addCleaning })(AddCleaningForm)