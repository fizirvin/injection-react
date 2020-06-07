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

export default addMachine;