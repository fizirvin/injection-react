import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TableData from './components/TableData'
import TableHeader from './components/TableHeader'
import RenderItems from './components/RenderItems'
import Spinner from './components/Spinner'
import './Defect.css'

class Defects extends Component {
  constructor(props){
    super(props);
    this.state ={
      defects: this.props.defects,
      header: [
        {h: <div className='head_field'>Code <div className='sort_button' onClick={this.sortDefects}></div></div>, w: '10%'},
        {h: <div className='head_field'>Defect <div className='sort_button' onClick={this.sortName}></div></div>, w: '70%'},
        {h: <div className='head_field'>Inj Area <div className='sort_button' onClick={this.sortArea}></div></div>, w: '10%'},
        {h: <Link to="/defects/add"><button>Add Defect</button></Link>, w: '10%'}
      ]
    }
    this.sortDefects = this.sortDefects.bind(this);
    this.sortName = this.sortName.bind(this);
  }

  sortDefects = () =>{
    const sort = this.state.defects.sort((a, b) => (a.defectCode > b.defectCode ) ? 1 : -1 )
    return this.setState({defects: sort })
  }

  sortName = () =>{
    const sort = this.state.defects.sort((a, b) => (a.defectName > b.defectName ) ? 1 : -1 )
    return this.setState({defects: sort })
  }

  sortArea = () =>{
    const sort = this.state.defects.sort((a, b) => (a.isInjection > b.isInjection ) ? -1 : 1 )
    return this.setState({defects: sort })
  }



  renderList() {
    return this.state.defects.map( ({_id, defectCode, defectName, isInjection}) => 
      <tr key={_id}>
        <TableData className='table_data' style={{width: '10%'}}>{ defectCode}</TableData>
        <TableData className='table_data' style={{width: '70%'}}>{ defectName}</TableData>
        <TableData className='table_data' style={{width: '10%'}}>{<input type='checkbox' readOnly checked={isInjection}/>}</TableData>
        <TableData className='table_data' style={{width: '10%'}}><Link to={`/defects/update/${_id}`}><button className='button_issue'>Update</button></Link></TableData>
      </tr>
    )
  }
  
  renderBodyContainer(array){
    if( array.length === 0){
      return <div className='spinner_div'><Spinner></Spinner></div>
    } else {
      return (
        <div className='defects_body_container'>
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
      <div className='defects_container'>
        <div className='defects_table_container'>
          <TableHeader header={this.state.header} className={'defects_header_table'}/>
          {this.renderBodyContainer(this.state.defects)}
          <RenderItems items={this.state.defects}/>
        </div>
      </div>
    )
  }
}

export default Defects;