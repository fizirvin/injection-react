const modifyProgram = { query: `mutation
UpdateProgram($_id: ID, $input: NewProgram ){
    updateProgram(_id: $_id, input: $input){
        _id
        machineNumber {
          _id
          machineNumber
          machineSerial
        }
        moldeNumber {
          _id
          moldeNumber
          moldeSerial
          cavities
        }
        partNumber {
          _id
          partNumber
          partName
    
        }
        cycleTime
        cycles
        capacity
        }
    }`
}

export default modifyProgram;