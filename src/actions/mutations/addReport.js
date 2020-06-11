const addReport = { query: `mutation
    NewInjectionReport( $input: NewInjectionReport ){
        newInjectionReport(input: $input){
            _id
            reportDate
            shift
            userId{
                name
            }
            machine{
                _id
                machineNumber
                machineSerial
            }
            TReal
            TOK
            TNG
            TPlan
            TWTime
            TDTime
            TAvailability
            TPerformance
            TQuality
            TOEE
            production{
                _id
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
                cycles
                 program {
                    _id
                }
                partNumber {
                    _id
                    partNumber
                    partName
                }
                molde{
                    _id
                    moldeNumber
                    moldeSerial
                    cavities
                }
            }
            resines {
                _id
                resine{
                    _id
                    description
                    color
                    acronym
                }
                purge
            }
            downtimeDetail {
                _id
                issueId{
                    _id
                    issueName
                }
                mins
            }
            defects{
                _id
                defect{
                    _id
                    defectName
                }
                defectPcs
                molde{
                    _id
                    moldeNumber
                }
                partNumber{
                    _id
                    partNumber
                    partName
                }
                program{
                    _id
                }
            }
        }
    }`
}

export default addReport;