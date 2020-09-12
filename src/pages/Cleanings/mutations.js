const addMolde = { query: `mutation
    NewMolde( $input: NewMolde ){
        newMolde(input: $input){
            _id
            moldeNumber
            moldeSerial
            cavities
            lifecycles
            tcycles
            shot
            quantity
            active
        }
    }`
}

const modifyMolde = { query: `mutation
UpdateMolde($_id: ID, $input: NewMolde ){
    updateMolde(_id: $_id, input: $input){
            _id
            moldeNumber
            moldeSerial
            cavities
            lifecycles
            tcycles
            shot
            quantity
            active
        }
    }`
}

const addCleaning = { query: `mutation
NewCleaning( $input: NewCleaning ){
    newCleaning(input: $input){
        _id
        date
        shift
        team
        cycles
        counted
        comments
    }
}`
}

const modifyCleaning = { query: `mutation
UpdateCleaning($_id: ID, $input: NewCleaning ){
    updateCleaning(_id: $_id, input: $input){
            _id
            date
            shift
            team
            cycles
            counted
            comments
        }
    }`
}

export { 
    addMolde,
    modifyMolde,
    addCleaning,
    modifyCleaning
}