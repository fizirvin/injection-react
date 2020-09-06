const addMolde = { query: `mutation
    NewMolde( $input: NewMolde ){
        newMolde(input: $input){
            _id
            moldeNumber
            moldeSerial
            cavities
            lifecycles
            tcycles
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

export { 
    addMolde,
    modifyMolde,
    addCleaning
}