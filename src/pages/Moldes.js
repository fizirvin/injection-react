import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TableData from './components/TableData'
import TableHeader from './components/TableHeader'
import RenderItems from './components/RenderItems'
import './Moldes.css'

class Moldes extends Component {
  state ={
    moldes: this.props.moldes,
    header: [
      {h: 'Mold Number', w: '25%'},
      {h: 'Serial Number', w: '15%'},
      {h: 'Cavities', w: '10%'},
      {h: 'Lifecycles', w: '12%'},
      {h: 'Tcycles', w: '10%'},
      {h: 'Report cycles', w: '10%'},
      {h: '%', w: '10%'},
      {h: <Link to="/molds/add"><button>Add Mold</button></Link>, w: '10%'}
    ]
  }

  precise_round(num, dec){
    const num_sign = num >= 0 ? 1 : -1;
    const value =  (Math.round((num*Math.pow(10,dec))+(num_sign*0.0001))/Math.pow(10,dec)).toFixed(dec);
    const valid = isNaN(value) ? 0 : parseFloat(value)
    return isFinite(valid) ? valid : 0
  }

  renderList() {
    return this.state.moldes.map( ({_id, moldeNumber, moldeSerial, cavities, lifecycles, tcycles}) =>{

      const array = this.props.cycles;
      const filter = array.filter( item => item.molde === _id).reduce( (a, b) =>{
        return a + b.cycles || 0
      },0)

      const sum = filter + tcycles
      const percent = this.precise_round((sum/lifecycles)*100, 2) 

      return (<tr key={_id}>
        <TableData className='table_data' style={{width: '25%'}}>{moldeNumber}</TableData>
        <TableData className='table_data' style={{width: '15%'}}>{moldeSerial}</TableData>
        <TableData className='table_data' style={{width: '10%'}}>{cavities}</TableData>
        <TableData className='table_data' style={{width: '12%'}}>{lifecycles}</TableData>
        <TableData className='table_data' style={{width: '10%'}}>{tcycles}</TableData>
        <TableData className='table_data' style={{width: '10%'}}>{filter}</TableData>
        <TableData className='table_data' style={{width: '10%'}}>{percent}</TableData>
        <TableData className='table_data' style={{width: '10%'}}><Link to={`/molds/update/${_id}`}><button>Update</button></Link></TableData>
      </tr>)
    })
  }

  renderBodyContainer(array){
    if( array.length === 0){
      return <div>...loading</div>
    } else {
      return (
        <div className='moldes_body_container'>
          <table className='body_table'>
            <tbody>
              {this.renderList()}
            </tbody>
          </table>
        </div>
      )
    }
  }

  render(){ 
    return (
      <div className='page_container'>
        <div className='moldes_table_container'>
          <TableHeader header={this.state.header} className={'moldes_header_table'}/>
          {this.renderBodyContainer(this.state.moldes)}
          <RenderItems items={this.state.moldes}/>
        </div>
      </div>
    )
  }
}

export default Moldes;