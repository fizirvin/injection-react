import React, {useState }from 'react'
import { connect } from 'react-redux'
import { addCleaning  } from './actions'

const AddCleaningForm = ({addCleaning, moldes, closeForm}) =>{
    const [ date, setDate] = useState('')
    const [ shift, setShift ] = useState('')
    const [ comments, setComments ] = useState('')
    const [ errorMessage, setErrorMessage ] = useState('')
    const [ molde, setMolde ] = useState('')

    const onSend = () =>{
        if(!molde | !date | !shift ){ return setErrorMessage('check form') }
        const input = {
                molde,
                date, 
                shift, 
                comments
            }
        closeForm(false)
        return addCleaning(input)
    }   

    const onMolde = (e)=>{
        const value = e.target.value
        return setMolde(value)
    }
    

    const onInput = (e) =>{
        const name =e.target.name
        const value =e.target.value
        switch (name){
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


    const renderMoldes = () =>{
        return moldes.map( ({_id, moldeNumber}) =>{
            return <option key={_id} value={_id}>{moldeNumber}</option>
        })
    }


    return(
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
                {/* <td className='molde-detail-team'>
                    <select name='team' onChange={onInput} value={team}>
                        <option disabled value=''>select</option>
                        <option value='varias'>RVarias</option>
                        <option value='amealco'>Amealco</option>
                    </select>
                </td> */}
                <td className='molde-detail-shift'>
                    <select name='shift' onChange={onInput} value={shift}>
                        <option disabled value=''>select</option>
                        <option value='1'>1</option>
                        <option value='2'>2</option>
                    </select>
                </td>
                {/* <td className='molde-detail-date'></td>
                <td className='molde-detail-shift'></td>
                <td className='molde-detail-cycles'></td> */}
                <td colSpan='4' className='molde-detail-button'><button onClick={onSend}>Send</button><button onClick={()=>closeForm(false)}>Cancel</button></td>
            </tr>
            <tr>
                <td></td>
                <td colSpan='7'> Comments: <input type='text' maxLength='60' name='comments' onChange={onInput} value={comments} className='comments-input'></input></td>
            </tr>
                {errorMessage && <tr><td colSpan='7'>{errorMessage}</td></tr>}
        </tbody>
    )
}

const mapStateToProps = state =>({
    moldes: state.moldes
})

export default connect(mapStateToProps, {addCleaning })(AddCleaningForm)