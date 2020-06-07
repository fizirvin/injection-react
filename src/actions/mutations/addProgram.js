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

export default addProgram;