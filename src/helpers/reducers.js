function precise_round(num, dec){
    const num_sign = num >= 0 ? 1 : -1;
    const value =  (Math.round((num*Math.pow(10,dec))+(num_sign*0.0001))/Math.pow(10,dec)).toFixed(dec);
    const valid = isNaN(value) ? 0 : parseFloat(value)
    return isFinite(valid) ? valid : 0
}

function filterMoldeDate(array, date, id){
    const filter = array.filter( item => item.date === date).filter( item => item.molde === id)
    return filter
}

function filterPurgeByResine(array, date, id, resine){
    // const array = [...this.state.purge]
    const filter = array.filter( item => item.date === date).filter( item => item.machine === id).filter( item => item.resine === resine)
    return filter
}

function filterMinsByIssue(array, date, id, issue){
    // const array = [...this.state.downtime]
    const filter = array.filter( item => item.date === date).filter( item => item.machine === id).filter( item => item.issue === issue)
    return filter
}

function reduceRealMolde(array, date, id){
    const reduce = filterMoldeDate(array, date, id).reduce( (a, b) =>{
      return a + b.real || 0
    },0)
    return reduce
}

function reduceNGMolde(array, date, id){
    const reduce = filterMoldeDate(array, date, id).reduce( (a, b) =>{
      return a + b.ng || 0
    },0)
    return reduce
}

function reduceOKMolde(array, date, id){
    const reduce = filterMoldeDate(array, date, id).reduce( (a, b) =>{
      return a + b.ok || 0
    },0)
    return reduce
}

function reducePlanMolde(array, date, id){
    const reduce = filterMoldeDate(array, date, id).reduce( (a, b) =>{
      return a + b.plan || 0
    },0)
    return reduce
}

function reduceTimeMolde(array, date, id){
    const reduce = filterMoldeDate(array, date, id).reduce( (a, b) =>{
      return a + parseFloat(b.wtime.$numberDecimal) || 0
    },0)
    return precise_round(reduce, 2)
}

function reduceDownTimeMolde(array, date, id){
    const reduce = filterMoldeDate(array, date, id).reduce( (a, b) =>{
      return a + parseFloat(b.dtime.$numberDecimal) || 0
    },0)
    return precise_round(reduce, 2)
}

function filterTotalMoldeReal(array, id, monday, sunday){
    const filter = array.filter( 
      item => item.date >= monday 
      && item.date <= sunday)
      .filter( item => item.molde === id)
    const reduce = filter.reduce( (a, b) =>{
      return a + b.real || 0
    },0)

    return reduce
}

function filterTotalMoldeNG(array, id, monday, sunday){
    const filter = array.filter( 
      item => item.date >= monday 
      && item.date <= sunday)
      .filter( item => item.molde === id)
    const reduce = filter.reduce( (a, b) =>{
      return a + b.ng || 0
    },0)

    return reduce
}

function filterTotalMoldeOK(array, id, monday, sunday ){
    const filter = array.filter( 
      item => item.date >= monday 
      && item.date <= sunday)
      .filter( item => item.molde === id)
    const reduce = filter.reduce( (a, b) =>{
      return a + b.ok || 0
    },0)

    return reduce
}

function filterTotalMoldePlan(array, id, monday, sunday){
    const filter = array.filter( 
      item => item.date >= monday 
      && item.date <= sunday)
      .filter( item => item.molde === id)
    const reduce = filter.reduce( (a, b) =>{
      return a + b.plan || 0
    },0)

    return reduce
}

function filterTotalMoldeTime(array, id, monday, sunday){
    const filter = array.filter( 
      item => item.date >= monday 
      && item.date <= sunday)
      .filter( item => item.molde === id)
    const reduce = filter.reduce( (a, b) =>{
      return a + parseFloat(b.wtime.$numberDecimal) || 0
    },0)

    return precise_round(reduce, 2)
}

function filterTotalMoldeDTime(array, id, monday, sunday){
    const filter = array.filter( 
      item => item.date >= monday 
      && item.date <= sunday)
      .filter( item => item.molde === id)
    const reduce = filter.reduce( (a, b) =>{
      return a + parseFloat(b.dtime.$numberDecimal) || 0
    },0)

    return precise_round(reduce, 2)
}

function reduceMoldeOEE(array, date, id){
    const real = reduceRealMolde(array, date, id)
    
    const ok = reduceOKMolde(array, date, id)
    const plan = reducePlanMolde(array, date, id)
    const wtime = reduceTimeMolde(array, date, id)
    const dtime = reduceDownTimeMolde(array, date, id)
    const time = parseInt(wtime + dtime) 
    
    const availability = precise_round(( wtime / time )*100, 2)
    const performance = precise_round(( real / plan )*100, 2)
    const quality = precise_round(( ok / real )*100, 2)
    const oee = precise_round( ((availability*performance*quality)/10000), 2 )
    
    return oee
}

function filterTotalOEEMolde(array, model, monday, sunday){
    const real = filterTotalMoldeReal(array, model, monday, sunday)
    const ok = filterTotalMoldeOK(array, model, monday, sunday)
    const plan = filterTotalMoldePlan(array, model, monday, sunday)
    const wtime = filterTotalMoldeTime(array, model, monday, sunday)
    const dtime = filterTotalMoldeDTime(array, model, monday, sunday)
    const time = parseInt(wtime + dtime)

    
    const availability = precise_round(( wtime / time )*100, 2)
    const performance = precise_round(( real / plan )*100, 2)
    const quality = precise_round(( ok / real )*100, 2)
    const oee = precise_round( ((availability*performance*quality)/10000), 2 )
     
    return oee
}

function reduceDefectListByDate(arr, date, id){
    const reduce = arr.filter( item => item.id === id && item.date === date).reduce( (a, b) =>{
      return a + b.pcs || 0
    },0)
    return reduce
}

function reduceDefectListByCode(arr, id ){
    const reduce = arr.filter( item => item.id === id).reduce( (a, b) =>{
      return a + b.pcs || 0
    },0)
    return reduce
}

function reduceDefectListByIdDate(arr, id ){
    const reduce = arr.filter( item => item.id === id).reduce( (a, b) =>{
      return a + b.pcs || 0
    },0)
    return reduce
}

function reducePurgeByResine(array, date, id, resine){
    const reduce = filterPurgeByResine(array, date, id, resine).reduce( (a, b) =>{
      return a + b.purge || 0
    },0)
    return reduce
}

function reduceMinsByIssue(array, date, id, issue){
    const reduce = filterMinsByIssue(array, date, id, issue).reduce( (a, b) =>{
      return a + b.mins || 0
    },0)
    return reduce
}

function filterModelDate(array, date, id){
    // const array = [...this.state.production]
    const filter = array.filter( item => item.date === date).filter( item => item.part === id)
    return filter
}

function reduceRealModel(array, date, id){
    const reduce = filterModelDate(array, date, id).reduce( (a, b) =>{
      return a + b.real || 0
    },0)
    return reduce
}

function reduceNGModel(array, date, id){
    const reduce = filterModelDate(array, date, id).reduce( (a, b) =>{
      return a + b.ng || 0
    },0)
    return reduce
}

function  reduceOKModel(array, date, id){
    const reduce = filterModelDate(array, date, id).reduce( (a, b) =>{
      return a + b.ok || 0
    },0)
    return reduce
}

function reducePlanModel(array, date, id){
    const reduce = filterModelDate(array, date, id).reduce( (a, b) =>{
      return a + b.plan || 0
    },0)
    return reduce
}

function reduceTimeModel(array, date, id){
    const reduce = filterModelDate(array, date, id).reduce( (a, b) =>{
      return a + parseFloat(b.wtime.$numberDecimal) || 0
    },0)
    return precise_round(reduce, 2)
}

function reduceDownTimeModel(array, date, id){
    const reduce = filterModelDate(array, date, id).reduce( (a, b) =>{
      return a + parseFloat(b.dtime.$numberDecimal) || 0
    },0)
    return precise_round(reduce, 2)
}

function reduceModelOEE(array, date, id){
    const real = reduceRealModel(array, date, id)
    
    const ok = reduceOKModel(array, date, id)
    const plan = reducePlanModel(array, date, id)
    const wtime = reduceTimeModel(array, date, id)
    const dtime = reduceDownTimeModel(array, date, id)
    const time = parseInt(wtime + dtime) 
    
    const availability = precise_round(( wtime / time )*100, 2)
    const performance = precise_round(( real / plan )*100, 2)
    const quality = precise_round(( ok / real )*100, 2)
    const oee = precise_round( ((availability*performance*quality)/10000), 2 )
    
    return oee
}

function filterTotalModelReal(array, id, monday, sunday){
    // const array = [...this.state.production]
    const filter = array.filter( 
      item => item.date >= monday 
      && item.date <= sunday)
      .filter( item => item.part === id)
    const reduce = filter.reduce( (a, b) =>{
      return a + b.real || 0
    },0)

    return reduce
}

function filterTotalModelNG(array, id, monday, sunday){
    // const array = [...this.state.production]
    const filter = array.filter( 
      item => item.date >= monday 
      && item.date <= sunday)
      .filter( item => item.part === id)
    const reduce = filter.reduce( (a, b) =>{
      return a + b.ng || 0
    },0)

    return reduce
}

function filterTotalModelOK(array, id, monday, sunday){
    // const array = [...this.state.production]
    const filter = array.filter( 
      item => item.date >= monday 
      && item.date <= sunday)
      .filter( item => item.part === id)
    const reduce = filter.reduce( (a, b) =>{
      return a + b.ok || 0
    },0)

    return reduce
}

function filterTotalModelPlan(array, id, monday, sunday){
    // const array = [...this.state.production]
    const filter = array.filter( 
      item => item.date >= monday 
      && item.date <= sunday)
      .filter( item => item.part === id)
    const reduce = filter.reduce( (a, b) =>{
      return a + b.plan || 0
    },0)

    return reduce
}

function filterTotalModelTime(array, id, monday, sunday){
    // const array = [...this.state.production]
    const filter = array.filter( 
      item => item.date >= monday 
      && item.date <= sunday)
      .filter( item => item.part === id)
    const reduce = filter.reduce( (a, b) =>{
      return a + parseFloat(b.wtime.$numberDecimal) || 0
    },0)

    return precise_round(reduce, 2)
}

function filterTotalModelDTime(array, id, monday, sunday){
    // const array = [...this.state.production]
    const filter = array.filter( 
      item => item.date >= monday 
      && item.date <= sunday)
      .filter( item => item.part === id)
    const reduce = filter.reduce( (a, b) =>{
      return a + parseFloat(b.dtime.$numberDecimal) || 0
    },0)

    return precise_round(reduce, 2)
}

function filterTotalOEEModel(array, model, monday, sunday){
    const real = filterTotalModelReal(array, model, monday, sunday)
    const ok = filterTotalModelOK(array, model, monday, sunday)
    const plan = filterTotalModelPlan(array, model, monday, sunday)
    const wtime = filterTotalModelTime(array, model, monday, sunday)
    const dtime = filterTotalModelDTime(array, model, monday, sunday)
    const time = parseInt(wtime + dtime)
    
    const availability = precise_round(( wtime / time )*100, 2)
    const performance = precise_round(( real / plan )*100, 2)
    const quality = precise_round(( ok / real )*100, 2)
    const oee = precise_round( ((availability*performance*quality)/10000), 2 )
     
    return oee
}

function filterMachineDate(array, date, id){
    // const array = [...this.state.production]
    const filter = array.filter( item => item.date === date).filter( item => item.machine === id)
    return filter
}

function reduceReal(array, date, id){
    const reduce = filterMachineDate(array, date, id).reduce( (a, b) =>{
      return a + b.real || 0
    },0)
    return reduce
}

function reduceNG(array, date, id){
    const reduce = filterMachineDate(array, date, id).reduce( (a, b) =>{
      return a + b.ng || 0
    },0)
    return reduce
}

function reduceOK(array, date, id){
    const reduce = filterMachineDate(array, date, id).reduce( (a, b) =>{
      return a + b.ok || 0
    },0)
    return reduce
}

function reduceTime (array, date, id) {
    const reduce = filterMachineDate(array, date, id).reduce( (a, b) =>{
      return a + parseFloat(b.wtime.$numberDecimal) || 0
    },0)
    return precise_round(reduce, 2)
}

function reduceDownTime( array, date, id){
    const reduce = filterMachineDate(array, date, id).reduce( (a, b) =>{
      return a + parseFloat(b.dtime.$numberDecimal) || 0
    },0)
    return precise_round(reduce, 2)
}

function reducePlan (array, date, id){
    const reduce = filterMachineDate(array, date, id).reduce( (a, b) =>{
      return a + b.plan || 0
    },0)
    return reduce
}

function reduceOEE (array, date, id){
    const real = reduceReal(array, date, id)
    // const ng = this.reduceNG(date, id)
    const ok = reduceOK(array, date, id)
    const plan = reducePlan(array, date, id)
    const wtime = reduceTime(array, date, id)
    const dtime = reduceDownTime(array, date, id)
    const time = parseInt(wtime + dtime) 
    
    const availability = precise_round(( wtime / time )*100, 2)
    const performance = precise_round(( real / plan )*100, 2)
    const quality = precise_round(( ok / real )*100, 2)
    const oee = precise_round( ((availability*performance*quality)/10000), 2 )
     
    return oee
}

function filterTotalOK (array, id, monday, sunday){
    // const array = [...this.state.production]
    const filter = array.filter( 
      item => item.date >= monday 
      && item.date <= sunday)
      .filter( item => item.machine === id)
    const reduce = filter.reduce( (a, b) =>{
      return a + b.ok || 0
    },0)

    return reduce
}

function filterTotalNG(array, id, monday, sunday){
    // const array = [...this.state.production]
    const filter = array.filter( 
      item => item.date >= monday 
      && item.date <= sunday)
      .filter( item => item.machine === id)
    const reduce = filter.reduce( (a, b) =>{
      return a + b.ng || 0
    },0)

    return reduce
}

function filterTotalPlan(array, id, monday, sunday){
    // const array = [...this.state.production]
    const filter = array.filter( 
      item => item.date >= monday 
      && item.date <= sunday)
      .filter( item => item.machine === id)
    const reduce = filter.reduce( (a, b) =>{
      return a + b.plan || 0
    },0)

    return reduce
}

function filterTotalTime(array, id, monday, sunday){
    // const array = [...this.state.production]
    const filter = array.filter( 
      item => item.date >= monday 
      && item.date <= sunday)
      .filter( item => item.machine === id)
    const reduce = filter.reduce( (a, b) =>{
      return a + parseFloat(b.wtime.$numberDecimal) || 0
    },0)

    return precise_round(reduce, 2)
}

function filterTotalDTime (array, id, monday, sunday){
    // const array = [...this.state.production]
    const filter = array.filter( 
      item => item.date >= monday 
      && item.date <= sunday)
      .filter( item => item.machine === id)
    const reduce = filter.reduce( (a, b) =>{
      return a + parseFloat(b.dtime.$numberDecimal) || 0
    },0)

    return precise_round(reduce, 2)
}

function filterTotalReal(array, id, monday, sunday){
    // const array = [...this.state.production]
    const filter = array.filter( 
      item => item.date >= monday 
      && item.date <= sunday)
      .filter( item => item.machine === id)
    const reduce = filter.reduce( (a, b) =>{
      return a + b.real || 0
    },0)

    return reduce
}

function filterTotalOEE (array, id, monday, sunday){
    const real = filterTotalReal(array, id, monday, sunday)
    const ok = filterTotalOK(array, id, monday, sunday)
    const plan = filterTotalPlan(array, id, monday, sunday)
    const wtime = filterTotalTime(array, id, monday, sunday)
    const dtime = filterTotalDTime(array, id, monday, sunday)
    const time = parseInt(wtime + dtime)

    
    const availability = precise_round(( wtime / time )*100, 2)
    const performance = precise_round(( real / plan )*100, 2)
    const quality = precise_round(( ok / real )*100, 2)
    const oee = precise_round( ((availability*performance*quality)/10000), 2 )
     
    return oee
}

function filterResines (array, date, id) {
    // const array = [...this.state.purge]
    const filter = array.filter( item => item.date === date).filter( item => item.machine === id)
    return filter
}

function reducePurge(array, date, id) {
    const reduce = filterResines(array, date, id).reduce( (a, b) =>{
      return a + b.purge || 0
    },0)
    return reduce
}

function filterTotalPurge (array, id, monday, sunday){
    // const array = [...this.state.purge]
    const filter = array.filter( 
      item => item.date >= monday 
      && item.date <= sunday)
      .filter( item => item.machine === id)
    const reduce = filter.reduce( (a, b) =>{
      return a + b.purge || 0
    },0)

    return reduce
}

export { 
    filterMoldeDate, 
    reduceRealMolde, 
    reduceNGMolde, 
    reduceOKMolde, 
    reducePlanMolde, 
    reduceTimeMolde,
    reduceDownTimeMolde,
    filterTotalMoldeReal,
    filterTotalMoldeNG,
    filterTotalMoldeOK,
    filterTotalMoldePlan,
    filterTotalMoldeTime,
    filterTotalMoldeDTime,
    reduceMoldeOEE,
    filterTotalOEEMolde,
    reduceDefectListByDate,
    reduceDefectListByCode,
    reduceDefectListByIdDate,
    reducePurgeByResine,
    reduceMinsByIssue,
    reduceRealModel,
    reduceNGModel,
    reduceOKModel,
    reducePlanModel,
    reduceTimeModel,
    reduceDownTimeModel,
    reduceModelOEE,
    filterTotalModelReal,
    filterTotalModelNG,
    filterTotalModelOK,
    filterTotalModelPlan,
    filterTotalModelTime,
    filterTotalModelDTime,
    filterTotalOEEModel,
    reduceReal,
    reduceNG,
    reduceOK,
    reduceTime,
    reduceDownTime,
    reducePlan,
    reduceOEE,
    filterTotalOK,
    filterTotalNG,
    filterTotalReal,
    filterTotalPlan,
    filterTotalTime,
    filterTotalDTime,
    filterTotalOEE,
    reducePurge,
    filterTotalPurge
}