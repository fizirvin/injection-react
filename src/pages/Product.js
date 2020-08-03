import React, { useState, useEffect } from 'react'
import Header from './components/production/Header'
import HeaderTable from './components/production/HeaderTable'
import BodyTable from './components/production/BodyTable'
import { formatDate, getDateofTable, dayColumn, weekColumn } from '../actions/helpers'

const Product = ({production, purge}) =>{
    const [ period, setPeriod ] = useState('week')
    const [ shift, setShift ] = useState('both')
    const [ filter, setFilter ] = useState('machine')
    const [ today, setToday ] = useState()
    const [ day, setDay ] = useState('')

    const [ fields, setFields ] = useState()
    const [ column1, setColumn1 ] = useState({pos1: ''})
    const [ column2, setColumn2 ] = useState({pos1: ''})
    const [ column3, setColumn3 ] = useState({pos1: ''})
    const [ column4, setColumn4 ] = useState({pos1: ''})
    const [ column5, setColumn5 ] = useState({pos1: ''})
    const [ column6, setColumn6 ] = useState({pos1: ''})
    const [ column7, setColumn7 ] = useState({pos1: ''})
    const [ column8, setColumn8 ] = useState({pos1: ''})
    
    const [ reports, setReports ] = useState([])
    const [ purges, setPurges ] = useState([])
    const [ week, setWeek ] = useState({})

    useEffect(() =>{
        const date = new Date();
        const today = formatDate(date)+'T01:00:00.000-06:00'
        return setToday(today)
    },[ ])

    useEffect(() =>{
        const fields = {
            field1: {
                pos1: 'Mon',
                pos2: week.monday
            },
            field2: {
                pos1: 'Tue',
                pos2: week.tuesday
            },
            field3: {
                pos1: 'Wed',
                pos2: week.wednesday
            },
            field4: {
                pos1: 'Thu',
                pos2: week.thursday
            },
            field5: {
                pos1: 'Fri',
                pos2: week.friday
            },
            field6: {
                pos1: 'Sat',
                pos2: week.saturday
            },
            field7: {
                pos1: 'Sun',
                pos2: week.sunday
            },
            field8: {
                pos1: 'Total',
                pos2: 'Week'
            }
        }
        return setFields(fields)

    },[week])

    useEffect(() =>{
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
        
    }, [today])

    useEffect(() =>{
        if(shift === 'both'){
            const reports = production.filter( item => item.date >= week.monday && item.date <= week.sunday )  
            const purges = purge.filter(item => item.date >= week.monday && item.date <= week.sunday)   
            setPurges(purges)
            return setReports(reports) 
        }
        else{
            const reports = production.filter( item => item.shift === shift && item.date >= week.monday && item.date <= week.sunday )  
            const purges = purge.filter(item => item.shift === shift && item.date >= week.monday && item.date <= week.sunday)   
            setPurges(purges)
            return setReports(reports) 
        }
    },[shift, production, purge, week])

    useEffect(() =>{
        const { monday } = week
        const column = dayColumn(reports, monday, purges)
        const { real, ng, ok, plan, wtime, dtime, oee, purge } = column
        const column1 = {
            real,
            ng,
            ok,
            plan,
            wtime,
            dtime,
            oee,
            purge
        }
        return setColumn1(column1)
    },[reports, week, purges])

    useEffect(() =>{
        const { tuesday } = week
        const column = dayColumn(reports, tuesday, purges)
        const { real, ng, ok, plan, wtime, dtime, oee, purge } = column
        const column2 = {
            real,
            ng,
            ok,
            plan,
            wtime,
            dtime,
            oee,
            purge
        }
        return setColumn2(column2)
    },[reports, week, purges])

    useEffect(() =>{
        const { wednesday } = week
        const column = dayColumn(reports, wednesday, purges)
        const { real, ng, ok, plan, wtime, dtime, oee, purge } = column
        const column3 = {
            real,
            ng,
            ok,
            plan,
            wtime,
            dtime,
            oee,
            purge
        }
        return setColumn3(column3)
    },[reports, week, purges])

    useEffect(() =>{
        const { thursday } = week
        const column = dayColumn(reports, thursday, purges)
        const { real, ng, ok, plan, wtime, dtime, oee, purge } = column
        const column4 = {
            real,
            ng,
            ok,
            plan,
            wtime,
            dtime,
            oee,
            purge
        }
        return setColumn4(column4)
    },[reports, week, purges])

    useEffect(() =>{
        const { friday } = week
        const column = dayColumn(reports, friday, purges)
        const { real, ng, ok, plan, wtime, dtime, oee, purge } = column
        const column5 = {
            real,
            ng,
            ok,
            plan,
            wtime,
            dtime,
            oee,
            purge
        }
        return setColumn5(column5)
    },[reports, week, purges])

    useEffect(() =>{
        const { saturday } = week
        const column = dayColumn(reports, saturday, purges)
        const { real, ng, ok, plan, wtime, dtime, oee, purge } = column
        const column6 = {
            real,
            ng,
            ok,
            plan,
            wtime,
            dtime,
            oee,
            purge
        }
        return setColumn6(column6)
    },[reports, week, purges])

    useEffect(() =>{
        const { sunday } = week
        const column = dayColumn( reports, sunday, purges )
        const { real, ng, ok, plan, wtime, dtime, oee, purge } = column
        const column7 = {
            real,
            ng,
            ok,
            plan,
            wtime,
            dtime,
            oee,
            purge
        }
        return setColumn7(column7)
    },[reports, week, purges])
   
    useEffect(() =>{
        const column = weekColumn( reports, purges )
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
        return setColumn8(column8)
    },[reports, purges ])

    const renderHeader = () =>{
        return production.length > 0 && fields? <HeaderTable filter={filter} fields={fields}/> : <div>...Loading</div>
    }

    const renderBody = () =>{
        return !column1 | !column2 | !column3 | !column4 | !column5 | !column6 | !column7 | !column8 ? <div>...Loading</div> : 
        <BodyTable column1={column1} column2={column2} column3={column3} column4={column4} column5={column5} column6={column6} column7={column7} column8={column8}/>
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