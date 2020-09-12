import React, {useState, useEffect }from 'react'
import { connect } from 'react-redux'
import { addCleaning  } from './actions'

const AddCleaningForm = ({tCycles, addCleaning, moldes}) =>{
    const [ cycles, setCycles] = useState('')
    const [ date, setDate] = useState('')
    const [ shift, setShift ] = useState('')
    const [ team, setTeam ] = useState('')
    const [ comments, setComments ] = useState('')
    const [ errorMessage, setErrorMessage ] = useState('')
    const [ molde, setMolde ] = useState('')

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
            case 'molde':
                return setMolde(value)
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

    const renderMoldes = () =>{
        return moldes.map( ({_id, moldeNumber}) =>{
            return <option key={_id} value={_id}>{moldeNumber}</option>
        })
    }


    return(
        <tbody>
            <tr>
                <td>#</td>
                <td>
                    <select name='molde' onChange={onInput} value={molde}>
                        <option disabled value=''>select</option>
                        {renderMoldes()}
                    </select>
                </td>
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
                <td></td>
                <td><button onClick={onSend}>Send</button></td>
            </tr>
            <tr>
                <td></td>
                <td colSpan='7'> Comments: <input type='text' maxLength='54' name='comments' onChange={onInput} value={comments} className='comments-input'></input></td>
            </tr>
                {errorMessage && <tr><td colSpan='7'>{errorMessage}</td></tr>}
        </tbody>
    )
}

const mapStateToProps = state =>({
    tCycles: state.tCycles,
    moldes: state.moldes,
})

export default connect(mapStateToProps, {addCleaning })(AddCleaningForm)