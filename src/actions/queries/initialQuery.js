const initialQuery = { query: `query 
    InitialQuery($initial: Date, $end: Date){
        productionByDate(initial:$initial, end:$end){
            report
            date
            machine
            shift
            part
            molde
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
        machines{
            _id
            machineNumber
            machineSerial
            closingForce
            spindleDiameter
        }
        users{
            _id
            shortCat
            fullUat
            fullCat
            active
            level
            name
        } 
        moldes{
            _id
            moldeNumber
            moldeSerial
            cavities
            lifecycles
            tcycles
        }
        cycles{
            report
            date
            shift
            machine
            part
            molde
            real
            cycles
        }
        materials{
            _id
            number
            manufacturer
            description
            acronym
            identification
            type
            unit
            color
        } 
        parts {
            _id
            partNumber
            partName
            family
        }
        issues{
            _id
            issueName
            issueCode
        }
        defects{
            _id
            defectName
            defectCode
            isInjection
        }
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
        reports{
            _id
            reportDate
            shift
            machine{
                _id
                machineNumber
                machineSerial
            }
            TReal
            TNG
            TOK
            TPlan
            TWTime
            TDTime
            TAvailability
            TPerformance
            TQuality
            TOEE
            production{
                _id
                program{
                    _id
                }
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
                partNumber {
                    _id
                    partNumber
                    partName
                    family
                }
                molde{
                    _id
                    moldeNumber
                    moldeSerial
                    cavities
                }
            }
            downtimeDetail {
                _id
                issueId{
                    _id
                    issueName
                }
                mins
            }
            resines {
                _id
                resine{
                    _id
                description
                }
                purge
            }
            defects{
                _id
                defect{
                    _id
                    defectName
                    defectCode
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
                    family
                }
                program{
                    _id
                }
            }
        }
    }`
}

export default initialQuery