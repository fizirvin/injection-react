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