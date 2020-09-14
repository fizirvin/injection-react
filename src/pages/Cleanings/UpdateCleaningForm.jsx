import React, {useState }from 'react'
import { connect } from 'react-redux'
import { updateCleaning } from './actions'


const UpdateCleaningForm = ({ updateCleaning, cleaning, cycles, moldes, closeForm }) =>{
    const [ moldCycles, setCycles] = useState(cleaning.cycles)
    const [ date, setDate] = useState(cleaning.date)
    const [ shift, setShift ] = useState(cleaning.shift)
    const [ team, setTeam ] = useState(cleaning.team)
    const [ comments, setComments ] = useState(cleaning.comments || '')
    const [ errorMessage, setErrorMessage ] = useState('')
    const [ molde, setMolde ] = useState(cleaning.molde._id)

    const onSend = () =>{
        if(!moldCycles | !date | !shift | !team ){ return setErrorMessage('check form') }
        const input = {
                molde,
                cycles: moldCycles, 
                date, 
                shift, 
                team,
                comments
            }
        closeForm(false)
        return updateCleaning(cleaning._id, input)
    }   

    const onMolde = (e)=>{
        const value = e.target.value
        
        const moldeCycles = moldes.find(molde => molde._id === value)
        const array = cycles.filter( item => item.molde === value )

        const filter = array.reduce( (a, b) =>{
          return a + b.tcycles || 0
        },0)
        
        const sum = filter + moldeCycles.tcycles
        setCycles(sum)
        return setMolde(value)
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
                <td className='molde-detail-team'>
                    <select name='team' onChange={onInput} value={team}>
                        <option disabled value=''>select</option>
                        <option value='varias'>RVarias</option>
                        <option value='amealco'>Amealco</option>
                    </select>
                </td>
                <td className='molde-detail-shift'>
                    <select name='shift' onChange={onInput} value={shift}>
                        <option disabled value=''>select</option>
                        <option value='1'>1</option>
                        <option value='2'>2</option>
                    </select>
                </td>
                <td className='molde-detail-cycles'><input type='number' name='cycles' onChange={onInput} value={moldCycles} className='molde-detail-number'></input></td>
                <td className='molde-detail-counted'>{cleaning.counted}</td>
                <td className='molde-detail-button'><button onClick={onSend}>Send</button></td>
            </tr>
            <tr>
            <td></td>
                <td colSpan='7'> Comments: <input type='text' maxLength='60' name='comments' onChange={onInput} value={comments} className='comments-input'></input></td>
            </tr>
                {errorMessage && <tr><td colSpan='6'>{errorMessage}</td></tr>}
        </tbody>
    )
}

const mapStateToProps = state =>({
    moldes: state.moldes,
    cycles: state.cycles,
})

export default connect(mapStateToProps, {updateCleaning })(UpdateCleaningForm)