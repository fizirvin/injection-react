addMachine = async ({ machineNumber, machineSerial, closingForce, spindleDiameter })=>{
    const input = { machineNumber, machineSerial, closingForce, spindleDiameter }
    addMachine.variables = { input }
    opts.body = JSON.stringify(addMachine)
    const res = await fetch(url, opts);
    const data = await res.json();
    if(data.errors){
      this.setState({machineMessage: 'error'})
    } else{
      const { newMachine } = data.data
      const machines = [...this.state.machines, newMachine ];
      this.setState({ machines, machineMessage: 'sucess'});
    }
}

updateMachine = async ({ _id, machineNumber, machineSerial, closingForce, spindleDiameter })=>{
    const input = { machineNumber, machineSerial, closingForce, spindleDiameter }
    modifyMachine.variables = { _id, input }
    opts.body = JSON.stringify(modifyMachine)
    const res = await fetch(url, opts);
    const data = await res.json();
    if(data.errors){
      this.setState({machineMessage: 'error'})
    } else{
      let machine = data.data.updateMachine;
      let machines = [...this.state.machines];
      machines[machines.findIndex(el => el._id === machine._id)] = machine;
      let programs = [...this.state.programs]
      let reports = [...this.state.reports]
      const updateProgramMachine = (programs, machine) => {
        return programs.map(item => {
            var temp = Object.assign({}, item);
            if (temp.machineNumber._id === machine._id) {
                temp.machineNumber = machine;
            }
            return temp;
        });
      }
      const updateReportMachine = (reports, machine) => {
        return reports.map(item => {
            var temp = Object.assign({}, item);
            if (temp.machine._id === machine._id) {
                temp.machine = machine;
            }
            return temp;
        });
      }
      const updatedPrograms = updateProgramMachine(programs, machine);
      const updatedReports = updateReportMachine(reports, machine);
      this.setState({ machines: machines, programs: updatedPrograms, reports: updatedReports, machineMessage: 'sucess'});
    }
}

addModel = async ({ partNumber, partName, family })=>{
  const input = { partNumber, partName, family }
  addModel.variables = { input }
  opts.body = JSON.stringify(addModel)
  const res = await fetch(url, opts);
  const data = await res.json();
  if(data.errors){
    this.setState({modelMessage: 'error'})
  } else{
    const { newPartNumber } = data.data
    const models = [...this.state.models, newPartNumber ];
    this.setState({ models, modelMessage: 'sucess'});
  }
}

updateModel = async ({ _id, partNumber, partName, family })=>{
  const input = { partNumber, partName, family }
  modifyModel.variables = { _id, input }
  opts.body = JSON.stringify(modifyModel)
  const res = await fetch(url, opts);
  const data = await res.json();
  if(data.errors){
    this.setState({modelMessage: 'error'})
  } else{
    let model = data.data.updatePartNumber;
    let models = [...this.state.models];
    models[models.findIndex(el => el._id === model._id)] = model;
    let programs = [...this.state.programs]
    const updateProgramModel = (programs, model) => {
      return programs.map(item => {
          var temp = Object.assign({}, item);
          if (temp.partNumber._id === model._id) {
              temp.partNumber = model;
          }
          return temp;
      });
    }
    const updatedPrograms = updateProgramModel(programs, model);
    this.setState({ models, programs: updatedPrograms, modelMessage: 'sucess'});
  }
}

addMolde = async ({moldeNumber, moldeSerial, cavities, lifecycles})=>{
  const input = { moldeNumber, moldeSerial, cavities, lifecycles }
  addMolde.variables = { input }
  opts.body = JSON.stringify(addMolde)
  const res = await fetch(url, opts);
  const data = await res.json();
  if(data.errors){
    this.setState({moldeMessage: 'error'})
  } else{
    const { newMolde } = data.data
    const moldes = [...this.state.moldes, newMolde ];
    this.setState({ moldes, moldeMessage: 'sucess'});
  }
}

updateMolde = async ({ _id, moldeNumber, moldeSerial, cavities, lifecycles, tcycles })=>{
  const input = { moldeNumber, moldeSerial, cavities, lifecycles, tcycles }
  modifyMolde.variables = { _id, input }
  opts.body = JSON.stringify(modifyMolde)
  const res = await fetch(url, opts);
  const data = await res.json();
  if(data.errors){
    this.setState({moldeMessage: 'error'})
  } else{
    let molde = data.data.updateMolde;
    let moldes = [...this.state.moldes];
    moldes[moldes.findIndex(el => el._id === molde._id)] = molde;
    let programs = [...this.state.programs]
    const updateProgramMolde = (programs, molde) => {
      return programs.map(item => {
          var temp = Object.assign({}, item);
          if (temp.moldeNumber._id === molde._id) {
              temp.moldeNumber = molde;
          }
          return temp;
      });
    }
    const updatedPrograms = updateProgramMolde(programs, molde);
    this.setState({ moldes, programs: updatedPrograms, moldeMessage: 'sucess'});
  }
}

addIssue = async ({ issueName, issueCode })=>{
  const input = { issueName, issueCode }
  addIssue.variables = { input }
  opts.body = JSON.stringify(addIssue)
  const res = await fetch(url, opts);
  const data = await res.json();
  if(data.errors){
  this.setState({issueMessage: 'error'})
  } else{
    const { newIssue } = data.data
    const issues = [...this.state.issues, newIssue ];
    this.setState({ issues, issueMessage: 'sucess'});
  }
}

updateIssue = async ({ _id, issueName, issueCode })=>{
  const input = { issueName, issueCode }
  modifyIssue.variables = { _id, input }
  opts.body = JSON.stringify(modifyIssue)
  const res = await fetch(url, opts);
  const data = await res.json();
  if(data.errors){
    this.setState({issueMessage: 'error'})
  } else{
    let issue = data.data.updateIssue;
    let issues = [...this.state.issues];
    issues[issues.findIndex(el => el._id === issue._id)] = issue;
    this.setState({issues: issues, issueMessage: 'sucess'});
  }
}

addDefect = async ({ defectName, defectCode, isInjection })=>{
  const input = { defectName, defectCode, isInjection }
  addDefect.variables = { input }
  opts.body = JSON.stringify(addDefect)
  const res = await fetch(url, opts);
  const data = await res.json();
  if(data.errors){
    console.log(data.errors)
    this.setState({defectMessage: 'error'})
  } else{
    const { newDefect } = data.data
    const defects = [...this.state.defects, newDefect ];
    this.setState({defects, defectMessage: 'sucess'});
  }
}

updateDefect = async ({ _id, defectName, defectCode, isInjection })=>{
  const input = { defectName, defectCode, isInjection }
  modifyDefect.variables = { _id, input }
  opts.body = JSON.stringify(modifyDefect)
  const res = await fetch(url, opts);
  const data = await res.json();
  if(data.errors){
    console.log(data.errors)
    this.setState({defectMessage: 'error'})
  } else{
    let defect = data.data.updateDefect;
    let defects = [...this.state.defects];
    defects[defects.findIndex(el => el._id === defect._id)] = defect;
    this.setState({defects: defects, defectMessage: 'sucess'});
  }
}

addMaterial = async ({ number, manufacturer, description, acronym, identification, type, unit, color })=>{
  const input = { number, manufacturer, description, acronym, identification, type, unit, color }
  addMaterial.variables = { input }
  opts.body = JSON.stringify(addMaterial)
  const res = await fetch(url, opts);
  const data = await res.json();
  if(data.errors){
    this.setState({materialMessage: 'error'})
  } else{
    const { newMaterial } = data.data
    const materials = [...this.state.materials, newMaterial ];
    this.setState({ materials, materialMessage: 'sucess'});
  }

}

updateMaterial = async ({ _id, number, manufacturer, description, acronym, identification, type, color, unit })=>{
  const input = { number, manufacturer, description, acronym, identification, type, color, unit }
  modifyMaterial.variables = { _id, input }
  opts.body = JSON.stringify(modifyMaterial)
  const res = await fetch(url, opts);
  const data = await res.json();
  if(data.errors){
    this.setState({materialMessage: 'error'})
  } else{
    let material = data.data.updateMaterial;
    let materials = [...this.state.materials];
    materials[materials.findIndex(el => el._id === material._id)] = material;
    this.setState({ materials, materialMessage: 'sucess'});
  }
}

addProgram = async ({ machineNumber, moldeNumber, partNumber, cycleTime, cycles, capacity })=>{
  const input = { machineNumber, moldeNumber, partNumber, cycleTime, cycles, capacity }
  addProgram.variables = { input }
  opts.body = JSON.stringify(addProgram)
  const res = await fetch(url, opts);
  const data = await res.json();
  if(data.errors){
    this.setState({programMessage: 'error'})
  } else{
    const { newProgram } = data.data
    const programs = [...this.state.programs, newProgram];
    this.setState({programs, programMessage: 'sucess'});
  }
}

updateProgram = async ({ _id, machineNumber, moldeNumber, partNumber, cycleTime, cycles, capacity })=>{
  const input = { machineNumber, moldeNumber, partNumber, cycleTime, cycles, capacity }
  modifyProgram.variables = { _id, input }
  opts.body = JSON.stringify(modifyProgram)
  const res = await fetch(url, opts);
  const data = await res.json();
  if(data.errors){
    this.setState({programMessage: 'error'})
  } else{
    let program = data.data.updateProgram;
    let programs = [...this.state.programs];
    programs[programs.findIndex(el => el._id === program._id)] = program;
    this.setState({programs: programs, programMessage: 'sucess'});
  }
}

newWorker = async (input) =>{
  addWorker.variables = { input }

  hr_opts.body = JSON.stringify(addWorker)
  const res = await fetch(hr_server, hr_opts);
  const data = await res.json();
  if(data.errors){
    console.log(data.errors)
    return this.setState({workerMessage: 'error'})

  } else {
    const profile = data.data.newProfile
    const profiles = [...this.state.profiles, profile]
    console.log(profile)
    return this.setState({profiles, workerMessage: 'sucess'})
  }
}

updateWorker = async (_id, obj) =>{
  console.log(_id)
  const input = {...obj}
  modifyWorker.variables = { _id, input }

  hr_opts.body = JSON.stringify(modifyWorker)
  const res = await fetch(hr_server, hr_opts);
  const data = await res.json();
  if(data.errors){
    console.log(data.errors)
    return this.setState({workerMessage: 'error'})

  } else {
    
    let profile = data.data.updateProfile;
    let profiles = [...this.state.profiles];
    profiles[profiles.findIndex(el => el._id === profile._id)] = profile;
    this.setState({ profiles, workerMessage: 'sucess'});
  }
}

addUser = async ({name, level, password})=>{
  const input = { name, level, password }
  addUser.variables = { input }
  opts.body = JSON.stringify(addUser)
  const res = await fetch(url, opts);
  const data = await res.json();
  if(data.errors){
    this.setState({userMessage: 'error'})
  } else{
    const { newUser } = data.data
    const users = [...this.state.users, newUser ];
    this.setState({ users, userMessage: 'sucess'});
  }
}

updateUser = async ({_id, level, active})=>{
  const input = { level, active}
  console.log(input)
  modifyUser.variables = { _id, input }
  opts.body = JSON.stringify(modifyUser)
  const res = await fetch(url, opts);
  const data = await res.json();
  if(data.errors){
    console.log(data.errors)
    this.setState({userMessage: 'error'})
  } else{
    let user = data.data.updateUser;
    let users = [...this.state.users];
    users[users.findIndex(el => el._id === user._id)] = user;
    this.setState({ users, userMessage: 'sucess'});
  }
}