function precise_round(num, dec){
  const num_sign = num >= 0 ? 1 : -1;
  const value =  (Math.round((num*Math.pow(10,dec))+(num_sign*0.0001))/Math.pow(10,dec)).toFixed(dec);
  const valid = isNaN(value) ? 0 : parseFloat(value)
  return isFinite(valid) ? valid : 0
}

const defectWeekIndicator = (days, weekDefects, machines )=>{
  
  const defectsDays = days.map(day =>{
    const filter = weekDefects.filter( item => item.date === day)


    // const uniqueDefectList = Array.from(new Set(filter.map( ({ defect })  =>{ 
    //   const list = filter.find( item => item.defect === defect )
    //   return list }
    // )))

    const defects = [...filter]
    
    const mapping = defects.map( defect => {

      const reduceDefect = filter.filter( item => item.defect === defect.defect && item.machine === defect.machine)
      .reduce( (a, b) =>{
        return a + b.defectPcs || 0
      },0)
      const machineNumber = machines.find( machine => machine._id === defect.machine).machineNumber

      return {defect: defect.defect, defectCode: defect.defectCode, machine: defect.machine, machineNumber, day: defect.date }
    }).sort((x, y)  => y.pcs - x.pcs)

    // const reduceMapping = mapping.reduce( (a, b) =>{
    //   return a + b.pcs || 0
    // },0)

    // if(reduceMapping === 0){
    //   return 'NA'
    // } else {
    //   const defect = mapping[0].defectCode

    // }
    //   const partNumber = mapping.sort((x, y)  => y.pcs - x.pcs)[0].partNumber
      
    //   const hightesDefect= filter.filter( element => element.defect === defect ).map( item => {
    //     const reduceDefect = filter.filter( it => it.machine === item.machine && it.partNumber === partNumber && it.defect === defect)
    //     .reduce( (a, b) =>{
    //       return a + b.defectPcs || 0
    //     },0)
    //     return {machine: item.machine, pcs: reduceDefect, code: item.defectCode}
    //   })

    //   const machine = hightesDefect.sort((x, y)  => y.pcs - x.pcs)[0].machine
    //   const code = hightesDefect.sort((x, y)  => y.pcs - x.pcs)[0].code
    //   const pcs =  hightesDefect.sort((x, y)  => y.pcs- x.pcs)[0].pcs
    //   const machineNumber = machines.find( element => element._id === machine).machineNumber
    //   return `${code} #${machineNumber} ${pcs}`
    // }

    return mapping
  })
 
  return defectsDays     
}

const moldeDetail = (weekReports, days, weekDefects )=>{
  const uniqueMoldeList = Array.from(new Set(weekReports.map( ({ molde })  =>{ 
    const list = weekReports.find( item => item.molde === molde )
    return list }
  )))
    
  const moldes = uniqueMoldeList.map( molde =>{
    const moldeReports = weekReports.filter( item => item.molde === molde.molde )
    const defectArray = weekDefects.filter( item => item.molde === molde.molde)

    const arrayColumns = days.map( day =>{
      const column = dayColumnModel( moldeReports, day )
      const { real, ng, ok, plan, wtime, dtime, oee } = column
      return { real, ng, ok, plan, wtime, dtime, oee }
    })

    const column = weekColumnModel( moldeReports )
    const { real, ng, ok, plan, wtime, dtime, oee } = column
    const column8 = {
      real,
      ng,
      ok,
      plan,
      wtime,
      dtime,
      oee
    }
    const array = [...arrayColumns, column8]

    const uniqueDefectList = Array.from(new Set(defectArray.map( ({ defect })  =>{ 
      const list = defectArray.find( item => item.defect === defect )
      return list }
    )))

    const defects = uniqueDefectList.map( def =>{
      const defectsDays = days.map(day =>{
        const list = defectArray.filter(item => item.date === day && item.defect === def.defect)
        .reduce( (a, b) =>{
          return a + b.defectPcs || 0
        },0)
        return list
      })

      const total = defectArray.filter(item => item.defect === def.defect)
      .reduce( (a, b) =>{
        return a + b.defectPcs || 0
      },0)
      const defecto = [...defectsDays, total]
      return {defectCode: def.defectCode, molde: def.molde, defecto: defecto}
    })

    const sortDefects = defects.sort((x, y)  => y.defecto.reduce((a, b)=>{return a + b}) - x.defecto.reduce((a, b)=>{return a + b})) 

    return { molde: molde.molde, moldeNumber: molde.moldeNumber, reports: array, defects: sortDefects }
  })

  return moldes    
}

const modelDetail = (weekReports, days, weekDefects )=>{
  const uniqueModelList = Array.from(new Set(weekReports.map( ({ part })  =>{ 
    const list = weekReports.find( item => item.part === part )
    return list }
  )))
    
  const models = uniqueModelList.map( part =>{
    const modelReports = weekReports.filter( item => item.part === part.part )
    const defectArray = weekDefects.filter( item => item.partNumber === part.part)

    const arrayColumns = days.map( day =>{
      const column = dayColumnModel( modelReports, day)
      const { real, ng, ok, plan, wtime, dtime, oee } = column
      return { real, ng, ok, plan, wtime, dtime, oee }
    })

    const column = weekColumnModel( modelReports )
    const { real, ng, ok, plan, wtime, dtime, oee } = column
    const column8 = {
      real,
      ng,
      ok,
      plan,
      wtime,
      dtime,
      oee
    }
    const array = [...arrayColumns, column8]

    const uniqueDefectList = Array.from(new Set(defectArray.map( ({ defect })  =>{ 
      const list = defectArray.find( item => item.defect === defect )
      return list }
    )))

    const defects = uniqueDefectList.map( def =>{
      const defectsDays = days.map(day =>{
        const list = defectArray.filter(item => item.date === day && item.defect === def.defect)
        .reduce( (a, b) =>{
          return a + b.defectPcs || 0
        },0)
        return list
      })

      const total = defectArray.filter(item => item.defect === def.defect)
      .reduce( (a, b) =>{
        return a + b.defectPcs || 0
      },0)
      const defecto = [...defectsDays, total]
      return {defectCode: def.defectCode, part: def.partNumber, defecto: defecto}
    })

    const sortDefects = defects.sort((x, y)  => y.defecto.reduce((a, b)=>{return a + b}) - x.defecto.reduce((a, b)=>{return a + b})) 
    return { model: part.part, partName: part.partName, reports: array, defects: sortDefects }
  })

  return models    
}

const machineDetail = (weekReports, days, weekPurges, weekDefects, weekDowntime )=>{
  const uniqueMachineList = Array.from(new Set(weekReports.map( ({machine })  =>{ 
    const list = weekReports.find( item => item.machine === machine )
    return list }
  )))
    
  const machines = uniqueMachineList.map( machine =>{
    const machineReports = weekReports.filter( item => item.machine === machine.machine )
    const purges = weekPurges.filter( item => item.machine === machine.machine )
    const defectArray = weekDefects.filter( item => item.machine === machine.machine )
    const downtimeArray = weekDowntime.filter( item => item.machine === machine.machine )

    const arrayColumns = days.map( day =>{
      const column = dayColumn( machineReports, day, purges )
      const { real, ng, ok, plan, wtime, dtime, oee, purge } = column
      return { real, ng, ok, plan, wtime, dtime, oee, purge}
    })

    const column = weekColumn( machineReports, purges )
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

    const uniqueDefectList = Array.from(new Set(defectArray.map( ({ defect })  =>{ 
      const list = defectArray.find( item => item.defect === defect )
      return list }
    )))

    const defects = uniqueDefectList.map( def =>{
      const defectsDays = days.map(day =>{
        const list = defectArray.filter(item => item.date === day && item.defect === def.defect)
        .reduce( (a, b) =>{
          return a + b.defectPcs || 0
        },0)
        return list
      })

      const total = defectArray.filter(item => item.defect === def.defect)
      .reduce( (a, b) =>{
        return a + b.defectPcs || 0
      },0)
      const defecto = [...defectsDays, total]
      return {defectCode: def.defectCode, machine: def.machine, defecto: defecto}
    })

    const uniqueDowntimeList = Array.from(new Set(downtimeArray.map( ({ issue })  =>{ 
      const list = downtimeArray.find( item => item.issue === issue )
      return list }
    )))

    const downtime = uniqueDowntimeList.map( iss =>{
      const downtimeDays = days.map(day =>{
        const list = downtimeArray.filter(item => item.date === day && item.issue === iss.issue)
        .reduce( (a, b) =>{
          return a + b.mins || 0
        },0)
        return list
      })

      const total = downtimeArray.filter(item => item.issue === iss.issue)
      .reduce( (a, b) =>{
        return a + b.mins || 0
      },0)
      const issues = [...downtimeDays, total]
      return {issueCode: iss.issueCode, machine: iss.machine, issues}
    })

    const uniquePurgeList = Array.from(new Set(purges.map( ({ resine })  =>{ 
      const list = purges.find( item => item.resine === resine )
      return list }
    )))

    const resines = uniquePurgeList.map( resine =>{
      const purgeDays = days.map(day =>{
        const list = purges.filter(item => item.date === day && item.resine === resine.resine)
        .reduce( (a, b) =>{
          return a + b.purge || 0
        },0)
        return list
      })

      const total = purges.filter(item => item.purge === resine.resine )
      .reduce( (a, b) =>{
        return a + b.purge || 0
      },0)
      const resines = [...purgeDays, total]
      const name = `${resine.acronym} ${resine.color}`
      return {resine: name, machine: resine.machine, resines}
    })

    const sortDefects = defects.sort((x, y)  => y.defecto.reduce((a, b)=>{return a + b}) - x.defecto.reduce((a, b)=>{return a + b})) 
    const sortDowntime = downtime.sort((x, y)  => y.issues.reduce((a, b)=>{return a + b}) - x.issues.reduce((a, b)=>{return a + b}))
    const sortPurge = resines.sort((x, y)  => y.resines.reduce((a, b)=>{return a + b}) - x.resines.reduce((a, b)=>{return a + b}))
    
    return { machine: machine.machine, machineNumber: machine.machineNumber, reports: array, defects: sortDefects, downtime: sortDowntime, purge: sortPurge }
  })

  return machines    
}

const purgeWeekDetail = ( days, weekPurges, machinesArray )=>{
  
  const uniquePurgeList = Array.from(new Set(weekPurges.map( ({ resine })  =>{ 
    const list = weekPurges.find( item => item.resine === resine )
    return list }
  )))

  const purge = uniquePurgeList.map( resine =>{
    const purgeWeek = days.map( day =>{
      const list = weekPurges.filter(item => item.date === day && item.resine === resine.resine )
      .reduce( (a, b) =>{
        return a + b.purge || 0
      },0)
      return list
    })

    const total = weekPurges.filter(item => item.resine === resine.resine )
    .reduce( (a, b) =>{
      return a + b.purge || 0
    },0)

    const resines = [...purgeWeek, total]

    const purgeList = weekPurges.filter( item => item.resine === resine.resine )
    const uniqueMachineList = Array.from(new Set(purgeList.map( ({ machine })  =>{ 
      const list = purgeList.find( item => item.machine === machine )
      return list }
    )))
    const detail = uniqueMachineList.map( mach =>{
      const machinesDays = days.map(day =>{
        const list = purgeList.filter(item => item.date === day && item.machine === mach.machine)
        .reduce( (a, b) =>{
          return a + b.purge || 0
        },0)
        return list
      })
  
      const total = purgeList.filter(item => item.machine === mach.machine)
      .reduce( (a, b) =>{
        return a + b.purge || 0
      },0)
  
      const machines = [...machinesDays, total]
      const itemNumber = machinesArray.find( machine => machine._id === mach.machine).machineNumber
      return { code: resine.resine, detail: machines, itemNumber }
    }) 
    
    const sortDetail = detail.sort((x, y)  => y.detail.reduce((a, b)=>{return a + b}) - x.detail.reduce((a, b)=>{return a + b}))

    const name = `${resine.acronym} ${resine.color}`
    return { resine: name, machine: resine.machine, resines, detail: sortDetail }
  })
 
  return purge.sort((x, y)  => y.resines.reduce((a, b)=>{return a + b}) - x.resines.reduce((a, b)=>{return a + b}))   
}

const defectWeekDetail = (days, weekDefects )=>{
  
  const uniqueDefectList = Array.from(new Set(weekDefects.map( ({ defect })  =>{ 
    const list = weekDefects.find( item => item.defect === defect )
    return list }
  )))

  const defects = uniqueDefectList.map( def =>{
    const defectsDays = days.map(day =>{
      const list = weekDefects.filter(item => item.date === day && item.defect === def.defect)
      .reduce( (a, b) =>{
        return a + b.defectPcs || 0
      },0)
      return list
    })

    const total = weekDefects.filter(item => item.defect === def.defect)
    .reduce( (a, b) =>{
      return a + b.defectPcs || 0
    },0)

    const defect = [...defectsDays, total]
    return { defectCode: def.defectCode, defect: defect }
  })
 
  return defects.sort((x, y)  => y.defect.reduce((a, b)=>{return a + b}) - x.defect.reduce((a, b)=>{return a + b}))    
}

const defectWeekDetailMachine = (days, weekDefects, machinesArray )=>{
  
  const uniqueDefectList = Array.from(new Set(weekDefects.map( ({ defect })  =>{ 
    const list = weekDefects.find( item => item.defect === defect )
    return list }
  )))

  const defects = uniqueDefectList.map( def =>{
    const defectsDays = days.map(day =>{
      const list = weekDefects.filter(item => item.date === day && item.defect === def.defect)
      .reduce( (a, b) =>{
        return a + b.defectPcs || 0
      },0)
      return list
    })

    const total = weekDefects.filter(item => item.defect === def.defect)
    .reduce( (a, b) =>{
      return a + b.defectPcs || 0
    },0)

    const defect = [...defectsDays, total]

    const defectList = weekDefects.filter( item => item.defect === def.defect )
    const uniqueMachineList = Array.from(new Set(defectList.map( ({ machine })  =>{ 
      const list = defectList.find( item => item.machine === machine )
      return list }
    )))
    const detail = uniqueMachineList.map( mach =>{
      const machinesDays = days.map(day =>{
        const list = defectList.filter(item => item.date === day && item.machine === mach.machine)
        .reduce( (a, b) =>{
          return a + b.defectPcs || 0
        },0)
        return list
      })
  
      const total = defectList.filter(item => item.machine === mach.machine)
      .reduce( (a, b) =>{
        return a + b.defectPcs || 0
      },0)
  
      const defect = [...machinesDays, total]
      const itemNumber = machinesArray.find( machine => machine._id === mach.machine).machineNumber
      return { defectCode: def.defectCode, defect: defect, itemNumber }
    }) 
    
    const sortDetail = detail.sort((x, y)  => y.defect.reduce((a, b)=>{return a + b}) - x.defect.reduce((a, b)=>{return a + b})) 
    return { defectCode: def.defectCode, defect: defect, detail: sortDetail }
  })
  
  return defects.sort((x, y)  => y.defect.reduce((a, b)=>{return a + b}) - x.defect.reduce((a, b)=>{return a + b}))    
}

const defectWeekDetailModel = (days, weekDefects )=>{
  
  const uniqueDefectList = Array.from(new Set(weekDefects.map( ({ defect })  =>{ 
    const list = weekDefects.find( item => item.defect === defect )
    return list }
  )))

  const defects = uniqueDefectList.map( def =>{
    const defectsDays = days.map(day =>{
      const list = weekDefects.filter(item => item.date === day && item.defect === def.defect)
      .reduce( (a, b) =>{
        return a + b.defectPcs || 0
      },0)
      return list
    })

    const total = weekDefects.filter(item => item.defect === def.defect)
    .reduce( (a, b) =>{
      return a + b.defectPcs || 0
    },0)

    const defect = [...defectsDays, total]

    const defectList = weekDefects.filter( item => item.defect === def.defect )
    const uniqueModelList = Array.from(new Set(defectList.map( ({ partNumber })  =>{ 
      const list = defectList.find( item => item.partNumber === partNumber )
      return list }
    )))
    const detail = uniqueModelList.map( model =>{
      const modelsDays = days.map(day =>{
        const list = defectList.filter(item => item.date === day && item.partNumber === model.partNumber )
        .reduce( (a, b) =>{
          return a + b.defectPcs || 0
        },0)
        return list
      })
  
      const total = defectList.filter(item => item.partNumber === model.partNumber )
      .reduce( (a, b) =>{
        return a + b.defectPcs || 0
      },0)
  
      const defect = [...modelsDays, total]
      
      return { defectCode: def.defectCode, defect: defect, itemNumber: model.partName }
    }) 
    
    const sortDetail = detail.sort((x, y)  => y.defect.reduce((a, b)=>{return a + b}) - x.defect.reduce((a, b)=>{return a + b})) 
    return { defectCode: def.defectCode, defect: defect, detail: sortDetail }
  })
 
  return defects.sort((x, y)  => y.defect.reduce((a, b)=>{return a + b}) - x.defect.reduce((a, b)=>{return a + b}))    
}

const defectWeekDetailMolde = (days, weekDefects )=>{
  
  const uniqueDefectList = Array.from(new Set(weekDefects.map( ({ defect })  =>{ 
    const list = weekDefects.find( item => item.defect === defect )
    return list }
  )))

  const defects = uniqueDefectList.map( def =>{
    const defectsDays = days.map(day =>{
      const list = weekDefects.filter(item => item.date === day && item.defect === def.defect)
      .reduce( (a, b) =>{
        return a + b.defectPcs || 0
      },0)
      return list
    })

    const total = weekDefects.filter(item => item.defect === def.defect)
    .reduce( (a, b) =>{
      return a + b.defectPcs || 0
    },0)

    const defect = [...defectsDays, total]

    const defectList = weekDefects.filter( item => item.defect === def.defect )
    const uniqueMoldeList = Array.from(new Set(defectList.map( ({ molde })  =>{ 
      const list = defectList.find( item => item.molde === molde )
      return list }
    )))
    const detail = uniqueMoldeList.map( molde =>{
      const moldesDays = days.map(day =>{
        const list = defectList.filter(item => item.date === day && item.molde === molde.molde )
        .reduce( (a, b) =>{
          return a + b.defectPcs || 0
        },0)
        return list
      })
  
      const total = defectList.filter(item => item.molde === molde.molde )
      .reduce( (a, b) =>{
        return a + b.defectPcs || 0
      },0)
  
      const defect = [...moldesDays, total]
      
      return { defectCode: def.defectCode, defect: defect, itemNumber: molde.moldeNumber }
    }) 
    
    const sortDetail = detail.sort((x, y)  => y.defect.reduce((a, b)=>{return a + b}) - x.defect.reduce((a, b)=>{return a + b})) 
    return { defectCode: def.defectCode, defect: defect, detail: sortDetail }
  })
 
  return defects.sort((x, y)  => y.defect.reduce((a, b)=>{return a + b}) - x.defect.reduce((a, b)=>{return a + b}))    
}

const downtimeWeekDetail = (days, weekDowntime, machinesArray )=>{
  
  const uniqueDowntimeList = Array.from(new Set(weekDowntime.map( ({ issue })  =>{ 
    const list = weekDowntime.find( item => item.issue === issue )
    return list }
  )))

  const downtime = uniqueDowntimeList.map( iss =>{
    const downtimeDays = days.map(day =>{
      const list = weekDowntime.filter(item => item.date === day && item.issue === iss.issue)
      .reduce( (a, b) =>{
        return a + b.mins || 0
      },0)
      return list
    })

    const total = weekDowntime.filter(item => item.issue === iss.issue)
    .reduce( (a, b) =>{
      return a + b.mins || 0
    },0)

    const downt = [...downtimeDays, total]

    const issueList = weekDowntime.filter( item => item.issue === iss.issue )
    const uniqueMachineList = Array.from(new Set(issueList.map( ({ machine })  =>{ 
      const list = issueList.find( item => item.machine === machine )
      return list }
    )))
    const detail = uniqueMachineList.map( mach =>{
      const machinesDays = days.map(day =>{
        const list = issueList.filter(item => item.date === day && item.machine === mach.machine)
        .reduce( (a, b) =>{
          return a + b.mins || 0
        },0)
        return list
      })
  
      const total = issueList.filter(item => item.machine === mach.machine)
      .reduce( (a, b) =>{
        return a + b.mins || 0
      },0)
  
      const machines = [...machinesDays, total]
      const itemNumber = machinesArray.find( machine => machine._id === mach.machine).machineNumber
      return { code: iss.issueCode, detail: machines, itemNumber }
    }) 
    
    const sortDetail = detail.sort((x, y)  => y.detail.reduce((a, b)=>{return a + b}) - x.detail.reduce((a, b)=>{return a + b}))
    
    return { issueCode: iss.issueCode, downtime: downt, detail: sortDetail }
  })
 
  return downtime.sort((x, y)  => y.downtime.reduce((a, b)=>{return a + b}) - x.downtime.reduce((a, b)=>{return a + b}))    
}

const downtimeTrimesterDetail = (y, trimesterColumns, trimesterDowntime, machinesArray  )=>{
  
  const uniqueDowntimeList = Array.from(new Set(trimesterDowntime.map( ({ issue })  =>{ 
    const list = trimesterDowntime.find( item => item.issue === issue )
    return list }
  )))

  const downtime = uniqueDowntimeList.map( iss =>{
    const downtimeTrimester = trimesterColumns.map( month =>{
      const list = trimesterDowntime.filter(item => item.date >= `${y}-${month}-01` && item.date <= `${y}-${month}-31` && item.issue === iss.issue)
      .reduce( (a, b) =>{
        return a + b.mins || 0
      },0)
      return list
    })

    const total = trimesterDowntime.filter(item => item.issue === iss.issue)
    .reduce( (a, b) =>{
      return a + b.mins || 0
    },0)

    const downt = [...downtimeTrimester, total]

    const issueList = trimesterDowntime.filter( item => item.issue === iss.issue )
    const uniqueMachineList = Array.from(new Set(issueList.map( ({ machine })  =>{ 
      const list = issueList.find( item => item.machine === machine )
      return list }
    )))
    const detail = uniqueMachineList.map( mach =>{
      const machinesDays = trimesterColumns.map(month =>{
        const list = issueList.filter(item => item.date >= `${y}-${month}-01` && item.date <= `${y}-${month}-31` && item.machine === mach.machine)
        .reduce( (a, b) =>{
          return a + b.mins || 0
        },0)
        return list
      })
  
      const total = issueList.filter(item => item.machine === mach.machine)
      .reduce( (a, b) =>{
        return a + b.mins || 0
      },0)
  
      const machines = [...machinesDays, total]
      const itemNumber = machinesArray.find( machine => machine._id === mach.machine).machineNumber
      return { code: iss.issueCode, detail: machines, itemNumber }
    }) 
    
    const sortDetail = detail.sort((x, y)  => y.detail.reduce((a, b)=>{return a + b}) - x.detail.reduce((a, b)=>{return a + b}))
    
    return { issueCode: iss.issueCode, downtime: downt, detail: sortDetail }
  })
 
  return downtime.sort((x, y)  => y.downtime.reduce((a, b)=>{return a + b}) - x.downtime.reduce((a, b)=>{return a + b}))    
}

const defectTrimesterDetailMolde = (y, trimesterColumns, trimesterDefects )=>{
  
  const uniqueDefectList = Array.from(new Set(trimesterDefects.map( ({ defect })  =>{ 
    const list = trimesterDefects.find( item => item.defect === defect )
    return list }
  )))

  const defects = uniqueDefectList.map( def =>{
    const defectsMonths = trimesterColumns.map(month =>{
      const list = trimesterDefects.filter( item => item.date >= `${y}-${month}-01` && item.date <= `${y}-${month}-31` && item.defect === def.defect)
      .reduce( (a, b) =>{
        return a + b.defectPcs || 0
      },0)
      return list
    })

    const total = trimesterDefects.filter(item => item.defect === def.defect)
    .reduce( (a, b) =>{
      return a + b.defectPcs || 0
    },0)
    const defect = [...defectsMonths, total]

    const defectList = trimesterDefects.filter( item => item.defect === def.defect )
    const uniqueMoldeList = Array.from(new Set(defectList.map( ({ molde })  =>{ 
      const list = defectList.find( item => item.molde === molde )
      return list }
    )))
    const detail = uniqueMoldeList.map( molde =>{
      const moldesMonths = trimesterColumns.map(month =>{
        const list = defectList.filter(item => item.date >= `${y}-${month}-01` && item.date <= `${y}-${month}-31` && item.molde === molde.molde )
        .reduce( (a, b) =>{
          return a + b.defectPcs || 0
        },0)
        return list
      })
  
      const total = defectList.filter(item => item.molde === molde.molde )
      .reduce( (a, b) =>{
        return a + b.defectPcs || 0
      },0)
  
      const defect = [...moldesMonths, total]
      
      return { defectCode: def.defectCode, defect: defect, itemNumber: molde.moldeNumber }
    }) 
    
    const sortDetail = detail.sort((x, y)  => y.defect.reduce((a, b)=>{return a + b}) - x.defect.reduce((a, b)=>{return a + b}))
    return {defectCode: def.defectCode, defect: defect, detail: sortDetail}
  })

  return defects.sort((x, y)  => y.defect.reduce((a, b)=>{return a + b}) - x.defect.reduce((a, b)=>{return a + b}))  
}

const defectTrimesterDetailModel = (y, trimesterColumns, trimesterDefects )=>{
  
  const uniqueDefectList = Array.from(new Set(trimesterDefects.map( ({ defect })  =>{ 
    const list = trimesterDefects.find( item => item.defect === defect )
    return list }
  )))

  const defects = uniqueDefectList.map( def =>{
    const defectsMonths = trimesterColumns.map(month =>{
      const list = trimesterDefects.filter( item => item.date >= `${y}-${month}-01` && item.date <= `${y}-${month}-31` && item.defect === def.defect)
      .reduce( (a, b) =>{
        return a + b.defectPcs || 0
      },0)
      return list
    })

    const total = trimesterDefects.filter(item => item.defect === def.defect)
    .reduce( (a, b) =>{
      return a + b.defectPcs || 0
    },0)
    const defect = [...defectsMonths, total]

    const defectList = trimesterDefects.filter( item => item.defect === def.defect )
    const uniqueModelList = Array.from(new Set(defectList.map( ({ partNumber })  =>{ 
      const list = defectList.find( item => item.partNumber === partNumber )
      return list }
    )))
    const detail = uniqueModelList.map( model =>{
      const modelsMonths = trimesterColumns.map(month =>{
        const list = defectList.filter(item => item.date >= `${y}-${month}-01` && item.date <= `${y}-${month}-31` && item.partNumber === model.partNumber)
        .reduce( (a, b) =>{
          return a + b.defectPcs || 0
        },0)
        return list
      })
  
      const total = defectList.filter(item => item.partNumber === model.partNumber )
      .reduce( (a, b) =>{
        return a + b.defectPcs || 0
      },0)
  
      const defect = [...modelsMonths, total]
      
      return { defectCode: def.defectCode, defect: defect, itemNumber: model.partName }
    }) 
    
    const sortDetail = detail.sort((x, y)  => y.defect.reduce((a, b)=>{return a + b}) - x.defect.reduce((a, b)=>{return a + b}))
    return {defectCode: def.defectCode, defect: defect, detail: sortDetail}
  })

  return defects.sort((x, y)  => y.defect.reduce((a, b)=>{return a + b}) - x.defect.reduce((a, b)=>{return a + b}))  
}

const defectTrimesterDetailMachine = (y, trimesterColumns, trimesterDefects, machinesArray )=>{
  
  const uniqueDefectList = Array.from(new Set(trimesterDefects.map( ({ defect })  =>{ 
    const list = trimesterDefects.find( item => item.defect === defect )
    return list }
  )))

  const defects = uniqueDefectList.map( def =>{
    const defectsMonths = trimesterColumns.map(month =>{
      const list = trimesterDefects.filter( item => item.date >= `${y}-${month}-01` && item.date <= `${y}-${month}-31` && item.defect === def.defect)
      .reduce( (a, b) =>{
        return a + b.defectPcs || 0
      },0)
      return list
    })

    const total = trimesterDefects.filter(item => item.defect === def.defect)
    .reduce( (a, b) =>{
      return a + b.defectPcs || 0
    },0)
    const defect = [...defectsMonths, total]

    const defectList = trimesterDefects.filter( item => item.defect === def.defect )
    const uniqueMachineList = Array.from(new Set(defectList.map( ({ machine })  =>{ 
      const list = defectList.find( item => item.machine === machine )
      return list }
    )))
    const detail = uniqueMachineList.map( mach =>{
      const machinesMonths = trimesterColumns.map(month =>{
        const list = defectList.filter(item => item.date >= `${y}-${month}-01` && item.date <= `${y}-${month}-31` && item.machine === mach.machine)
        .reduce( (a, b) =>{
          return a + b.defectPcs || 0
        },0)
        return list
      })
  
      const total = defectList.filter(item => item.machine === mach.machine)
      .reduce( (a, b) =>{
        return a + b.defectPcs || 0
      },0)
  
      const defect = [...machinesMonths, total]
      const itemNumber = machinesArray.find( machine => machine._id === mach.machine).machineNumber
      return { defectCode: def.defectCode, defect: defect, itemNumber }
    }) 
    
    const sortDetail = detail.sort((x, y)  => y.defect.reduce((a, b)=>{return a + b}) - x.defect.reduce((a, b)=>{return a + b}))


    return {defectCode: def.defectCode, defect: defect, detail: sortDetail}
  })

  return defects.sort((x, y)  => y.defect.reduce((a, b)=>{return a + b}) - x.defect.reduce((a, b)=>{return a + b}))  
}

const defectTrimesterDetail = (y, trimesterColumns, trimesterDefects )=>{
  
  const uniqueDefectList = Array.from(new Set(trimesterDefects.map( ({ defect })  =>{ 
    const list = trimesterDefects.find( item => item.defect === defect )
    return list }
  )))

  const defects = uniqueDefectList.map( def =>{
    const defectsMonths = trimesterColumns.map(month =>{
      const list = trimesterDefects.filter(item => item.date >= `${y}-${month}-01` && item.date <= `${y}-${month}-31` && item.defect === def.defect)
      .reduce( (a, b) =>{
        return a + b.defectPcs || 0
      },0)
      return list
    })

    const total = trimesterDefects.filter(item => item.defect === def.defect)
    .reduce( (a, b) =>{
      return a + b.defectPcs || 0
    },0)
    const defect = [...defectsMonths, total]

    return {defectCode: def.defectCode, defect: defect}
  })

  return defects.sort((x, y)  => y.defect.reduce((a, b)=>{return a + b}) - x.defect.reduce((a, b)=>{return a + b}))  
}

const purgeTrimesterDetail = (y, trimesterColumns, trimesterPurges, machinesArray )=>{
  
  const uniquePurgeList = Array.from(new Set(trimesterPurges.map( ({ resine })  =>{ 
    const list = trimesterPurges.find( item => item.resine === resine )
    return list }
  )))

  const purge = uniquePurgeList.map( resine =>{
    const purgeTrimester = trimesterColumns.map( month =>{
      const list = trimesterPurges.filter(item => item.date >= `${y}-${month}-01` && item.date <= `${y}-${month}-31` && item.resine === resine.resine )
      .reduce( (a, b) =>{
        return a + b.purge || 0
      },0)
      return list
    })

    const total = trimesterPurges.filter(item => item.resine === resine.resine )
    .reduce( (a, b) =>{
      return a + b.purge || 0
    },0)

    const resines = [...purgeTrimester, total]
    const name = `${resine.acronym} ${resine.color}`

    const purgeList = trimesterPurges.filter( item => item.resine === resine.resine )
    const uniqueMachineList = Array.from(new Set(purgeList.map( ({ machine })  =>{ 
      const list = purgeList.find( item => item.machine === machine )
      return list }
    )))
    const detail = uniqueMachineList.map( mach =>{
      const machinesDays = trimesterColumns.map(month =>{
        const list = purgeList.filter(item => item.date >= `${y}-${month}-01` && item.date <= `${y}-${month}-31` && item.machine === mach.machine)
        .reduce( (a, b) =>{
          return a + b.purge || 0
        },0)
        return list
      })
  
      const total = purgeList.filter(item => item.machine === mach.machine)
      .reduce( (a, b) =>{
        return a + b.purge || 0
      },0)
  
      const machines = [...machinesDays, total]
      const itemNumber = machinesArray.find( machine => machine._id === mach.machine).machineNumber
      return { code: resine.resine, detail: machines, itemNumber }
    }) 
    
    const sortDetail = detail.sort((x, y)  => y.detail.reduce((a, b)=>{return a + b}) - x.detail.reduce((a, b)=>{return a + b}))



    return { resine: name, machine: resine.machine, resines, detail: sortDetail }
  })
 
  return purge.sort((x, y)  => y.resines.reduce((a, b)=>{return a + b}) - x.resines.reduce((a, b)=>{return a + b}))   
}





const moldeTrimesterDetail = (trimesterReports, y, trimesterColumns, trimesterDefects )=>{
  const uniqueMoldeList = Array.from(new Set(trimesterReports.map( ({molde })  =>{ 
    const list = trimesterReports.find( item => item.molde === molde )
    return list }
  )))
    
  const moldes = uniqueMoldeList.map( molde =>{
    const moldeReports = trimesterReports.filter( item => item.molde === molde.molde )
    const defectArray = trimesterDefects.filter( item => item.molde === molde.molde)

    const arrayColumns = trimesterColumns.map( month =>{
      const column = monthColumnModel( moldeReports, y, month )
      const { real, ng, ok, plan, wtime, dtime, oee } = column
      return { real, ng, ok, plan, wtime, dtime, oee }
    })

    const column = weekColumnModel( moldeReports )
    const { real, ng, ok, plan, wtime, dtime, oee } = column
    const column8 = {
      real,
      ng,
      ok,
      plan,
      wtime,
      dtime,
      oee
    }
    const array = [...arrayColumns, column8]

    const uniqueDefectList = Array.from(new Set(defectArray.map( ({ defect })  =>{ 
      const list = defectArray.find( item => item.defect === defect )
      return list }
    )))

    const defects = uniqueDefectList.map( def =>{
      const defectsMonths = trimesterColumns.map(month =>{
        const list = defectArray.filter(item => item.date >= `${y}-${month}-01` && item.date <= `${y}-${month}-31` && item.defect === def.defect)
        .reduce( (a, b) =>{
          return a + b.defectPcs || 0
        },0)
        return list
      })

      const total = defectArray.filter(item => item.defect === def.defect)
      .reduce( (a, b) =>{
        return a + b.defectPcs || 0
      },0)
      const defecto = [...defectsMonths, total]
      return {defectCode: def.defectCode, molde: def.molde, defecto: defecto}
    })

    const sortDefects = defects.sort((x, y)  => y.defecto.reduce((a, b)=>{return a + b}) - x.defecto.reduce((a, b)=>{return a + b})) 

    return { molde: molde.molde, moldeNumber: molde.moldeNumber, reports: array, defects: sortDefects }
  })

  return moldes    
}

const modelTrimesterDetail = (trimesterReports, y, trimesterColumns, trimesterDefects )=>{
  const uniqueModelList = Array.from(new Set(trimesterReports.map( ({part })  =>{ 
    const list = trimesterReports.find( item => item.part === part )
    return list }
  )))
    
  const models = uniqueModelList.map( part =>{
    const modelReports = trimesterReports.filter( item => item.part === part.part )
    const defectArray = trimesterDefects.filter( item => item.partNumber === part.part)
    
    const arrayColumns = trimesterColumns.map( month =>{
      const column = monthColumnModel( modelReports, y, month )
      const { real, ng, ok, plan, wtime, dtime, oee, purge } = column
      return { real, ng, ok, plan, wtime, dtime, oee, purge}
    })

    const column = weekColumnModel( modelReports )
    const { real, ng, ok, plan, wtime, dtime, oee } = column
    const column8 = {
      real,
      ng,
      ok,
      plan,
      wtime,
      dtime,
      oee
    }
    const array = [...arrayColumns, column8]

    const uniqueDefectList = Array.from(new Set(defectArray.map( ({ defect })  =>{ 
      const list = defectArray.find( item => item.defect === defect )
      return list }
    )))

    const defects = uniqueDefectList.map( def =>{
      const defectsMonths = trimesterColumns.map(month =>{
        const list = defectArray.filter(item => item.date >= `${y}-${month}-01` && item.date <= `${y}-${month}-31` && item.defect === def.defect)
        .reduce( (a, b) =>{
          return a + b.defectPcs || 0
        },0)
        return list
      })

      const total = defectArray.filter(item => item.defect === def.defect)
      .reduce( (a, b) =>{
        return a + b.defectPcs || 0
      },0)
      const defecto = [...defectsMonths, total]
      return {defectCode: def.defectCode, part: def.partNumber, defecto: defecto}
    })

    const sortDefects = defects.sort((x, y)  => y.defecto.reduce((a, b)=>{return a + b}) - x.defecto.reduce((a, b)=>{return a + b})) 
    

    return { model: part.part, partName: part.partName, reports: array, defects: sortDefects }
  })

  return models    
}

const machineTrimesterDetail = (trimesterReports, y, trimesterColumns, trimesterPurges, trimesterDefects, trimesterDowntime )=>{
  const uniqueMachineList = Array.from(new Set(trimesterReports.map( ({machine })  =>{ 
    const list = trimesterReports.find( item => item.machine === machine )
    return list }
  )))
    
  const machines = uniqueMachineList.map( machine =>{
    const machineReports = trimesterReports.filter( item => item.machine === machine.machine )
    const purges = trimesterPurges.filter( item => item.machine === machine.machine )
    const defectArray = trimesterDefects.filter( item => item.machine === machine.machine )
    const downtimeArray = trimesterDowntime.filter( item => item.machine === machine.machine )

    const arrayColumns = trimesterColumns.map( month =>{
      const column = monthColumn( machineReports, y, month, purges )
      const { real, ng, ok, plan, wtime, dtime, oee, purge } = column
      return { real, ng, ok, plan, wtime, dtime, oee, purge}
    })

    const column = weekColumn( machineReports, purges )
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

    const uniqueDefectList = Array.from(new Set(defectArray.map( ({ defect })  =>{ 
      const list = defectArray.find( item => item.defect === defect )
      return list }
    )))

    const defects = uniqueDefectList.map( def =>{
      const defectsMonths = trimesterColumns.map(month =>{
        const list = defectArray.filter(item => item.date >= `${y}-${month}-01` && item.date <= `${y}-${month}-31` && item.defect === def.defect)
        .reduce( (a, b) =>{
          return a + b.defectPcs || 0
        },0)
        return list
      })

      const total = defectArray.filter(item => item.defect === def.defect)
      .reduce( (a, b) =>{
        return a + b.defectPcs || 0
      },0)
      const defecto = [...defectsMonths, total]
      return {defectCode: def.defectCode, machine: def.machine, defecto: defecto}
    })

    const uniqueDowntimeList = Array.from(new Set(downtimeArray.map( ({ issue })  =>{ 
      const list = downtimeArray.find( item => item.issue === issue )
      return list }
    )))

    const downtime = uniqueDowntimeList.map( iss =>{
      const downtimeDays = trimesterColumns.map( month =>{
        const list = downtimeArray.filter(item => item.date >= `${y}-${month}-01` && item.date <= `${y}-${month}-31` && item.issue === iss.issue)
        .reduce( (a, b) =>{
          return a + b.mins || 0
        },0)
        return list
      })

      const total = downtimeArray.filter(item => item.issue === iss.issue)
      .reduce( (a, b) =>{
        return a + b.mins || 0
      },0)
      const issues = [...downtimeDays, total]
      return {issueCode: iss.issueCode, machine: iss.machine, issues}
    })

    const uniquePurgeList = Array.from(new Set(purges.map( ({ resine })  =>{ 
      const list = purges.find( item => item.resine === resine )
      return list }
    )))

    const resines = uniquePurgeList.map( resine =>{
      const purgeDays = trimesterColumns.map(month =>{
        const list = purges.filter(item => item.date >= `${y}-${month}-01` && item.date <= `${y}-${month}-31` && item.resine === resine.resine)
        .reduce( (a, b) =>{
          return a + b.purge || 0
        },0)
        return list
      })

      const total = purges.filter(item => item.purge === resine.resine )
      .reduce( (a, b) =>{
        return a + b.purge || 0
      },0)
      const resines = [...purgeDays, total]
      const name = `${resine.acronym} ${resine.color}`
      return {resine: name, machine: resine.machine, resines}
    })

    const sortDefects = defects.sort((x, y)  => y.defecto.reduce((a, b)=>{return a + b}) - x.defecto.reduce((a, b)=>{return a + b})) 
    const sortDowntime = downtime.sort((x, y)  => y.issues.reduce((a, b)=>{return a + b}) - x.issues.reduce((a, b)=>{return a + b}))
    const sortPurge = resines.sort((x, y)  => y.resines.reduce((a, b)=>{return a + b}) - x.resines.reduce((a, b)=>{return a + b}))
    
    return { machine: machine.machine, machineNumber: machine.machineNumber, reports: array, defects: sortDefects, downtime: sortDowntime, purge: sortPurge }
  })

  return machines    
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

const dayColumnModel = (production, day ) =>{
  const filter = production.filter( item => item.date === day)
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
  
  const time = parseInt(wtime + dtime) 
  const availability = precise_round(( wtime / time )*100, 2)
  const performance = precise_round(( real / plan )*100, 2)
  const quality = precise_round(( ok / real )*100, 2)
  const oee = precise_round( ((availability*performance*quality)/10000), 2 )
    
  return { real, ng, ok, plan, wtime: precise_round(wtime,2), dtime: precise_round(dtime,2), oee }
}

const weekColumnModel = (production ) =>{
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
  
  const time = parseInt(wtime + dtime) 
  const availability = precise_round(( wtime / time )*100, 2)
  const performance = precise_round(( real / plan )*100, 2)
  const quality = precise_round(( ok / real )*100, 2)
  const oee = precise_round( ((availability*performance*quality)/10000), 2 )
    
  return { real, ng, ok, plan, wtime: precise_round(wtime,2), dtime: precise_round(dtime,2), oee }
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

const monthColumnModel = (production, year, month ) =>{
  const filter = production.filter( item => item.date >= `${year}-${month}-01` && item.date <= `${year}-${month}-31`)
  
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
  

  const time = parseInt(wtime + dtime) 
  const availability = precise_round(( wtime / time )*100, 2)
  const performance = precise_round(( real / plan )*100, 2)
  const quality = precise_round(( ok / real )*100, 2)
  const oee = precise_round( ((availability*performance*quality)/10000), 2 )
    
  return { real, ng, ok, plan, wtime: precise_round(wtime,2), dtime: precise_round(dtime,2), oee }
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
    monthColumn,
    machineDetail,
    machineTrimesterDetail,
    modelDetail,
    moldeDetail,
    modelTrimesterDetail,
    moldeTrimesterDetail,
    defectTrimesterDetail,
    defectWeekDetail,
    downtimeWeekDetail,
    downtimeTrimesterDetail,
    purgeTrimesterDetail,
    purgeWeekDetail,
    defectWeekIndicator,
    defectWeekDetailMachine,
    defectWeekDetailModel,
    defectWeekDetailMolde,
    defectTrimesterDetailMachine,
    defectTrimesterDetailModel,
    defectTrimesterDetailMolde
} 