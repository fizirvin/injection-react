import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import update from '../../images/list.png'
import male from '../../images/male.png'
import female from '../../images/female.png'

class Worker extends Component{

    render(){
        const gender = this.props.gender === 'male' ? male : female
        return (
            <div className='worker_container'>
                <table className='worker_table'>
                    <tbody>
                        <tr>
                            <td rowSpan='2' colSpan='1' className='image_field'><img className="image_profile" src={this.props.picture_URL || gender } alt="worker" height="50" width="50"/></td>
                            <td rowSpan='1' colSpan='2' className='name_field'><h3>{this.props.firstname + ' ' + this.props.lastname}</h3></td>
                            <td rowSpan='1' colSpan='1' className='entry_field'>Entry: {this.props.entry}</td>
                            <td rowSpan='1' colSpan='1' className='number_field'>ID: {this.props.number}</td>
                            <td rowSpan='2' colSpan='1' className='update_field'><Link to={`/employees/update/${this.props._id}`}><img alt="" height= "26" src={update}/></Link></td>
                        </tr>
                        <tr>
                            
                            <td rowSpan='1' colSpan='1' className='position_field'>{this.props.position}</td>
                            <td rowSpan='1' colSpan='1' className='area_field'>Area: {this.props.area}</td>
                            <td rowSpan='1' colSpan='2' className='department_field'>Department of: {this.props.department}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Worker