const addCleaning = { query: `mutation
NewCleaning( $input: NewCleaning ){
    newCleaning(input: $input){
        _id
        molde{
            _id
            moldeNumber
        }
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
            molde{
                _id
                moldeNumber
            }
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
    addCleaning,
    modifyCleaning
}