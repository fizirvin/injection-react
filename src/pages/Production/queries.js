const productionQuery = { query: `query 
    InitialQuery($initial: Date, $end: Date){
        productionByDate(initial:$initial, end:$end){
            report
            date
            machine
            machineNumber
            shift
            part
            partName
            molde
            moldeNumber
            real
            ng
            ok
            plan
            wtime
            dtime
            availability
            performance
            quality
            oee
        }
    }`
}

const resinesQuery = { query: `query 
    InitialQuery($initial: Date, $end: Date){
        resinesByDate(initial: $initial, end: $end){
            report
            date
            shift
            machine
            resine
            resineName
            purge
            acronym
            color
        }
    }`
}

const downtimeQuery = { query: `query 
    InitialQuery($initial: Date, $end: Date){
        downtimeByDate(initial:$initial, end:$end){
            report
            date
            shift
            machine
            issue
            issueName
            issueCode
            mins
        }
    }`
}

const defectProductionQuery = { query: `query 
    InitialQuery($initial: Date, $end: Date){
        defectsByDate(initial:$initial, end:$end){
            report
            date
            shift
            machine
            defect
            defectCode
            defectName
            partNumber
            partName
            molde
            moldeNumber
            defectPcs
        }
    }`
}

export { 
    productionQuery,
    resinesQuery,
    downtimeQuery,
    defectProductionQuery
}
