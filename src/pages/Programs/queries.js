const programsQuery = { query: 
    `query {
        programs{
            _id
            machineNumber{
                _id
                machineNumber
                machineSerial
            }
            moldeNumber{
                _id
                moldeNumber
                moldeSerial
                cavities
            }
            partNumber{
                _id
                partNumber
                partName
                family
            }
            cycleTime
            cycles
            capacity
        }
    }`
};

export default programsQuery