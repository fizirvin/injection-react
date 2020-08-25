const machinesQuery = { query: 
    `query {
        machines{
            _id
            machineNumber
            machineSerial
            closingForce
            spindleDiameter
        }
    }`
};

export default machinesQuery