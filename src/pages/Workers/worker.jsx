import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import update from '../../images/list.png'
import male from '../../images/male.png'
import female from '../../images/female.png'
import { selectWorker } from './actions'

const Worker = ({selectWorker, gender, team, index, picture_URL, firstname, lastname, entry, number, _id, position, area, department, profile }) =>{ 
    const genderImage = gender === 'male' ? male : female
    const teamClass = team === 'varias'? 'number_rutas' : 'number_amealco'

    return (
        <div className='worker_container'>
            <table className='worker_table'>
                <tbody>
                    <tr>
                        <td rowSpan='2' colSpan='1' className='index_field'>{index}</td>
                        <td rowSpan='2' colSpan='1' className='image_field'><img className="image_profile" src={picture_URL || genderImage } alt="worker" height="50" width="50"/></td>
                        <td rowSpan='1' colSpan='2' className={`name_field ${teamClass}`}><h3>{firstname + ' ' + lastname}</h3></td>
                        <td rowSpan='1' colSpan='1' className={`entry_field ${teamClass}`}>Entry: {entry}</td>
                        <td rowSpan='1' colSpan='1' className={`number_field ${teamClass}`}>ID: {number}</td>
                        <td rowSpan='2' colSpan='1' className='update_field'><Link to={`/employees/update/${_id}`} onClick={()=>selectWorker(profile)}><img alt="" height= "26" src={update}/></Link></td>
                    </tr>
                    <tr>
                        
                        <td rowSpan='1' colSpan='1' className='position_field'>{position}</td>
                        <td rowSpan='1' colSpan='1' className='area_field'>Area: {area}</td>
                        <td rowSpan='1' colSpan='2' className='department_field'>Department of: {department}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}


export default connect(null, {selectWorker })(Worker)