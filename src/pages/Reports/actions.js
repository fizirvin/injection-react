import { url, opts } from '../../config'
import { reportsQuery, initialReportsQuery } from './queries'
import { addReport as newReport, modifyReport } from './mutations'
import { formatDate } from '../../actions/helpers'

import {
    ADD_CYCLES_MOLDES,
    UPDATE_CYCLES_MOLDES
} from '../Moldes/actions.js'

import { 
    ADD_PRODUCTION_BY_DATE,
    UPDATE_PRODUCTION_BY_DATE, 
    ADD_DOWNTIME_BY_DATE,
    UPDATE_DOWNTIME_BY_DATE, 
    ADD_RESINES_BY_DATE,
    UPDATE_RESINES_BY_DATE, 
    ADD_DEFECTS_BY_DATE,
    UPDATE_DEFECTS_BY_DATE 
} from '../Production/actions.js'

export const FETCH_REPORTS = 'FETCH_REPORTS'
export const FETCH_INITIAL_REPORTS = 'FETCH_INITIAL_REPORTS'
export const ADD_REPORT = 'ADD_REPORT'
export const UPDATE_REPORT = 'UPDATE_REPORT'
export const SELECT_REPORT = 'SELECT_REPORT'
export const MESSAGE_REPORT = 'MESSAGE_REPORT'
export const PAGE_REPORT = 'PAGE_REPORT'
export const LOADING_PAGE = 'LOADING_PAGE'
export const ADDED_REPORTS = 'ADDED_REPORT'
export const TOTAL_REPORTS = 'TOTAL_REPORTS'
export const ADD_TOTAL_REPORTS = 'ADD_TOTAL_REPORTS'





const fetchInitialReports = () => async ( dispatch ) => {
    opts.body = JSON.stringify(initialReportsQuery)
    const res = await fetch(url, opts);
    const data = await res.json();
    dispatch({
        type: TOTAL_REPORTS,
        payload: data.data.reports.totalReports
    })
    dispatch({
        type: FETCH_INITIAL_REPORTS,
        payload: data.data.reports.reports
    })
}

const fetchReports = (page, add) => async ( dispatch ) => {
    page++
    dispatch({
        type: LOADING_PAGE
    })
    reportsQuery.variables = { page, add }
    opts.body = JSON.stringify(reportsQuery)
    const res = await fetch(url, opts);
    const data = await res.json();

    if(data.errors){
        dispatch({
            type: LOADING_PAGE
        })
        return console.log(data)
    } else{
        dispatch({
            type: FETCH_REPORTS,
            payload: data.data.reports.reports
        })
        dispatch({
            type: PAGE_REPORT,
            payload: page
        })
        dispatch({
            type: TOTAL_REPORTS,
            payload: data.data.reports.totalReports
        })
        return dispatch({
            type: LOADING_PAGE
        })

    }
}

const addReport = (input) => async ( dispatch ) => {
    newReport.variables = { input }
    opts.body = JSON.stringify(newReport)
    const res = await fetch(url, opts);
    const data = await res.json();

    if(data.errors){
        console.log(data)
        return dispatch({type: MESSAGE_REPORT,
            payload: 'error'
        })
    } else{
        dispatch({
            type: ADD_REPORT,
            payload: data.data.newInjectionReport
        })
        dispatch({
            type: ADDED_REPORTS
        })
        dispatch({
            type: MESSAGE_REPORT,
            payload: 'sucess'
        })
        dispatch({
            type: ADD_TOTAL_REPORTS
        })
        const array = [data.data.newInjectionReport]
        const convert = array.map( item => { 
            const date = formatDate(item.reportDate);
            const id = item._id
            const shift = item.shift
            const machine = item.machine._id
            const machineNumber = item.machine.machineNumber
            const production = item.production.map( prod =>{
              return { 
                report: id, 
                date: date,
                shift: shift, 
                machine: machine,
                machineNumber: machineNumber, 
                part: prod.partNumber._id,
                partName: prod.partNumber.partName, 
                molde: prod.molde._id,
                moldeNumber: prod.molde.moldeNumber,
                real: prod.real, 
                ng: prod.ng, 
                ok: prod.ok,
                plan: prod.plan,   
                wtime: prod.wtime,
                dtime: prod.dtime, 
                availability: prod.availability,
                performance: prod.performance, 
                quality: prod.quality,  
                oee: prod.oee
              }
            })
            return production
        })
        dispatch({
            type: ADD_PRODUCTION_BY_DATE,
            payload: convert[0]
        })

        const convertDowntime = array.map( item => { 
            const date = formatDate(item.reportDate);
            const id = item._id
            const machine = item.machine._id
            const shift = item.shift
            const downtime = item.downtimeDetail.map( downtime =>{
              return { 
                report: id, 
                date: date,
                shift: shift, 
                machine: machine, 
                issue: downtime.issueId._id, 
                issueName: downtime.issueId.issueName,
                issueCode: downtime.issueId.issueCode,  
                mins: downtime.mins 
              }
            })
            return downtime
        })
        dispatch({
            type: ADD_DOWNTIME_BY_DATE,
            payload: convertDowntime[0]
        })

        const convertDefects = array.map( item => { 
            const date = formatDate(item.reportDate);
            const id = item._id
            const machine = item.machine._id
            const shift = item.shift
            const defects = item.defects.map( defect =>{
              return { 
                report: id, 
                date: date,
                shift: shift, 
                machine: machine, 
                defect: defect.defect._id,
                defectCode: defect.defect.defectCode,
                defectName: defect.defect.defectName,
                partNumber: defect.partNumber._id,
                partName: defect.partNumber.partName,
                molde: defect.molde._id,
                moldeNumber: defect.molde.moldeNumber,
                defectPcs: defect.defectPcs 
              }
            })
            return defects
        })
        dispatch({
            type: ADD_DEFECTS_BY_DATE,
            payload: convertDefects[0]
        })
        const convertResine = array.map( item => { 
            const date = formatDate(item.reportDate);
            const id = item._id
            const machine = item.machine._id
            const shift = item.shift
            const resines = item.resines.map( resine =>{
              return { 
                report: id, 
                date: date,
                shift: shift, 
                machine: machine, 
                resine: resine.resine._id, 
                resineName: resine.resine.description, 
                purge: resine.purge,
                color: resine.resine.color,
                acronym: resine.resine.acronym
              }
            })
            return resines
        })
        dispatch({
            type: ADD_RESINES_BY_DATE,
            payload: convertResine[0]
        })

        const convertMolde = array.map( item => { 
            const date = formatDate(item.reportDate);
            const id = item._id
            const shift = item.shift
            const machine = item.machine._id
            const production = item.production.map( prod =>{
             
                return { 
                    report: id, 
                    date: date, 
                    shift: shift, 
                    machine: machine, 
                    part: prod.partNumber._id,
                    molde: prod.molde._id,
                    real: prod.real,
                    cycles: prod.cycles
                }
            })
            return production
        })
        dispatch({
            type: ADD_CYCLES_MOLDES,
            payload: convertMolde[0]
        })
        
    }
}

const updateReport = (_id, input) => async ( dispatch ) => {
    modifyReport.variables = { _id, input }
    opts.body = JSON.stringify(modifyReport)
    const res = await fetch(url, opts);
    const data = await res.json();
    if(data.errors){
        return dispatch({type: MESSAGE_REPORT,
            payload: 'error'
        })
    } else{
        dispatch({
            type: UPDATE_REPORT,
            payload: data.data.updateInjectionReport,
            _id
        })
        dispatch({
            type: MESSAGE_REPORT,
            payload: 'sucess'
        })
        const report = data.data.updateInjectionReport
        const { _id } = report
        const array = [report]
        const convert = array.map( item => { 
            const date = formatDate(item.reportDate);
            const id = item._id
            const shift = item.shift
            const machine = item.machine._id
            const machineNumber = item.machine.machineNumber
            const production = item.production.map( prod =>{
              return { 
                report: id, 
                date: date,
                shift: shift, 
                machine: machine,
                machineNumber: machineNumber, 
                part: prod.partNumber._id, 
                partName: prod.partNumber.partName, 
                molde: prod.molde._id,
                moldeNumber: prod.molde.moldeNumber,
                real: prod.real, 
                ng: prod.ng, 
                ok: prod.ok,
                plan: prod.plan,   
                wtime: prod.wtime,
                dtime: prod.dtime, 
                availability: prod.availability,
                performance: prod.performance, 
                quality: prod.quality,  
                oee: prod.oee
              }
            })
            return production
        })
        dispatch({
            type: UPDATE_PRODUCTION_BY_DATE,
            payload: convert[0],
            _id
        })
        const convertDowntime = array.map( item => { 
            const date = formatDate(item.reportDate);
            const id = item._id
            const shift = item.shift
            const machine = item.machine._id
            const downtime = item.downtimeDetail.map( downtime =>{
              return { 
                report: id, 
                date: date, 
                shift, 
                machine: machine, 
                issue: downtime.issueId._id, 
                issueName: downtime.issueId.issueName,
                issueCode: downtime.issueId.issueCode, 
                mins: downtime.mins }
            })
            return downtime
        })
        dispatch({
            type: UPDATE_DOWNTIME_BY_DATE,
            payload: convertDowntime[0],
            _id
        })
        const convertDefects = array.map( item => { 
            const date = formatDate(item.reportDate);
            const id = item._id
            const machine = item.machine._id
            const shift = item.shift
            const defects = item.defects.map( defect =>{
              return { 
                report: id, 
                date: date,
                shift: shift, 
                machine: machine, 
                defect: defect.defect._id,
                defectCode: defect.defect.defectCode,
                defectName: defect.defect.defectName,
                partNumber: defect.partNumber._id,
                partName: defect.partNumber.partName,
                molde: defect.molde._id,
                moldeNumber: defect.molde.moldeNumber,
                defectPcs: defect.defectPcs 
              }
            })
            return defects
        })
        dispatch({
            type: UPDATE_DEFECTS_BY_DATE,
            payload: convertDefects[0],
            _id
        })
        const convertResine = array.map( item => { 
            const date = formatDate(item.reportDate);
            const id = item._id
            const machine = item.machine._id
            const shift = item.shift
            const resines = item.resines.map( resine =>{
              return { 
                report: id, 
                date: date,
                shift: shift, 
                machine: machine, 
                resine: resine.resine._id, 
                resineName: resine.resine.description, 
                purge: resine.purge,
                color: resine.resine.color,
                acronym: resine.resine.acronym
              }
            })
            return resines
        })
        dispatch({
            type: UPDATE_RESINES_BY_DATE,
            payload: convertResine[0],
            _id
        })
        const convertMolde = array.map( item => { 
            const date = formatDate(item.reportDate);
            const id = item._id
            const shift = item.shift
            const machine = item.machine._id
            const production = item.production.map( prod =>{
             
              return { 
                report: id, 
                date: date, 
                shift: shift, 
                machine: machine, 
                part: prod.partNumber._id,
                molde: prod.molde._id,
                real: prod.real,
                cycles: prod.cycles
                 }
            })
              return production
        })
        dispatch({
            type: UPDATE_CYCLES_MOLDES,
            payload: convertMolde[0],
            _id
        })
    }
}




const selectReport = report =>{
    return{
        type: SELECT_REPORT,
        payload: report
    }
}

const closeReport = () =>{
    return{
        type: MESSAGE_REPORT,
        payload: 'new'
    }
}

export {
    fetchReports,
    fetchInitialReports,
    addReport,
    updateReport,
    selectReport,
    closeReport
}