const modifyReport = { query: `mutation 
  UpdateInjectionReport($_id: ID, $input: NewInjectionReport ){
    updateInjectionReport(_id: $_id, input: $input){
      _id
      reportDate
      shift
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
          family
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
          acronym
          color
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
          family
        }
        program{
          _id
        }
      }
    }
  }`
}

export default modifyReport;