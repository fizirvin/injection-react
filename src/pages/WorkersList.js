import React, { Component } from 'react';
import Worker from './components/worker'
import { Link } from 'react-router-dom';
import Spinner from './components/Spinner'

import './styles/workers.css'

class WorkersList extends Component{
    state ={
        profiles: this.props.profiles.filter( item => item.active === true),
        active: true,
        team: '',
    }

    componentDidMount(){
    
    }

    renderProfiles = () =>{
        if(this.state.profiles.length === 0){
            return <div className='spinner_div'><Spinner></Spinner></div>
        } else {
            return this.state.profiles.map( (profile, index) =>
                <Worker key={profile._id}
                    index={index + 1}
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
                    active={profile.active}
                    
                />
            )
        }
    }

    onActive = (e) =>{
        const active = e.target.value === 'true' ? true : false;
        if(!this.state.team){
            const profiles = this.props.profiles.filter( item => item.active === active)
            return this.setState({profiles, active})
        }
        else {
            const profiles = this.props.profiles.filter( item => item.active === active && item.team === this.state.team)
            return this.setState({profiles, active})
        }
    }

    onTeam = (e) =>{
        const team = e.target.value;
        const active = this.state.active;
        const profiles = this.props.profiles.filter( item => item.team === team && item.active === active)

        return this.setState({profiles, team})
    }

    onReset = () =>{
        const profiles = this.props.profiles.filter( item => item.active === true)
        return this.setState({profiles, active: true, team: ''})
    }

    render(){
        return (
            <div className='worker_list'>
                <div className='controls'>
                    <div className='items_count'>items: {this.state.profiles.length}</div>
                    <div>
                        <label htmlFor='active'>Status: </label>
                        <select value={this.state.active} name='active' id='active' onChange={this.onActive}>
                            <option value={true}>Active</option>
                            <option value={false}>Inactive</option>
                        </select>
                        <label htmlFor='team'>Team: </label>
                        <select value={this.state.team} name='team' id='team' onChange={this.onTeam}>
                            <option value='' disabled>select</option>
                            <option value='varias'>RVarias</option>
                            <option value='amealco'>Amealco</option>
                        </select>
                        <button onClick={this.onReset}>Reset</button>
                    </div>
                    <Link to='/employees/new'><button type='button'>Add Employee</button></Link>
                </div>
                <div className='workerList_container'>
                    {this.renderProfiles()}
                </div>
            </div>
        )
    }
}

export default WorkersList