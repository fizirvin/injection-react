import React, { useState } from 'react'

const BodyTable = ({columns, period, weekMachineReports, trimesterMachineReports}) =>{
  const [ weekReal, setWeekReal ] = useState(false)
  const [ weekNG, setWeekNG ] = useState(false)
  const [ weekOK, setWeekOK ] = useState(false)
  const [ weekPlan, setWeekPlan ] = useState(false)
  const [ weekWTime, setWeekWTime ] = useState(false)
  const [ weekDTime, setWeekDTime ] = useState(false)
  const [ weekOEE, setWeekOEE ] = useState(false)
  const [ weekPurge, setWeekPurge ] = useState(false)

  const [ TReal, setTReal ] = useState(false)
  const [ TNG, setTNG ] = useState(false)
  const [ TOK, setTOK ] = useState(false)
  const [ TPlan, setTPlan ] = useState(false)
  const [ TWTime, setTWTime ] = useState(false)
  const [ TDTime, setTDTime ] = useState(false)
  const [ TOEE, setTOEE ] = useState(false)
  const [ TPurge, setTPurge ] = useState(false)

  const onReal = ()=>{
    if( period === 'day'){
      return setWeekReal(!weekReal)  
    }
    else if( period === 'trimester'){
      return setTReal(!TReal)
    }
  }

  const onNG = ()=>{
    if ( period === 'day'){
      return setWeekNG(!weekNG)  
    }
    else if(period === 'trimester'){
      return setTNG(!TNG) 
    }
  }

  const onOK = ()=>{
    if ( period === 'day'){
      return setWeekOK(!weekOK) 
    }
    else if(period === 'trimester'){
      return setTOK(!TOK) 
    }
  }

  const onPlan = ()=>{
    if ( period === 'day'){
      return setWeekPlan(!weekPlan) 
    }
    else if(period === 'trimester'){
      return setTPlan(!TPlan) 
    }
  }

  const onWTime = ()=>{
    if ( period === 'day'){
      return setWeekWTime(!weekWTime) 
    }
    else if(period === 'trimester'){
      return setTWTime(!TWTime) 
    }
  }

  const onDTime = ()=>{
    if ( period === 'day'){
      return setWeekDTime(!weekDTime) 
    }
    else if(period === 'trimester'){
      return setTDTime(!TDTime) 
    }
  }

  const onOEE = ()=>{
    if ( period === 'day'){
      return setWeekOEE(!weekOEE) 
    }
    else if(period === 'trimester'){
      return setTOEE(!TOEE) 
    }
  }

  const onPurge = ()=>{
    if ( period === 'day'){
      return setWeekPurge(!weekPurge) 
    }
    else if(period === 'trimester'){
      return setTPurge(!TPurge) 
    }
  }

  const renderRealDetail = () =>{
    if(weekReal) {
      return weekMachineReports.map( ({machine, machineNumber, reports}) =>{
        return <tr key={machine}>
          <td className='efficiency_total_machine'><div className='title_row_production'><div></div><div>{machineNumber}</div></div></td>
          {reports.map( (report, index) =><td key={index} className='efficiency_total_day'>{report.real}</td>)}
        </tr>
      })
    }
  }

  const renderTRealDetail = () =>{
    if(TReal) {
      return trimesterMachineReports.map( ({machine, machineNumber, reports}) =>{
        return <tr key={machine}>
          <td className='trimester_total_title'><div className='title_row_production'><div></div><div>{machineNumber}</div></div></td>
          {reports.map( (report, index) =><td key={index} className='trimester_total_day'>{report.real}</td>)}
        </tr>
      })
    }
  }

  const renderNGDetail = () =>{
    if(weekNG) {
      return weekMachineReports.map( ({machine, machineNumber, reports}) =>{
        return <tr key={machine}>
          <td className='efficiency_total_machine'><div className='title_row_production'><div></div><div>{ machineNumber}</div></div></td>
          {reports.map( (report, index) =><td key={index} className='efficiency_total_day'>{report.ng}</td>)}
        </tr>
      })
    }
  }

  const renderTNGDetail = () =>{
    if(TNG) {
      return trimesterMachineReports.map( ({machine, machineNumber, reports}) =>{
        return <tr key={machine}>
          <td className='trimester_total_title'><div className='title_row_production'><div></div><div>{ machineNumber}</div></div></td>
          {reports.map( (report, index) =><td key={index} className='trimester_total_day'>{report.ng}</td>)}
        </tr>
      })
    }
  }

  const renderOKDetail = () =>{
    if(weekOK) {
      return weekMachineReports.map( ({machine, machineNumber, reports}) =>{
        return <tr key={machine}>
          <td className='efficiency_total_machine'><div className='title_row_production'><div></div><div>{ machineNumber}</div></div></td>
           {reports.map( (report, index) =><td key={index} className='efficiency_total_day'>{report.ok}</td>)}
        </tr>
      })
    }
  }

  const renderTOKDetail = () =>{
    if(TOK) {
      return trimesterMachineReports.map( ({machine, machineNumber, reports}) =>{
        return <tr key={machine}>
          <td className='trimester_total_title'><div className='title_row_production'><div></div><div>{ machineNumber}</div></div></td>
           {reports.map( (report, index) =><td key={index} className='trimester_total_day'>{report.ok}</td>)}
        </tr>
      })
    }
  }

  const renderPlanDetail = () =>{
    if(weekPlan) {
      return weekMachineReports.map( ({machine, machineNumber, reports}) =>{
        return <tr key={machine}>
          <td className='efficiency_total_machine'><div className='title_row_production'><div></div><div>{ machineNumber}</div></div></td>
           {reports.map( (report, index) =><td key={index} className='efficiency_total_day'>{report.plan}</td>)}
        </tr>
      })
    }
  }

  const renderTPlanDetail = () =>{
    if(TPlan) {
      return trimesterMachineReports.map( ({machine, machineNumber, reports}) =>{
        return <tr key={machine}>
          <td className='trimester_total_title'><div className='title_row_production'><div></div><div>{ machineNumber}</div></div></td>
           {reports.map( (report, index) =><td key={index} className='trimester_total_day'>{report.plan}</td>)}
        </tr>
      })
    }
  }

  const renderWTimeDetail = () =>{
    if(weekWTime) {
      return weekMachineReports.map( ({machine, machineNumber, reports}) =>{
        return <tr key={machine}>
          <td className='efficiency_total_machine'><div className='title_row_production'><div></div><div>{ machineNumber}</div></div></td>
           {reports.map( (report, index) =><td key={index} className='efficiency_total_day'>{report.wtime}</td>)}
        </tr>
      })
    }
  }

  const renderTWTimeDetail = () =>{
    if(TWTime) {
      return trimesterMachineReports.map( ({machine, machineNumber, reports}) =>{
        return <tr key={machine}>
          <td className='trimester_total_title'><div className='title_row_production'><div></div><div>{ machineNumber}</div></div></td>
           {reports.map( (report, index) =><td key={index} className='trimester_total_day'>{report.wtime}</td>)}
        </tr>
      })
    }
  }

  const renderDTimeDetail = () =>{
    if(weekDTime) {
      return weekMachineReports.map( ({machine, machineNumber, reports}) =>{
        return <tr key={machine}>
          <td className='efficiency_total_machine'><div className='title_row_production'><div></div><div>{ machineNumber}</div></div></td>
           {reports.map( (report, index) =><td key={index} className='efficiency_total_day'>{report.dtime}</td>)}
        </tr>
      })
    }
  }

  const renderTDTimeDetail = () =>{
    if(TDTime) {
      return trimesterMachineReports.map( ({machine, machineNumber, reports}) =>{
        return <tr key={machine}>
          <td className='trimester_total_title'><div className='title_row_production'><div></div><div>{ machineNumber}</div></div></td>
           {reports.map( (report, index) =><td key={index} className='trimester_total_day'>{report.dtime}</td>)}
        </tr>
      })
    }
  }

  const renderOEEDetail = () =>{
    if(weekOEE) {
      return weekMachineReports.map( ({machine, machineNumber, reports}) =>{
        return <tr key={machine}>
          <td className='efficiency_total_machine'><div className='title_row_production'><div></div><div>{ machineNumber}</div></div></td>
           {reports.map( (report, index) =><td key={index} className='efficiency_total_day'>{report.oee}</td>)}
        </tr>
      })
    }
  }

  const renderTOEEDetail = () =>{
    if(TOEE) {
      return trimesterMachineReports.map( ({machine, machineNumber, reports}) =>{
        return <tr key={machine}>
          <td className='trimester_total_title'><div className='title_row_production'><div></div><div>{ machineNumber}</div></div></td>
           {reports.map( (report, index) =><td key={index} className='trimester_total_day'>{report.oee}</td>)}
        </tr>
      })
    }
  }

  const renderPurgeDetail = () =>{
    if(weekPurge) {
      return weekMachineReports.map( ({machine, machineNumber, reports}) =>{
        return <tr key={machine}>
          <td className='efficiency_total_machine'><div className='title_row_production'><div></div><div>{ machineNumber}</div></div></td>
           {reports.map( (report, index) =><td key={index} className='efficiency_total_day'>{report.purge}</td>)}
        </tr>
      })
    }
  }

  const renderTPurgeDetail = () =>{
    if(TPurge) {
      return trimesterMachineReports.map( ({machine, machineNumber, reports}) =>{
        return <tr key={machine}>
          <td className='trimester_total_title'><div className='title_row_production'><div></div><div>{ machineNumber}</div></div></td>
           {reports.map( (report, index) =><td key={index} className='trimester_total_day'>{report.purge}</td>)}
        </tr>
      })
    }
  }
  
  const renderColumns = () =>{
      if(period === 'trimester'){
        return <tbody>
          <tr>
            <td className='trimester_total_title'><div className='title_row_production'><button onClick={onReal}>▼</button><div>Total Real (pcs)</div></div></td>
            <td className='trimester_total_day'>{columns[0].real}</td>
            <td className='trimester_total_day'>{columns[1].real}</td>
            <td className='trimester_total_day'>{columns[2].real}</td>
            <td className='trimester_total'>{columns[3].real}</td>
          </tr>
          {renderTRealDetail()}
          <tr>
            <td className='trimester_total_title'><div className='title_row_production'><button onClick={onNG}>▼</button><div>Total NG (pcs)</div></div></td>
            <td className='trimester_total_day'>{columns[0].ng}</td>
            <td className='trimester_total_day'>{columns[1].ng}</td>
            <td className='efficiency_total_day'>{columns[2].ng}</td>
            <td className='trimester_total'>{columns[3].ng}</td>
          </tr>
          {renderTNGDetail()}
          <tr>
            <td className='trimester_total_title'><div className='title_row_production'><button onClick={onOK}>▼</button><div>Total OK (pcs)</div></div></td>
            <td className='trimester_total_day'>{columns[0].ok}</td>
            <td className='trimester_total_day'>{columns[1].ok}</td>
            <td className='trimester_total_day'>{columns[2].ok}</td>
            <td className='trimester_total'>{columns[3].ok}</td>
          </tr>
          {renderTOKDetail()}
          <tr>
            <td className='trimester_total_title'><div className='title_row_production'><button onClick={onPlan}>▼</button><div>Total Plan (pcs)</div></div></td>
            <td className='trimester_total_day'>{columns[0].plan}</td>
            <td className='trimester_total_day'>{columns[1].plan}</td>
            <td className='trimester_total_day'>{columns[2].plan}</td>
            <td className='trimester_total'>{columns[3].plan}</td>
          </tr>
          {renderTPlanDetail()}
          <tr>
            <td className='trimester_total_title'><div className='title_row_production'><button onClick={onWTime}>▼</button><div>Total Worktime (hrs)</div></div></td>
            <td className='trimester_total_day'>{columns[0].wtime}</td>
            <td className='trimester_total_day'>{columns[1].wtime}</td>
            <td className='trimester_total_day'>{columns[2].wtime}</td>
            <td className='trimester_total'>{columns[3].wtime}</td>
          </tr>
          {renderTWTimeDetail()}
          <tr>
            <td className='trimester_total_title'><div className='title_row_production'><button onClick={onDTime}>▼</button><div>Total Downtime (hrs)</div></div></td>
            <td className='trimester_total_day'>{columns[0].dtime}</td>
            <td className='trimester_total_day'>{columns[1].dtime}</td>
            <td className='trimester_total_day'>{columns[2].dtime}</td>
            <td className='trimester_total'>{columns[3].dtime}</td>
          </tr>
          {renderTDTimeDetail()}
          <tr>
            <td className='trimester_total_title'><div className='title_row_production'><button onClick={onOEE}>▼</button><div>Total OEE (%)</div></div></td>
            <td className='trimester_total_day'>{columns[0].oee}</td>
            <td className='trimester_total_day'>{columns[1].oee}</td>
            <td className='trimester_total_day'>{columns[2].oee}</td>
            <td className='trimester_total'>{columns[3].oee}</td>
          </tr>
          {renderTOEEDetail()}
          <tr>
            <td className='trimester_total_title'><div className='title_row_production'><button onClick={onPurge}>▼</button><div>Total Purge (g)</div></div></td>
            <td className='trimester_total_day'>{columns[0].purge}</td>
            <td className='trimester_total_day'>{columns[1].purge}</td>
            <td className='trimester_total_day'>{columns[2].purge}</td>
            <td className='trimester_total'>{columns[3].purge}</td>
          </tr>
          {renderTPurgeDetail()}
        </tbody>
      }
      else if(period === 'day' && columns.length > 5){
        return <tbody>
        <tr>
          <td className='efficiency_total_machine'><div className='title_row_production'><button onClick={onReal}>▼</button><div>Total Real (pcs)</div></div></td>
          <td className='efficiency_total_day'>{columns[0].real}</td>
          <td className='efficiency_total_day'>{columns[1].real}</td>
          <td className='efficiency_total_day'>{columns[2].real}</td>
          <td className='efficiency_total_day'>{columns[3].real}</td>
          <td className='efficiency_total_day'>{columns[4].real}</td>
          <td className='efficiency_total_day'>{columns[5].real}</td>
          <td className='efficiency_total_day'>{columns[6].real}</td>
          <td className='efficiency_total_week'>{columns[7].real}</td>
        </tr>
        {renderRealDetail()}
        <tr>
          <td className='efficiency_total_machine'><div className='title_row_production'><button onClick={onNG}>▼</button><div>Total NG (pcs)</div></div></td>
          <td className='efficiency_total_day'>{columns[0].ng}</td>
          <td className='efficiency_total_day'>{columns[1].ng}</td>
          <td className='efficiency_total_day'>{columns[2].ng}</td>
          <td className='efficiency_total_day'>{columns[3].ng}</td>
          <td className='efficiency_total_day'>{columns[4].ng}</td>
          <td className='efficiency_total_day'>{columns[5].ng}</td>
          <td className='efficiency_total_day'>{columns[6].ng}</td>
          <td className='efficiency_total_week'>{columns[7].ng}</td>
        </tr>
        {renderNGDetail()}
        <tr>
          <td className='efficiency_total_machine'><div className='title_row_production'><button onClick={onOK}>▼</button><div>Total OK (pcs)</div></div></td>
          <td className='efficiency_total_day'>{columns[0].ok}</td>
          <td className='efficiency_total_day'>{columns[1].ok}</td>
          <td className='efficiency_total_day'>{columns[2].ok}</td>
          <td className='efficiency_total_day'>{columns[3].ok}</td>
          <td className='efficiency_total_day'>{columns[4].ok}</td>
          <td className='efficiency_total_day'>{columns[5].ok}</td>
          <td className='efficiency_total_day'>{columns[6].ok}</td>
          <td className='efficiency_total_week'>{columns[7].ok}</td>
        </tr>
        {renderOKDetail()}
        <tr>
          <td className='efficiency_total_machine'><div className='title_row_production'><button onClick={onPlan}>▼</button><div>Total Plan (pcs)</div></div></td>
          <td className='efficiency_total_day'>{columns[0].plan}</td>
          <td className='efficiency_total_day'>{columns[1].plan}</td>
          <td className='efficiency_total_day'>{columns[2].plan}</td>
          <td className='efficiency_total_day'>{columns[3].plan}</td>
          <td className='efficiency_total_day'>{columns[4].plan}</td>
          <td className='efficiency_total_day'>{columns[5].plan}</td>
          <td className='efficiency_total_day'>{columns[6].plan}</td>
          <td className='efficiency_total_week'>{columns[7].plan}</td>
        </tr>
        {renderPlanDetail()}
        <tr>
          <td className='efficiency_total_machine'><div className='title_row_production'><button onClick={onWTime}>▼</button><div>Total Worktime (hrs)</div></div></td>
          <td className='efficiency_total_day'>{columns[0].wtime}</td>
          <td className='efficiency_total_day'>{columns[1].wtime}</td>
          <td className='efficiency_total_day'>{columns[2].wtime}</td>
          <td className='efficiency_total_day'>{columns[3].wtime}</td>
          <td className='efficiency_total_day'>{columns[4].wtime}</td>
          <td className='efficiency_total_day'>{columns[5].wtime}</td>
          <td className='efficiency_total_day'>{columns[6].wtime}</td>
          <td className='efficiency_total_week'>{columns[7].wtime}</td>
        </tr>
        {renderWTimeDetail()}
        <tr>
          <td className='efficiency_total_machine'><div className='title_row_production'><button onClick={onDTime}>▼</button><div>Total Downtime (hrs)</div></div></td>
          <td className='efficiency_total_day'>{columns[0].dtime}</td>
          <td className='efficiency_total_day'>{columns[1].dtime}</td>
          <td className='efficiency_total_day'>{columns[2].dtime}</td>
          <td className='efficiency_total_day'>{columns[3].dtime}</td>
          <td className='efficiency_total_day'>{columns[4].dtime}</td>
          <td className='efficiency_total_day'>{columns[5].dtime}</td>
          <td className='efficiency_total_day'>{columns[6].dtime}</td>
          <td className='efficiency_total_week'>{columns[7].dtime}</td>
        </tr>
        {renderDTimeDetail()}
        <tr>
          <td className='efficiency_total_machine'><div className='title_row_production'><button onClick={onOEE}>▼</button><div>Total OEE (%)</div></div></td>
          <td className='efficiency_total_day'>{columns[0].oee}</td>
          <td className='efficiency_total_day'>{columns[1].oee}</td>
          <td className='efficiency_total_day'>{columns[2].oee}</td>
          <td className='efficiency_total_day'>{columns[3].oee}</td>
          <td className='efficiency_total_day'>{columns[4].oee}</td>
          <td className='efficiency_total_day'>{columns[5].oee}</td>
          <td className='efficiency_total_day'>{columns[6].oee}</td>
          <td className='efficiency_total_week'>{columns[7].oee}</td>
        </tr>
        {renderOEEDetail()}
        <tr>
          <td className='efficiency_total_machine'><div className='title_row_production'><button onClick={onPurge}>▼</button><div>Total Purge (g)</div></div></td>
          <td className='efficiency_total_day'>{columns[0].purge}</td>
          <td className='efficiency_total_day'>{columns[1].purge}</td>
          <td className='efficiency_total_day'>{columns[2].purge}</td>
          <td className='efficiency_total_day'>{columns[3].purge}</td>
          <td className='efficiency_total_day'>{columns[4].purge}</td>
          <td className='efficiency_total_day'>{columns[5].purge}</td>
          <td className='efficiency_total_day'>{columns[6].purge}</td>
          <td className='efficiency_total_week'>{columns[7].purge}</td>
        </tr>
        {renderPurgeDetail()}
      </tbody>
      }
    }
    return ( 
      <table className='efficiency_tableTotal'>
        {renderColumns()}
      </table>
    )
}

export default BodyTable