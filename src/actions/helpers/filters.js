function precise_round(num, dec){
  const num_sign = num >= 0 ? 1 : -1;
  const value =  (Math.round((num*Math.pow(10,dec))+(num_sign*0.0001))/Math.pow(10,dec)).toFixed(dec);
  const valid = isNaN(value) ? 0 : parseFloat(value)
  return isFinite(valid) ? valid : 0
}

const dayColumn = (production, day, purges) =>{
  const filter = production.filter( item => item.date === day)
  const filterPurge = purges.filter( item => item.date === day)
  const real = filter.reduce( (a, b) =>{
    return a + b.real || 0
  },0)
  const ng = filter.reduce( (a, b) =>{
    return a + b.ng || 0
  },0)
  const ok = filter.reduce( (a, b) =>{
    return a + b.ok || 0
  },0)
  const plan = filter.reduce( (a, b) =>{
    return a + b.plan || 0
  },0)
  const wtime = filter.reduce( (a, b) =>{
    return a + parseFloat(b.wtime.$numberDecimal) || 0
  },0)
  const dtime = filter.reduce( (a, b) =>{
    return a + parseFloat(b.dtime.$numberDecimal) || 0
  },0)
  const purge = filterPurge.reduce( (a, b) =>{
    return a + b.purge || 0
  },0)

  const time = parseInt(wtime + dtime) 
  const availability = precise_round(( wtime / time )*100, 2)
  const performance = precise_round(( real / plan )*100, 2)
  const quality = precise_round(( ok / real )*100, 2)
  const oee = precise_round( ((availability*performance*quality)/10000), 2 )
    
  return { real, ng, ok, plan, wtime: precise_round(wtime,2), dtime: precise_round(dtime,2), oee, purge }
}

const weekColumn = (production, purges) =>{
  const real = production.reduce( (a, b) =>{
    return a + b.real || 0
  },0)
  const ng = production.reduce( (a, b) =>{
    return a + b.ng || 0
  },0)
  const ok = production.reduce( (a, b) =>{
    return a + b.ok || 0
  },0)
  const plan = production.reduce( (a, b) =>{
    return a + b.plan || 0
  },0)
  const wtime = production.reduce( (a, b) =>{
    return a + parseFloat(b.wtime.$numberDecimal) || 0
  },0)
  const dtime = production.reduce( (a, b) =>{
    return a + parseFloat(b.dtime.$numberDecimal) || 0
  },0)
  const purge = purges.reduce( (a, b) =>{
    return a + b.purge || 0
  },0)

  const time = parseInt(wtime + dtime) 
  const availability = precise_round(( wtime / time )*100, 2)
  const performance = precise_round(( real / plan )*100, 2)
  const quality = precise_round(( ok / real )*100, 2)
  const oee = precise_round( ((availability*performance*quality)/10000), 2 )
    
  return { real, ng, ok, plan, wtime: precise_round(wtime,2), dtime: precise_round(dtime,2), oee, purge }
}

const monthColumn = (production, year, month, purges) =>{
  const filter = production.filter( item => item.date >= `${year}-${month}-01` && item.date <= `${year}-${month}-31`)
  const filterPurge = purges.filter( item => item.date >= `${year}-${month}-01` && item.date <= `${year}-${month}-31`)
  const real = filter.reduce( (a, b) =>{
    return a + b.real || 0
  },0)
  const ng = filter.reduce( (a, b) =>{
    return a + b.ng || 0
  },0)
  const ok = filter.reduce( (a, b) =>{
    return a + b.ok || 0
  },0)
  const plan = filter.reduce( (a, b) =>{
    return a + b.plan || 0
  },0)
  const wtime = filter.reduce( (a, b) =>{
    return a + parseFloat(b.wtime.$numberDecimal) || 0
  },0)
  const dtime = filter.reduce( (a, b) =>{
    return a + parseFloat(b.dtime.$numberDecimal) || 0
  },0)
  const purge = filterPurge.reduce( (a, b) =>{
    return a + b.purge || 0
  },0)

  const time = parseInt(wtime + dtime) 
  const availability = precise_round(( wtime / time )*100, 2)
  const performance = precise_round(( real / plan )*100, 2)
  const quality = precise_round(( ok / real )*100, 2)
  const oee = precise_round( ((availability*performance*quality)/10000), 2 )
    
  return { real, ng, ok, plan, wtime: precise_round(wtime,2), dtime: precise_round(dtime,2), oee, purge }
}




function filter1(array, month){
    const filter = array.filter( item => item.date === month)
    const reduce = filter.reduce( (a, b) =>{
      return a + b.real || 0
    },0)

    return reduce
}

function filterDayTotalReal(array, day){
    const filter = array.filter( item => item.date === day)
    const reduce = filter.reduce( (a, b) =>{
      return a + b.real || 0
    },0)

    return reduce
}

function filterWeekTotalReal( array, monday, sunday ){
    const filter = array.filter( 
      item => item.date >= monday 
      && item.date <= sunday)
    const reduce = filter.reduce( (a, b) =>{
      return a + b.real || 0
    },0)

    return reduce
}

function filterDayTotalNG(array, day){
    const filter = array.filter( item => item.date === day)
    const reduce = filter.reduce( (a, b) =>{
      return a + b.ng || 0
    },0)

    return reduce
}

function filterWeekTotalNG( array, monday, sunday ){
    const filter = array.filter( 
      item => item.date >= monday 
      && item.date <= sunday)
    const reduce = filter.reduce( (a, b) =>{
      return a + b.ng || 0
    },0)

    return reduce
}

function filterDayTotalOK(array, day){
    const filter = array.filter( item => item.date === day)
    const reduce = filter.reduce( (a, b) =>{
      return a + b.ok || 0
    },0)

    return reduce
}

function filterWeekTotalOK(array, monday, sunday ){
    const filter = array.filter( 
      item => item.date >= monday 
      && item.date <= sunday)
    const reduce = filter.reduce( (a, b) =>{
      return a + b.ok || 0
    },0)

    return reduce
}

function filterDayTotalPlan(array, day){
    const filter = array.filter( item => item.date === day)
    const reduce = filter.reduce( (a, b) =>{
      return a + b.plan || 0
    },0)

    return reduce
}

function filterWeekTotalPlan(array, monday, sunday ){
    const filter = array.filter( 
      item => item.date >= monday 
      && item.date <= sunday)
    const reduce = filter.reduce( (a, b) =>{
      return a + b.plan || 0
    },0)

    return reduce
}

function filterDayTotalWTime(array, day){
    const filter = array.filter( item => item.date === day)
    const reduce = filter.reduce( (a, b) =>{
      return a + parseFloat(b.wtime.$numberDecimal) || 0
    },0)

    return precise_round(reduce,2)
}

function filterWeekTotalWTime( array, monday, sunday ){
    const filter = array.filter( 
      item => item.date >= monday 
      && item.date <= sunday)
    const reduce = filter.reduce( (a, b) =>{
      return a + parseFloat(b.wtime.$numberDecimal) || 0
    },0)

    return precise_round(reduce,2)
}

function filterDayTotalDTime(array, day){
    const filter = array.filter( item => item.date === day)
    const reduce = filter.reduce( (a, b) =>{
      return a + parseFloat(b.dtime.$numberDecimal) || 0
    },0)

    return precise_round(reduce,2)
}

function filterWeekTotalDTime(array, monday, sunday ){
    const filter = array.filter( 
      item => item.date >= monday 
      && item.date <= sunday)
    const reduce = filter.reduce( (a, b) =>{
      return a + parseFloat(b.dtime.$numberDecimal) || 0
    },0)

    return precise_round(reduce,2)
}

function filterDayTotalOEE(array, date){
    const real = filterDayTotalPlan(array, date)
    const ok = filterDayTotalOK(array, date)
    const plan = filterDayTotalPlan(array, date)
    const wtime = filterDayTotalWTime(array, date)

    const dtime = filterDayTotalDTime(array, date)
    const time = parseInt(wtime + dtime) 
    
    const availability = precise_round(( wtime / time )*100, 2)
    const performance = precise_round(( real / plan )*100, 2)
    const quality = precise_round(( ok / real )*100, 2)
    const oee = precise_round( ((availability*performance*quality)/10000), 2 )
     
    
    return oee
}

function filterWeekTotalOEE(array, monday, sunday){
    const real = filterWeekTotalReal(array, monday, sunday)
    const ok = filterWeekTotalOK(array, monday, sunday)
    const plan = filterWeekTotalPlan(array, monday, sunday)
    const wtime = filterWeekTotalWTime(array, monday, sunday)

    const dtime = filterWeekTotalDTime(array, monday, sunday)
    const time = parseInt(wtime + dtime) 
    
    const availability = precise_round(( wtime / time )*100, 2)
    const performance = precise_round(( real / plan )*100, 2)
    const quality = precise_round(( ok / real )*100, 2)
    const oee = precise_round( ((availability*performance*quality)/10000), 2 )
     
    
    return oee
}

function filterDayTotalPurge(array, day){
    const filter = array.filter( item => item.date === day)
    const reduce = filter.reduce( (a, b) =>{
      return a + b.purge || 0
    },0)

    return reduce
}

function filterWeekTotalPurge(array, monday, sunday){
    const filter = array.filter( 
      item => item.date >= monday 
      && item.date <= sunday)
    const reduce = filter.reduce( (a, b) =>{
      return a + b.purge || 0
    },0)

    return reduce
}

function filterHighest(array, day){
    const filter = array.filter( item => item.date === day ) 
      // const issues = [...new Set(filter)];
    const issues = [...filter]
    const mapping = issues.map( issue =>
        {
          const reduceMins = filter.filter( item => item.issue === issue.issue)
          .reduce( (a, b) =>{
            return a + b.mins || 0
          },0)
          return {issue: issue.issueCode, mins: reduceMins }
        })

        const reduceMapping = mapping.reduce( (a, b) =>{
          return a + b.mins || 0
        },0)

        if(reduceMapping === 0){
          return '0'
        } else {
          const issue = mapping.sort((x, y)  => y.mins - x.mins)[0].issue
          const mins =  mapping.sort((x, y)  => y.mins - x.mins)[0].mins
          return `${issue} ${mins}`
        }
}

function filterHighestIndicator(array, monday, sunday){
    const filter = array.filter( 
      item => item.date >= monday 
      && item.date <= sunday)
      

      const issues = [...filter]
      const mapping = issues.map( issue =>
        {
          const reduceMins = filter.filter( item => item.issue === issue.issue)
          .reduce( (a, b) =>{
            return a + b.mins || 0
          },0)
          return {issue: issue.issueCode, mins: reduceMins }
        })

        const reduceMapping = mapping.reduce( (a, b) =>{
          return a + b.mins || 0
        },0)

        if(reduceMapping === 0){
          return '0 mins'
        } else {
          const issue = mapping.sort((x, y)  => y.mins - x.mins)[0].issue
          const mins =  mapping.sort((x, y)  => y.mins - x.mins)[0].mins
          return `${issue} ${mins}`
        }
  }

function filterHighestPurgeByDay(array, day, machines){
    
    const filter = array.filter( 
      item => item.date === day)
      

      const resines = [...filter]
      const mapping = resines.map( resine =>
        {
          const reducePurge = filter.filter( item => item.resine === resine.resine)
          .reduce( (a, b) =>{
            return a + b.purge || 0
          },0)
          return {resine: resine.resine, purge: reducePurge }
        })

        const reduceMapping = mapping.reduce( (a, b) =>{
          return a + b.purge || 0
        },0)

        if(reduceMapping === 0){
          return '0'
        } else {
          const resine = mapping.sort((x, y)  => y.purge - x.purge)[0].resine
          
          const hightesResine = filter.filter( element => element.resine === resine ).map( item => {
            const reduceResine = filter.filter( it => it.machine === item.machine)
            .reduce( (a, b) =>{
              return a + b.purge || 0
            },0)
            return {machine: item.machine, purge: reduceResine}
          })

          const machine = hightesResine.sort((x, y)  => y.purge - x.purge)[0].machine
          const purge =  hightesResine.sort((x, y)  => y.purge - x.purge)[0].purge
          const machineNumber = machines.find( element => element._id === machine).machineNumber
          return `#${machineNumber} ${purge}`
    }
}

function filterHighestPurge(array, monday, sunday, machines){
    const filter = array.filter( 
      item => item.date >= monday 
      && item.date <= sunday)
      

      const resines = [...filter]
      const mapping = resines.map( resine =>
        {
          const reducePurge = filter.filter( item => item.resine === resine.resine)
          .reduce( (a, b) =>{
            return a + b.purge || 0
          },0)
          return {resine: resine.resine, purge: reducePurge }
        })

        const reduceMapping = mapping.reduce( (a, b) =>{
          return a + b.purge || 0
        },0)

        if(reduceMapping === 0){
          return '0 purge'
        } else {
          const resine = mapping.sort((x, y)  => y.purge - x.purge)[0].resine
          
          const hightesResine = filter.filter( element => element.resine === resine ).map( item => {
            const reduceResine = filter.filter( it => it.machine === item.machine)
            .reduce( (a, b) =>{
              return a + b.purge || 0
            },0)
            return {machine: item.machine, purge: reduceResine}
          })

          const machine = hightesResine.sort((x, y)  => y.purge - x.purge)[0].machine
          const purge =  hightesResine.sort((x, y)  => y.purge - x.purge)[0].purge
          const machineNumber = machines.find( element => element._id === machine).machineNumber
          return `#${machineNumber} ${purge}`
        }
}

function filterHighestDefectByDay(array, day, machines){
    const filter = array.filter( 
      item => item.date === day)
      

      const defects = [...filter]
      const mapping = defects.map( defect =>
        {
          const reduceDefect = filter.filter( item => item.defect === defect.defect && item.partNumber === defect.partNumber)
          .reduce( (a, b) =>{
            return a + b.defectPcs || 0
          },0)
          return {defect: defect.defect, pcs: reduceDefect, partNumber: defect.partNumber }
        })

        const reduceMapping = mapping.reduce( (a, b) =>{
          return a + b.pcs || 0
        },0)

        if(reduceMapping === 0){
          return '0'
        } else {
          const defect = mapping.sort((x, y)  => y.pcs - x.pcs)[0].defect
          const partNumber = mapping.sort((x, y)  => y.pcs - x.pcs)[0].partNumber
          
          const hightesDefect= filter.filter( element => element.defect === defect ).map( item => {
            const reduceDefect = filter.filter( it => it.machine === item.machine && it.partNumber === partNumber && it.defect === defect)
            .reduce( (a, b) =>{
              return a + b.defectPcs || 0
            },0)
            return {machine: item.machine, pcs: reduceDefect, code: item.defectCode}
          })

          const machine = hightesDefect.sort((x, y)  => y.pcs - x.pcs)[0].machine
          const code = hightesDefect.sort((x, y)  => y.pcs - x.pcs)[0].code
          const pcs =  hightesDefect.sort((x, y)  => y.pcs- x.pcs)[0].pcs
          const machineNumber = machines.find( element => element._id === machine).machineNumber
          return `${code} #${machineNumber} ${pcs}`
        }
  }


function filterHighestDefect(array, monday, sunday, machines){
    const filter = array.filter( 
      item => item.date >= monday 
      && item.date <= sunday)
      

      const defects = [...filter]
      const mapping = defects.map( defect =>
        {
          const reduceDefect = filter.filter( item => item.defect === defect.defect && item.partNumber === defect.partNumber)
          .reduce( (a, b) =>{
            return a + b.defectPcs || 0
          },0)
          return {defect: defect.defect, pcs: reduceDefect, partNumber: defect.partNumber }
        })

        const reduceMapping = mapping.reduce( (a, b) =>{
          return a + b.pcs || 0
        },0)

        if(reduceMapping === 0){
          return '0 defect'
        } else {
          const defect = mapping.sort((x, y)  => y.pcs - x.pcs)[0].defect
          const partNumber = mapping.sort((x, y)  => y.pcs - x.pcs)[0].partNumber
          
          const hightesDefect= filter.filter( element => element.defect === defect ).map( item => {
            const reduceDefect = filter.filter( it => it.machine === item.machine && it.partNumber === partNumber && it.defect === defect)
            .reduce( (a, b) =>{
              return a + b.defectPcs || 0
            },0)
            return {machine: item.machine, pcs: reduceDefect, code: item.defectCode}
          })

          const machine = hightesDefect.sort((x, y)  => y.pcs - x.pcs)[0].machine
          const code = hightesDefect.sort((x, y)  => y.pcs - x.pcs)[0].code
          const pcs =  hightesDefect.sort((x, y)  => y.pcs- x.pcs)[0].pcs
          const machineNumber = machines.find( element => element._id === machine).machineNumber
          return `${code} #${machineNumber} ${pcs}`
        }
  }

export { filter1, filterDayTotalReal, filterWeekTotalReal, filterDayTotalNG, filterWeekTotalNG, 
    filterDayTotalOK,
    filterWeekTotalOK,
    filterDayTotalPlan,
    filterWeekTotalPlan,
    filterDayTotalWTime,
    filterWeekTotalWTime,
    filterDayTotalDTime,
    filterWeekTotalDTime,
    filterDayTotalOEE,
    filterWeekTotalOEE,
    filterDayTotalPurge,
    filterWeekTotalPurge,
    filterHighest,
    filterHighestIndicator,
    filterHighestPurgeByDay,
    filterHighestPurge,
    filterHighestDefectByDay,
    filterHighestDefect,
    dayColumn,
    weekColumn,
    monthColumn
} 