import React, { useState, useEffect } from 'react'
import Header from './components/production/Header'
import HeaderTable from './components/production/HeaderTable'
import BodyTable from './components/production/BodyTable'
import { formatDate, getDateofTable, dayColumn, weekColumn, monthColumn } from '../actions/helpers'

const Product = ({production, purge}) =>{
    const [ period, setPeriod ] = useState('day')
    const [ shift, setShift ] = useState('both')
    const [ filter, setFilter ] = useState('machine')
    const [ today, setToday ] = useState()
    const [ day, setDay ] = useState('')

    const [ fields, setFields ] = useState()
    const [columns, setColumns ] = useState()

    const [ weekReports, setWeekReports ] = useState([])
    const [ weekPurges, setWeekPurges ] = useState([])
    const [ trimesterReports, setTrimesterReports ] = useState([])
    const [ trimesterPurges, setTrimesterPurges ] = useState([])
    const [ week, setWeek ] = useState({})
    const [ trimester, setTrimester ] = useState({})
    
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
            return setFields(fields)
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
            return setFields(fields)
        }

    },[trimester, week, period])

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
                setWeekPurges(purges)
                return setWeekReports(reports) 
            }
            else{
                const reports = production.filter( item => item.shift === shift && item.date >= week.monday && item.date <= week.sunday )  
                const purges = purge.filter(item => item.shift === shift && item.date >= week.monday && item.date <= week.sunday)   
                setWeekPurges(purges)
                return setWeekReports(reports) 
            }
        }
    },[period, shift, production, purge, week])

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
                setTrimesterPurges(purges)
                return setTrimesterReports(reports) 
            }
            else{
                const date = new Date(today);
                const y = date.getFullYear()
                const { first, third } = trimester
                const reports = production.filter( item => item.shift === shift && item.date >= `${y}-${first}-01` && item.date <= `${y}-${third}-31` )  
                const purges = purge.filter(item => item.shift === shift && item.date >= `${y}-${first}-01` && item.date <= `${y}-${third}-31`)   
                setTrimesterPurges(purges)
                return setTrimesterReports(reports) 
            }
        }
    },[period, shift, production, purge, trimester])

    useEffect(() =>{
        const { monday, tuesday, wednesday, thursday, friday, saturday, sunday } = week    
        if(!monday){
            return 
        }
        else {
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
            return setColumns(array)
        }
        
    },[weekReports, week, weekPurges])

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
            return setColumns(array)
        }
        
    },[trimesterReports, trimester, trimesterPurges])

    const renderHeader = () =>{
        return production.length > 0 && fields? <HeaderTable filter={filter} fields={fields}/> : <div>...Loading</div>
    }

    const renderBody = () =>{
        return !columns ? <div>...Loading</div> : 
        <BodyTable columns={columns} period={period}/>
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
            />
           <div className='downtime_graphs'>
                <div className='downtime_container'>
                    {renderHeader()}
                    {renderBody()}
                    <div className='downtime_table_body'>
               
                    </div>
                </div>
                <div className='graphics_container'>
              
                </div>
            </div>
        </div>
      )
}

export default Product