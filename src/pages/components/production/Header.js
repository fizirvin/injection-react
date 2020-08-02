import React from 'react'
import '../../styles/header.css'

const Header = ({ period, setPeriod, shift, setShift, filter, setFilter, setGo, date, setDate }) =>{
 
  const onPeriod = (e) =>{
    const period = e.target.value
    return setPeriod(period)
  }

  const onShift = (e) =>{
    const shift = e.target.value
    return setShift(shift)
  }
  
  const onFilter = (e) =>{
    const filter = e.target.value
    return setFilter(filter)
  }

  const onGo = (e)=>{
    const go = e.target.name
    return setGo(go)
  }

  const onDate = (e)=>{
    const date = e.target.value
    return setDate(date)
  }

  return (
    <div className='controlls_header'>
      <div className='controlls'>
          <div>
            <label>Period:</label>   
            <select name='period' value={period} onChange={onPeriod}>
              <option value='week'>Week</option>
              <option value='month'>Month</option>
            </select>
          </div>
          <div>
            <label>Shift:</label>   
            <select name='shift' value={shift} onChange={onShift}>
              <option value='both'>Shifts 1&2</option>
              <option value='shift1'>Shift 1</option>
              <option value='shift2'>Shift 2</option>
            </select>
          </div>  
          <div>
            <label>Filter By:</label>   
            <select name='filter' value={filter} onChange={onFilter}>
              <option value='machine'>Machine</option>
              <option value='model'>Model</option>
              <option value='molde'>Molde</option>
            </select>
            <button name='Machine'>Indicators ▼</button>
          </div>
          <div>
            <label>Go to Date:</label>
            <input type='date' value={date} onChange={onDate}></input>
            <button name='back' onClik={onGo}>Go Back</button><button name='forward' onClik={onGo}>Go Forward</button>
          </div>
      </div>
    </div>
  )
}

export default Header