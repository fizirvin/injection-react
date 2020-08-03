import React from 'react'
import '../../styles/header.css'
import { formatDate } from '../../../actions/helpers'
const Header = ({ period, setPeriod, shift, setShift, filter, setFilter, setToday, today, day, setDay }) =>{
 
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

  const onForward = (e)=>{
    const date1 = today;
    const date = new Date(date1);
    const nextWeek = date.getDate()+7;
    date.setDate(nextWeek);
    const newToday = formatDate(date)+'T01:00:00.000-06:00';
    return setToday(newToday)
  }

  const onBack = ()=>{
    const date1 = today;
    const date = new Date(date1);
    const pastWeek = date.getDate()-7;
    date.setDate(pastWeek);
    const newToday = formatDate(date)+'T01:00:00.000-06:00';
    return setToday(newToday)
  }

  const onDate = (e)=>{
    const newDate = e.target.value

    const date1 = newDate + 'T01:00:00.000-06:00'
    const date2 = new Date(date1);
    const today= formatDate(date2)+'T01:00:00.000-06:00';
        
    setToday(today)

    return setDay(newDate)
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
              <option value='1'>Shift 1</option>
              <option value='2'>Shift 2</option>
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
            <input type='date' value={day} onChange={onDate}></input>
            <button name='back' onClick={onBack}>Go Back</button><button name='forward' onClick={onForward}>Go Forward</button>
          </div>
      </div>
    </div>
  )
}

export default Header