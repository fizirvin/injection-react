import React, { Fragment, useState } from 'react'
import Detail from './Detail'
import DetailMachine from './DetailMachine'
import '../bodyTable.css'

const BodyTable = ({
  weekColumns,
  trimesterColumns, 
  period, 
  weekMachineReports, 
  trimesterMachineReports, 
  weekModelReports,
  weekMoldeReports,
  trimesterModelReports,
  trimesterMoldeReports,
  trimesterDefectDetail,
  weekDefectDetail,
  weekDowntimeDetail,
  trimesterDowntimeDetail,
  trimesterPurgeDetail,
  weekPurgeDetail,   
  detail,  
  filter}) =>{
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

  const renderDetailDefect = () =>{
    return TNG && trimesterDefectDetail.map( ({defectCode, defect, detail}) =><Detail key={defectCode} defectCode={defectCode} defect={defect} detail={detail}/>)
    //   <td className='detail_defect_machine'><div className='detail_row_production'><div></div><div>{ defectCode }</div></div></td>
    //   {defect.map((it, index)=><td key={index} className='detail_defect_day'>{it}</td>)}
    // </tr>)
  }

  const renderDetailPurge = () =>{
    return TPurge && trimesterPurgeDetail.map( ({resines, resine, detail}) => <DetailMachine key={resine} code={resine} defect={resines} detail={detail}/>
    // <tr key={resine}>
    //   <td className='detail_defect_machine'><div className='detail_row_production'><div></div><div>{ resine }</div></div></td>
    //   {resines.map((it, index)=><td key={index} className='detail_defect_day'>{it}</td>)}
    // </tr>
    )
  }

  const renderWeekDetailPurge = () =>{
    return weekPurge && weekPurgeDetail.map( ({resines, resine, detail}) => <DetailMachine key={resine} code={resine} defect={resines} detail={detail}/>
    // <tr key={resine}>
    //   <td className='detail_defect_machine'><div className='detail_row_production'><div></div><div>{ resine }</div></div></td>
    //   {resines.map((it, index)=><td key={index} className='detail_defect_day'>{it}</td>)}
    // </tr>
    )
  }

  const renderWeekDetailDefect = () =>{
      return weekNG && weekDefectDetail.map( ({defectCode, defect, detail}) => <Detail key={defectCode} defectCode={defectCode} defect={defect} detail={detail}/>
    )
  }

  const renderWeekDetailDowntime = () =>{
    return weekDTime && weekDowntimeDetail.map( ({issueCode, downtime, detail}) => <DetailMachine key={issueCode} code={issueCode} defect={downtime} detail={detail}/>
    
      // <tr key={issueCode}>
      //   <td className='detail_defect_machine'><div className='detail_row_production'><div></div><div>{ issueCode } (mins)</div></div></td>
      //   {downtime.map((it, index)=><td key={index} className='detail_defect_day'>{it}</td>)}
      // </tr>
    )
  }

  const renderTrimesterDetailDowntime = () =>{
    return TDTime && trimesterDowntimeDetail.map( ({issueCode, downtime, detail}) =><DetailMachine key={issueCode} code={issueCode} defect={downtime} detail={detail}/>
    // <tr key={issueCode}>
    //   <td className='detail_defect_machine'><div className='detail_row_production'><div></div><div>{ issueCode } (mins)</div></div></td>
    //   {downtime.map((it, index)=><td key={index} className='detail_defect_day'>{it}</td>)}
    // </tr>
    )
  }

  const renderRealDetail = () =>{
    if(weekReal && filter === 'machine') {
      return weekMachineReports.map( ({machine, machineNumber, reports}) =>{
        return <tr key={machine}>
          <td className='efficiency_total_machine'><div className='title_row_production'><div></div><div>{machineNumber}</div></div></td>
          {reports.map( (report, index) =><td key={index} className='efficiency_total_day'>{report.real}</td>)}
        </tr>
      })
    }
    else if( weekReal && filter === 'model'){
      return weekModelReports.map( ({model, partName, reports}) =>{
        return <tr key={model}>
          <td className='efficiency_total_machine'><div className='title_row_production'><div></div><div>{partName}</div></div></td>
          {reports.map( (report, index) =><td key={index} className='efficiency_total_day'>{report.real}</td>)}
        </tr>
      })
    }
    else if( weekReal && filter === 'molde'){
      return weekMoldeReports.map( ({molde, moldeNumber, reports}) =>{
        return <tr key={molde}>
          <td className='efficiency_total_machine'><div className='title_row_production'><div></div><div>{moldeNumber}</div></div></td>
          {reports.map( (report, index) =><td key={index} className='efficiency_total_day'>{report.real}</td>)}
        </tr>
      })
    }
  }

  const renderTRealDetail = () =>{
    if(TReal && filter === 'machine') {
      return trimesterMachineReports.map( ({machine, machineNumber, reports}) =>{
        return <tr key={machine}>
          <td className='trimester_total_title'><div className='title_row_production'><div></div><div>{machineNumber}</div></div></td>
          {reports.map( (report, index) =><td key={index} className='trimester_total_day'>{report.real}</td>)}
        </tr>
      })
    }
    else if(TReal && filter === 'model') {
      return trimesterModelReports.map( ({model, partName, reports}) =>{
        return <tr key={model}>
          <td className='trimester_total_title'><div className='title_row_production'><div></div><div>{partName}</div></div></td>
          {reports.map( (report, index) =><td key={index} className='trimester_total_day'>{report.real}</td>)}
        </tr>
      })
    }
    else if(TReal && filter === 'molde') {
      return trimesterMoldeReports.map( ({molde, moldeNumber, reports}) =>{
        return <tr key={molde}>
          <td className='trimester_total_title'><div className='title_row_production'><div></div><div>{moldeNumber}</div></div></td>
          {reports.map( (report, index) =><td key={index} className='trimester_total_day'>{report.real}</td>)}
        </tr>
      })
    }
  }

  const renderNGDetail = () =>{
    if(weekNG && filter === 'machine') {
      return weekMachineReports.map( ({machine, machineNumber, reports, defects}) =>{
        return <Fragment key={machine}><tr>
        <td className='efficiency_total_machine'><div className='title_row_production'><div></div><div>{ machineNumber }</div></div></td>
        {reports.map( (report, index) =><td key={index} className='efficiency_total_day'>{report.ng}</td>)}
      </tr>
      {detail && defects.map(defect=><tr key={defect.defectCode}>
        <td className='detail_total_machine'><div className='detail_row_production'><div></div><div>{ defect.defectCode }</div></div></td>
        {defect.defecto.map((it, index)=><td key={index} className='detail_total_day'>{it}</td>)}
      </tr>)    
      }
      </Fragment>
      })
    }
    else if(weekNG && filter === 'model') {
      return weekModelReports.map( ({model, partName, reports, defects}) =>{
        return <Fragment key={model}><tr>
          <td className='efficiency_total_machine'><div className='title_row_production'><div></div><div>{ partName }</div></div></td>
          {reports.map( (report, index) =><td key={index} className='efficiency_total_day'>{report.ng}</td>)}
        </tr>
        {detail && defects.map(defect=><tr key={defect.defectCode}>
          <td className='detail_total_machine'><div className='detail_row_production'><div></div><div>{ defect.defectCode }</div></div></td>
          {defect.defecto.map((it, index)=><td key={index} className='detail_total_day'>{it}</td>)}
        </tr>)    
        }
        </Fragment>
      })
    }
    else if(weekNG && filter === 'molde') {
      return weekMoldeReports.map( ({molde, moldeNumber, reports, defects}) =>{
        return <Fragment key={molde}><tr>
          <td className='efficiency_total_machine'><div className='title_row_production'><div></div><div>{ moldeNumber }</div></div></td>
          {reports.map( (report, index) =><td key={index} className='efficiency_total_day'>{report.ng}</td>)}
        </tr>
        {detail && defects.map(defect=><tr key={defect.defectCode}>
          <td className='detail_total_machine'><div className='detail_row_production'><div></div><div>{ defect.defectCode }</div></div></td>
          {defect.defecto.map((it, index)=><td key={index} className='detail_total_day'>{it}</td>)}
        </tr>)    
        }
        </Fragment>
      })
    }
  }

  const renderTNGDetail = () =>{
    if(TNG && filter === 'machine') {
      return trimesterMachineReports.map( ({machine, machineNumber, reports, defects}) =>{
        return <Fragment key={machine}><tr>
        <td className='efficiency_total_machine'><div className='title_row_production'><div></div><div>{ machineNumber }</div></div></td>
        {reports.map( (report, index) =><td key={index} className='efficiency_total_day'>{report.ng}</td>)}
      </tr>
      {detail && defects.map(defect=><tr key={defect.defectCode}>
        <td className='detail_total_machine'><div className='detail_row_production'><div></div><div>{ defect.defectCode }</div></div></td>
        {defect.defecto.map((it, index)=><td key={index} className='detail_total_day'>{it}</td>)}
      </tr>)
      }
      </Fragment>
      })
    }
    else if(TNG && filter === 'model') {
      return trimesterModelReports.map( ({model, partName, reports, defects}) =>{
        return <Fragment key={model}><tr>
          <td className='efficiency_total_machine'><div className='title_row_production'><div></div><div>{ partName }</div></div></td>
          {reports.map( (report, index) =><td key={index} className='efficiency_total_day'>{report.ng}</td>)}
        </tr>
        {detail && defects.map(defect=><tr key={defect.defectCode}>
          <td className='detail_total_machine'><div className='detail_row_production'><div></div><div>{ defect.defectCode }</div></div></td>
          {defect.defecto.map((it, index)=><td key={index} className='detail_total_day'>{it}</td>)}
        </tr>)

        }
        </Fragment>
      })
    }
    else if(TNG && filter === 'molde') {
      return trimesterMoldeReports.map( ({molde, moldeNumber, reports, defects}) =>{
        return <Fragment key={molde}><tr>
          <td className='efficiency_total_machine'><div className='title_row_production'><div></div><div>{ moldeNumber }</div></div></td>
          {reports.map( (report, index) =><td key={index} className='efficiency_total_day'>{report.ng}</td>)}
        </tr>
        {detail && defects.map(defect=><tr key={defect.defectCode}>
          <td className='detail_total_machine'><div className='detail_row_production'><div></div><div>{ defect.defectCode }</div></div></td>
          {defect.defecto.map((it, index)=><td key={index} className='detail_total_day'>{it}</td>)}
        </tr>)

        }
        </Fragment>
      })
    }
  }

  const renderOKDetail = () =>{
    if(weekOK && filter === 'machine') {
      return weekMachineReports.map( ({machine, machineNumber, reports}) =>{
        return <tr key={machine}>
          <td className='efficiency_total_machine'><div className='title_row_production'><div></div><div>{ machineNumber}</div></div></td>
           {reports.map( (report, index) =><td key={index} className='efficiency_total_day'>{report.ok}</td>)}
        </tr>
      })
    }
    else if(weekOK && filter === 'model') {
      return weekModelReports.map( ({model, partName, reports}) =>{
        return <tr key={model}>
          <td className='efficiency_total_machine'><div className='title_row_production'><div></div><div>{ partName}</div></div></td>
           {reports.map( (report, index) =><td key={index} className='efficiency_total_day'>{report.ok}</td>)}
        </tr>
      })
    }
    else if(weekOK && filter === 'molde') {
      return weekMoldeReports.map( ({molde, moldeNumber, reports}) =>{
        return <tr key={molde}>
          <td className='efficiency_total_machine'><div className='title_row_production'><div></div><div>{ moldeNumber}</div></div></td>
           {reports.map( (report, index) =><td key={index} className='efficiency_total_day'>{report.ok}</td>)}
        </tr>
      })
    }
  }

  const renderTOKDetail = () =>{
    if(TOK && filter === 'machine') {
      return trimesterMachineReports.map( ({machine, machineNumber, reports}) =>{
        return <tr key={machine}>
          <td className='trimester_total_title'><div className='title_row_production'><div></div><div>{ machineNumber}</div></div></td>
           {reports.map( (report, index) =><td key={index} className='trimester_total_day'>{report.ok}</td>)}
        </tr>
      })
    }
    else if(TOK && filter === 'model') {
      return trimesterModelReports.map( ({model, partName, reports}) =>{
        return <tr key={model}>
          <td className='trimester_total_title'><div className='title_row_production'><div></div><div>{ partName}</div></div></td>
           {reports.map( (report, index) =><td key={index} className='trimester_total_day'>{report.ok}</td>)}
        </tr>
      })
    }
    else if(TOK && filter === 'molde') {
      return trimesterMoldeReports.map( ({molde, moldeNumber, reports}) =>{
        return <tr key={molde}>
          <td className='trimester_total_title'><div className='title_row_production'><div></div><div>{ moldeNumber}</div></div></td>
           {reports.map( (report, index) =><td key={index} className='trimester_total_day'>{report.ok}</td>)}
        </tr>
      })
    }
  }

  const renderPlanDetail = () =>{
    if(weekPlan && filter === 'machine') {
      return weekMachineReports.map( ({machine, machineNumber, reports}) =>{
        return <tr key={machine}>
          <td className='efficiency_total_machine'><div className='title_row_production'><div></div><div>{ machineNumber}</div></div></td>
           {reports.map( (report, index) =><td key={index} className='efficiency_total_day'>{report.plan}</td>)}
        </tr>
      })
    }
    else if(weekPlan && filter === 'model') {
      return weekModelReports.map( ({model, partName, reports}) =>{
        return <tr key={model}>
          <td className='efficiency_total_machine'><div className='title_row_production'><div></div><div>{ partName}</div></div></td>
           {reports.map( (report, index) =><td key={index} className='efficiency_total_day'>{report.plan}</td>)}
        </tr>
      })
    }
    else if(weekPlan && filter === 'molde') {
      return weekMoldeReports.map( ({molde, moldeNumber, reports}) =>{
        return <tr key={molde}>
          <td className='efficiency_total_machine'><div className='title_row_production'><div></div><div>{ moldeNumber}</div></div></td>
           {reports.map( (report, index) =><td key={index} className='efficiency_total_day'>{report.plan}</td>)}
        </tr>
      })
    }
  }

  const renderTPlanDetail = () =>{
    if(TPlan && filter === 'machine') {
      return trimesterMachineReports.map( ({machine, machineNumber, reports}) =>{
        return <tr key={machine}>
          <td className='trimester_total_title'><div className='title_row_production'><div></div><div>{ machineNumber}</div></div></td>
           {reports.map( (report, index) =><td key={index} className='trimester_total_day'>{report.plan}</td>)}
        </tr>
      })
    }
    else if(TPlan && filter === 'model') {
      return trimesterModelReports.map( ({model, partName, reports}) =>{
        return <tr key={model}>
          <td className='trimester_total_title'><div className='title_row_production'><div></div><div>{ partName}</div></div></td>
           {reports.map( (report, index) =><td key={index} className='trimester_total_day'>{report.plan}</td>)}
        </tr>
      })
    }
    else if(TPlan && filter === 'molde') {
      return trimesterMoldeReports.map( ({molde, moldeNumber, reports}) =>{
        return <tr key={molde}>
          <td className='trimester_total_title'><div className='title_row_production'><div></div><div>{ moldeNumber}</div></div></td>
           {reports.map( (report, index) =><td key={index} className='trimester_total_day'>{report.plan}</td>)}
        </tr>
      })
    }
  }

  const renderWTimeDetail = () =>{
    if(weekWTime && filter === 'machine') {
      return weekMachineReports.map( ({machine, machineNumber, reports}) =>{
        return <tr key={machine}>
          <td className='efficiency_total_machine'><div className='title_row_production'><div></div><div>{ machineNumber}</div></div></td>
           {reports.map( (report, index) =><td key={index} className='efficiency_total_day'>{report.wtime}</td>)}
        </tr>
      })
    }
    else if(weekWTime && filter === 'model') {
      return weekModelReports.map( ({model, partName, reports}) =>{
        return <tr key={model}>
          <td className='efficiency_total_machine'><div className='title_row_production'><div></div><div>{ partName}</div></div></td>
           {reports.map( (report, index) =><td key={index} className='efficiency_total_day'>{report.wtime}</td>)}
        </tr>
      })
    }
    else if(weekWTime && filter === 'molde') {
      return weekMoldeReports.map( ({molde, moldeNumber, reports}) =>{
        return <tr key={molde}>
          <td className='efficiency_total_machine'><div className='title_row_production'><div></div><div>{ moldeNumber}</div></div></td>
           {reports.map( (report, index) =><td key={index} className='efficiency_total_day'>{report.wtime}</td>)}
        </tr>
      })
    }
  }

  const renderTWTimeDetail = () =>{
    if(TWTime && filter === 'machine') {
      return trimesterMachineReports.map( ({machine, machineNumber, reports}) =>{
        return <tr key={machine}>
          <td className='trimester_total_title'><div className='title_row_production'><div></div><div>{ machineNumber}</div></div></td>
           {reports.map( (report, index) =><td key={index} className='trimester_total_day'>{report.wtime}</td>)}
        </tr>
      })
    }
    else if(TWTime && filter === 'model') {
      return trimesterModelReports.map( ({model, partName, reports}) =>{
        return <tr key={model}>
          <td className='trimester_total_title'><div className='title_row_production'><div></div><div>{ partName}</div></div></td>
           {reports.map( (report, index) =><td key={index} className='trimester_total_day'>{report.wtime}</td>)}
        </tr>
      })
    }
    else if(TWTime && filter === 'molde') {
      return trimesterMoldeReports.map( ({molde, moldeNumber, reports}) =>{
        return <tr key={molde}>
          <td className='trimester_total_title'><div className='title_row_production'><div></div><div>{ moldeNumber}</div></div></td>
           {reports.map( (report, index) =><td key={index} className='trimester_total_day'>{report.wtime}</td>)}
        </tr>
      })
    }
  }

  const renderDTimeDetail = () =>{
    if(weekDTime && filter === 'machine') {
      return weekMachineReports.map( ({machine, machineNumber, reports, downtime}) =>{
        return <Fragment key={machine}><tr>
          <td className='efficiency_total_machine'><div className='title_row_production'><div></div><div>{ machineNumber }</div></div></td>
          {reports.map( (report, index) =><td key={index} className='efficiency_total_day'>{report.dtime}</td>)}
        </tr>
        {detail && downtime.map(issue=><tr key={issue.issueCode}>
          <td className='detail_total_machine'><div className='detail_row_production'><div></div><div>{ issue.issueCode } (mins)</div></div></td>
            {issue.issues.map((it, index)=><td key={index} className='detail_total_day'>{it}</td>)}
          </tr>)    
        }
      </Fragment>
      })
    }
    else if(weekDTime && filter === 'model') {
      return weekModelReports.map( ({model, partName, reports}) =>{
        return <tr key={model}>
          <td className='efficiency_total_machine'><div className='title_row_production'><div></div><div>{ partName}</div></div></td>
           {reports.map( (report, index) =><td key={index} className='efficiency_total_day'>{report.dtime}</td>)}
        </tr>
      })
    }
    else if(weekDTime && filter === 'molde') {
      return weekMoldeReports.map( ({molde, moldeNumber, reports}) =>{
        return <tr key={molde}>
          <td className='efficiency_total_machine'><div className='title_row_production'><div></div><div>{ moldeNumber}</div></div></td>
           {reports.map( (report, index) =><td key={index} className='efficiency_total_day'>{report.dtime}</td>)}
        </tr>
      })
    }
  }

  const renderTDTimeDetail = () =>{
    if(TDTime && filter === 'machine') {
      return trimesterMachineReports.map( ({machine, machineNumber, reports, downtime}) =>{
        return <Fragment key={machine}><tr>
        <td className='efficiency_total_machine'><div className='title_row_production'><div></div><div>{ machineNumber }</div></div></td>
        {reports.map( (report, index) =><td key={index} className='efficiency_total_day'>{report.dtime}</td>)}
      </tr>
      {detail && downtime.map(issue=><tr key={issue.issueCode}>
        <td className='detail_total_machine'><div className='detail_row_production'><div></div><div>{ issue.issueCode } (mins)</div></div></td>
        {issue.issues.map((it, index)=><td key={index} className='detail_total_day'>{it}</td>)}
      </tr>)
      }
      </Fragment>
      })
    }
    else if(TDTime && filter === 'model') {
      return trimesterModelReports.map( ({model, partName, reports}) =>{
        return <tr key={model}>
          <td className='trimester_total_title'><div className='title_row_production'><div></div><div>{ partName}</div></div></td>
           {reports.map( (report, index) =><td key={index} className='trimester_total_day'>{report.dtime}</td>)}
        </tr>
      })
    }
    else if(TDTime && filter === 'molde') {
      return trimesterMoldeReports.map( ({molde, moldeNumber, reports}) =>{
        return <tr key={molde}>
          <td className='trimester_total_title'><div className='title_row_production'><div></div><div>{ moldeNumber}</div></div></td>
           {reports.map( (report, index) =><td key={index} className='trimester_total_day'>{report.dtime}</td>)}
        </tr>
      })
    }
  }

  const renderOEEDetail = () =>{
    if(weekOEE && filter === 'machine') {
      return weekMachineReports.map( ({machine, machineNumber, reports}) =>{
        return <tr key={machine}>
          <td className='efficiency_total_machine'><div className='title_row_production'><div></div><div>{ machineNumber}</div></div></td>
           {reports.map( (report, index) =><td key={index} className='efficiency_total_day'>{report.oee}</td>)}
        </tr>
      })
    }
    else if(weekOEE && filter === 'model') {
      return weekModelReports.map( ({model, partName, reports}) =>{
        return <tr key={model}>
          <td className='efficiency_total_machine'><div className='title_row_production'><div></div><div>{ partName}</div></div></td>
           {reports.map( (report, index) =><td key={index} className='efficiency_total_day'>{report.oee}</td>)}
        </tr>
      })
    }
    else if(weekOEE && filter === 'molde') {
      return weekMoldeReports.map( ({molde, moldeNumber, reports}) =>{
        return <tr key={molde}>
          <td className='efficiency_total_machine'><div className='title_row_production'><div></div><div>{ moldeNumber}</div></div></td>
           {reports.map( (report, index) =><td key={index} className='efficiency_total_day'>{report.oee}</td>)}
        </tr>
      })
    }
  }

  const renderTOEEDetail = () =>{
    if(TOEE && filter === 'machine') {
      return trimesterMachineReports.map( ({machine, machineNumber, reports}) =>{
        return <tr key={machine}>
          <td className='trimester_total_title'><div className='title_row_production'><div></div><div>{ machineNumber}</div></div></td>
           {reports.map( (report, index) =><td key={index} className='trimester_total_day'>{report.oee}</td>)}
        </tr>
      })
    }
    else if(TOEE && filter === 'model') {
      return trimesterModelReports.map( ({model, partName, reports}) =>{
        return <tr key={model}>
          <td className='trimester_total_title'><div className='title_row_production'><div></div><div>{ partName}</div></div></td>
           {reports.map( (report, index) =><td key={index} className='trimester_total_day'>{report.oee}</td>)}
        </tr>
      })
    }
    else if(TOEE && filter === 'molde') {
      return trimesterMoldeReports.map( ({molde, moldeNumber, reports}) =>{
        return <tr key={molde}>
          <td className='trimester_total_title'><div className='title_row_production'><div></div><div>{ moldeNumber}</div></div></td>
           {reports.map( (report, index) =><td key={index} className='trimester_total_day'>{report.oee}</td>)}
        </tr>
      })
    }
  }

  const renderPurgeDetail = () =>{
    if(weekPurge && filter === 'machine') {
      return weekMachineReports.map( ({machine, machineNumber, reports, purge}) =>{
        return <Fragment key={machine}><tr>
            <td className='efficiency_total_machine'><div className='title_row_production'><div></div><div>{ machineNumber }</div></div></td>
            {reports.map( (report, index) =><td key={index} className='efficiency_total_day'>{report.purge}</td>)}
          </tr>
          {detail && purge.map( resine =><tr key={ resine.resine}>
            <td className='detail_total_machine'><div className='detail_row_production'><div></div><div>{ resine.resine }</div></div></td>
            { resine.resines.map((it, index)=><td key={index} className='detail_total_day'>{it}</td>)}
          </tr>)
          }
        </Fragment>
      })
    }
  }

  const renderTPurgeDetail = () =>{
    if(TPurge && filter === 'machine') {
      return trimesterMachineReports.map( ({machine, machineNumber, reports, purge}) =>{
        return <Fragment key={machine}><tr>
            <td className='efficiency_total_machine'><div className='title_row_production'><div></div><div>{ machineNumber }</div></div></td>
            {reports.map( (report, index) =><td key={index} className='efficiency_total_day'>{report.purge}</td>)}
          </tr>
          {detail && purge.map( resine =><tr key={ resine.resine}>
            <td className='detail_total_machine'><div className='detail_row_production'><div></div><div>{ resine.resine }</div></div></td>
            { resine.resines.map((it, index)=><td key={index} className='detail_total_day'>{it}</td>)}
          </tr>)
          }
        </Fragment>
      })
    }
  }

  const renderPurgeButton = () =>{
    
      return <button onClick={onPurge}>▼</button>
    
  }
  
  const renderColumns = () =>{
      if(period === 'trimester' && trimesterColumns.length === 4){
        const columns = trimesterColumns
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
          {renderDetailDefect()}
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
          {renderTrimesterDetailDowntime()}
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
            <td className='trimester_total_title'><div className='title_row_production'>{renderPurgeButton()}<div>Total Purge (g)</div></div></td>
            <td className='trimester_total_day'>{columns[0].purge}</td>
            <td className='trimester_total_day'>{columns[1].purge}</td>
            <td className='trimester_total_day'>{columns[2].purge}</td>
            <td className='trimester_total'>{columns[3].purge}</td>
          </tr>
          {renderDetailPurge()}
          {renderTPurgeDetail()}
        </tbody>
      }
      else if(period === 'day' && weekColumns.length === 8){
        const columns = weekColumns
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
        {renderWeekDetailDefect()}
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
        {renderWeekDetailDowntime()}
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
          <td className='efficiency_total_machine'><div className='title_row_production'>{renderPurgeButton()}<div>Total Purge (g)</div></div></td>
          <td className='efficiency_total_day'>{columns[0].purge}</td>
          <td className='efficiency_total_day'>{columns[1].purge}</td>
          <td className='efficiency_total_day'>{columns[2].purge}</td>
          <td className='efficiency_total_day'>{columns[3].purge}</td>
          <td className='efficiency_total_day'>{columns[4].purge}</td>
          <td className='efficiency_total_day'>{columns[5].purge}</td>
          <td className='efficiency_total_day'>{columns[6].purge}</td>
          <td className='efficiency_total_week'>{columns[7].purge}</td>
        </tr>
        {renderWeekDetailPurge()}
        {renderPurgeDetail()}
      </tbody>
      }
      else{
        return
      }
    }

    return (
      <table className='efficiency_tableTotal'>
        {renderColumns()}
      </table>
    )
}

export default BodyTable