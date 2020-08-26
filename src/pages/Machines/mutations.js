const addMachine = { query: `mutation
    NewMachine( $input: NewMachine ){
        newMachine(input: $input){
            _id
            machineNumber
            machineSerial
            closingForce
            spindleDiameter
        }
    }`
}

const modifyMachine = { query: `mutation
    UpdateMachine($_id: ID, $input: NewMachine ){
        updateMachine(_id: $_id, input: $input){
            _id
            machineNumber
            machineSerial
            closingForce
            spindleDiameter
        }
    }`
}

export { 
    addMachine,
    modifyMachine
}