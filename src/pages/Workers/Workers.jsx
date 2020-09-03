import React, { useEffect, useState}  from 'react'
import { connect } from 'react-redux'
import Worker from './worker'
import { fetchWorkers } from './actions'

import { Link } from 'react-router-dom'
import Spinner from '../../components/Spinner'
import './Workers.css'

const Workers = ({ profiles, fetchWorkers }) =>{
  const [active, setActive ] = useState(true)
  const [ team, setTeam ] = useState('')
  const [ workers, setWorkers ] = useState(profiles.filter( item => item.active === true))

  useEffect(() =>{
    if(profiles.length === 0){

      
      fetchWorkers()
    } 
  },[profiles])

  const renderProfiles = () =>{
    if(workers.length === 0){
        return <div className='spinner_div'><Spinner></Spinner></div>
    } else {
        return workers.map( (profile, index) => {
        const {_id, number, firstname, lastname, gender, entry, department, area, position, picture_URL, team, active } = profile
            return <Worker key={_id}
                index={index + 1}
                _id={_id} 
                number={number}
                firstname={firstname}
                lastname={lastname}
                gender={gender}
                entry={entry}
                department={department}
                area={area}
                position={position}
                picture_URL={picture_URL}
                team={team}
                active={active}
                profile={profile}
            />
        }
        )
    }
}

const onActive = (e) =>{
  const active = e.target.value === 'true' ? true : false;
  if(!team){
    const workers = profiles.filter( item => item.active === active)
    setActive(active)
    return setWorkers(workers)
  }
  else {
    const workers = profiles.filter( item => item.active === active && item.team === team)
    setActive(active)
    return setWorkers(workers)
  }
}

const onTeam = (e) =>{
  const team = e.target.value;
  const workers = profiles.filter( item => item.team === team && item.active === active)
  setTeam(team)
  return setWorkers(workers)
}

const onReset = () =>{
  const workers = profiles.filter( item => item.active === true)
  setActive(true)
  setTeam('')
  return setWorkers(workers)
}

    return (
      <div className='worker_list'>
                <div className='controls'>
                    <div className='items_count'>items: {workers.length}</div>
                    <div>
                        <label htmlFor='active'>Status: </label>
                        <select value={active} name='active' id='active' onChange={onActive}>
                            <option value={true}>Active</option>
                            <option value={false}>Inactive</option>
                        </select>
                        <label htmlFor='team'>Team: </label>
                        <select value={team} name='team' id='team' onChange={onTeam}>
                            <option value='' disabled>select</option>
                            <option value='varias'>RVarias</option>
                            <option value='amealco'>Amealco</option>
                        </select>
                        <button onClick={onReset}>Reset</button>
                    </div>
                    <Link to='/employees/new'><button type='button'>Add Employee</button></Link>
                </div>
                <div className='workerList_container'>
                    {renderProfiles()}
                </div>
            </div>
    )
}

const mapStateToProps = state =>({
    profiles: state.profiles
})

export default connect(mapStateToProps, {fetchWorkers })(Workers)