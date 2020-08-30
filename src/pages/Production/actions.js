import { url, opts } from '../../actions/config'
import { getDateofTable, getDateofTable49, formatDate } from '../../actions/helpers'
import { productionQuery, resinesQuery, downtimeQuery, defectProductionQuery } from './queries'

export const  FETCH_PRODUCTION_BY_DATE = 'FETCH_PRODUCTION_BY_DATE'
export const  ADD_PRODUCTION_BY_DATE = 'ADD_PRODUCTION_BY_DATE'
export const  UPDATE_PRODUCTION_BY_DATE = 'UPDATE_PRODUCTION_BY_DATE'

export const  FETCH_DOWNTIME_BY_DATE = 'FETCH_DOWNTIME_BY_DATE'
export const  ADD_DOWNTIME_BY_DATE = 'ADD_DOWNTIME_BY_DATE'
export const  UPDATE_DOWNTIME_BY_DATE = 'UPDATE_DOWNTIME_BY_DATE'

export const  FETCH_RESINES_BY_DATE = 'FETCH_RESINES_BY_DATE'
export const  ADD_RESINES_BY_DATE = 'ADD_RESINES_BY_DATE'
export const  UPDATE_RESINES_BY_DATE = 'UPDATE_RESINES_BY_DATE'

export const  FETCH_DEFECTS_BY_DATE = 'FETCH_DEFECTS_BY_DATE'
export const  ADD_DEFECTS_BY_DATE = 'ADD_DEFECTS_BY_DATE'
export const  UPDATE_DEFECTS_BY_DATE = 'UPDATE_DEFECTS_BY_DATE'


const date = new Date();
const today = formatDate(date)+'T23:59:00.000-06:00'
const end = getDateofTable(7, today);
const initial49 = getDateofTable49(1, today);

const fetchProduction = () => async ( dispatch ) => {
    productionQuery.variables = {
        initial: initial49,
        end: end
    }
    opts.body = JSON.stringify(productionQuery)
    const res = await fetch(url, opts);
    const data = await res.json();

    dispatch({
        type: FETCH_ISSUES,
        payload: data.data.issues
    })
}

const fetchDowntime = () => async ( dispatch ) => {
    downtimeQuery.variables = {
        initial: initial49,
        end: end
    }
    opts.body = JSON.stringify(downtimeQuery)
    const res = await fetch(url, opts);
    const data = await res.json();

    dispatch({
        type: FETCH_ISSUES,
        payload: data.data.issues
    })
}

const fetchResines = () => async ( dispatch ) => {
    resinesQuery.variables = {
        initial: initial49,
        end: end
    }
    opts.body = JSON.stringify(resinesQuery)
    const res = await fetch(url, opts);
    const data = await res.json();

    dispatch({
        type: FETCH_ISSUES,
        payload: data.data.issues
    })
}

const fetchDefectProduction = () => async ( dispatch ) => {
    defectProductionQuery.variables = {
        initial: initial49,
        end: end
    }
    opts.body = JSON.stringify(defectProductionQuery)
    const res = await fetch(url, opts);
    const data = await res.json();

    dispatch({
        type: FETCH_ISSUES,
        payload: data.data.issues
    })
}


export {
    fetchProduction,
    fetchDowntime,
    fetchResines,
    fetchDefectProduction
}