import React, { useState, useEffect } from 'react'
import Header from './components/production/Header'
import HeaderTable from './components/production/HeaderTable'
import BodyTable from './components/production/BodyTable'
import { formatDate, getDateofTable, filterDayTotalReal, filterWeekTotalReal, filterDayTotalNG, filterWeekTotalNG, filterDayTotalOK, filterWeekTotalOK,
    filterDayTotalPlan, filterWeekTotalPlan, filterDayTotalWTime, filterWeekTotalWTime, filterDayTotalDTime, filterWeekTotalDTime, filterDayTotalOEE, 
    filterWeekTotalOEE, filterDayTotalPurge, filterWeekTotalPurge } from '../actions/helpers'

const Product = ({production, purge}) =>{
    const [ period, setPeriod ] = useState('week')
    const [ shift, setShift ] = useState('both')
    const [ filter, setFilter ] = useState('machine')
    const [ go, setGo ] = useState()
    const [ date, setDate ] = useState()
    const [ fields, setFields ] = useState()
    const [ row1, setRow1 ] = useState({pos1: ''})
    const [ row2, setRow2 ] = useState()
    const [ row3, setRow3 ] = useState()
    const [ row4, setRow4 ] = useState()
    const [ row5, setRow5 ] = useState()
    const [ row6, setRow6 ] = useState()
    const [ row7, setRow7 ] = useState()
    const [ row8, setRow8 ] = useState()
    const [ reports, setReports ] = useState([])
    const [ purges, setPurges ] = useState([])
    const [ week, setWeek ] = useState({})

    useEffect(() =>{
        const date = new Date();
        const today = formatDate(date)+'T01:00:00.000-06:00'
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
        const reports = production.filter( 
            item => item.date >= week.monday && item.date <= week.sunday
        )
        const purges = purge.filter(item => item.date >= week.monday && item.date <= week.sunday
            )
        setPurges(purges)    
        return setReports(reports) 
    },[week, production])

    useEffect(() =>{
        const { monday, tuesday, wednesday, thursday, friday, saturday, sunday } = week
        const row1 = {
            pos1: filterDayTotalReal(reports, monday),
            pos2: filterDayTotalReal(reports, tuesday),
            pos3: filterDayTotalReal(reports, wednesday),
            pos4: filterDayTotalReal(reports, thursday),
            pos5: filterDayTotalReal(reports, friday),
            pos6: filterDayTotalReal(reports, saturday),
            pos7: filterDayTotalReal(reports, sunday),
            pos8: filterWeekTotalReal(reports, monday, sunday),
        }
        setRow1(row1)
    },[reports, week])

    useEffect(() =>{
        const { monday, tuesday, wednesday, thursday, friday, saturday, sunday } = week
        const row2 = {
            pos1: filterDayTotalNG(reports, monday),
            pos2: filterDayTotalNG(reports, tuesday),
            pos3: filterDayTotalNG(reports, wednesday),
            pos4: filterDayTotalNG(reports, thursday),
            pos5: filterDayTotalNG(reports, friday),
            pos6: filterDayTotalNG(reports, saturday),
            pos7: filterDayTotalNG(reports, sunday),
            pos8: filterWeekTotalNG(reports, monday, sunday),
        }
        setRow2(row2)
    },[reports, week])

    useEffect(() =>{
        const { monday, tuesday, wednesday, thursday, friday, saturday, sunday } = week
        const row3 = {
            pos1: filterDayTotalOK(reports, monday),
            pos2: filterDayTotalOK(reports, tuesday),
            pos3: filterDayTotalOK(reports, wednesday),
            pos4: filterDayTotalOK(reports, thursday),
            pos5: filterDayTotalOK(reports, friday),
            pos6: filterDayTotalOK(reports, saturday),
            pos7: filterDayTotalOK(reports, sunday),
            pos8: filterWeekTotalOK(reports, monday, sunday),
        }
        setRow3(row3)
    },[reports, week])

    useEffect(() =>{
        const { monday, tuesday, wednesday, thursday, friday, saturday, sunday } = week
        const row4 = {
            pos1: filterDayTotalPlan(reports, monday),
            pos2: filterDayTotalPlan(reports, tuesday),
            pos3: filterDayTotalPlan(reports, wednesday),
            pos4: filterDayTotalPlan(reports, thursday),
            pos5: filterDayTotalPlan(reports, friday),
            pos6: filterDayTotalPlan(reports, saturday),
            pos7: filterDayTotalPlan(reports, sunday),
            pos8: filterWeekTotalPlan(reports, monday, sunday),
        }
        setRow4(row4)
    },[reports, week])

    useEffect(() =>{
        const { monday, tuesday, wednesday, thursday, friday, saturday, sunday } = week
        const row5 = {
            pos1: filterDayTotalWTime(reports, monday),
            pos2: filterDayTotalWTime(reports, tuesday),
            pos3: filterDayTotalWTime(reports, wednesday),
            pos4: filterDayTotalWTime(reports, thursday),
            pos5: filterDayTotalWTime(reports, friday),
            pos6: filterDayTotalWTime(reports, saturday),
            pos7: filterDayTotalWTime(reports, sunday),
            pos8: filterWeekTotalWTime(reports, monday, sunday),
        }
        setRow5(row5)
    },[reports, week])

    useEffect(() =>{
        const { monday, tuesday, wednesday, thursday, friday, saturday, sunday } = week
        const row6 = {
            pos1: filterDayTotalDTime(reports, monday),
            pos2: filterDayTotalDTime(reports, tuesday),
            pos3: filterDayTotalDTime(reports, wednesday),
            pos4: filterDayTotalDTime(reports, thursday),
            pos5: filterDayTotalDTime(reports, friday),
            pos6: filterDayTotalDTime(reports, saturday),
            pos7: filterDayTotalDTime(reports, sunday),
            pos8: filterWeekTotalDTime(reports, monday, sunday),
        }
        setRow6(row6)
    },[reports, week])

    useEffect(() =>{
        const { monday, tuesday, wednesday, thursday, friday, saturday, sunday } = week
        const row7 = {
            pos1: filterDayTotalOEE(reports, monday),
            pos2: filterDayTotalOEE(reports, tuesday),
            pos3: filterDayTotalOEE(reports, wednesday),
            pos4: filterDayTotalOEE(reports, thursday),
            pos5: filterDayTotalOEE(reports, friday),
            pos6: filterDayTotalOEE(reports, saturday),
            pos7: filterDayTotalOEE(reports, sunday),
            pos8: filterWeekTotalOEE(reports, monday, sunday),
        }
        setRow7(row7)
    },[reports, week])

    useEffect(() =>{
        const { monday, tuesday, wednesday, thursday, friday, saturday, sunday } = week
        const row8 = {
            pos1: filterDayTotalPurge(purges, monday),
            pos2: filterDayTotalPurge(purges, tuesday),
            pos3: filterDayTotalPurge(purges, wednesday),
            pos4: filterDayTotalPurge(purges, thursday),
            pos5: filterDayTotalPurge(purges, friday),
            pos6: filterDayTotalPurge(purges, saturday),
            pos7: filterDayTotalPurge(purges, sunday),
            pos8: filterWeekTotalPurge(purges, monday, sunday),
        }
        setRow8(row8)
    },[reports, week])

    const renderHeader = () =>{
        return production.length > 0 && fields? <HeaderTable filter={filter} fields={fields}/> : <div>...Loading</div>
    }

    const renderBody = () =>{
        return !row1.pos1 | !row2 | !row3 | !row4 | !row5 | !row6 | !row7 | !row8 ? <div>...Loading</div> : 
        <BodyTable row1={row1} row2={row2} row3={row3} row4={row4} row5={row5} row6={row6} row7={row7} row8={row8}/>
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
                go={go}
                setGo={setGo}
                date={date}
                setDate={setDate}
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