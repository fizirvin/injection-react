import React, { useState, useEffect } from 'react'
import Header from './components/production/Header'
import HeaderTable from './components/production/HeaderTable'
import BodyTable from './components/production/BodyTable'
import { formatDate, getDateofTable, dayColumn, weekColumn, monthColumn, machineDetail, machineTrimesterDetail, modelDetail, 
    moldeDetail, modelTrimesterDetail, moldeTrimesterDetail, defectTrimesterDetail,
    defectWeekDetail } from '../actions/helpers'

const Product = ({production, purge, defects}) =>{
    const [ period, setPeriod ] = useState('day')
    const [ shift, setShift ] = useState('both')
    const [ filter, setFilter ] = useState('machine')
    const [ today, setToday ] = useState()
    const [ day, setDay ] = useState('')
    const [ detail, setDetail ] = useState(false)

    const [ trimesterFields, setTrimesterFields ] = useState()
    const [ weekFields, setWeekFields ] = useState()
    const [ weekColumns, setWeekColumns ] = useState([])
    const [ trimesterColumns, setTrimesterColumns ] = useState([])

    const [ weekMachineReports, setWeekMachineReports ] = useState([])
    const [ trimesterMachineReports, setTrimesterMachineReports ] = useState([])
    const [ weekModelReports, setWeekModelReports ] = useState([])
    const [ trimesterModelReports, setTrimesterModelReports ] = useState([])
    const [ weekMoldeReports, setWeekMoldeReports ] = useState([])
    const [ trimesterMoldeReports, setTrimesterMoldeReports ] = useState([])


    const [ weekReports, setWeekReports ] = useState([])
    const [ weekPurges, setWeekPurges ] = useState([])
    const [ weekDefects, setWeekDefects ] = useState([])
    const [ trimesterReports, setTrimesterReports ] = useState([])
    const [ trimesterPurges, setTrimesterPurges ] = useState([])
    const [ trimesterDefects, setTrimesterDefects ] = useState([])
    const [ week, setWeek ] = useState({})
    const [ trimester, setTrimester ] = useState({})

    const [ weekDefectDetail, setWeekDefectDetail ] = useState({})
    const [ trimesterDefectDetail, setTrimesterDefectDetail ] = useState({})
    
    
    useEffect(() =>{
        const date = new Date();
        const today = formatDate(date)+'T01:00:00.000-06:00'
        return setToday(today)
    },[ ])

    useEffect(() =>{
        if( period === 'day'){
            const fields = [
                {
                    pos1: 'Mon',
                    pos2: week.monday
                },
                {
                    pos1: 'Tue',
                    pos2: week.tuesday
                },
                {
                    pos1: 'Wed',
                    pos2: week.wednesday
                },
                {
                    pos1: 'Thu',
                    pos2: week.thursday
                },
                {
                    pos1: 'Fri',
                    pos2: week.friday
                },
                {
                    pos1: 'Sat',
                    pos2: week.saturday
                },
                {
                    pos1: 'Sun',
                    pos2: week.sunday
                },
                {
                    pos1: 'Total',
                    pos2: 'Week'
                }
            ]
            return setWeekFields(fields)
        } else if(period === 'trimester'){
            const  months = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            const fields = [
                {
                    pos1: months[parseInt(trimester.first)],
                    pos2: trimester.first
                },
                {
                    pos1: months[parseInt(trimester.second)],
                    pos2: trimester.second
                },
                {
                    pos1: months[parseInt(trimester.third)],
                    pos2: trimester.third
                },
                {
                    pos1: 'Total',
                    pos2: 'Trimester'
                }
            ]
            return setTrimesterFields(fields)
        }

    },[period, trimester, week ])

    useEffect(() =>{
        if(period === 'day'){
            if( !today){ return }
            else {
                const monday = getDateofTable(1, today)
                const tuesday = getDateofTable(2, today)
                const wednesday = getDateofTable(3, today)
                const thursday = getDateofTable(4, today)
                const friday = getDateofTable(5, today)
                const saturday = getDateofTable(6, today)
                const sunday = getDateofTable(7, today)
        
                const week = {
                    monday,
                    tuesday,
                    wednesday,
                    thursday,
                    friday,
                    saturday,
                    sunday
                } 
                
                return setWeek(week)                                   
            }
        } else if(period === 'trimester'){
            const date = new Date(today);
            const m = date.getMonth()+1
            const trimester = m >= 1 && m <=3 ? 'first' : m >= 4 && m <= 6 ? 'second' : m >= 7 && m <= 9 ? 'third' : 'fourth'
            if( trimester === 'first'){
                const newTrimester = {
                    first: '01',
                    second: '02',
                    third: '03'
                }
                return setTrimester(newTrimester)
            }
            else if (trimester === 'second'){
                const newTrimester = {
                    first: '04',
                    second: '05',
                    third: '06'
                }
                return setTrimester(newTrimester)
            }else if( trimester === 'third'){
                const newTrimester = {
                    first: '07',
                    second: '08',
                    third: '09'
                }
                return setTrimester(newTrimester)
            }else if( trimester === 'fourth'){
                const newTrimester = {
                    first: '10',
                    second: '11',
                    third: '12'
                }
                return setTrimester(newTrimester)
            }  
        }
        
    }, [period, today])

    useEffect(() =>{
        if(period !== 'day'){ 
            return 
        } else {
            if(shift === 'both'){
                const reports = production.filter( item => item.date >= week.monday && item.date <= week.sunday )  
                const purges = purge.filter(item => item.date >= week.monday && item.date <= week.sunday)
                const defect = defects.filter(item => item.date >= week.monday && item.date <= week.sunday)    
                setWeekPurges(purges)
                setWeekDefects(defect)
                return setWeekReports(reports) 
            }
            else{
                const reports = production.filter( item => item.shift === shift && item.date >= week.monday && item.date <= week.sunday )  
                const purges = purge.filter(item => item.shift === shift && item.date >= week.monday && item.date <= week.sunday)
                const defect = defects.filter(item => item.shift === shift && item.date >= week.monday && item.date <= week.sunday)    
                setWeekPurges(purges)
                setWeekDefects(defect)
                return setWeekReports(reports) 
            }
        }
    },[period, week, shift, production, purge, defects])

    useEffect(() =>{
        if(period !== 'trimester'){ 
            return 
        } else {
            if(shift === 'both'){
                const date = new Date(today);
                const y = date.getFullYear()
                const { first, third } = trimester
                const reports = production.filter( item => item.date >= `${y}-${first}-01` && item.date <= `${y}-${third}-31`)
                const purges = purge.filter(item => item.date >= `${y}-${first}-01` && item.date <= `${y}-${third}-31`)
                const defect = defects.filter(item => item.date >= `${y}-${first}-01` && item.date <= `${y}-${third}-31`)   
                setTrimesterPurges(purges)
                setTrimesterDefects(defect)
                return setTrimesterReports(reports) 
            }
            else{
                const date = new Date(today);
                const y = date.getFullYear()
                const { first, third } = trimester
                const reports = production.filter( item => item.shift === shift && item.date >= `${y}-${first}-01` && item.date <= `${y}-${third}-31` )  
                const purges = purge.filter(item => item.shift === shift && item.date >= `${y}-${first}-01` && item.date <= `${y}-${third}-31`)
                const defect = defects.filter(item => item.shift === shift && item.date >= `${y}-${first}-01` && item.date <= `${y}-${third}-31`)   
                setTrimesterPurges(purges)
                setTrimesterDefects(defect)
                return setTrimesterReports(reports) 
            }
        }
    },[period, shift, production, purge, trimester, today, defects])

    useEffect(() =>{
        const { monday, tuesday, wednesday, thursday, friday, saturday, sunday } = week
        if(!monday){return}    
        const daysColumns = [ monday, tuesday, wednesday, thursday, friday, saturday, sunday ]
        const arrayColumns = daysColumns.map( item =>{
            const column = dayColumn(weekReports, item, weekPurges)
            const { real, ng, ok, plan, wtime, dtime, oee, purge } = column
            return { real, ng, ok, plan, wtime, dtime, oee, purge}
        })
        
        const column = weekColumn( weekReports, weekPurges )
        const { real, ng, ok, plan, wtime, dtime, oee, purge } = column
        const column8 = {
            real,
            ng,
            ok,
            plan,
            wtime,
            dtime,
            oee,
            purge
        }
        const array = [...arrayColumns, column8]
        setWeekColumns(array)
    
        if( filter === 'machine'){
            const machineReports = machineDetail(weekReports, daysColumns, weekPurges, weekDefects );
            const defectDetail = defectWeekDetail(daysColumns, weekDefects)
            setWeekDefectDetail(defectDetail)
            return setWeekMachineReports(machineReports)
        }
        if( filter === 'model'){
            const modelReports = modelDetail(weekReports, daysColumns, weekDefects)
            const defectDetail = defectWeekDetail(daysColumns, weekDefects)
            setWeekDefectDetail(defectDetail)
            return setWeekModelReports(modelReports)
        }
        if( filter === 'molde'){
            const moldeReports = moldeDetail(weekReports, daysColumns, weekDefects)
            const defectDetail = defectWeekDetail(daysColumns, weekDefects)
            setWeekDefectDetail(defectDetail)
            return setWeekMoldeReports(moldeReports)
        }
     
    },[filter, week, weekReports, weekPurges, weekDefects])

    useEffect(() =>{
        const { first, second, third } = trimester    
        if(!first){
            return 
        }
        else {
                const date = new Date(today);
                const y = date.getFullYear()
                const trimesterColumns = [ first, second, third ]
                const arrayColumns = trimesterColumns.map( item =>{
                const column = monthColumn(trimesterReports, y, item, trimesterPurges)
                const { real, ng, ok, plan, wtime, dtime, oee, purge } = column
                return { real, ng, ok, plan, wtime, dtime, oee, purge}
            })

            const column = weekColumn( trimesterReports, trimesterPurges )
            const { real, ng, ok, plan, wtime, dtime, oee, purge } = column
            const column8 = {
                real,
                ng,
                ok,
                plan,
                wtime,
                dtime,
                oee,
                purge
            }

            const array = [...arrayColumns, column8]
            setTrimesterColumns(array)
            if( filter === 'machine'){
                const machineReports = machineTrimesterDetail(trimesterReports, y, trimesterColumns, trimesterPurges, trimesterDefects );
                const defectDetail = defectTrimesterDetail( y, trimesterColumns, trimesterDefects)
                setTrimesterDefectDetail(defectDetail)
                return setTrimesterMachineReports(machineReports)
            }
            if( filter === 'model'){
                const modelReports = modelTrimesterDetail(trimesterReports, y, trimesterColumns, trimesterDefects );
                const defectDetail = defectTrimesterDetail( y, trimesterColumns, trimesterDefects)
                setTrimesterDefectDetail(defectDetail)
                return setTrimesterModelReports(modelReports)
            }
            if( filter === 'molde'){
                const moldeReports = moldeTrimesterDetail(trimesterReports, y, trimesterColumns, trimesterDefects );
                const defectDetail = defectTrimesterDetail( y, trimesterColumns, trimesterDefects)
                setTrimesterDefectDetail(defectDetail)
                return setTrimesterMoldeReports(moldeReports)
            }
        }
        
    },[filter, trimester, trimesterReports, trimesterPurges, today, trimesterDefects])

    const renderHeader = () =>{
        if(production.length === 0 ){ return <div>...loading</div>}
        return period === 'day' && weekFields ? <HeaderTable filter={filter} fields={weekFields}/> : 
        period === 'trimester' && trimesterFields ? <HeaderTable filter={filter} fields={trimesterFields}/> :
        <div>...loading</div>
    }

    const renderBody = () =>{
        return <BodyTable 
            filter={filter} 
            weekColumns={weekColumns}
            trimesterColumns={trimesterColumns} 
            period={period} 
            weekMoldeReports={weekMoldeReports} 
            weekModelReports={weekModelReports} 
            weekMachineReports={weekMachineReports} 
            trimesterMachineReports={trimesterMachineReports}
            trimesterModelReports={trimesterModelReports}
            trimesterMoldeReports={trimesterMoldeReports}
            trimesterDefectDetail={trimesterDefectDetail}
            weekDefectDetail={weekDefectDetail}
            detail={detail}
        />
    }


    return (
        <div className="Downtime">
            <Header 
                period={period} 
                setPeriod={setPeriod} 
                shift={shift} 
                setShift={setShift} 
                filter={filter} 
                setFilter={setFilter}
                today={today}
                setToday={setToday}
                day={day}
                setDay={setDay}
                detail={detail} 
                setDetail={setDetail}
            />
           <div className='downtime_graphs'>
                <div className='product_container'>
                    {renderHeader()}
                    {renderBody()}
                </div>
                <div className='graphics_container'>
              
                </div>
            </div>
        </div>
      )
}

export default Product