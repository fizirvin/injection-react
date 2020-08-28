const addProgram = { query: `mutation
    NewProgram( $input: NewProgram ){
        newProgram(input: $input){
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

export { 
    addProgram,
    modifyProgram
}