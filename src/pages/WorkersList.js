import React, { Component } from 'react';
import Worker from './components/worker'
import { Link } from 'react-router-dom';
import Spinner from './components/Spinner'

import './styles/workers.css'

class WorkersList extends Component{
    state ={
        profiles: this.props.profiles
    }

    renderProfiles = () =>{
        if(this.state.profiles.length === 0){
            return <div className='spinner_div'><Spinner></Spinner></div>
        } else {
            return this.state.profiles.map( profile =>
                <Worker key={profile._id}
                    _id={profile._id} 
                    number={profile.number}
                    firstname={profile.firstname}
                    lastname={profile.lastname}
                    gender={profile.gender}
                    entry={profile.entry}
                    department={profile.department}
                    area={profile.area}
                    position={profile.position}
                    picture_URL={profile.picture_URL}
                    team={profile.team}
                />
            )
        }
    }

    render(){
        return (
            <div className='workerList_container'>
                
                <div className='controls'>
                    <div className='items_count'>items: {this.state.profiles.length}</div>
                    <Link to='/employees/new'><button type='button'>Add Employee</button></Link>
                </div>
                
                {this.renderProfiles()}
            </div>
        )
    }
}

export default WorkersList